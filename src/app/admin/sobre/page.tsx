"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput, ArrayEditor, ImagePicker, SectionHeader } from "@/components/admin/fields";

export default function AdminSobrePage() {
  return (
    <>
      <SectionHeader title="Sobre Nós" description="História, parágrafos e highlights" />
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
            <ImagePicker label="Imagem" value={data.image as string} onChange={(v) => updateField("image", v)} />
          </div>
        )}
      </AdminForm>
    </>
  );
}
