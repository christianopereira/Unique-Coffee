"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput, TextArea, SectionHeader } from "@/components/admin/fields";
import { SectionBgEditor } from "@/components/admin/SectionBgEditor";
import { SectionEffectsEditor } from "@/components/admin/SectionEffectsEditor";

interface ValorItem {
  name: string;
  description: string;
}

export default function AdminMissaoPage() {
  return (
    <>
      <SectionHeader title="Missão / Visão / Valores" description="Missão, visão e valores da Unique Coffee" />
      <SectionBgEditor sectionKey="missaoVisaoValores" sectionTitle="Missão / Visão / Valores" />
      <SectionEffectsEditor sectionKey="missaoVisaoValores" sectionTitle="Missão / Visão / Valores" />
      <AdminForm section="missaoVisaoValores">
        {({ data, updateField }) => {
          const missao = data.missao as { title: string; text: string };
          const visao = data.visao as { title: string; text: string };
          const valores = data.valores as { title: string; items: ValorItem[] };

          function updateValor(index: number, field: keyof ValorItem, value: string) {
            const updated = [...valores.items];
            updated[index] = { ...updated[index], [field]: value };
            updateField("valores", { ...valores, items: updated });
          }

          function addValor() {
            updateField("valores", {
              ...valores,
              items: [...valores.items, { name: "", description: "" }],
            });
          }

          function removeValor(index: number) {
            updateField("valores", {
              ...valores,
              items: valores.items.filter((_: ValorItem, i: number) => i !== index),
            });
          }

          return (
            <div className="space-y-8">
              <div className="space-y-4 p-5 bg-warm-white rounded-xl border border-linen">
                <h2 className="font-sans font-semibold text-espresso">Missão</h2>
                <TextInput label="Título" value={missao.title} onChange={(v) => updateField("missao", { ...missao, title: v })} />
                <TextArea label="Texto" value={missao.text} onChange={(v) => updateField("missao", { ...missao, text: v })} />
              </div>

              <div className="space-y-4 p-5 bg-warm-white rounded-xl border border-linen">
                <h2 className="font-sans font-semibold text-espresso">Visão</h2>
                <TextInput label="Título" value={visao.title} onChange={(v) => updateField("visao", { ...visao, title: v })} />
                <TextArea label="Texto" value={visao.text} onChange={(v) => updateField("visao", { ...visao, text: v })} />
              </div>

              <div className="space-y-4 p-5 bg-warm-white rounded-xl border border-linen">
                <h2 className="font-sans font-semibold text-espresso">Valores</h2>
                <TextInput label="Título" value={valores.title} onChange={(v) => updateField("valores", { ...valores, title: v })} />

                {valores.items.map((valor: ValorItem, i: number) => (
                  <div key={i} className="flex gap-3 items-start p-4 bg-cream rounded-lg">
                    <div className="flex-1 space-y-2">
                      <TextInput label={`Valor ${i + 1} — Nome`} value={valor.name} onChange={(v) => updateValor(i, "name", v)} />
                      <TextArea label="Descrição" value={valor.description} onChange={(v) => updateValor(i, "description", v)} rows={2} />
                    </div>
                    <button onClick={() => removeValor(i)} className="text-red-400 hover:text-red-600 text-sm px-2 py-2 shrink-0">✕</button>
                  </div>
                ))}

                <button onClick={addValor} className="text-sm text-copper hover:text-copper/80 font-medium">
                  + Adicionar valor
                </button>
              </div>
            </div>
          );
        }}
      </AdminForm>
    </>
  );
}
