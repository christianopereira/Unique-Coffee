import Image from "next/image";
import { siteData } from "@/content/site-data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function SobreNos() {
  const { sobreNos } = siteData;

  return (
    <section id="sobre" className="section-padding bg-warm-white">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <SectionTitle title={sobreNos.title} align="left" />
            <div className="space-y-5">
              {sobreNos.paragraphs.map((paragraph, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <p className="text-base md:text-lg font-body text-roast leading-relaxed">
                    {paragraph}
                  </p>
                </ScrollReveal>
              ))}
            </div>

            {/* Highlights — "Aqui, ..." */}
            <ScrollReveal delay={0.4}>
              <div className="mt-8 border-l-2 border-copper/30 pl-6 space-y-2">
                {sobreNos.highlights.map((line, i) => (
                  <p key={i} className="font-body font-semibold text-espresso italic">
                    {line}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="right">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={sobreNos.image}
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
}
