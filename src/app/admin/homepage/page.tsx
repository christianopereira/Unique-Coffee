"use client";

import { SectionHeader } from "@/components/admin/fields";
import { SectionBgEditor } from "@/components/admin/SectionBgEditor";
import { SectionEffectsEditor } from "@/components/admin/SectionEffectsEditor";

const HOME_SECTIONS = [
  { key: "home_sobreNos",    title: "Sobre Nós",            hint: "Teaser da secção Sobre Nós na homepage" },
  { key: "home_conceito",    title: "Conceito",             hint: "Teaser da secção Conceito na homepage" },
  { key: "home_graos",       title: "Grãos",                hint: "Teaser da secção Grãos na homepage" },
  { key: "home_produtos",    title: "Nossos Produtos",      hint: "Teaser da secção Produtos na homepage" },
  { key: "home_menu",        title: "Menu",                 hint: "Teaser da secção Menu na homepage" },
  { key: "home_sobremesas",  title: "Sobremesas",           hint: "Teaser da secção Sobremesas na homepage" },
  { key: "home_galeria",     title: "Galeria",              hint: "Teaser da secção Galeria na homepage" },
  { key: "home_reviews",     title: "Reviews",              hint: "Teaser da secção Reviews na homepage" },
  { key: "home_visiteNos",   title: "Visite-nos",           hint: "Teaser da secção Visite-nos na homepage" },
];

export default function AdminHomepagePage() {
  return (
    <>
      <SectionHeader
        title="Homepage — Estilo das Secções"
        description="Personalize o fundo, padding, cores e tipografia de cada secção da homepage. Independente das páginas individuais."
      />
      <div className="mb-6 p-4 rounded-xl bg-parchment/60 border border-linen">
        <p className="text-sm font-sans text-mocha">
          As alterações aqui só afectam a <strong>homepage (/)</strong>. Para estilizar uma secção na sua página própria (ex: /sobre), use o painel dessa página.
        </p>
      </div>

      {HOME_SECTIONS.map(({ key, title, hint }) => (
        <div key={key} className="mb-2">
          <p className="text-xs text-mocha/60 font-sans mb-1 px-1">{hint}</p>
          <SectionBgEditor sectionKey={key} sectionTitle={title} />
          <SectionEffectsEditor sectionKey={key} sectionTitle={title} />
        </div>
      ))}
    </>
  );
}
