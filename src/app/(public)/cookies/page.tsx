import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politica de Cookies",
  description: "Politica de cookies do site Unique Coffee.",
};

export default function CookiesPage() {
  return (
    <>
      <div className="pt-24" />
      <section className="section-padding bg-cream">
        <div className="section-container max-w-3xl">
          <h1 className="text-section font-display text-espresso mb-8">
            Pol&iacute;tica de Cookies
          </h1>

          <div className="space-y-8 font-body text-roast text-sm leading-relaxed">
            <div>
              <h2 className="font-display text-lg text-espresso mb-3">O que sao Cookies?</h2>
              <p>
                Cookies sao pequenos ficheiros de texto armazenados no seu dispositivo quando visita
                um website. Sao amplamente utilizados para garantir o funcionamento correto dos sites,
                melhorar a experiencia do utilizador e fornecer informacoes aos proprietarios do site.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg text-espresso mb-3">Cookies que Utilizamos</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse mt-3">
                  <thead>
                    <tr className="border-b border-linen">
                      <th className="py-2 pr-4 font-sans text-xs font-semibold text-espresso uppercase tracking-wide">Tipo</th>
                      <th className="py-2 pr-4 font-sans text-xs font-semibold text-espresso uppercase tracking-wide">Finalidade</th>
                      <th className="py-2 font-sans text-xs font-semibold text-espresso uppercase tracking-wide">Duracao</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-linen/50">
                      <td className="py-3 pr-4 font-medium">Essenciais</td>
                      <td className="py-3 pr-4">Necessarios para o funcionamento basico do site (sessao, preferencias de cookies)</td>
                      <td className="py-3">Sessao / 1 ano</td>
                    </tr>
                    <tr className="border-b border-linen/50">
                      <td className="py-3 pr-4 font-medium">Analiticos</td>
                      <td className="py-3 pr-4">Ajudam-nos a compreender como os visitantes interagem com o site (Google Analytics)</td>
                      <td className="py-3">Ate 2 anos</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="font-display text-lg text-espresso mb-3">Gestao de Cookies</h2>
              <p>
                Pode gerir as suas preferencias de cookies a qualquer momento. A maioria dos browsers
                permite-lhe recusar ou eliminar cookies. Note que a desativacao de cookies pode afetar
                a funcionalidade de algumas partes do site.
              </p>
              <p className="mt-2">
                Para alterar as definicoes de cookies no seu browser:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Chrome:</strong> Definicoes &gt; Privacidade e seguranca &gt; Cookies</li>
                <li><strong>Firefox:</strong> Definicoes &gt; Privacidade e Seguranca &gt; Cookies</li>
                <li><strong>Safari:</strong> Preferencias &gt; Privacidade &gt; Cookies</li>
                <li><strong>Edge:</strong> Definicoes &gt; Privacidade &gt; Cookies</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-lg text-espresso mb-3">Consentimento</h2>
              <p>
                Ao continuar a navegar neste website apos a apresentacao do aviso de cookies,
                esta a consentir a utilizacao de cookies de acordo com esta politica.
              </p>
              <p className="mt-2">
                Pode retirar o seu consentimento a qualquer momento limpando os cookies do seu browser.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg text-espresso mb-3">Mais Informacoes</h2>
              <p>
                Para questoes sobre a nossa politica de cookies, consulte a nossa{" "}
                <Link href="/privacidade" className="text-copper hover:underline">
                  Politica de Privacidade
                </Link>{" "}
                ou contacte-nos em{" "}
                <a href="mailto:hello@uniquecoffee.pt" className="text-copper hover:underline">
                  hello@uniquecoffee.pt
                </a>.
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
