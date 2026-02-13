import type { Metadata } from "next";
import { getSiteData } from "./get-site-data";

/**
 * Returns Metadata for a public page, using admin SEO overrides if available.
 */
export function getPageSeo(
  route: string,
  defaults: { title: string; description: string },
): Metadata {
  const siteData = getSiteData();
  const pageSeo = siteData.seo?.pages?.[route];

  return {
    title: pageSeo?.title || defaults.title,
    description: pageSeo?.description || defaults.description,
  };
}
