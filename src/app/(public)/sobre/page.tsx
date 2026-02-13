import type { Metadata } from "next";
import { SobreNos } from "@/components/sections/SobreNos";
import { MissaoVisaoValores } from "@/components/sections/MissaoVisaoValores";
import { checkPageVisible } from "@/lib/page-visibility";
import { getPageSeo } from "@/lib/get-page-seo";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return getPageSeo("/sobre", {
    title: "Sobre Nós",
    description:
      "Conheça a história da Unique Coffee, a nossa missão, visão e valores. Um espaço de acolhimento em Caldas da Rainha.",
  });
}

export default function SobrePage() {
  checkPageVisible("/sobre");
  return (
    <>
      <div className="pt-24" />
      <SobreNos />
      <MissaoVisaoValores />
    </>
  );
}
