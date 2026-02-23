"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput, TextArea, SectionHeader } from "@/components/admin/fields";
import { ChevronUp, ChevronDown, Trash2, Plus } from "lucide-react";
import type { SiteData } from "@/types/site-data";

interface LegalSectionItem {
  heading: string;
  content: string;
}

interface LegalPageEditorProps {
  sectionKey: keyof SiteData;
  title: string;
  description: string;
}

export function LegalPageEditor({ sectionKey, title, description }: LegalPageEditorProps) {
  return (
    <>
      <SectionHeader title={title} description={description} />
      <AdminForm section={sectionKey}>
        {({ data, setData }) => {
          const sections = (data.sections as LegalSectionItem[]) || [];

          function updateSection(index: number, field: keyof LegalSectionItem, value: string) {
            const updated = [...sections];
            updated[index] = { ...updated[index], [field]: value };
            setData({ ...data, sections: updated });
          }

          function addSection() {
            setData({ ...data, sections: [...sections, { heading: "", content: "" }] });
          }

          function removeSection(index: number) {
            setData({ ...data, sections: sections.filter((_, i) => i !== index) });
          }

          function moveSection(index: number, direction: -1 | 1) {
            const newIndex = index + direction;
            if (newIndex < 0 || newIndex >= sections.length) return;
            const updated = [...sections];
            [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
            setData({ ...data, sections: updated });
          }

          return (
            <div className="space-y-5">
              <TextInput
                label="Titulo da pagina"
                value={(data.title as string) || ""}
                onChange={(v) => setData({ ...data, title: v })}
              />
              <TextInput
                label="Introducao (opcional)"
                value={(data.intro as string) || ""}
                onChange={(v) => setData({ ...data, intro: v })}
              />
              <TextInput
                label="Ultima actualizacao (ex: Fevereiro de 2026)"
                value={(data.lastUpdated as string) || ""}
                onChange={(v) => setData({ ...data, lastUpdated: v })}
              />

              <div className="border-t border-linen pt-4 space-y-3">
                <h3 className="text-sm font-sans font-medium text-roast">Seccoes</h3>

                {sections.map((section, i) => (
                  <div key={i} className="p-4 bg-warm-white rounded-xl border border-linen space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-sans font-medium text-mocha">Seccao {i + 1}</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveSection(i, -1)}
                          disabled={i === 0}
                          className="p-1 text-stone hover:text-copper disabled:opacity-30 transition-colors"
                          title="Mover para cima"
                        >
                          <ChevronUp size={16} />
                        </button>
                        <button
                          onClick={() => moveSection(i, 1)}
                          disabled={i === sections.length - 1}
                          className="p-1 text-stone hover:text-copper disabled:opacity-30 transition-colors"
                          title="Mover para baixo"
                        >
                          <ChevronDown size={16} />
                        </button>
                        <button
                          onClick={() => removeSection(i)}
                          className="p-1 text-red-400 hover:text-red-600 transition-colors"
                          title="Remover seccao"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <TextInput
                      label="Titulo"
                      value={section.heading}
                      onChange={(v) => updateSection(i, "heading", v)}
                    />
                    <TextArea
                      label="Conteudo (use quebras de linha para paragrafos, - para listas)"
                      value={section.content}
                      onChange={(v) => updateSection(i, "content", v)}
                      rows={5}
                    />
                  </div>
                ))}

                <button
                  onClick={addSection}
                  className="flex items-center gap-2 text-sm text-copper hover:text-copper/80 font-medium"
                >
                  <Plus size={16} />
                  Adicionar seccao
                </button>
              </div>
            </div>
          );
        }}
      </AdminForm>
    </>
  );
}
