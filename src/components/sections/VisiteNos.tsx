import { MapPin, Clock, Phone, Globe, PawPrint, Wifi, Coffee } from "lucide-react";
import { getSiteData } from "@/lib/get-site-data";
import { getSectionBgStyle } from "@/lib/section-bg";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

const badgeIcons: Record<string, typeof Coffee> = {
  "Pet Friendly": PawPrint,
  "Wi-Fi Gratuito": Wifi,
  "Café de Especialidade": Coffee,
};

export function VisiteNos() {
  const { visiteNos } = getSiteData();
  const bg = getSectionBgStyle("visiteNos", "bg-espresso");

  return (
    <section id="visite-nos" className={`section-padding relative ${bg.className} ${bg.isLight ? "" : "text-warm-white"}`} style={bg.style}>
      {bg.overlay}
      <div className="section-container relative z-10">
        <SectionTitle title={visiteNos.title} light={!bg.isLight} style={bg.textStyles.title} subtitleStyle={bg.textStyles.subtitle} />

        {/* Intro text */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className={`font-display text-2xl md:text-3xl mb-4 ${bg.isLight ? "text-mocha" : "text-warm-white"}`} style={bg.textStyles.subtitle}>
              {visiteNos.intro}
            </p>
            <p className={`font-body leading-relaxed ${bg.isLight ? "text-roast/80" : "text-warm-white/80"}`} style={bg.textStyles.body}>
              {visiteNos.description}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          {/* Info */}
          <div className="space-y-8">
            <ScrollReveal>
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-copper mt-1 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className={`font-sans text-xs uppercase tracking-widest mb-1 ${bg.isLight ? "text-mocha/50" : "text-warm-white/50"}`}>
                    Morada
                  </p>
                  <p className={`font-body ${bg.isLight ? "text-roast/90" : "text-warm-white/90"}`}>{visiteNos.address}</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="flex items-start gap-4">
                <Clock size={20} className="text-copper mt-1 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className={`font-sans text-xs uppercase tracking-widest mb-1 ${bg.isLight ? "text-mocha/50" : "text-warm-white/50"}`}>
                    Horários
                  </p>
                  <p className={`font-body ${bg.isLight ? "text-roast/90" : "text-warm-white/90"}`}>{visiteNos.hours.weekdays}</p>
                  <p className={`font-body ${bg.isLight ? "text-roast/90" : "text-warm-white/90"}`}>{visiteNos.hours.saturday}</p>
                  <p className={`font-body ${bg.isLight ? "text-roast/90" : "text-warm-white/90"}`}>{visiteNos.hours.sunday}</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex items-start gap-4">
                <Phone size={20} className="text-copper mt-1 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className={`font-sans text-xs uppercase tracking-widest mb-1 ${bg.isLight ? "text-mocha/50" : "text-warm-white/50"}`}>
                    Contacto
                  </p>
                  <p className={`font-body ${bg.isLight ? "text-roast/90" : "text-warm-white/90"}`}>{visiteNos.phone}</p>
                  <p className={`font-body ${bg.isLight ? "text-roast/90" : "text-warm-white/90"}`}>{visiteNos.email}</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="flex items-start gap-4">
                <Globe size={20} className="text-copper mt-1 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className={`font-sans text-xs uppercase tracking-widest mb-1 ${bg.isLight ? "text-mocha/50" : "text-warm-white/50"}`}>
                    Website
                  </p>
                  <p className={`font-body ${bg.isLight ? "text-roast/90" : "text-warm-white/90"}`}>{visiteNos.website}</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Badges */}
            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap gap-3 pt-4">
                {visiteNos.badges.map((badge) => {
                  const Icon = badgeIcons[badge] || Coffee;
                  return (
                    <span
                      key={badge}
                      className={`inline-flex items-center gap-2 px-4 py-2 border font-sans text-xs uppercase tracking-wider ${bg.isLight ? "border-espresso/15 text-roast/70" : "border-warm-white/15 text-warm-white/70"}`}
                    >
                      <Icon size={14} strokeWidth={1.5} />
                      {badge}
                    </span>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Map + CTA */}
          <div className="flex flex-col gap-8">
            <ScrollReveal direction="right">
              <div className="aspect-[4/3] bg-roast/50 border border-warm-white/10 overflow-hidden">
                {/* Google Maps embed — replace with real embed or static map */}
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3072!2d${visiteNos.mapCoordinates.lng}!3d${visiteNos.mapCoordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDI0JzEzLjAiTiA5wrAwOCcxMS44Ilc!5e0!3m2!1spt-PT!2spt!4v1700000000000`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da Unique Coffee"
                  className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-600"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="text-center">
                <p className={`font-body text-lg mb-6 ${bg.isLight ? "text-roast/90" : "text-warm-white/90"}`}>
                  {visiteNos.cta}
                </p>
                <Button
                  variant={visiteNos.mapCtaVariant || "secondary"}
                  href={`https://maps.google.com/?q=${encodeURIComponent(visiteNos.address)}`}
                  className="border-copper/60 text-copper hover:bg-copper hover:text-warm-white"
                >
                  {visiteNos.mapCtaText || "Como chegar"}
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
