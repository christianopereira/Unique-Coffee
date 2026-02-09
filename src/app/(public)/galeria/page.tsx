import type { Metadata } from "next";
import { Galeria } from "@/components/sections/Galeria";

export const metadata: Metadata = {
  title: "Galeria",
  description:
    "Explore a galeria da Unique Coffee. Luz natural, linhas cuidadas e detalhes que compõem um espaço onde tudo tem propósito.",
};

export default function GaleriaPage() {
  return (
    <>
      <div className="pt-24" />
      <Galeria />
    </>
  );
}
