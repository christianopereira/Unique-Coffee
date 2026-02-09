import type { Metadata } from "next";
import { SobreNos } from "@/components/sections/SobreNos";
import { MissaoVisaoValores } from "@/components/sections/MissaoVisaoValores";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
    "Conheça a história da Unique Coffee, a nossa missão, visão e valores. Um espaço de acolhimento em Caldas da Rainha.",
};

export default function SobrePage() {
  return (
    <>
      <div className="pt-24" />
      <SobreNos />
      <MissaoVisaoValores />
    </>
  );
}
