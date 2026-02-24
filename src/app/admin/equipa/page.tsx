"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput, ImagePicker, SectionHeader } from "@/components/admin/fields";
import { PageHeroEditor } from "@/components/admin/PageHeroEditor";
import { NavbarColorsEditor } from "@/components/admin/NavbarColorsEditor";
import { SectionBgEditor } from "@/components/admin/SectionBgEditor";
import { SectionEffectsEditor } from "@/components/admin/SectionEffectsEditor";

interface TeamMember {
  name: string;
  role: string;
  hasPhoto: boolean;
  photo?: string;
}

export default function AdminEquipaPage() {
  return (
    <>
      <SectionHeader title="Equipa" description="Página /equipa — Membros da equipa" />
      <NavbarColorsEditor pageKey="equipa" pageTitle="Equipa" />
      <PageHeroEditor pageKey="equipa" pageTitle="Equipa" />
      <SectionBgEditor sectionKey="equipa" sectionTitle="Equipa" />
      <SectionEffectsEditor sectionKey="equipa" sectionTitle="Equipa" />
      <AdminForm section="equipa">
        {({ data, updateField }) => {
          const members = (data.members || []) as TeamMember[];

          function updateMember(index: number, field: keyof TeamMember, value: string | boolean) {
            const updated = [...members];
            updated[index] = { ...updated[index], [field]: value };
            // Auto-set hasPhoto when photo URL is set
            if (field === "photo") {
              updated[index].hasPhoto = !!(value as string);
            }
            updateField("members", updated);
          }

          function addMember() {
            updateField("members", [...members, { name: "", role: "", hasPhoto: false, photo: "" }]);
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
                    <ImagePicker
                      label="Foto"
                      value={member.photo || ""}
                      onChange={(v) => updateMember(i, "photo", v)}
                      aspectRatio={1}
                      aspectRatioLabel="1:1"
                    />
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
