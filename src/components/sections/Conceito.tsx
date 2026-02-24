import { getSiteData } from "@/lib/get-site-data";
import { getSectionBgStyle } from "@/lib/section-bg";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Conceito() {
  const { conceito } = getSiteData();
  const bg = getSectionBgStyle("conceito", "bg-cream");

  return (
    <section id="conceito" className={`section-padding relative ${bg.className} ${bg.isLight ? "" : "text-warm-white"}`} style={bg.style}>
      {bg.overlay}
      <div className="section-container max-w-4xl relative z-10">
        <SectionTitle title={conceito.title} light={!bg.isLight} style={bg.textStyles.title} subtitleStyle={bg.textStyles.subtitle} />

        <div className="space-y-6">
          {conceito.paragraphs.map((paragraph, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <p className={`text-base md:text-lg font-body leading-relaxed text-center ${bg.isLight ? "text-roast" : "text-warm-white/85"}`} style={bg.textStyles.body}>
                {paragraph}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
