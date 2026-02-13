import type { Metadata } from "next";
import { Galeria } from "@/components/sections/Galeria";
import { getSiteData } from "@/lib/get-site-data";
import { checkPageVisible } from "@/lib/page-visibility";
import { getPageSeo } from "@/lib/get-page-seo";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return getPageSeo("/galeria", {
    title: "Galeria",
    description:
      "Explore a galeria da Unique Coffee. Luz natural, linhas cuidadas e detalhes que compõem um espaço onde tudo tem propósito.",
  });
}

export default function GaleriaPage() {
  checkPageVisible("/galeria");
  const { galeria } = getSiteData();

  return (
    <>
      <div className="pt-24" />
      <Galeria galeria={galeria} />
    </>
  );
}
