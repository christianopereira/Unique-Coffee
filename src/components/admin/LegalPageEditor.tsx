"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { TextInput, TextArea, SectionHeader } from "@/components/admin/fields";
import { ChevronUp, ChevronDown, Trash2, Plus } from "lucide-react";
import type { SiteData } from "@/types/site-data";

interface LegalSection {
  heading: string;
  content: string;
}

interface LegalPageEditorProps {
  sectionKey: keyof SiteData;
  title: string;
  description: string;
}

export function LegalPageEditor({ sectionKey, title, description }: LegalPageEditorProps) {
  const router = useRouter();
  const [pageTitle, setPageTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [sections, setSections] = useState<LegalSection[]>([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/content");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error();
      const allData = await res.json();
      const data = allData[sectionKey];
      if (data) {
        setPageTitle(data.title || "");
        setIntro(data.intro || "");
        setSections(data.sections || []);
        setLastUpdated(data.lastUpdated || "");
      }
    } catch {
      setMessage({ type: "error", text: "Erro ao carregar dados" });
    } finally {
      setLoading(false);
    }
  }, [sectionKey, router]);

  if (loading) {
    loadData();
    return <div className="text-mocha py-12 text-center">A carregar...</div>;
  }

  function updateSection(index: number, field: keyof LegalSection, value: string) {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    setSections(updated);
  }

  function addSection() {
    setSections([...sections, { heading: "", content: "" }]);
  }

  function removeSection(index: number) {
    setSections(sections.filter((_, i) => i !== index));
  }

  function moveSection(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= sections.length) return;
    const updated = [...sections];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setSections(updated);
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: sectionKey,
          data: {
            title: pageTitle,
            ...(intro ? { intro } : {}),
            sections,
            lastUpdated,
          },
        }),
      });
      if (!res.ok) throw new Error("Erro ao guardar");
      setMessage({ type: "success", text: "Guardado com sucesso!" });
      setTimeout(() => setMessage(null), 3000);
    } catch {
      setMessage({ type: "error", text: "Erro ao guardar" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <SectionHeader title={title} description={description} />

      <div className="space-y-5">
        <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-4">
          <TextInput label="Titulo da pagina" value={pageTitle} onChange={setPageTitle} />
          <TextInput label="Introducao (opcional)" value={intro} onChange={setIntro} />
          <TextInput label="Ultima actualizacao (ex: Fevereiro de 2026)" value={lastUpdated} onChange={setLastUpdated} />
        </div>

        <div className="space-y-3">
          <h2 className="font-sans font-semibold text-espresso text-sm">Seccoes</h2>

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
                label="Conteudo (use \\n para quebras de linha, - para listas)"
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

        <div className="flex items-center gap-4 pt-6 border-t border-linen">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-copper text-white font-sans font-medium hover:bg-copper/90 transition-colors disabled:opacity-50"
          >
            {saving ? "A guardar..." : "Guardar alteracoes"}
          </button>
          {message && (
            <p className={`text-sm ${message.type === "success" ? "text-sage" : "text-red-600"}`}>
              {message.text}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
