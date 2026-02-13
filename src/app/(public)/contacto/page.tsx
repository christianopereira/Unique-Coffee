import type { Metadata } from "next";
import { VisiteNos } from "@/components/sections/VisiteNos";
import { checkPageVisible } from "@/lib/page-visibility";
import { getPageSeo } from "@/lib/get-page-seo";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return getPageSeo("/contacto", {
    title: "Contacto",
    description:
      "Visite a Unique Coffee em Caldas da Rainha. Morada, horários, contactos e como chegar.",
  });
}

export default function ContactoPage() {
  checkPageVisible("/contacto");
  return (
    <>
      <div className="pt-24" />
      <VisiteNos />
    </>
  );
}
