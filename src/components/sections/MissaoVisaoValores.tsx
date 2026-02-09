import { getSiteData } from "@/lib/get-site-data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Heart, Star, Fingerprint, Leaf } from "lucide-react";

const valorIcons = [Heart, Star, Fingerprint, Leaf];

export function MissaoVisaoValores() {
  const { missaoVisaoValores: mvv } = getSiteData();

  return (
    <section className="section-padding bg-espresso text-warm-white">
      <div className="section-container">
        {/* Missão & Visão */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16 md:mb-20">
          <ScrollReveal>
            <div className="border border-warm-white/10 p-8 md:p-10">
              <h3 className="font-display text-section text-warm-white mb-4">
                {mvv.missao.title}
              </h3>
              <p className="font-body text-warm-white/80 leading-relaxed">
                {mvv.missao.text}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="border border-warm-white/10 p-8 md:p-10">
              <h3 className="font-display text-section text-warm-white mb-4">
                {mvv.visao.title}
              </h3>
              <p className="font-body text-warm-white/80 leading-relaxed">
                {mvv.visao.text}
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Valores */}
        <ScrollReveal>
          <h3 className="font-display text-section text-center text-warm-white mb-12">
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
                  <h4 className="font-display text-lg text-warm-white mb-2">
                    {valor.name}
                  </h4>
                  <p className="font-body text-sm text-warm-white/70 leading-relaxed">
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
