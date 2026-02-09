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

function getCategory(slug: string) {
  return siteData.menu.categories.find((cat) => cat.slug === slug);
}

export function generateStaticParams() {
  return siteData.menu.categories.map((cat) => ({ slug: cat.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const category = getCategory(params.slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
  };
}

export default function MenuDetailPage({ params }: PageProps) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  return (
    <>
      <div className="pt-24" />

      {/* Hero do item */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-espresso/50" />
        <div className="relative z-10 text-center">
          <ScrollReveal>
            <h1 className="text-hero font-display text-warm-white">
              {category.name}
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="section-padding bg-warm-white">
        <div className="section-container max-w-4xl">
          <ScrollReveal>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-mocha hover:text-copper transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              Voltar ao menu
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-lg md:text-xl font-body text-roast leading-relaxed mb-12">
              {category.description}
            </p>
          </ScrollReveal>

          {/* Lista de itens */}
          <div className="space-y-6">
            {category.items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex items-start gap-4 p-6 bg-parchment/50 border border-linen">
                  <div className="w-2 h-2 rounded-full bg-copper mt-2 shrink-0" />
                  <div>
                    <h3 className="font-display text-lg text-espresso">
                      {item.name}
                    </h3>
                    <p className="font-body text-mocha mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-12 text-center">
              <Button href="/contacto" variant="primary">
                Visite-nos
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
