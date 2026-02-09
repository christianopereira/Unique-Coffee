/**
 * Autenticação do painel admin.
 *
 * Usa crypto.scrypt (Node.js built-in) para hash de passwords.
 * Sessões guardadas em data/sessions.json com expiração de 7 dias.
 */

import crypto from "crypto";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const SESSIONS_PATH = path.join(DATA_DIR, "sessions.json");
const SESSION_TTL = 7 * 24 * 60 * 60 * 1000; // 7 dias

interface Session {
  id: string;
  createdAt: number;
  expiresAt: number;
}

// ---------------------------------------------------------------------------
// Password hashing
// ---------------------------------------------------------------------------

function hashPasswordSync(password: string, salt: string): string {
  return new Promise<string>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derived) => {
      if (err) reject(err);
      resolve(derived.toString("hex"));
    });
  }) as unknown as string;
}

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

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

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
  ensureDataDir();
  fs.writeFileSync(SESSIONS_PATH, JSON.stringify(sessions, null, 2), "utf-8");
}

/**
 * Cria uma nova sessão e retorna o ID (token para o cookie).
 */
export function createSession(): string {
  const id = crypto.randomUUID();
  const now = Date.now();
  const session: Session = {
    id,
    createdAt: now,
    expiresAt: now + SESSION_TTL,
  };

  // Limpar sessões expiradas e adicionar a nova
  const sessions = readSessions().filter((s) => s.expiresAt > now);
  sessions.push(session);
  writeSessions(sessions);

  return id;
}

/**
 * Valida se um token de sessão é válido (existe e não expirou).
 */
export function validateSession(sessionId: string): boolean {
  if (!sessionId) return false;

  const sessions = readSessions();
  const session = sessions.find((s) => s.id === sessionId);

  if (!session) return false;
  if (session.expiresAt < Date.now()) {
    // Limpar sessão expirada
    removeSession(sessionId);
    return false;
  }

  return true;
}

/**
 * Remove uma sessão (logout).
 */
export function removeSession(sessionId: string): void {
  const sessions = readSessions().filter((s) => s.id !== sessionId);
  writeSessions(sessions);
}
