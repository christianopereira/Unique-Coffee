"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput, ArrayEditor, ImagePicker, SectionHeader, VariantSelect } from "@/components/admin/fields";
import { PageHeroEditor } from "@/components/admin/PageHeroEditor";
import { NavbarColorsEditor } from "@/components/admin/NavbarColorsEditor";
import { SectionBgEditor } from "@/components/admin/SectionBgEditor";
import { SectionEffectsEditor } from "@/components/admin/SectionEffectsEditor";
import { AdminSubSections } from "@/components/admin/AdminSubSections";
import { Sparkles } from "lucide-react";

export default function AdminConceitoPage() {
  return (
    <>
      <SectionHeader title="Conceito" description="Página /conceito — Conceito e diferencial" />
      <NavbarColorsEditor pageKey="conceito" pageTitle="Conceito" />
      <PageHeroEditor pageKey="conceito" pageTitle="Conceito" />
      <SectionBgEditor sectionKey="conceito" sectionTitle="Conceito" />
      <SectionEffectsEditor sectionKey="conceito" sectionTitle="Conceito" />
      <AdminForm section="conceito">
        {({ data, updateField }) => (
          <div className="space-y-5">
            <TextInput label="Título" value={data.title as string} onChange={(v) => updateField("title", v)} />
            <ArrayEditor
              label="Parágrafos"
              items={data.paragraphs as string[]}
              onChange={(v) => updateField("paragraphs", v)}
            />
            <ImagePicker label="Imagem de fundo" value={(data.backgroundImage as string) || ""} onChange={(v) => updateField("backgroundImage", v)} aspectRatio={16 / 9} aspectRatioLabel="16:9" />
            <div className="border-t border-linen pt-4 space-y-3">
              <h3 className="text-sm font-sans font-medium text-roast">Botão na Homepage</h3>
              <TextInput label="Texto do botão" value={(data.ctaText as string) || ""} onChange={(v) => updateField("ctaText", v)} />
              <TextInput label="Link do botão" value={(data.ctaLink as string) || ""} onChange={(v) => updateField("ctaLink", v)} placeholder="/conceito" hint="Página interna: /sobre, /menu, /contacto — Link externo: https://exemplo.com" />
              <VariantSelect label="Estilo do botão" value={(data.ctaVariant as string) || ""} onChange={(v) => updateField("ctaVariant", v)} previewText={(data.ctaText as string) || "Botão"} ctaBg={(data.ctaBg as string) || ""} ctaTextColor={(data.ctaTextColor as string) || ""} onCtaBgChange={(v) => updateField("ctaBg", v || "")} onCtaTextColorChange={(v) => updateField("ctaTextColor", v || "")} />
            </div>
          </div>
        )}
      </AdminForm>
      <AdminSubSections
        title="Outras secções desta página"
        sections={[
          { name: "Diferencial", description: "O que torna a Unique Coffee diferente", href: "/admin/diferencial", icon: Sparkles },
        ]}
      />
    </>
  );
}
