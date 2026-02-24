import type { Metadata } from "next";
import { Equipa } from "@/components/sections/Equipa";
import { PageHero } from "@/components/sections/PageHero";
import { checkPageVisible } from "@/lib/page-visibility";
import { getPageSeo } from "@/lib/get-page-seo";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return getPageSeo("/equipa", {
    title: "Nossa Equipa",
    description:
      "Conheça a equipa da Unique Coffee. Pessoas dedicadas que fazem de cada visita uma experiência especial.",
  });
}

export default function EquipaPage() {
  checkPageVisible("/equipa");
  return (
    <>
      <PageHero pageKey="equipa" fallbackTitle="Nossa Equipa" />
      <Equipa />
    </>
  );
}
