import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Livro de Reclamacoes",
  description: "Acesso ao livro de reclamacoes electronico da Unique Coffee.",
};

export default function LivroReclamacoesPage() {
  return (
    <>
      <div className="pt-24" />
      <section className="section-padding bg-cream">
        <div className="section-container max-w-3xl">
          <h1 className="text-section font-display text-espresso mb-8">
            Livro de Reclama&ccedil;&otilde;es
          </h1>

          <div className="space-y-8 font-body text-roast text-sm leading-relaxed">
            <p>
              Em conformidade com o Decreto-Lei n.&ordm; 156/2005 e legislacao subsequente,
              disponibilizamos o acesso ao Livro de Reclamacoes Eletronico.
            </p>

            <div className="bg-warm-white rounded-xl border border-linen p-8 text-center space-y-6">
              <div>
                <h2 className="font-display text-lg text-espresso mb-2">
                  Livro de Reclama&ccedil;&otilde;es Eletr&oacute;nico
                </h2>
                <p className="text-mocha">
                  Pode apresentar a sua reclamacao atraves do portal oficial do Governo de Portugal.
                </p>
              </div>

              <a
                href="https://www.livroreclamacoes.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-copper text-warm-white rounded-lg font-sans font-medium text-sm hover:bg-copper/90 transition-colors"
              >
                Aceder ao Livro de Reclamacoes
                <ExternalLink size={16} />
              </a>

              <p className="text-xs text-mocha">
                Sera redirecionado para o portal oficial{" "}
                <span className="font-medium">www.livroreclamacoes.pt</span>
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg text-espresso mb-3">Contacto Directo</h2>
              <p>
                Antes de recorrer ao livro de reclamacoes, pode contactar-nos directamente.
                Valorizamos o seu feedback e faremos o possivel para resolver qualquer situacao.
              </p>
              <ul className="mt-3 space-y-1">
                <li><strong>Email:</strong>{" "}
                  <a href="mailto:hello@uniquecoffee.pt" className="text-copper hover:underline">
                    hello@uniquecoffee.pt
                  </a>
                </li>
                <li><strong>Telefone:</strong>{" "}
                  <a href="tel:+351925903132" className="text-copper hover:underline">
                    925 903 132
                  </a>
                </li>
                <li><strong>Morada:</strong> R. Vitorino Frois 12A, 2500-256 Caldas da Rainha</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-lg text-espresso mb-3">Entidade Reguladora</h2>
              <p>
                A Unique Coffee esta sujeita a fiscalizacao da ASAE &mdash; Autoridade de Seguranca
                Alimentar e Economica.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
