import Image from "next/image";
import { getSiteData } from "@/lib/get-site-data";
import { getSectionBgStyle } from "@/lib/section-bg";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Graos() {
  const { graos } = getSiteData();
  const bg = getSectionBgStyle("graos", "bg-espresso");

  return (
    <section id="graos" className={`section-padding relative ${bg.className} ${bg.isLight ? "" : "text-warm-white"}`} style={bg.style}>
      {bg.overlay}
      <div className="section-container relative z-10">
        <SectionTitle title={graos.title} light={!bg.isLight} style={bg.textStyles.title} subtitleStyle={bg.textStyles.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-8">
          <div className="space-y-5">
            {graos.paragraphs.map((paragraph, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <p className={`text-base md:text-lg font-body leading-relaxed ${bg.isLight ? "text-roast/85" : "text-warm-white/85"}`} style={bg.textStyles.body}>
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
