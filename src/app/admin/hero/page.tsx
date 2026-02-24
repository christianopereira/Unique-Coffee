"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput, ImagePicker, SectionHeader } from "@/components/admin/fields";
import { AdminSubSections } from "@/components/admin/AdminSubSections";
import { Type, Image, Coffee, UtensilsCrossed, Cake, Users, Camera, MapPin } from "lucide-react";

const HOMEPAGE_SECTIONS = [
  { name: "Sobre Nós", description: "Texto de apresentação + highlights", href: "/admin/sobre", icon: Type },
  { name: "Conceito", description: "O conceito do espaço + imagem", href: "/admin/conceito", icon: Coffee },
  { name: "Grãos", description: "Grãos seleccionados + imagem", href: "/admin/graos", icon: Image },
  { name: "Menu", description: "Categorias + itens do menu", href: "/admin/menu", icon: UtensilsCrossed },
  { name: "Sobremesas", description: "Sobremesas + textos + destaques", href: "/admin/sobremesas", icon: Cake },
  { name: "Equipa", description: "Membros da equipa", href: "/admin/equipa", icon: Users },
  { name: "Galeria", description: "Fotos do espaço", href: "/admin/galeria", icon: Camera },
  { name: "Visite-nos", description: "Morada, horário, contactos", href: "/admin/contacto", icon: MapPin },
];

export default function AdminHeroPage() {
  return (
    <>
      <SectionHeader title="Homepage" description="Hero e secções que aparecem na página inicial" />

      {/* Hero — editável directamente */}
      <div className="mb-8">
        <h2 className="font-sans font-semibold text-espresso mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-copper/10 flex items-center justify-center text-copper text-xs font-bold">1</span>
          Hero (topo da página)
        </h2>
        <AdminForm section="hero">
          {({ data, updateField }) => (
            <div className="space-y-5">
              <TextInput label="Título" value={data.title as string} onChange={(v) => updateField("title", v)} />
              <TextInput label="Subtítulo" value={data.subtitle as string} onChange={(v) => updateField("subtitle", v)} />
              <TextInput label="Texto do botão (CTA)" value={data.cta as string} onChange={(v) => updateField("cta", v)} />
              <TextInput
                label="Link do botão"
                value={(data.ctaLink as string) || ""}
                onChange={(v) => updateField("ctaLink", v)}
                placeholder="/sobre"
                hint="Página interna: /sobre, /menu, /contacto — Link externo: https://exemplo.com"
              />
              <ImagePicker label="Imagem de fundo" value={data.image as string} onChange={(v) => updateField("image", v)} aspectRatio={16 / 9} aspectRatioLabel="16:9" />
            </div>
          )}
        </AdminForm>
      </div>

      <AdminSubSections
        title="Secções da Homepage"
        subtitle="Cada secção da homepage mostra um resumo. Clique para editar o conteúdo completo."
        sections={HOMEPAGE_SECTIONS}
      />
    </>
  );
}
