import type { Metadata } from "next";
import { Conceito } from "@/components/sections/Conceito";
import { Diferencial } from "@/components/sections/Diferencial";

export const metadata: Metadata = {
  title: "Conceito & Diferencial",
  description:
    "Descubra o conceito e o diferencial da Unique Coffee. Um espaço onde cada detalhe é pensado para proporcionar uma experiência única.",
};

export default function ConceitoPage() {
  return (
    <>
      <div className="pt-24" />
      <Conceito />
      <Diferencial />
    </>
  );
}
