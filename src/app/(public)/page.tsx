import type { Metadata } from "next";
import type { ReactNode } from "react";
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
import type { SiteData, SectionAnimation, AnimationType, AnimationSpeed } from "@/types/site-data";

export const dynamic = "force-dynamic";

const DEFAULT_HOMEPAGE_ORDER = [
  "sobreNos",
  "conceito",
  "graos",
  "produtos",
  "menu",
  "sobremesas",
  "galeria",
  "reviews",
  "visiteNos",
];

export function generateMetadata(): Metadata {
  return getPageSeo("/", {
    title: "Unique Coffee — Cafeteria Premium em Caldas da Rainha",
    description:
      "Café de especialidade, ambiente sofisticado e tranquilo em Caldas da Rainha. Um espaço pensado para quem valoriza a pausa, o sabor e os pequenos detalhes.",
  });
}

/** Helper to get animation props for a section */
function getAnim(siteData: SiteData, key: string): { animationType?: AnimationType; speed?: AnimationSpeed } {
  const anim = siteData.sectionAnimations?.[key];
  if (!anim) return {};
  return { animationType: anim.type, speed: anim.speed };
}

export default function Home() {
  const siteData = getSiteData();
  const hidden = siteData.hiddenPages || [];
  const show = (route: string) => !hidden.includes(route);
  const order = siteData.homepageOrder || DEFAULT_HOMEPAGE_ORDER;

  // Section renderers
  const renderers: Record<string, () => ReactNode> = {
    sobreNos: () => {
      if (!show("/sobre")) return null;
      const bg = getSectionBgStyle("home_sobreNos", "bg-warm-white");
      const a = getAnim(siteData, "sobreNos");
      return (
        <section key="sobreNos" className={`section-padding relative ${bg.className} ${bg.isLight ? "" : "text-warm-white"}`} style={bg.style}>
          {bg.overlay}
          <div className="section-container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <SectionTitle title={siteData.sobreNos.title} align="left" light={!bg.isLight} style={bg.textStyles.title} subtitleStyle={bg.textStyles.subtitle} />
                <ScrollReveal {...a}>
                  <p className={`text-base md:text-lg font-body leading-relaxed ${bg.isLight ? "text-roast" : "text-warm-white/85"}`} style={bg.textStyles.body}>
                    {siteData.sobreNos.paragraphs[0]}
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.2} {...a}>
                  <div className="mt-6">
                    <Button href={siteData.sobreNos.ctaLink || "/sobre"} variant={siteData.sobreNos.ctaVariant || "primary"} ctaBg={siteData.sobreNos.ctaBg} ctaTextColor={siteData.sobreNos.ctaTextColor}>
                      {siteData.sobreNos.ctaText || "Conheça Nossa História"}
                    </Button>
                  </div>
                </ScrollReveal>
              </div>
              <ScrollReveal direction="right" {...a}>
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
        </section>
      );
    },

    conceito: () => {
      if (!show("/conceito")) return null;
      const bg = getSectionBgStyle("home_conceito", "bg-cream");
      const a = getAnim(siteData, "conceito");
      const hasBgImg = !!siteData.conceito.backgroundImage;
      return (
        <section
          key="conceito"
          className={`section-padding relative bg-cover bg-center bg-fixed ${!hasBgImg ? bg.className : ""}`}
          style={hasBgImg
            ? { backgroundImage: `url(${siteData.conceito.backgroundImage})`, ...bg.style }
            : bg.style}
        >
          {hasBgImg && (
            <div className="absolute inset-0 bg-espresso/65" />
          )}
          {bg.overlay}
          <div className={`section-container max-w-4xl relative z-10 ${!hasBgImg && !bg.style?.backgroundColor ? 'bg-cream' : ''}`}>
            <SectionTitle title={siteData.conceito.title} light={hasBgImg || !bg.isLight} style={bg.textStyles.title} subtitleStyle={bg.textStyles.subtitle} />
            <ScrollReveal {...a}>
              <p className={`text-base md:text-lg font-body leading-relaxed text-center ${hasBgImg || !bg.isLight ? 'text-warm-white/90' : 'text-roast'}`} style={bg.textStyles.body}>
                {siteData.conceito.paragraphs[0]}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2} {...a}>
              <div className="mt-8 text-center">
                <Button href={siteData.conceito.ctaLink || "/conceito"} variant={siteData.conceito.ctaVariant || "primary"} ctaBg={siteData.conceito.ctaBg} ctaTextColor={siteData.conceito.ctaTextColor}>
                  {siteData.conceito.ctaText || "Descubra o Nosso Conceito"}
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      );
    },

    graos: () => {
      if (!show("/graos")) return null;
      const bg = getSectionBgStyle("home_graos", "bg-espresso");
      const a = getAnim(siteData, "graos");
      return (
        <section key="graos" className={`section-padding relative ${bg.className} ${bg.isLight ? "" : "text-warm-white"}`} style={bg.style}>
          {bg.overlay}
          <div className="section-container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <SectionTitle title={siteData.graos.title} align="left" light={!bg.isLight} style={bg.textStyles.title} subtitleStyle={bg.textStyles.subtitle} />
                <ScrollReveal {...a}>
                  <p className={`text-base md:text-lg font-body leading-relaxed ${bg.isLight ? "text-roast/85" : "text-warm-white/85"}`} style={bg.textStyles.body}>
                    {siteData.graos.paragraphs[0]}
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.2} {...a}>
                  <div className="mt-6">
                    <Button
                      href={siteData.graos.ctaLink || "/graos"}
                      variant={siteData.graos.ctaVariant || "primary"}
                      ctaBg={siteData.graos.ctaBg}
                      ctaTextColor={siteData.graos.ctaTextColor}
                    >
                      {siteData.graos.ctaText || "Saiba Mais Sobre os Nossos Grãos"}
                    </Button>
                  </div>
                </ScrollReveal>
              </div>
              <ScrollReveal direction="right" {...a}>
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
        </section>
      );
    },

    produtos: () => {
      if (!siteData.produtos || siteData.produtos.items.length === 0) return null;
      const bg = getSectionBgData("home_produtos", "bg-espresso");
      return <NossosProdutos key="produtos" produtos={siteData.produtos} sectionBg={bg} />;
    },

    menu: () => {
      if (!show("/menu")) return null;
      const bg = getSectionBgStyle("home_menu", "bg-warm-white");
      const a = getAnim(siteData, "menu");
      return (
        <section key="menu" className={`section-padding relative ${bg.className} ${bg.isLight ? "" : "text-warm-white"}`} style={bg.style}>
          {bg.overlay}
          <div className="section-container relative z-10">
            <SectionTitle title={siteData.menu.title} light={!bg.isLight} style={bg.textStyles.title} subtitleStyle={bg.textStyles.subtitle} />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {siteData.menu.categories.map((cat, i) => (
                <ScrollReveal key={cat.slug} delay={i * 0.1} {...a}>
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
                    <p className={`mt-4 font-sans text-sm uppercase tracking-[0.12em] text-center font-medium group-hover:text-copper transition-colors ${bg.isLight ? "text-espresso" : "text-warm-white"}`} style={bg.textStyles.body}>
                      {cat.name}
                    </p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={0.4} {...a}>
              <div className="mt-10 text-center">
                <Button href={siteData.menu.ctaLink || "/menu"} variant={siteData.menu.ctaVariant || "ghost"} ctaBg={siteData.menu.ctaBg} ctaTextColor={siteData.menu.ctaTextColor}>
                  {siteData.menu.ctaText || "Ver Menu Completo"}
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      );
    },

    sobremesas: () => {
      if (!show("/sobremesas")) return null;
      const bg = getSectionBgStyle("home_sobremesas", "bg-cream");
      const a = getAnim(siteData, "sobremesas");
      return (
        <section key="sobremesas" className={`section-padding relative overflow-hidden ${bg.className} ${bg.isLight ? "" : "text-warm-white"}`} style={bg.style}>
          {bg.overlay}
          <div className="section-container relative z-10">
            <SectionTitle title={siteData.sobremesas.title} light={!bg.isLight} style={bg.textStyles.title} subtitleStyle={bg.textStyles.subtitle} />
          </div>
          <SobremesasCarousel items={siteData.sobremesas.items} />
          <div className="section-container">
            <ScrollReveal delay={0.2} {...a}>
              <div className="mt-10 text-center">
                <Button href={siteData.sobremesas.ctaLink || "/sobremesas"} variant={siteData.sobremesas.ctaVariant || "ghost"} ctaBg={siteData.sobremesas.ctaBg} ctaTextColor={siteData.sobremesas.ctaTextColor}>
                  {siteData.sobremesas.ctaText || "Conheça Nossas Sobremesas"}
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      );
    },

    galeria: () => {
      if (!show("/galeria")) return null;
      const bg = getSectionBgStyle("home_galeria", "bg-parchment");
      const a = getAnim(siteData, "galeria");
      return (
        <section key="galeria" className={`section-padding relative ${bg.className} ${bg.isLight ? "" : "text-warm-white"}`} style={bg.style}>
          {bg.overlay}
          <div className="section-container relative z-10">
            <SectionTitle title="Galeria" light={!bg.isLight} style={bg.textStyles.title} subtitleStyle={bg.textStyles.subtitle} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {siteData.galeria.images.slice(0, 6).map((img, i) => (
                <ScrollReveal key={i} delay={i * 0.08} {...a}>
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
            <ScrollReveal delay={0.3} {...a}>
              <div className="mt-10 text-center">
                <Button href={siteData.galeria.ctaLink || "/galeria"} variant={siteData.galeria.ctaVariant || "ghost"} ctaBg={siteData.galeria.ctaBg} ctaTextColor={siteData.galeria.ctaTextColor}>
                  {siteData.galeria.ctaText || "Ver galeria completa"}
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      );
    },

    reviews: () => {
      const reviews = siteData.reviews;
      if (!reviews || reviews.enabled === false) return null;
      const activeReviews = reviews.mode === "google" && reviews.cachedGoogleReviews?.length
        ? reviews.cachedGoogleReviews
        : reviews.manualReviews;
      if (!activeReviews || activeReviews.length === 0) return null;
      const reviewsBg = getSectionBgData("home_reviews", "bg-warm-white");
      return <ReviewsCarousel key="reviews" title={reviews.title} reviews={activeReviews} sectionBg={reviewsBg} />;
    },

    visiteNos: () => {
      if (!show("/contacto")) return null;
      const bg = getSectionBgStyle("home_visiteNos", "bg-espresso");
      const a = getAnim(siteData, "visiteNos");
      return (
        <section key="visiteNos" className={`section-padding relative ${bg.className} ${bg.isLight ? "" : "text-warm-white"}`} style={bg.style}>
          {bg.overlay}
          <div className="section-container text-center max-w-3xl mx-auto relative z-10">
            <ScrollReveal {...a}>
              <h2 className={`text-section font-display mb-4 ${bg.isLight ? "text-espresso" : "text-warm-white"}`} style={bg.textStyles.title}>
                {siteData.visiteNos.title}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1} {...a}>
              <p className={`font-display text-xl md:text-2xl mb-4 ${bg.isLight ? "text-mocha" : "text-warm-white"}`} style={bg.textStyles.subtitle}>
                {siteData.visiteNos.intro}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2} {...a}>
              <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 font-body text-sm ${bg.isLight ? "text-roast/80" : "text-warm-white/80"}`} style={bg.textStyles.body}>
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
            <ScrollReveal delay={0.3} {...a}>
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
        </section>
      );
    },
  };

  return (
    <>
      <Hero hero={siteData.hero} />
      {order.map((key) => renderers[key]?.())}
    </>
  );
}
