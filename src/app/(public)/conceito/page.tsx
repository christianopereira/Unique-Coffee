import type { Metadata } from "next";
import { Conceito } from "@/components/sections/Conceito";
import { Diferencial } from "@/components/sections/Diferencial";
import { checkPageVisible } from "@/lib/page-visibility";
import { getPageSeo } from "@/lib/get-page-seo";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return getPageSeo("/conceito", {
    title: "Conceito & Diferencial",
    description:
      "Descubra o conceito e o diferencial da Unique Coffee. Um espaço onde cada detalhe é pensado para proporcionar uma experiência única.",
  });
}

export default function ConceitoPage() {
  checkPageVisible("/conceito");
  return (
    <>
      <div className="pt-24" />
      <Conceito />
      <Diferencial />
    </>
  );
}
