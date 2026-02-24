"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput, TextArea, ArrayEditor, SectionHeader } from "@/components/admin/fields";
import { SectionBgEditor } from "@/components/admin/SectionBgEditor";
import { SectionEffectsEditor } from "@/components/admin/SectionEffectsEditor";

export default function AdminDiferencialPage() {
  return (
    <>
      <SectionHeader title="Diferencial" description="O que torna a Unique Coffee única" />
      <SectionBgEditor sectionKey="diferencial" sectionTitle="Diferencial" />
      <SectionEffectsEditor sectionKey="diferencial" sectionTitle="Diferencial" />
      <AdminForm section="diferencial">
        {({ data, updateField }) => (
          <div className="space-y-5">
            <TextInput label="Título" value={data.title as string} onChange={(v) => updateField("title", v)} />
            <TextArea label="Introdução" value={data.intro as string} onChange={(v) => updateField("intro", v)} rows={3} />
            <ArrayEditor
              label="Parágrafos"
              items={data.paragraphs as string[]}
              onChange={(v) => updateField("paragraphs", v)}
            />
            <ArrayEditor
              label="Fecho"
              items={data.closing as string[]}
              onChange={(v) => updateField("closing", v)}
              inputType="text"
            />
          </div>
        )}
      </AdminForm>
    </>
  );
}
