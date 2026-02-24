"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { ProdutosData } from "@/types/site-data";

interface NossosProdutosProps {
  produtos: ProdutosData;
}

export function NossosProdutos({ produtos }: NossosProdutosProps) {
  return (
    <section className="section-padding bg-espresso">
      <div className="section-container">
        <SectionTitle title={produtos.title} subtitle={produtos.subtitle} light />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {produtos.items.map((item, i) => (
            <ScrollReveal key={item.slug} delay={i * 0.06}>
              <div className="group">
                <div className="bg-warm-white/10 p-2 rounded-lg shadow-xl shadow-black/30 group-hover:bg-warm-white/15 transition-colors duration-400">
                  <div className="relative aspect-square overflow-hidden rounded">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-600 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/10 transition-colors duration-400" />
                  </div>
                </div>
                <h3 className="mt-3 font-sans text-sm uppercase tracking-[0.1em] text-warm-white font-medium text-center">
                  {item.name}
                </h3>
                <p className="mt-1 font-body text-xs text-warm-white/60 text-center leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
