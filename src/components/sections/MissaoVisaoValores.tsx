import { getSiteData } from "@/lib/get-site-data";
import { getSectionBgStyle } from "@/lib/section-bg";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Heart, Star, Fingerprint, Leaf } from "lucide-react";

const valorIcons = [Heart, Star, Fingerprint, Leaf];

export function MissaoVisaoValores() {
  const { missaoVisaoValores: mvv } = getSiteData();
  const bg = getSectionBgStyle("missaoVisaoValores", "bg-espresso");

  return (
    <section className={`section-padding relative ${bg.className} ${bg.isLight ? "" : "text-warm-white"}`} style={bg.style}>
      {bg.overlay}
      <div className="section-container relative z-10">
        {/* Missão & Visão */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16 md:mb-20">
          <ScrollReveal>
            <div className={`border p-8 md:p-10 ${bg.isLight ? "border-espresso/10" : "border-warm-white/10"}`}>
              <h3 className={`font-display text-section mb-4 ${bg.isLight ? "text-espresso" : "text-warm-white"}`} style={bg.textStyles.title}>
                {mvv.missao.title}
              </h3>
              <p className={`font-body leading-relaxed ${bg.isLight ? "text-roast/80" : "text-warm-white/80"}`} style={bg.textStyles.body}>
                {mvv.missao.text}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className={`border p-8 md:p-10 ${bg.isLight ? "border-espresso/10" : "border-warm-white/10"}`}>
              <h3 className={`font-display text-section mb-4 ${bg.isLight ? "text-espresso" : "text-warm-white"}`} style={bg.textStyles.title}>
                {mvv.visao.title}
              </h3>
              <p className={`font-body leading-relaxed ${bg.isLight ? "text-roast/80" : "text-warm-white/80"}`} style={bg.textStyles.body}>
                {mvv.visao.text}
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Valores */}
        <ScrollReveal>
          <h3 className={`font-display text-section text-center mb-12 ${bg.isLight ? "text-espresso" : "text-warm-white"}`} style={bg.textStyles.title}>
            {mvv.valores.title}
          </h3>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {mvv.valores.items.map((valor, i) => {
            const Icon = valorIcons[i];
            return (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <Icon
                    size={28}
                    className="text-copper mx-auto mb-4"
                    strokeWidth={1.5}
                  />
                  <h4 className={`font-display text-lg mb-2 ${bg.isLight ? "text-espresso" : "text-warm-white"}`} style={bg.textStyles.subtitle}>
                    {valor.name}
                  </h4>
                  <p className={`font-body text-sm leading-relaxed ${bg.isLight ? "text-roast/70" : "text-warm-white/70"}`} style={bg.textStyles.body}>
                    {valor.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
