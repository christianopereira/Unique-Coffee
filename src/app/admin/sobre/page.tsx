"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput, ArrayEditor, ImagePicker, SectionHeader, VariantSelect } from "@/components/admin/fields";
import { PageHeroEditor } from "@/components/admin/PageHeroEditor";
import { SectionBgEditor } from "@/components/admin/SectionBgEditor";
import { AdminSubSections } from "@/components/admin/AdminSubSections";
import { Target } from "lucide-react";

export default function AdminSobrePage() {
  return (
    <>
      <SectionHeader title="Sobre Nós" description="Página /sobre — História, missão, visão e valores" />
      <PageHeroEditor pageKey="sobre" pageTitle="Sobre Nós" />
      <SectionBgEditor sectionKey="sobreNos" sectionTitle="Sobre Nós" />
      <AdminForm section="sobreNos">
        {({ data, updateField }) => (
          <div className="space-y-5">
            <TextInput label="Título" value={data.title as string} onChange={(v) => updateField("title", v)} />
            <ArrayEditor
              label="Parágrafos"
              items={data.paragraphs as string[]}
              onChange={(v) => updateField("paragraphs", v)}
            />
            <ArrayEditor
              label="Highlights (frases 'Aqui, ...')"
              items={data.highlights as string[]}
              onChange={(v) => updateField("highlights", v)}
              inputType="text"
            />
            <ImagePicker label="Imagem" value={data.image as string} onChange={(v) => updateField("image", v)} aspectRatio={4 / 5} aspectRatioLabel="4:5" />
            <div className="border-t border-linen pt-4 space-y-3">
              <h3 className="text-sm font-sans font-medium text-roast">Botão na Homepage</h3>
              <TextInput label="Texto do botão" value={(data.ctaText as string) || ""} onChange={(v) => updateField("ctaText", v)} />
              <TextInput label="Link do botão" value={(data.ctaLink as string) || ""} onChange={(v) => updateField("ctaLink", v)} placeholder="/sobre" hint="Página interna: /sobre, /menu, /contacto — Link externo: https://exemplo.com" />
              <VariantSelect label="Estilo do botão" value={(data.ctaVariant as string) || ""} onChange={(v) => updateField("ctaVariant", v)} />
            </div>
          </div>
        )}
      </AdminForm>
      <AdminSubSections
        title="Outras secções desta página"
        sections={[
          { name: "Missão / Visão / Valores", description: "Missão, visão e valores da empresa", href: "/admin/missao", icon: Target },
        ]}
      />
    </>
  );
}
