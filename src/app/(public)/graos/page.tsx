import type { Metadata } from "next";
import { Graos } from "@/components/sections/Graos";
import { PageHero } from "@/components/sections/PageHero";
import { checkPageVisible } from "@/lib/page-visibility";
import { getPageSeo } from "@/lib/get-page-seo";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return getPageSeo("/graos", {
    title: "Grãos Seleccionados",
    description:
      "Na Unique Coffee, a qualidade começa na origem. Cada grão é escolhido com critério, respeito e atenção aos detalhes.",
  });
}

export default function GraosPage() {
  checkPageVisible("/graos");
  return (
    <>
      <PageHero pageKey="graos" fallbackTitle="Grãos Seleccionados" />
      <Graos />
    </>
  );
}
