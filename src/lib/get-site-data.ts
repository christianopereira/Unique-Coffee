/**
 * Camada de acesso a dados do site.
 *
 * Lê o conteúdo de data/site-data.json (editável via admin).
 * Se o ficheiro não existir, retorna os dados estáticos originais como fallback.
 * Cache em memória baseado no mtime do ficheiro — funciona entre múltiplos workers.
 */

import fs from "fs";
import type { SiteData } from "@/types/site-data";
import { DATA_PATH, ensureDataDirs } from "@/lib/data-dir";

let cachedData: SiteData | null = null;
let cachedMtime = 0;

/**
 * Retorna os dados do site. Lê de data/site-data.json se existir,
 * senão usa os dados estáticos de src/content/site-data.ts.
 * Usa o mtime do ficheiro para invalidar o cache automaticamente
 * (funciona correctamente mesmo com múltiplos workers Node.js).
 */
export function getSiteData(): SiteData {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { siteData: staticData } = require("@/content/site-data");

  try {
    if (fs.existsSync(DATA_PATH)) {
      const mtime = fs.statSync(DATA_PATH).mtimeMs;

      // Cache válido: ficheiro não foi modificado desde a última leitura
      if (cachedData && mtime === cachedMtime) {
        return cachedData;
      }

      const raw = fs.readFileSync(DATA_PATH, "utf-8");
      const jsonData = JSON.parse(raw) as SiteData;
      // Merge: secções que faltam no JSON são preenchidas pelo fallback estático
      cachedData = { ...(staticData as unknown as SiteData), ...jsonData };
      cachedMtime = mtime;
      return cachedData;
    }
  } catch (err) {
    console.error("[getSiteData] Erro ao ler data/site-data.json:", err);
  }

  // Fallback: dados estáticos originais
  cachedData = staticData as unknown as SiteData;
  cachedMtime = 0;
  return cachedData;
}

/**
 * Invalida o cache, forçando a próxima leitura a ir ao disco.
 */
export function invalidateSiteDataCache(): void {
  cachedData = null;
  cachedMtime = 0;
}

/**
 * Guarda os dados do site no ficheiro JSON.
 */
export function saveSiteData(data: SiteData): void {
  ensureDataDirs();
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
