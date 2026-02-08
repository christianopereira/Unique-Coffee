import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteData } from "@/content/site-data";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: { slug: string };
}

function getItem(slug: string) {
  return siteData.sobremesas.items.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return siteData.sobremesas.items.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const item = getItem(params.slug);
  if (!item) return {};

  return {
    title: item.name,
    description: item.description,
  };
}

export default function SobremesaDetailPage({ params }: PageProps) {
  const item = getItem(params.slug);
  if (!item) notFound();

  return (
    <>
      <div className="pt-24" />

      <section className="section-padding bg-cream">
        <div className="section-container max-w-5xl">
          <ScrollReveal>
            <Link
              href="/sobremesas"
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-mocha hover:text-copper transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              Voltar às sobremesas
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Imagem */}
            <ScrollReveal>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>

            {/* Texto */}
            <div>
              <ScrollReveal delay={0.1}>
                <h1 className="text-section font-display text-espresso mb-6">
                  {item.name}
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-lg font-body text-roast leading-relaxed mb-8">
                  {item.description}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="border-l-2 border-copper/30 pl-6 mb-8">
                  <p className="font-body font-semibold text-espresso italic">
                    Aqui, cada detalhe conta.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <Button href="/contacto" variant="primary">
                  Visite-nos para provar
                </Button>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
