import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSiteData } from "@/lib/get-site-data";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: { slug: string };
}

function getItem(slug: string) {
  const { produtos } = getSiteData();
  if (!produtos) return undefined;
  return produtos.items.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  const { produtos } = getSiteData();
  if (!produtos) return [];
  return produtos.items.map((item) => ({ slug: item.slug }));
}

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: PageProps): Metadata {
  const item = getItem(params.slug);
  if (!item) return {};

  return {
    title: item.name,
    description: item.description,
  };
}

export default function ProdutoDetailPage({ params }: PageProps) {
  const item = getItem(params.slug);
  if (!item) notFound();

  return (
    <>
      <div className="pt-24" />

      <section className="section-padding bg-espresso">
        <div className="section-container max-w-5xl">
          <ScrollReveal>
            <Link
              href="/produtos"
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-warm-white/60 hover:text-copper transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              Voltar aos produtos
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Imagem */}
            <ScrollReveal>
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-2xl shadow-black/40 border border-warm-white/10">
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
                <h1 className="text-section font-display text-warm-white mb-6">
                  {item.name}
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-lg font-body text-warm-white/85 leading-relaxed mb-8">
                  {item.description}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="border-l-2 border-copper/30 pl-6 mb-8">
                  <p className="font-body font-semibold text-warm-white italic">
                    Qualidade seleccionada com cuidado.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <Button
                  href="/contacto"
                  variant="primary"
                >
                  Visite-nos para adquirir
                </Button>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
