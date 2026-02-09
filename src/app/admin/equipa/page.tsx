"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput, SectionHeader } from "@/components/admin/fields";

interface TeamMember {
  name: string;
  role: string;
  hasPhoto: boolean;
}

export default function AdminEquipaPage() {
  return (
    <>
      <SectionHeader title="Equipa" description="Membros da equipa" />
      <AdminForm section="equipa">
        {({ data, updateField }) => {
          const members = (data.members || []) as TeamMember[];

          function updateMember(index: number, field: keyof TeamMember, value: string | boolean) {
            const updated = [...members];
            updated[index] = { ...updated[index], [field]: value };
            updateField("members", updated);
          }

          function addMember() {
            updateField("members", [...members, { name: "", role: "", hasPhoto: false }]);
          }

          function removeMember(index: number) {
            updateField("members", members.filter((_, i) => i !== index));
          }

          return (
            <div className="space-y-5">
              <TextInput label="Título" value={data.title as string} onChange={(v) => updateField("title", v)} />

              {members.map((member, i) => (
                <div key={i} className="flex gap-4 items-start p-4 bg-warm-white rounded-xl border border-linen">
                  <div className="flex-1 space-y-3">
                    <TextInput label="Nome" value={member.name} onChange={(v) => updateMember(i, "name", v)} />
                    <TextInput label="Cargo" value={member.role} onChange={(v) => updateMember(i, "role", v)} />
                    <label className="flex items-center gap-2 text-sm text-roast">
                      <input
                        type="checkbox"
                        checked={member.hasPhoto}
                        onChange={(e) => updateMember(i, "hasPhoto", e.target.checked)}
                        className="rounded border-linen text-copper focus:ring-copper"
                      />
                      Tem foto
                    </label>
                  </div>
                  <button onClick={() => removeMember(i)} className="text-red-400 hover:text-red-600 text-sm px-2 py-2 shrink-0">✕</button>
                </div>
              ))}

              <button onClick={addMember} className="text-sm text-copper hover:text-copper/80 font-medium">
                + Adicionar membro
              </button>
            </div>
          );
        }}
      </AdminForm>
    </>
  );
}
