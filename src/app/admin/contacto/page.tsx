"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput, TextArea, ArrayEditor, SectionHeader } from "@/components/admin/fields";

export default function AdminContactoPage() {
  return (
    <>
      <SectionHeader title="Contacto / Visite-nos" description="Morada, horários, contactos e redes sociais" />
      <AdminForm section="visiteNos">
        {({ data, updateField }) => {
          const hours = data.hours as { weekdays: string; saturday: string; sunday: string };
          const social = data.social as { instagram: string; facebook: string };
          const coords = data.mapCoordinates as { lat: number; lng: number };

          return (
            <div className="space-y-5">
              <TextInput label="Título" value={data.title as string} onChange={(v) => updateField("title", v)} />
              <TextInput label="Introdução" value={data.intro as string} onChange={(v) => updateField("intro", v)} />
              <TextArea label="Descrição" value={data.description as string} onChange={(v) => updateField("description", v)} rows={3} />
              <TextInput label="CTA" value={data.cta as string} onChange={(v) => updateField("cta", v)} />

              <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-3">
                <h2 className="font-sans font-semibold text-espresso">Dados de Contacto</h2>
                <TextInput label="Morada" value={data.address as string} onChange={(v) => updateField("address", v)} />
                <TextInput label="Telefone" value={data.phone as string} onChange={(v) => updateField("phone", v)} />
                <TextInput label="Email" value={data.email as string} onChange={(v) => updateField("email", v)} />
                <TextInput label="Website" value={data.website as string} onChange={(v) => updateField("website", v)} />
              </div>

              <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-3">
                <h2 className="font-sans font-semibold text-espresso">Horários</h2>
                <TextInput label="Segunda a Sexta" value={hours.weekdays} onChange={(v) => updateField("hours", { ...hours, weekdays: v })} />
                <TextInput label="Sábado" value={hours.saturday} onChange={(v) => updateField("hours", { ...hours, saturday: v })} />
                <TextInput label="Domingo" value={hours.sunday} onChange={(v) => updateField("hours", { ...hours, sunday: v })} />
              </div>

              <ArrayEditor label="Badges" items={data.badges as string[]} onChange={(v) => updateField("badges", v)} inputType="text" />

              <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-3">
                <h2 className="font-sans font-semibold text-espresso">Redes Sociais</h2>
                <TextInput label="Instagram (URL)" value={social.instagram} onChange={(v) => updateField("social", { ...social, instagram: v })} />
                <TextInput label="Facebook (URL)" value={social.facebook} onChange={(v) => updateField("social", { ...social, facebook: v })} />
              </div>

              <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-3">
                <h2 className="font-sans font-semibold text-espresso">Coordenadas do Mapa</h2>
                <div className="grid grid-cols-2 gap-3">
                  <TextInput label="Latitude" value={String(coords.lat)} onChange={(v) => updateField("mapCoordinates", { ...coords, lat: parseFloat(v) || 0 })} />
                  <TextInput label="Longitude" value={String(coords.lng)} onChange={(v) => updateField("mapCoordinates", { ...coords, lng: parseFloat(v) || 0 })} />
                </div>
              </div>
            </div>
          );
        }}
      </AdminForm>
    </>
  );
}
