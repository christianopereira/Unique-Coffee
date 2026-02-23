import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getSiteData } from "@/lib/get-site-data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getPageSeo } from "@/lib/get-page-seo";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return getPageSeo("/produtos", {
    title: "Nossos Produtos",
    description:
      "Cafés de especialidade e acessórios seleccionados pela Unique Coffee. Grãos de origem única e equipamento premium para preparação manual.",
  });
}

export default function ProdutosPage() {
  const { produtos } = getSiteData();
  if (!produtos) return null;

  return (
    <>
      <div className="pt-24" />
      <section className="section-padding bg-espresso">
        <div className="section-container">
          <SectionTitle
            title={produtos.title}
            subtitle={produtos.subtitle}
            light
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {produtos.items.map((item, i) => (
              <ScrollReveal key={item.slug} delay={i * 0.06}>
                <Link href={`/produtos/${item.slug}`} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-lg shadow-xl shadow-black/30 border border-warm-white/10">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-600 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/10 transition-colors duration-400" />
                  </div>
                  <h3 className="mt-3 font-sans text-sm uppercase tracking-[0.1em] text-warm-white font-medium text-center group-hover:text-copper transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-1 font-body text-xs text-warm-white/60 text-center leading-relaxed">
                    {item.description}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
