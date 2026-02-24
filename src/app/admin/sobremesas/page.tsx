"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput, TextArea, ArrayEditor, ImagePicker, SectionHeader, VariantSelect } from "@/components/admin/fields";
import { PageHeroEditor } from "@/components/admin/PageHeroEditor";
import { SectionBgEditor } from "@/components/admin/SectionBgEditor";

interface SobremesaItem {
  name: string;
  slug: string;
  image: string;
  description: string;
}

export default function AdminSobremesasPage() {
  return (
    <>
      <SectionHeader title="Sobremesas" description="Página /sobremesas — Textos, destaques e itens" />
      <PageHeroEditor pageKey="sobremesas" pageTitle="Sobremesas" />
      <SectionBgEditor sectionKey="sobremesas" sectionTitle="Sobremesas" />
      <AdminForm section="sobremesas">
        {({ data, updateField }) => {
          const items = (data.items || []) as SobremesaItem[];

          function updateItem(index: number, field: keyof SobremesaItem, value: string) {
            const updated = [...items];
            updated[index] = { ...updated[index], [field]: value };
            updateField("items", updated);
          }

          function addItem() {
            updateField("items", [...items, { name: "", slug: "", image: "", description: "" }]);
          }

          function removeItem(index: number) {
            updateField("items", items.filter((_, i) => i !== index));
          }

          return (
            <div className="space-y-5">
              <TextInput label="Título" value={data.title as string} onChange={(v) => updateField("title", v)} />
              <ArrayEditor label="Parágrafos" items={data.paragraphs as string[]} onChange={(v) => updateField("paragraphs", v)} />
              <ArrayEditor label="Highlights" items={data.highlights as string[]} onChange={(v) => updateField("highlights", v)} inputType="text" />
              <div className="border-t border-linen pt-4 space-y-3">
                <h3 className="text-sm font-sans font-medium text-roast">Botão na Homepage</h3>
                <TextInput label="Texto do botão" value={(data.ctaText as string) || ""} onChange={(v) => updateField("ctaText", v)} />
                <TextInput label="Link do botão" value={(data.ctaLink as string) || ""} onChange={(v) => updateField("ctaLink", v)} placeholder="/sobremesas" hint="Página interna: /sobre, /menu, /contacto — Link externo: https://exemplo.com" />
                <VariantSelect label="Estilo do botão" value={(data.ctaVariant as string) || ""} onChange={(v) => updateField("ctaVariant", v)} />
              </div>

              <div className="border-t border-linen pt-4">
                <h2 className="text-sm font-sans font-medium text-roast mb-3">Sobremesas</h2>
                {items.map((item, i) => (
                  <div key={i} className="p-4 bg-warm-white rounded-xl border border-linen space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="font-sans font-medium text-espresso text-sm">
                        {item.name || `Sobremesa ${i + 1}`}
                      </span>
                      <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600 text-sm">Remover</button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <TextInput label="Nome" value={item.name} onChange={(v) => updateItem(i, "name", v)} />
                      <TextInput label="Slug (URL)" value={item.slug} onChange={(v) => updateItem(i, "slug", v)} />
                    </div>
                    <TextArea label="Descrição" value={item.description} onChange={(v) => updateItem(i, "description", v)} rows={3} />
                    <ImagePicker label="Imagem" value={item.image} onChange={(v) => updateItem(i, "image", v)} aspectRatio={4 / 3} aspectRatioLabel="4:3" />
                  </div>
                ))}
                <button onClick={addItem} className="text-sm text-copper hover:text-copper/80 font-medium">
                  + Adicionar sobremesa
                </button>
              </div>
            </div>
          );
        }}
      </AdminForm>
    </>
  );
}
