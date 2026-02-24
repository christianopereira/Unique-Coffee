import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { NossosProdutos } from "@/components/sections/NossosProdutos";
import { SobremesasCarousel } from "@/components/sections/SobremesasCarousel";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { getSiteData } from "@/lib/get-site-data";
import { getSectionBgStyle, getSectionBgData } from "@/lib/section-bg";
import { getPageSeo } from "@/lib/get-page-seo";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { MapPin, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return getPageSeo("/", {
    title: "Unique Coffee — Cafeteria Premium em Caldas da Rainha",
    description:
      "Café de especialidade, ambiente sofisticado e tranquilo em Caldas da Rainha. Um espaço pensado para quem valoriza a pausa, o sabor e os pequenos detalhes.",
  });
}

export default function Home() {
  const siteData = getSiteData();
  const hidden = siteData.hiddenPages || [];
  const show = (route: string) => !hidden.includes(route);

  // Section backgrounds (shared with full section components)
  const sobreBg = getSectionBgStyle("sobreNos", "bg-warm-white");
  const graosBg = getSectionBgStyle("graos", "bg-espresso");
  const menuBg = getSectionBgStyle("menu", "bg-warm-white");
  const sobremesasBg = getSectionBgStyle("sobremesas", "bg-cream");
  const galeriaBg = getSectionBgStyle("galeria", "bg-parchment");
  const visiteNosBg = getSectionBgStyle("visiteNos", "bg-espresso");
  const produtosBg = getSectionBgData("produtos", "bg-espresso");

  return (
    <>
      <Hero hero={siteData.hero} />

      {/* Sobre — Teaser */}
      {show("/sobre") && <section className={`section-padding relative ${sobreBg.className}`} style={sobreBg.style}>
        {sobreBg.overlay}
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionTitle title={siteData.sobreNos.title} align="left" />
              <ScrollReveal>
                <p className="text-base md:text-lg font-body text-roast leading-relaxed">
                  {siteData.sobreNos.paragraphs[0]}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="mt-6">
                  <Button href={siteData.sobreNos.ctaLink || "/sobre"} variant={siteData.sobreNos.ctaVariant || "primary"}>
                    {siteData.sobreNos.ctaText || "Conheça Nossa História"}
                  </Button>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="right">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-2xl">
                <Image
                  src={siteData.sobreNos.image}
                  alt="A história da Unique Coffee"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>}

      {/* Conceito — Teaser */}
      {show("/conceito") && <section
        className="section-padding relative bg-cover bg-center bg-fixed"
        style={siteData.conceito.backgroundImage
          ? { backgroundImage: `url(${siteData.conceito.backgroundImage})` }
          : undefined}
      >
        {siteData.conceito.backgroundImage && (
          <div className="absolute inset-0 bg-espresso/65" />
        )}
        <div className={`section-container max-w-4xl relative z-10 ${!siteData.conceito.backgroundImage ? 'bg-cream' : ''}`}>
          <SectionTitle title={siteData.conceito.title} light={!!siteData.conceito.backgroundImage} />
          <ScrollReveal>
            <p className={`text-base md:text-lg font-body leading-relaxed text-center ${siteData.conceito.backgroundImage ? 'text-warm-white/90' : 'text-roast'}`}>
              {siteData.conceito.paragraphs[0]}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-8 text-center">
              <Button href={siteData.conceito.ctaLink || "/conceito"} variant={siteData.conceito.ctaVariant || "primary"}>
                {siteData.conceito.ctaText || "Descubra o Nosso Conceito"}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>}

      {/* Grãos — Teaser */}
      {show("/graos") && <section className={`section-padding relative ${graosBg.className} ${graosBg.isLight ? "" : "text-warm-white"}`} style={graosBg.style}>
        {graosBg.overlay}
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionTitle title={siteData.graos.title} align="left" light />
              <ScrollReveal>
                <p className="text-base md:text-lg font-body text-warm-white/85 leading-relaxed">
                  {siteData.graos.paragraphs[0]}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="mt-6">
                  <Button
                    href={siteData.graos.ctaLink || "/graos"}
                    variant={siteData.graos.ctaVariant || "primary"}
                  >
                    {siteData.graos.ctaText || "Saiba Mais Sobre os Nossos Grãos"}
                  </Button>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="right">
              <div className="bg-roast/80 p-3 md:p-4 rounded-lg shadow-2xl shadow-black/50">
                <div className="relative aspect-[4/3] overflow-hidden rounded">
                  <Image
                    src={siteData.graos.image}
                    alt="Grãos de café seleccionados"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>}

      {/* Nossos Produtos */}
      {siteData.produtos && siteData.produtos.items.length > 0 && (
        <NossosProdutos produtos={siteData.produtos} sectionBg={produtosBg} />
      )}

      {/* Menu — Preview */}
      {show("/menu") && <section className={`section-padding relative ${menuBg.className}`} style={menuBg.style}>
        {menuBg.overlay}
        <div className="section-container relative z-10">
          <SectionTitle title={siteData.menu.title} />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {siteData.menu.categories.map((cat, i) => (
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
            <div className="mt-10 text-center">
              <Button href={siteData.menu.ctaLink || "/menu"} variant={siteData.menu.ctaVariant || "ghost"}>
                {siteData.menu.ctaText || "Ver Menu Completo"}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>}

      {/* Sobremesas — Carousel */}
      {show("/sobremesas") && <section className={`section-padding relative overflow-hidden ${sobremesasBg.className}`} style={sobremesasBg.style}>
        <div className="section-container">
          <SectionTitle title={siteData.sobremesas.title} />
        </div>
        <SobremesasCarousel items={siteData.sobremesas.items} />
        <div className="section-container">
          <ScrollReveal delay={0.2}>
            <div className="mt-10 text-center">
              <Button href={siteData.sobremesas.ctaLink || "/sobremesas"} variant={siteData.sobremesas.ctaVariant || "ghost"}>
                {siteData.sobremesas.ctaText || "Conheça Nossas Sobremesas"}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>}

      {/* Galeria — Preview */}
      {show("/galeria") && <section className={`section-padding relative ${galeriaBg.className}`} style={galeriaBg.style}>
        {galeriaBg.overlay}
        <div className="section-container relative z-10">
          <SectionTitle title="Galeria" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {siteData.galeria.images.slice(0, 6).map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="group relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-600 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-espresso/10 to-transparent pointer-events-none" />
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 text-center">
              <Button href={siteData.galeria.ctaLink || "/galeria"} variant={siteData.galeria.ctaVariant || "ghost"}>
                {siteData.galeria.ctaText || "Ver galeria completa"}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>}

      {/* Reviews Carousel */}
      {(() => {
        const reviews = siteData.reviews;
        if (!reviews) return null;
        const activeReviews = reviews.mode === "google" && reviews.cachedGoogleReviews?.length
          ? reviews.cachedGoogleReviews
          : reviews.manualReviews;
        if (!activeReviews || activeReviews.length === 0) return null;
        return <ReviewsCarousel title={reviews.title} reviews={activeReviews} />;
      })()}

      {/* CTA — Visite-nos */}
      {show("/contacto") && <section className={`section-padding relative ${visiteNosBg.className} ${visiteNosBg.isLight ? "" : "text-warm-white"}`} style={visiteNosBg.style}>
        {visiteNosBg.overlay}
        <div className="section-container text-center max-w-3xl mx-auto relative z-10">
          <ScrollReveal>
            <h2 className="text-section font-display text-warm-white mb-4">
              {siteData.visiteNos.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="font-display text-xl md:text-2xl text-warm-white mb-4">
              {siteData.visiteNos.intro}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-warm-white/80 font-body text-sm">
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} className="text-copper" />
                {siteData.visiteNos.address}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock size={16} className="text-copper" />
                {siteData.visiteNos.hours.weekdays}
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="mt-8">
              <Button
                href="/contacto"
                variant={siteData.visiteNos.ctaVariant || "secondary"}
                className="border-copper/60 text-copper hover:bg-copper hover:text-warm-white"
              >
                {siteData.visiteNos.mapCtaText || "Como chegar"}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>}
    </>
  );
}
