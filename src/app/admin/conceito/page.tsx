"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput, ArrayEditor, SectionHeader } from "@/components/admin/fields";

export default function AdminConceitoPage() {
  return (
    <>
      <SectionHeader title="Conceito" description="O conceito do espaço" />
      <AdminForm section="conceito">
        {({ data, updateField }) => (
          <div className="space-y-5">
            <TextInput label="Título" value={data.title as string} onChange={(v) => updateField("title", v)} />
            <ArrayEditor
              label="Parágrafos"
              items={data.paragraphs as string[]}
              onChange={(v) => updateField("paragraphs", v)}
            />
          </div>
        )}
      </AdminForm>
    </>
  );
}
