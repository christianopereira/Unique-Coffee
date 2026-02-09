/**
 * Caminho centralizado para a pasta de dados persistente.
 *
 * Em produção (Hostinger), usa /home/<user>/unique-coffee-data/
 * que fica FORA do public_html e não é apagada nos deploys.
 *
 * Em desenvolvimento local, usa data/ na raiz do projecto.
 */

import fs from "fs";
import path from "path";
import os from "os";

function resolveDataDir(): string {
  // Se existe variável de ambiente explícita, usar essa
  if (process.env.DATA_DIR) {
    return process.env.DATA_DIR;
  }

  // Em produção (Linux/Hostinger): usar pasta no home do utilizador
  if (process.env.NODE_ENV === "production" && os.platform() === "linux") {
    return path.join(os.homedir(), "unique-coffee-data");
  }

  // Desenvolvimento local: pasta data/ na raiz do projecto
  return path.join(process.cwd(), "data");
}

export const DATA_DIR = resolveDataDir();
export const UPLOADS_DIR = path.join(DATA_DIR, "uploads");
export const DATA_PATH = path.join(DATA_DIR, "site-data.json");
export const SESSIONS_PATH = path.join(DATA_DIR, "sessions.json");

/**
 * Garante que DATA_DIR e UPLOADS_DIR existem.
 */
export function ensureDataDirs(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}
