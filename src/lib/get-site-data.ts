/**
 * Camada de acesso a dados do site.
 *
 * Lê o conteúdo de data/site-data.json (editável via admin).
 * Se o ficheiro não existir, retorna os dados estáticos originais como fallback.
 * Cache em memória de 60 segundos para evitar leituras excessivas do disco.
 */

import fs from "fs";
import path from "path";
import type { SiteData } from "@/types/site-data";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_PATH = path.join(DATA_DIR, "site-data.json");

let cachedData: SiteData | null = null;
let cacheTime = 0;
const CACHE_TTL = 60_000; // 60 segundos

/**
 * Retorna os dados do site. Lê de data/site-data.json se existir,
 * senão usa os dados estáticos de src/content/site-data.ts.
 */
export function getSiteData(): SiteData {
  const now = Date.now();

  if (cachedData && now - cacheTime < CACHE_TTL) {
    return cachedData;
  }

  try {
    if (fs.existsSync(DATA_PATH)) {
      const raw = fs.readFileSync(DATA_PATH, "utf-8");
      cachedData = JSON.parse(raw) as SiteData;
      cacheTime = now;
      return cachedData;
    }
  } catch (err) {
    console.error("[getSiteData] Erro ao ler data/site-data.json:", err);
  }

  // Fallback: dados estáticos originais
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { siteData } = require("@/content/site-data");
  cachedData = siteData as unknown as SiteData;
  cacheTime = now;
  return cachedData;
}

/**
 * Invalida o cache, forçando a próxima leitura a ir ao disco.
 */
export function invalidateSiteDataCache(): void {
  cachedData = null;
  cacheTime = 0;
}

/**
 * Garante que a pasta data/ existe.
 */
export function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * Guarda os dados do site no ficheiro JSON.
 */
export function saveSiteData(data: SiteData): void {
  ensureDataDir();
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
  invalidateSiteDataCache();
}

/**
 * Actualiza uma secção específica do siteData.
 */
export function updateSiteDataSection(
  section: keyof SiteData,
  value: SiteData[keyof SiteData]
): SiteData {
  const current = getSiteData();
  const updated = { ...current, [section]: value };
  saveSiteData(updated);
  return updated;
}
