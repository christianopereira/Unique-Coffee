import type { Metadata } from "next";
import { Equipa } from "@/components/sections/Equipa";
import { checkPageVisible } from "@/lib/page-visibility";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nossa Equipa",
  description:
    "Conheça a equipa da Unique Coffee. Pessoas dedicadas que fazem de cada visita uma experiência especial.",
};

export default function EquipaPage() {
  checkPageVisible("/equipa");
  return (
    <>
      <div className="pt-24" />
      <Equipa />
    </>
  );
}
