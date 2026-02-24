import { getSiteData } from "@/lib/get-site-data";
import { getSectionBgStyle } from "@/lib/section-bg";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Diferencial() {
  const { diferencial } = getSiteData();
  const bg = getSectionBgStyle("diferencial", "bg-parchment");

  return (
    <section id="diferencial" className={`section-padding relative ${bg.className} ${bg.isLight ? "" : "text-warm-white"}`} style={bg.style}>
      {bg.overlay}
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Title side */}
          <div>
            <SectionTitle title={diferencial.title} align="left" light={!bg.isLight} style={bg.textStyles.title} subtitleStyle={bg.textStyles.subtitle} />
            <ScrollReveal>
              <p className="text-lg md:text-xl font-body italic text-copper leading-relaxed" style={bg.textStyles.subtitle}>
                {diferencial.intro}
              </p>
            </ScrollReveal>

            {/* Closing statements */}
            <ScrollReveal delay={0.3}>
              <div className="mt-10 border-l-2 border-copper/30 pl-6 space-y-2">
                {diferencial.closing.map((line, i) => (
                  <p key={i} className={`font-body font-semibold ${bg.isLight ? "text-espresso" : "text-warm-white"}`} style={bg.textStyles.body}>
                    {line}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Text side */}
          <div className="space-y-5">
            {diferencial.paragraphs.map((paragraph, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <p className={`text-base md:text-lg font-body leading-relaxed ${bg.isLight ? "text-roast" : "text-warm-white/85"}`} style={bg.textStyles.body}>
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
