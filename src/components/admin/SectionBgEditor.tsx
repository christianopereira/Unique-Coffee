"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ColorPicker, ImagePicker, SizeSelect } from "@/components/admin/fields";
import { ChevronDown, Palette } from "lucide-react";
import type { SectionBgConfig } from "@/types/site-data";

interface SectionBgEditorProps {
  sectionKey: string;
  sectionTitle: string;
}

const OVERLAY_OPTIONS = [
  { label: "Sem overlay", value: "0" },
  { label: "Leve (20%)", value: "20" },
  { label: "Médio (50%)", value: "50" },
  { label: "Forte (70%)", value: "70" },
  { label: "Muito forte (90%)", value: "90" },
];

export function SectionBgEditor({ sectionKey, sectionTitle }: SectionBgEditorProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<SectionBgConfig>({});
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/content");
      if (res.status === 401) { router.push("/admin/login"); return; }
      const all = await res.json();
      const bgs = all.sectionBgs || {};
      setData(bgs[sectionKey] || {});
    } catch { /* ignore */ }
    setLoaded(true);
  }, [sectionKey, router]);

  useEffect(() => { load(); }, [load]);

  async function save() {
    setSaving(true);
    try {
      const getRes = await fetch("/api/admin/content");
      const all = await getRes.json();
      const bgs = { ...(all.sectionBgs || {}), [sectionKey]: data };

      const res = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "sectionBgs", data: bgs }),
      });
      if (!res.ok) throw new Error();
      setMessage("Guardado!");
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage("Erro ao guardar");
    }
    setSaving(false);
  }

  function update<K extends keyof SectionBgConfig>(key: K, value: SectionBgConfig[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function reset() {
    setData({});
  }

  const hasCustom = !!(data.color || data.image);

  if (!loaded) return null;

  return (
    <div className="mb-6 border border-linen rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-parchment/50 hover:bg-parchment transition-colors text-left"
      >
        <Palette size={16} className="text-copper shrink-0" />
        <span className="font-sans text-sm font-medium text-espresso flex-1">
          Fundo da secção — {sectionTitle}
        </span>
        {hasCustom && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-copper/10 text-copper font-sans font-medium">
            Personalizado
          </span>
        )}
        <ChevronDown
          size={16}
          className={`text-stone transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-4 py-4 space-y-4 bg-white">
          {/* Colour */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <label className="text-sm font-sans font-medium text-roast">Cor de fundo</label>
              {data.color && (
                <button
                  onClick={() => update("color", undefined)}
                  className="text-[10px] text-mocha hover:text-copper"
                >
                  (limpar)
                </button>
              )}
            </div>
            <ColorPicker
              label=""
              value={data.color || "#F5F0EB"}
              onChange={(v) => update("color", v)}
            />
            <p className="text-[10px] text-mocha/70 mt-1">Deixe vazio para usar a cor predefinida da secção</p>
          </div>

          {/* Image */}
          <ImagePicker
            label="Imagem de fundo"
            value={data.image || ""}
            onChange={(v) => update("image", v)}
            aspectRatio={21 / 9}
            aspectRatioLabel="21:9"
          />

          {data.image && (
            <SizeSelect
              label="Overlay da imagem"
              value={String(data.imageOverlay ?? 50)}
              options={OVERLAY_OPTIONS}
              onChange={(v) => update("imageOverlay", Number(v))}
            />
          )}

          {/* Text light toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.textLight || false}
              onChange={(e) => update("textLight", e.target.checked)}
              className="w-4 h-4 rounded border-linen text-copper focus:ring-copper"
            />
            <span className="text-sm font-sans text-espresso">Texto claro (para fundos escuros)</span>
          </label>

          {/* Preview swatch */}
          {data.color && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-mocha">Preview:</span>
              <div
                className="w-20 h-8 rounded border border-linen"
                style={{ backgroundColor: data.color }}
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={save}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-copper text-white text-sm font-sans font-medium hover:bg-copper/90 transition-colors disabled:opacity-50"
            >
              {saving ? "A guardar..." : "Guardar fundo"}
            </button>
            {hasCustom && (
              <button
                onClick={reset}
                className="px-4 py-2 rounded-lg border border-linen text-mocha text-sm font-sans hover:bg-parchment/50 transition-colors"
              >
                Repor predefinido
              </button>
            )}
            {message && <span className="text-xs text-sage">{message}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
