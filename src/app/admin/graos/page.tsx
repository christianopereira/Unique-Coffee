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
            <ImagePicker label="Imagem" value={data.image as string} onChange={(v) => updateField("image", v)} />
          </div>
        )}
      </AdminForm>
    </>
  );
}
