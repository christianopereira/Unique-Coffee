import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { getSiteData } from "@/lib/get-site-data";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { MapPin, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default function Home() {
  const siteData = getSiteData();
  const hidden = siteData.hiddenPages || [];
  const show = (route: string) => !hidden.includes(route);

  return (
    <>
      <Hero hero={siteData.hero} />

      {/* Sobre — Teaser */}
      {show("/sobre") && <section className="section-padding bg-warm-white">
        <div className="section-container">
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
                  <Button href={siteData.sobreNos.ctaLink || "/sobre"} variant="ghost">
                    {siteData.sobreNos.ctaText || "Conheça Nossa História"}
                  </Button>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="right">
              <div className="relative aspect-[4/5] overflow-hidden">
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
      {show("/conceito") && <section className="section-padding bg-cream">
        <div className="section-container max-w-4xl">
          <SectionTitle title={siteData.conceito.title} />
          <ScrollReveal>
            <p className="text-base md:text-lg font-body text-roast leading-relaxed text-center">
              {siteData.conceito.paragraphs[0]}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-8 text-center">
              <Button href={siteData.conceito.ctaLink || "/conceito"} variant="ghost">
                {siteData.conceito.ctaText || "Descubra o Nosso Conceito"}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>}

      {/* Grãos — Teaser */}
      {show("/graos") && <section className="section-padding bg-espresso text-warm-white">
        <div className="section-container">
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
                    variant="ghost"
                    className="text-copper after:bg-copper"
                  >
                    {siteData.graos.ctaText || "Saiba Mais Sobre os Nossos Grãos"}
                  </Button>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="right">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={siteData.graos.image}
                  alt="Grãos de café seleccionados"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>}

      {/* Menu — Preview */}
      {show("/menu") && <section className="section-padding bg-warm-white">
        <div className="section-container">
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
              <Button href={siteData.menu.ctaLink || "/menu"} variant="ghost">
                {siteData.menu.ctaText || "Ver Menu Completo"}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>}

      {/* Sobremesas — Preview */}
      {show("/sobremesas") && <section className="section-padding bg-cream">
        <div className="section-container">
          <SectionTitle title={siteData.sobremesas.title} />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            {siteData.sobremesas.items.map((item, i) => (
              <ScrollReveal key={item.slug} delay={i * 0.1}>
                <Link href={`/sobremesas/${item.slug}`} className="group block">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-600 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/10 transition-colors duration-400" />
                  </div>
                  <p className="mt-4 font-sans text-sm uppercase tracking-[0.12em] text-espresso text-center font-medium group-hover:text-copper transition-colors">
                    {item.name}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="mt-10 text-center">
              <Button href={siteData.sobremesas.ctaLink || "/sobremesas"} variant="ghost">
                {siteData.sobremesas.ctaText || "Conheça Nossas Sobremesas"}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>}

      {/* Galeria — Preview */}
      {show("/galeria") && <section className="section-padding bg-parchment">
        <div className="section-container">
          <SectionTitle title="Galeria" />

          <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
            {siteData.galeria.images.slice(0, 3).map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="33vw"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 text-center">
              <Button href="/galeria" variant="ghost">
                Ver galeria completa
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
      {show("/contacto") && <section className="section-padding bg-espresso text-warm-white">
        <div className="section-container text-center max-w-3xl mx-auto">
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
                variant="secondary"
                className="border-copper/60 text-copper hover:bg-copper hover:text-warm-white"
              >
                Como chegar
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>}
    </>
  );
}
