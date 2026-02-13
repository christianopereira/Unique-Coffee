"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput, ArrayEditor, ImagePicker, SectionHeader } from "@/components/admin/fields";

export default function AdminGraosPage() {
  return (
    <>
      <SectionHeader title="Grãos" description="Grãos seleccionados e imagem" />
      <AdminForm section="graos">
        {({ data, updateField }) => (
          <div className="space-y-5">
            <TextInput label="Título" value={data.title as string} onChange={(v) => updateField("title", v)} />
            <ArrayEditor
              label="Parágrafos"
              items={data.paragraphs as string[]}
              onChange={(v) => updateField("paragraphs", v)}
            />
            <ImagePicker label="Imagem" value={data.image as string} onChange={(v) => updateField("image", v)} aspectRatio={4 / 5} aspectRatioLabel="4:5" />
            <div className="border-t border-linen pt-4 space-y-3">
              <h3 className="text-sm font-sans font-medium text-roast">Botão na Homepage</h3>
              <TextInput label="Texto do botão" value={(data.ctaText as string) || ""} onChange={(v) => updateField("ctaText", v)} />
              <TextInput label="Link do botão" value={(data.ctaLink as string) || ""} onChange={(v) => updateField("ctaLink", v)} />
            </div>
          </div>
        )}
      </AdminForm>
    </>
  );
}
