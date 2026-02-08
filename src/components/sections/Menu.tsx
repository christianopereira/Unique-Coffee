import Image from "next/image";
import { siteData } from "@/content/site-data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Menu() {
  const { menu } = siteData;

  return (
    <section id="menu" className="section-padding bg-warm-white">
      <div className="section-container">
        <SectionTitle title={menu.title} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {menu.categories.map((cat, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="group">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-600 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/10 transition-colors duration-400" />
                </div>
                <p className="mt-4 font-sans text-sm uppercase tracking-[0.12em] text-espresso text-center font-medium">
                  {cat.name}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <p className="mt-10 text-center font-body italic text-mocha text-lg">
            {menu.subtitle}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
