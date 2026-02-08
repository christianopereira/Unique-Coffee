import { User } from "lucide-react";
import { siteData } from "@/content/site-data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Equipa() {
  const { equipa } = siteData;

  return (
    <section id="equipa" className="section-padding bg-parchment">
      <div className="section-container">
        <SectionTitle title={equipa.title} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {equipa.members.map((member, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="text-center">
                {/* Photo placeholder */}
                <div className="relative aspect-[3/4] overflow-hidden bg-linen/50 mb-4 flex items-center justify-center">
                  {member.hasPhoto ? (
                    /* When real photos are added, replace with next/image */
                    <div className="w-full h-full bg-gradient-to-b from-stone/20 to-stone/40 flex items-center justify-center">
                      <User size={48} className="text-mocha/40" strokeWidth={1} />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-stone/10 to-stone/30 flex items-center justify-center">
                      <User size={48} className="text-mocha/30" strokeWidth={1} />
                    </div>
                  )}
                </div>

                <h3 className="font-display text-lg text-espresso">
                  {member.name}
                </h3>
                <p className="font-sans text-xs uppercase tracking-[0.1em] text-mocha mt-1">
                  {member.role}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
