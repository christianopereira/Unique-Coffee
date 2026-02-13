import { getSiteData } from "@/lib/get-site-data";
import { notFound } from "next/navigation";

/**
 * Verifica se uma página está visível. Se estiver em hiddenPages, retorna 404.
 * Usar em server components de páginas públicas.
 */
export function checkPageVisible(route: string): void {
  const data = getSiteData();
  const hidden = data.hiddenPages || [];
  if (hidden.includes(route)) {
    notFound();
  }
}

/**
 * Verifica se uma rota está oculta (sem chamar notFound).
 * Útil para filtrar teasers na homepage.
 */
export function isPageHidden(route: string): boolean {
  const data = getSiteData();
  const hidden = data.hiddenPages || [];
  return hidden.includes(route);
}
