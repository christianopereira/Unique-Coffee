/**
 * Rate limiter in-memory para proteger endpoints contra brute-force.
 * Sem dependências externas — usa Map com limpeza automática.
 */

interface RateLimitEntry {
  count: number;
  firstAttempt: number;
  blockedUntil: number;
}

const store = new Map<string, RateLimitEntry>();

// Limpar entradas expiradas a cada 5 minutos
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  store.forEach((entry, key) => {
    if (entry.blockedUntil < now && now - entry.firstAttempt > CLEANUP_INTERVAL) {
      store.delete(key);
    }
  });
}

interface RateLimitConfig {
  maxAttempts: number;    // Tentativas permitidas na janela
  windowMs: number;       // Janela de tempo (ms)
  blockDurationMs: number; // Duração do bloqueio após exceder o limite
}

interface RateLimitResult {
  allowed: boolean;
  remainingAttempts: number;
  retryAfterMs: number;
}

export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): RateLimitResult {
  cleanup();

  const now = Date.now();
  const entry = store.get(key);

  // Se está bloqueado, verificar se o bloqueio expirou
  if (entry && entry.blockedUntil > now) {
    return {
      allowed: false,
      remainingAttempts: 0,
      retryAfterMs: entry.blockedUntil - now,
    };
  }

  // Se não tem entrada ou a janela expirou, criar nova
  if (!entry || now - entry.firstAttempt > config.windowMs) {
    store.set(key, { count: 1, firstAttempt: now, blockedUntil: 0 });
    return {
      allowed: true,
      remainingAttempts: config.maxAttempts - 1,
      retryAfterMs: 0,
    };
  }

  // Incrementar contagem
  entry.count++;

  // Se excedeu o limite, bloquear
  if (entry.count > config.maxAttempts) {
    entry.blockedUntil = now + config.blockDurationMs;
    store.set(key, entry);
    return {
      allowed: false,
      remainingAttempts: 0,
      retryAfterMs: config.blockDurationMs,
    };
  }

  store.set(key, entry);
  return {
    allowed: true,
    remainingAttempts: config.maxAttempts - entry.count,
    retryAfterMs: 0,
  };
}

/**
 * Configuração para o login: 5 tentativas em 15 minutos, bloqueio de 15 minutos.
 */
export const LOGIN_RATE_LIMIT: RateLimitConfig = {
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000,
  blockDurationMs: 15 * 60 * 1000,
};
