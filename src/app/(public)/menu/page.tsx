import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getSiteData } from "@/lib/get-site-data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MenuCtaButton } from "@/components/ui/MenuCtaButton";
import { PageHero } from "@/components/sections/PageHero";
import { checkPageVisible } from "@/lib/page-visibility";
import { getPageSeo } from "@/lib/get-page-seo";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return getPageSeo("/menu", {
    title: "Menu",
    description:
      "Descubra o menu da Unique Coffee: tostas, doces, especialidades e cafés de qualidade.",
  });
}

export default function MenuPage() {
  checkPageVisible("/menu");
  const { menu } = getSiteData();

  return (
    <>
      <PageHero pageKey="menu" fallbackTitle="Menu" />
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          <SectionTitle title={menu.title} />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {menu.categories.map((cat, i) => (
              <ScrollReveal key={cat.slug} delay={i * 0.1}>
                <Link href={`/menu/${cat.slug}`} className="group block">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-600 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/10 transition-colors duration-400" />
                  </div>
                  <p className="mt-4 font-sans text-sm uppercase tracking-[0.12em] text-espresso text-center font-medium group-hover:text-copper transition-colors">
                    {cat.name}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <p className="mt-10 text-center font-body italic text-mocha text-lg">
              {menu.subtitle}
            </p>
          </ScrollReveal>

          {menu.ctaText && menu.ctaLink && (
            <ScrollReveal delay={0.5}>
              <div className="mt-8 text-center">
                <MenuCtaButton text={menu.ctaText} link={menu.ctaLink} />
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </>
  );
}
