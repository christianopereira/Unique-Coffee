import Image from "next/image";
import { getSiteData } from "@/lib/get-site-data";
import { getSectionBgStyle } from "@/lib/section-bg";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Sobremesas() {
  const { sobremesas } = getSiteData();
  const bg = getSectionBgStyle("sobremesas", "bg-cream");

  return (
    <section id="sobremesas" className={`section-padding relative ${bg.className}`} style={bg.style}>
      {bg.overlay}
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images grid */}
          <ScrollReveal>
            <div className="grid grid-cols-2 gap-3">
              {sobremesas.items.map((item, i) => (
                <div key={i} className="group relative aspect-square overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-600 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Text */}
          <div>
            <SectionTitle title={sobremesas.title} align="left" style={bg.textStyles.title} subtitleStyle={bg.textStyles.subtitle} />
            <div className="space-y-5">
              {sobremesas.paragraphs.map((paragraph, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <p className="text-base md:text-lg font-body text-roast leading-relaxed" style={bg.textStyles.body}>
                    {paragraph}
                  </p>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.3}>
              <div className="mt-8 border-l-2 border-copper/30 pl-6 space-y-2">
                {sobremesas.highlights.map((line, i) => (
                  <p key={i} className="font-body font-semibold text-espresso" style={bg.textStyles.body}>
                    {line}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
