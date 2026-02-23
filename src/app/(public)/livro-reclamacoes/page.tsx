import type { Metadata } from "next";
import { getSiteData } from "@/lib/get-site-data";
import { LegalPage } from "@/components/sections/LegalPage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  const data = getSiteData();
  return {
    title: data.livroReclamacoes?.title || "Livro de Reclamacoes",
    description: "Acesso ao livro de reclamacoes electronico da Unique Coffee.",
  };
}

export default function LivroReclamacoesPage() {
  const data = getSiteData();
  const livro = data.livroReclamacoes;

  if (!livro) {
    return (
      <>
        <div className="pt-24" />
        <section className="section-padding bg-cream">
          <div className="section-container max-w-3xl text-center text-mocha">
            Conteudo em preparacao.
          </div>
        </section>
      </>
    );
  }

  return <LegalPage data={livro} />;
}
