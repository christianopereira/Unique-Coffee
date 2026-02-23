import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacidade e Termos",
  description: "Politica de privacidade e termos de utilizacao do site Unique Coffee.",
};

export default function PrivacidadePage() {
  return (
    <>
      <div className="pt-24" />
      <section className="section-padding bg-cream">
        <div className="section-container max-w-3xl">
          <h1 className="text-section font-display text-espresso mb-8">
            Privacidade e Termos de Utiliza&ccedil;&atilde;o
          </h1>

          <div className="prose-legal space-y-8 font-body text-roast text-sm leading-relaxed">
            <div>
              <h2 className="font-display text-lg text-espresso mb-3">1. Responsavel pelo Tratamento</h2>
              <p>
                O responsavel pelo tratamento dos dados pessoais recolhidos neste website e a <strong>Unique Coffee</strong>,
                com sede na R. Vitorino Frois 12A, 2500-256 Caldas da Rainha, Portugal.
              </p>
              <p className="mt-2">
                Contacto: <a href="mailto:hello@uniquecoffee.pt" className="text-copper hover:underline">hello@uniquecoffee.pt</a>
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg text-espresso mb-3">2. Dados Pessoais Recolhidos</h2>
              <p>
                Este website pode recolher os seguintes dados pessoais:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Dados de navegacao (cookies, endereco IP, tipo de browser)</li>
                <li>Dados fornecidos voluntariamente pelo utilizador (nome, email, telefone) em formularios de contacto</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-lg text-espresso mb-3">3. Finalidade do Tratamento</h2>
              <p>Os dados recolhidos sao utilizados para:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Responder a pedidos de informacao e contacto</li>
                <li>Melhorar a experiencia de navegacao no site</li>
                <li>Fins estatisticos e analiticos (de forma anonimizada)</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-lg text-espresso mb-3">4. Partilha de Dados</h2>
              <p>
                Os dados pessoais nao serao partilhados com terceiros, excepto quando necessario para
                cumprimento de obrigacoes legais ou com o consentimento explicito do utilizador.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg text-espresso mb-3">5. Direitos do Titular</h2>
              <p>
                Nos termos do Regulamento Geral sobre a Protecao de Dados (RGPD), o utilizador tem direito a:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Aceder aos seus dados pessoais</li>
                <li>Solicitar a retificacao ou eliminacao dos dados</li>
                <li>Opor-se ao tratamento dos dados</li>
                <li>Solicitar a portabilidade dos dados</li>
              </ul>
              <p className="mt-2">
                Para exercer estes direitos, contacte-nos em{" "}
                <a href="mailto:hello@uniquecoffee.pt" className="text-copper hover:underline">hello@uniquecoffee.pt</a>.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg text-espresso mb-3">6. Cookies</h2>
              <p>
                Este website utiliza cookies. Para mais informacoes, consulte a nossa{" "}
                <Link href="/cookies" className="text-copper hover:underline">Politica de Cookies</Link>.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg text-espresso mb-3">7. Termos de Utilizacao</h2>
              <p>
                O conteudo deste website e propriedade da Unique Coffee e esta protegido por direitos de
                autor. A reproducao total ou parcial do conteudo sem autorizacao previa e proibida.
              </p>
              <p className="mt-2">
                A Unique Coffee reserva-se o direito de alterar esta politica a qualquer momento,
                sendo as alteracoes publicadas nesta pagina.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg text-espresso mb-3">8. Legislacao Aplicavel</h2>
              <p>
                Esta politica rege-se pela legislacao portuguesa e europeia, nomeadamente o
                Regulamento (UE) 2016/679 (RGPD) e a Lei n.&ordm; 58/2019 de 8 de agosto.
              </p>
            </div>

            <p className="text-xs text-mocha pt-4 border-t border-linen">
              Ultima atualizacao: Fevereiro de 2026
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
