"use client";

import { usePathname } from "next/navigation";
import type { PageHeroConfig } from "@/types/site-data";

interface PageBackgroundProps {
  children: React.ReactNode;
  pageHeroes?: Record<string, PageHeroConfig>;
}

export function PageBackground({ children, pageHeroes }: PageBackgroundProps) {
  const pathname = usePathname();
  const pageKey = pathname.replace(/^\//, "").split("/")[0] || "";
  const pageBg = pageHeroes?.[pageKey]?.pageBg;

  return (
    <main style={pageBg ? { backgroundColor: pageBg } : undefined}>
      {children}
    </main>
  );
}
