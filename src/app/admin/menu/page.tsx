"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput, TextArea, ImagePicker, SectionHeader, VariantSelect } from "@/components/admin/fields";
import { PageHeroEditor } from "@/components/admin/PageHeroEditor";
import { SectionBgEditor } from "@/components/admin/SectionBgEditor";
import { SectionEffectsEditor } from "@/components/admin/SectionEffectsEditor";

interface MenuItem {
  name: string;
  description: string;
}

interface MenuCategory {
  name: string;
  slug: string;
  image: string;
  description: string;
  items: MenuItem[];
}

export default function AdminMenuPage() {
  return (
    <>
      <SectionHeader title="Menu" description="Página /menu — Categorias e itens" />
      <PageHeroEditor pageKey="menu" pageTitle="Menu" />
      <SectionBgEditor sectionKey="menu" sectionTitle="Menu" />
      <SectionEffectsEditor sectionKey="menu" sectionTitle="Menu" />
      <AdminForm section="menu">
        {({ data, updateField }) => {
          const categories = (data.categories || []) as MenuCategory[];

          function updateCategory(index: number, field: string, value: unknown) {
            const updated = [...categories];
            updated[index] = { ...updated[index], [field]: value };
            updateField("categories", updated);
          }

          function updateItem(catIndex: number, itemIndex: number, field: keyof MenuItem, value: string) {
            const updated = [...categories];
            const items = [...updated[catIndex].items];
            items[itemIndex] = { ...items[itemIndex], [field]: value };
            updated[catIndex] = { ...updated[catIndex], items };
            updateField("categories", updated);
          }

          function addItem(catIndex: number) {
            const updated = [...categories];
            updated[catIndex] = {
              ...updated[catIndex],
              items: [...updated[catIndex].items, { name: "", description: "" }],
            };
            updateField("categories", updated);
          }

          function removeItem(catIndex: number, itemIndex: number) {
            const updated = [...categories];
            updated[catIndex] = {
              ...updated[catIndex],
              items: updated[catIndex].items.filter((_, i) => i !== itemIndex),
            };
            updateField("categories", updated);
          }

          function addCategory() {
            updateField("categories", [
              ...categories,
              { name: "", slug: "", image: "", description: "", items: [] },
            ]);
          }

          function removeCategory(index: number) {
            updateField("categories", categories.filter((_, i) => i !== index));
          }

          return (
            <div className="space-y-5">
              <TextInput label="Título" value={data.title as string} onChange={(v) => updateField("title", v)} />
              <TextInput label="Subtítulo" value={data.subtitle as string} onChange={(v) => updateField("subtitle", v)} />
              <div className="border-t border-linen pt-4 space-y-3">
                <h3 className="text-sm font-sans font-medium text-roast">Botão (Homepage + Página Menu)</h3>
                <TextInput label="Texto do botão" value={(data.ctaText as string) || ""} onChange={(v) => updateField("ctaText", v)} />
                <TextInput label="Link do botão" value={(data.ctaLink as string) || ""} onChange={(v) => updateField("ctaLink", v)} placeholder="/menu" hint="Página interna: /sobre, /menu, /contacto — Link externo: https://exemplo.com" />
                <VariantSelect label="Estilo do botão" value={(data.ctaVariant as string) || ""} onChange={(v) => updateField("ctaVariant", v)} />
              </div>

              {categories.map((cat, ci) => (
                <div key={ci} className="p-5 bg-warm-white rounded-xl border border-linen space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-sans font-semibold text-espresso">
                      Categoria: {cat.name || "(nova)"}
                    </h2>
                    <button onClick={() => removeCategory(ci)} className="text-red-400 hover:text-red-600 text-sm">
                      Remover categoria
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <TextInput label="Nome" value={cat.name} onChange={(v) => updateCategory(ci, "name", v)} />
                    <TextInput label="Slug (URL)" value={cat.slug} onChange={(v) => updateCategory(ci, "slug", v)} />
                  </div>
                  <TextArea label="Descrição" value={cat.description} onChange={(v) => updateCategory(ci, "description", v)} rows={2} />
                  <ImagePicker label="Imagem" value={cat.image} onChange={(v) => updateCategory(ci, "image", v)} aspectRatio={4 / 3} aspectRatioLabel="4:3" />

                  <div className="border-t border-linen pt-4">
                    <h3 className="text-sm font-sans font-medium text-roast mb-3">Itens</h3>
                    {cat.items.map((item, ii) => (
                      <div key={ii} className="flex gap-3 items-start mb-3 p-3 bg-cream rounded-lg">
                        <div className="flex-1 space-y-2">
                          <TextInput label="Nome" value={item.name} onChange={(v) => updateItem(ci, ii, "name", v)} />
                          <TextInput label="Descrição" value={item.description} onChange={(v) => updateItem(ci, ii, "description", v)} />
                        </div>
                        <button onClick={() => removeItem(ci, ii)} className="text-red-400 hover:text-red-600 text-sm px-2 py-2 shrink-0">✕</button>
                      </div>
                    ))}
                    <button onClick={() => addItem(ci)} className="text-sm text-copper hover:text-copper/80 font-medium">
                      + Adicionar item
                    </button>
                  </div>
                </div>
              ))}

              <button onClick={addCategory} className="text-sm text-copper hover:text-copper/80 font-medium">
                + Adicionar categoria
              </button>
            </div>
          );
        }}
      </AdminForm>
    </>
  );
}
