import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getSiteData } from "@/lib/get-site-data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PageHero } from "@/components/sections/PageHero";
import { checkPageVisible } from "@/lib/page-visibility";
import { getPageSeo } from "@/lib/get-page-seo";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return getPageSeo("/sobremesas", {
    title: "Sobremesas",
    description:
      "Descubra as sobremesas da Unique Coffee. Cada detalhe conta, cada doce é servido no tempo certo.",
  });
}

export default function SobremesasPage() {
  checkPageVisible("/sobremesas");
  const { sobremesas } = getSiteData();

  return (
    <>
      <PageHero pageKey="sobremesas" fallbackTitle="Sobremesas" />
      <section className="section-padding bg-cream">
        <div className="section-container">
          <SectionTitle title={sobremesas.title} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Images grid — clickable */}
            <ScrollReveal>
              <div className="grid grid-cols-2 gap-3">
                {sobremesas.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/sobremesas/${item.slug}`}
                    className="group relative aspect-square overflow-hidden block"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-600 group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/20 transition-colors duration-400 flex items-end">
                      <span className="w-full bg-espresso/60 text-warm-white text-center font-sans text-xs uppercase tracking-wider py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollReveal>

            {/* Text */}
            <div>
              <div className="space-y-5">
                {sobremesas.paragraphs.map((paragraph, i) => (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <p className="text-base md:text-lg font-body text-roast leading-relaxed">
                      {paragraph}
                    </p>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={0.3}>
                <div className="mt-8 border-l-2 border-copper/30 pl-6 space-y-2">
                  {sobremesas.highlights.map((line, i) => (
                    <p key={i} className="font-body font-semibold text-espresso">
                      {line}
                    </p>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
