import { siteData } from "@/content/site-data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Conceito() {
  const { conceito } = siteData;

  return (
    <section id="conceito" className="section-padding bg-cream">
      <div className="section-container max-w-4xl">
        <SectionTitle title={conceito.title} />

        <div className="space-y-6">
          {conceito.paragraphs.map((paragraph, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <p className="text-base md:text-lg font-body text-roast leading-relaxed text-center">
                {paragraph}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
