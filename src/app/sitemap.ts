import type { MetadataRoute } from "next";
import { getSiteData } from "@/lib/get-site-data";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://uniquecoffee.pt";
  const siteData = getSiteData();
  const hidden = siteData.hiddenPages || [];
  const now = new Date().toISOString();

  // Páginas estáticas (apenas as visíveis)
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
  ];

  const pages: Array<{ route: string; priority: number }> = [
    { route: "/sobre", priority: 0.8 },
    { route: "/conceito", priority: 0.7 },
    { route: "/graos", priority: 0.7 },
    { route: "/menu", priority: 0.9 },
    { route: "/sobremesas", priority: 0.7 },
    { route: "/equipa", priority: 0.5 },
    { route: "/galeria", priority: 0.6 },
    { route: "/contacto", priority: 0.8 },
  ];

  for (const page of pages) {
    if (!hidden.includes(page.route)) {
      staticPages.push({
        url: `${baseUrl}${page.route}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: page.priority,
      });
    }
  }

  // Páginas dinâmicas de menu
  if (!hidden.includes("/menu")) {
    for (const cat of siteData.menu.categories) {
      staticPages.push({
        url: `${baseUrl}/menu/${cat.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  // Páginas dinâmicas de sobremesas
  if (!hidden.includes("/sobremesas")) {
    for (const item of siteData.sobremesas.items) {
      staticPages.push({
        url: `${baseUrl}/sobremesas/${item.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return staticPages;
}
