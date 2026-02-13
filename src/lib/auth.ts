/**
 * Autenticação do painel admin.
 *
 * Usa crypto.scrypt (Node.js built-in) para hash de passwords.
 * Sessões guardadas em data/sessions.json com expiração de 7 dias.
 * Auto-logout após 30 minutos de inactividade.
 */

import crypto from "crypto";
import fs from "fs";
import { SESSIONS_PATH, ensureDataDirs } from "@/lib/data-dir";
const SESSION_TTL = 7 * 24 * 60 * 60 * 1000; // 7 dias
const IDLE_TIMEOUT = 30 * 60 * 1000; // 30 minutos de inactividade

interface Session {
  id: string;
  createdAt: number;
  expiresAt: number;
  lastActivity: number;
}

// ---------------------------------------------------------------------------
// Password hashing
// ---------------------------------------------------------------------------

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = await new Promise<string>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derived) => {
      if (err) reject(err);
      resolve(derived.toString("hex"));
    });
  });
  return `${salt}:${hash}`;
}

export async function verifyPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;

  const derivedHash = await new Promise<string>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derived) => {
      if (err) reject(err);
      resolve(derived.toString("hex"));
    });
  });

  return crypto.timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(derivedHash, "hex")
  );
}

// ---------------------------------------------------------------------------
// Sessions
// ---------------------------------------------------------------------------

function readSessions(): Session[] {
  try {
    if (fs.existsSync(SESSIONS_PATH)) {
      const raw = fs.readFileSync(SESSIONS_PATH, "utf-8");
      return JSON.parse(raw) as Session[];
    }
  } catch {
    // ficheiro corrompido, recomeçar
  }
  return [];
}

function writeSessions(sessions: Session[]): void {
  ensureDataDirs();
  fs.writeFileSync(SESSIONS_PATH, JSON.stringify(sessions, null, 2), "utf-8");
}

// ---------------------------------------------------------------------------
// Cookie signing (HMAC) — permite ao middleware verificar sem acesso a fs
// ---------------------------------------------------------------------------

function getSessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "fallback-insecure-dev-only";
}

function signSessionId(sessionId: string): string {
  const secret = getSessionSecret();
  const signature = crypto.createHmac("sha256", secret).update(sessionId).digest("hex");
  return `${sessionId}.${signature}`;
}

/**
 * Verifica a assinatura HMAC de um cookie de sessão.
 * Retorna o sessionId se válido, ou null se inválido.
 */
export function verifySessionCookie(cookieValue: string): string | null {
  const lastDot = cookieValue.lastIndexOf(".");
  if (lastDot === -1) return null;

  const sessionId = cookieValue.substring(0, lastDot);
  const signature = cookieValue.substring(lastDot + 1);

  const secret = getSessionSecret();
  const expected = crypto.createHmac("sha256", secret).update(sessionId).digest("hex");

  try {
    if (crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expected, "hex"))) {
      return sessionId;
    }
  } catch {
    // Lengths don't match or invalid hex
  }
  return null;
}

/**
 * Cria uma nova sessão e retorna o cookie assinado (id.hmac).
 */
export function createSession(): string {
  const id = crypto.randomUUID();
  const now = Date.now();
  const session: Session = {
    id,
    createdAt: now,
    expiresAt: now + SESSION_TTL,
    lastActivity: now,
  };

  // Limpar sessões expiradas e adicionar a nova
  const sessions = readSessions().filter((s) => s.expiresAt > now);
  sessions.push(session);
  writeSessions(sessions);

  return signSessionId(id);
}

/**
 * Valida se um cookie de sessão é válido (assinatura correcta, existe, não expirou, não idle).
 * Aceita tanto o cookie assinado (id.hmac) como o id puro (backward compat).
 * Actualiza lastActivity em cada validação bem-sucedida.
 */
export function validateSession(cookieValue: string): boolean {
  if (!cookieValue) return false;

  // Tentar extrair sessionId do cookie assinado
  let sessionId: string;
  if (cookieValue.includes(".")) {
    const verified = verifySessionCookie(cookieValue);
    if (!verified) return false; // Assinatura inválida
    sessionId = verified;
  } else {
    // Backward compat: cookie sem assinatura (sessões antigas)
    sessionId = cookieValue;
  }

  const sessions = readSessions();
  const session = sessions.find((s) => s.id === sessionId);
  const now = Date.now();

  if (!session) return false;
  if (session.expiresAt < now) {
    removeSession(sessionId);
    return false;
  }

  // Verificar idle timeout (30 min sem actividade)
  const lastActivity = session.lastActivity || session.createdAt;
  if (now - lastActivity > IDLE_TIMEOUT) {
    removeSession(sessionId);
    return false;
  }

  // Actualizar lastActivity (touch)
  session.lastActivity = now;
  writeSessions(sessions);

  return true;
}

/**
 * Remove uma sessão (logout). Aceita cookie assinado ou id puro.
 */
export function removeSession(cookieValue: string): void {
  let sessionId = cookieValue;
  if (cookieValue.includes(".")) {
    const verified = verifySessionCookie(cookieValue);
    if (verified) sessionId = verified;
  }
  const sessions = readSessions().filter((s) => s.id !== sessionId);
  writeSessions(sessions);
}
