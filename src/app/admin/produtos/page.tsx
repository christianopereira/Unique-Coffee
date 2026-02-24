"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput, TextArea, ImagePicker, SectionHeader } from "@/components/admin/fields";
import { PageHeroEditor } from "@/components/admin/PageHeroEditor";
import { SectionBgEditor } from "@/components/admin/SectionBgEditor";
import { SectionEffectsEditor } from "@/components/admin/SectionEffectsEditor";

interface ProdutoItem {
  name: string;
  slug: string;
  image: string;
  description: string;
}

export default function AdminProdutosPage() {
  return (
    <>
      <SectionHeader title="Nossos Produtos" description="Cafés e acessórios à venda na loja" />
      <PageHeroEditor pageKey="produtos" pageTitle="Nossos Produtos" />
      <SectionBgEditor sectionKey="produtos" sectionTitle="Nossos Produtos" />
      <SectionEffectsEditor sectionKey="produtos" sectionTitle="Nossos Produtos" />
      <AdminForm section="produtos">
        {({ data, updateField }) => {
          const items = (data.items || []) as ProdutoItem[];

          function updateItem(index: number, field: keyof ProdutoItem, value: string) {
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
              <TextArea label="Subtítulo" value={(data.subtitle as string) || ""} onChange={(v) => updateField("subtitle", v)} rows={2} />

              <div className="border-t border-linen pt-4">
                <h2 className="text-sm font-sans font-medium text-roast mb-3">Produtos</h2>
                {items.map((item, i) => (
                  <div key={i} className="p-4 bg-warm-white rounded-xl border border-linen space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="font-sans font-medium text-espresso text-sm">
                        {item.name || `Produto ${i + 1}`}
                      </span>
                      <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600 text-sm">Remover</button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <TextInput label="Nome" value={item.name} onChange={(v) => updateItem(i, "name", v)} />
                      <TextInput label="Slug (URL)" value={item.slug} onChange={(v) => updateItem(i, "slug", v)} />
                    </div>
                    <TextArea label="Descrição" value={item.description} onChange={(v) => updateItem(i, "description", v)} rows={2} />
                    <ImagePicker label="Imagem" value={item.image} onChange={(v) => updateItem(i, "image", v)} aspectRatio={1} aspectRatioLabel="1:1" />
                  </div>
                ))}
                <button onClick={addItem} className="text-sm text-copper hover:text-copper/80 font-medium">
                  + Adicionar produto
                </button>
              </div>
            </div>
          );
        }}
      </AdminForm>
    </>
  );
}
