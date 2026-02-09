"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput, ImagePicker, SectionHeader } from "@/components/admin/fields";

export default function AdminHeroPage() {
  return (
    <>
      <SectionHeader title="Hero" description="Imagem e texto principal da homepage" />
      <AdminForm section="hero">
        {({ data, updateField }) => (
          <div className="space-y-5">
            <TextInput label="Título" value={data.title as string} onChange={(v) => updateField("title", v)} />
            <TextInput label="Subtítulo" value={data.subtitle as string} onChange={(v) => updateField("subtitle", v)} />
            <TextInput label="Texto do botão (CTA)" value={data.cta as string} onChange={(v) => updateField("cta", v)} />
            <ImagePicker label="Imagem de fundo" value={data.image as string} onChange={(v) => updateField("image", v)} />
          </div>
        )}
      </AdminForm>
    </>
  );
}
