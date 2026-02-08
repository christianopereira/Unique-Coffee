import Image from "next/image";
import { siteData } from "@/content/site-data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Graos() {
  const { graos } = siteData;

  return (
    <section id="graos" className="section-padding bg-espresso text-warm-white">
      <div className="section-container">
        <SectionTitle title={graos.title} light />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-8">
          <div className="space-y-5">
            {graos.paragraphs.map((paragraph, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <p className="text-base md:text-lg font-body text-warm-white/85 leading-relaxed">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="right">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={graos.image}
                alt="Grãos de café de especialidade seleccionados"
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
