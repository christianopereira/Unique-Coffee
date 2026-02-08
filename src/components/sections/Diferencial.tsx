import { siteData } from "@/content/site-data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Diferencial() {
  const { diferencial } = siteData;

  return (
    <section id="diferencial" className="section-padding bg-parchment">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Title side */}
          <div>
            <SectionTitle title={diferencial.title} align="left" />
            <ScrollReveal>
              <p className="text-lg md:text-xl font-body italic text-copper leading-relaxed">
                {diferencial.intro}
              </p>
            </ScrollReveal>

            {/* Closing statements */}
            <ScrollReveal delay={0.3}>
              <div className="mt-10 border-l-2 border-copper/30 pl-6 space-y-2">
                {diferencial.closing.map((line, i) => (
                  <p key={i} className="font-body font-semibold text-espresso">
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
                <p className="text-base md:text-lg font-body text-roast leading-relaxed">
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
