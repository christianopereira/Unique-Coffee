import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { SobreNos } from "@/components/sections/SobreNos";
import { MissaoVisaoValores } from "@/components/sections/MissaoVisaoValores";
import { Conceito } from "@/components/sections/Conceito";
import { Diferencial } from "@/components/sections/Diferencial";
import { Graos } from "@/components/sections/Graos";
import { Menu } from "@/components/sections/Menu";
import { Sobremesas } from "@/components/sections/Sobremesas";
import { Equipa } from "@/components/sections/Equipa";
import { Galeria } from "@/components/sections/Galeria";
import { VisiteNos } from "@/components/sections/VisiteNos";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SobreNos />
        <MissaoVisaoValores />
        <Conceito />
        <Diferencial />
        <Graos />
        <Menu />
        <Sobremesas />
        <Equipa />
        <Galeria />
        <VisiteNos />
      </main>
      <Footer />
    </>
  );
}
