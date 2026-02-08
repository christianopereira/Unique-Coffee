import type { Metadata } from "next";
import { Graos } from "@/components/sections/Graos";

export const metadata: Metadata = {
  title: "Grãos Seleccionados",
  description:
    "Na Unique Coffee, a qualidade começa na origem. Cada grão é escolhido com critério, respeito e atenção aos detalhes.",
};

export default function GraosPage() {
  return (
    <>
      <div className="pt-24" />
      <Graos />
    </>
  );
}
