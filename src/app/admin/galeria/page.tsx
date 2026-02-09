"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { ArrayEditor, ImagePicker, TextInput, SectionHeader } from "@/components/admin/fields";

interface GaleriaImage {
  src: string;
  alt: string;
}

export default function AdminGaleriaPage() {
  return (
    <>
      <SectionHeader title="Galeria" description="Imagens e descrição da galeria" />
      <AdminForm section="galeria">
        {({ data, updateField }) => {
          const images = (data.images || []) as GaleriaImage[];

          function updateImage(index: number, field: keyof GaleriaImage, value: string) {
            const updated = [...images];
            updated[index] = { ...updated[index], [field]: value };
            updateField("images", updated);
          }

          function addImage() {
            updateField("images", [...images, { src: "", alt: "" }]);
          }

          function removeImage(index: number) {
            updateField("images", images.filter((_, i) => i !== index));
          }

          return (
            <div className="space-y-5">
              <TextInput label="Título" value={data.title as string} onChange={(v) => updateField("title", v)} />
              <ArrayEditor
                label="Descrição (parágrafos)"
                items={data.description as string[]}
                onChange={(v) => updateField("description", v)}
              />

              <div className="border-t border-linen pt-4">
                <h2 className="text-sm font-sans font-medium text-roast mb-3">Imagens</h2>
                {images.map((img, i) => (
                  <div key={i} className="p-4 bg-warm-white rounded-xl border border-linen space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-sans text-espresso">Imagem {i + 1}</span>
                      <button onClick={() => removeImage(i)} className="text-red-400 hover:text-red-600 text-sm">Remover</button>
                    </div>
                    <ImagePicker label="Imagem" value={img.src} onChange={(v) => updateImage(i, "src", v)} />
                    <TextInput label="Texto alternativo (alt)" value={img.alt} onChange={(v) => updateImage(i, "alt", v)} />
                  </div>
                ))}
                <button onClick={addImage} className="text-sm text-copper hover:text-copper/80 font-medium">
                  + Adicionar imagem
                </button>
              </div>
            </div>
          );
        }}
      </AdminForm>
    </>
  );
}
