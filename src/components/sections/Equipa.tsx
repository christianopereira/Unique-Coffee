import Image from "next/image";
import { User } from "lucide-react";
import { getSiteData } from "@/lib/get-site-data";
import { getSectionBgStyle } from "@/lib/section-bg";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Equipa() {
  const { equipa } = getSiteData();
  const bg = getSectionBgStyle("equipa", "bg-parchment");

  return (
    <section id="equipa" className={`section-padding relative ${bg.className}`} style={bg.style}>
      {bg.overlay}
      <div className="section-container relative z-10">
        <SectionTitle title={equipa.title} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {equipa.members.map((member, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="text-center">
                {/* Photo placeholder */}
                <div className="relative aspect-[3/4] overflow-hidden bg-linen/50 mb-4 flex items-center justify-center">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
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
