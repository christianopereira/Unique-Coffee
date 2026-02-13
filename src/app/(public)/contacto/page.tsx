import type { Metadata } from "next";
import { VisiteNos } from "@/components/sections/VisiteNos";
import { checkPageVisible } from "@/lib/page-visibility";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Visite a Unique Coffee em Caldas da Rainha. Morada, horários, contactos e como chegar.",
};

export default function ContactoPage() {
  checkPageVisible("/contacto");
  return (
    <>
      <div className="pt-24" />
      <VisiteNos />
    </>
  );
}
