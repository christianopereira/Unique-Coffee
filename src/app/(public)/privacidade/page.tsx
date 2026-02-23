import type { Metadata } from "next";
import { getSiteData } from "@/lib/get-site-data";
import { LegalPage } from "@/components/sections/LegalPage";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  const data = getSiteData();
  return {
    title: data.privacidade?.title || "Privacidade e Termos",
    description: "Politica de privacidade e termos de utilizacao do site Unique Coffee.",
  };
}

export default function PrivacidadePage() {
  const data = getSiteData();
  const privacidade = data.privacidade;

  if (!privacidade) {
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

  return <LegalPage data={privacidade} />;
}
