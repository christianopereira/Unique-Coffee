"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ColorPicker, ImagePicker, SizeSelect, FontSelect } from "@/components/admin/fields";
import { ChevronDown, Palette } from "lucide-react";
import { DISPLAY_FONTS, BODY_FONTS } from "@/lib/font-options";
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
      const res = await fetch("/api/admin/content", { cache: "no-store" });
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
      const getRes = await fetch("/api/admin/content", { cache: "no-store" });
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

  const hasCustom = !!(
    data.color || data.image || data.titleColor || data.bodyColor || data.subtitleColor ||
    data.titleFont || data.bodyFont || data.titleSize ||
    (data.paddingY && data.paddingY !== "normal") ||
    (data.minHeight && data.minHeight !== "none")
  );

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

          {/* Layout e dimensões */}
          <div className="border-t border-linen pt-4 mt-2">
            <p className="text-xs font-sans font-medium text-mocha mb-3 uppercase tracking-wider">
              Layout e dimensões
            </p>
            <div className="space-y-3">
              <SizeSelect
                label="Espaçamento vertical"
                value={data.paddingY || "normal"}
                options={[
                  { label: "Sem espaçamento", value: "none" },
                  { label: "Compacto", value: "compact" },
                  { label: "Normal (predefinido)", value: "normal" },
                  { label: "Espaçoso", value: "spacious" },
                ]}
                onChange={(v) => update("paddingY", (v as "none" | "compact" | "normal" | "spacious") || undefined)}
              />
              <SizeSelect
                label="Altura mínima"
                value={data.minHeight || "none"}
                options={[
                  { label: "Automática (predefinido)", value: "none" },
                  { label: "Média — 40% ecrã", value: "sm" },
                  { label: "Alta — 60% ecrã", value: "md" },
                  { label: "Ecrã completo", value: "full" },
                ]}
                onChange={(v) => update("minHeight", (v as "none" | "sm" | "md" | "full") || undefined)}
              />
            </div>
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

          {/* Parallax toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.parallax || false}
              onChange={(e) => update("parallax", e.target.checked)}
              className="w-4 h-4 rounded border-linen text-copper focus:ring-copper"
            />
            <span className="text-sm font-sans text-espresso">Efeito parallax (fundo fixo ao scroll)</span>
          </label>

          {/* ─── Personalização de texto ─── */}
          <div className="border-t border-linen pt-4 mt-2">
            <p className="text-xs font-sans font-medium text-mocha mb-3 uppercase tracking-wider">
              Personalização de texto (opcional)
            </p>

            {/* Title color */}
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <label className="text-sm font-sans font-medium text-roast">Cor do título</label>
                  {data.titleColor && (
                    <button
                      onClick={() => update("titleColor", undefined)}
                      className="text-[10px] text-mocha hover:text-copper"
                    >
                      (limpar)
                    </button>
                  )}
                </div>
                <ColorPicker
                  label=""
                  value={data.titleColor || ""}
                  onChange={(v) => update("titleColor", v)}
                />
                {!data.titleColor && <p className="text-[10px] text-mocha/70">Não definida — usa a cor predefinida da secção</p>}
              </div>

              {/* Title size */}
              <div>
                <SizeSelect
                  label="Tamanho do título"
                  value={data.titleSize || "md"}
                  options={[
                    { label: "Pequeno", value: "sm" },
                    { label: "Normal (predefinido)", value: "md" },
                    { label: "Grande", value: "lg" },
                    { label: "Muito grande", value: "xl" },
                  ]}
                  onChange={(v) => update("titleSize", (v as "sm" | "md" | "lg" | "xl") || undefined)}
                />
              </div>

              {/* Body color */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <label className="text-sm font-sans font-medium text-roast">Cor do texto</label>
                  {data.bodyColor && (
                    <button
                      onClick={() => update("bodyColor", undefined)}
                      className="text-[10px] text-mocha hover:text-copper"
                    >
                      (limpar)
                    </button>
                  )}
                </div>
                <ColorPicker
                  label=""
                  value={data.bodyColor || ""}
                  onChange={(v) => update("bodyColor", v)}
                />
                {!data.bodyColor && <p className="text-[10px] text-mocha/70">Não definida — usa a cor predefinida da secção</p>}
              </div>

              {/* Subtitle color */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <label className="text-sm font-sans font-medium text-roast">Cor dos subtítulos</label>
                  {data.subtitleColor && (
                    <button
                      onClick={() => update("subtitleColor", undefined)}
                      className="text-[10px] text-mocha hover:text-copper"
                    >
                      (limpar)
                    </button>
                  )}
                </div>
                <ColorPicker
                  label=""
                  value={data.subtitleColor || ""}
                  onChange={(v) => update("subtitleColor", v)}
                />
                {!data.subtitleColor && <p className="text-[10px] text-mocha/70">Não definida — usa a cor predefinida da secção</p>}
              </div>

              {/* Title font */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <label className="text-sm font-sans font-medium text-roast">Fonte do título</label>
                  {data.titleFont && (
                    <button
                      onClick={() => update("titleFont", undefined)}
                      className="text-[10px] text-mocha hover:text-copper"
                    >
                      (limpar)
                    </button>
                  )}
                </div>
                <FontSelect
                  label=""
                  value={data.titleFont || ""}
                  options={[{ name: "", label: "Predefinida (global)" }, ...DISPLAY_FONTS]}
                  onChange={(v) => update("titleFont", v || undefined)}
                  previewText="O Sabor Único do Verdadeiro Café"
                />
              </div>

              {/* Body font */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <label className="text-sm font-sans font-medium text-roast">Fonte do texto</label>
                  {data.bodyFont && (
                    <button
                      onClick={() => update("bodyFont", undefined)}
                      className="text-[10px] text-mocha hover:text-copper"
                    >
                      (limpar)
                    </button>
                  )}
                </div>
                <FontSelect
                  label=""
                  value={data.bodyFont || ""}
                  options={[{ name: "", label: "Predefinida (global)" }, ...BODY_FONTS]}
                  onChange={(v) => update("bodyFont", v || undefined)}
                  previewText="Café de especialidade, ambiente sofisticado e tranquilo."
                />
              </div>
            </div>
          </div>

          {/* Live text preview */}
          {(data.color || data.titleColor || data.bodyColor || data.subtitleColor || data.titleFont || data.bodyFont || data.textLight) && (
            <div className="border-t border-linen pt-4 mt-2">
              <p className="text-xs font-sans font-medium text-mocha mb-2 uppercase tracking-wider">Preview</p>
              <div
                className="rounded-lg p-5 border border-linen overflow-hidden"
                style={{
                  backgroundColor: data.color || (data.textLight ? "#2C1810" : "#F5F0EB"),
                  color: data.textLight ? "#FAF8F5" : "#2C1810",
                }}
              >
                <p
                  className="text-lg font-bold mb-2"
                  style={{
                    color: data.titleColor || undefined,
                    fontFamily: data.titleFont ? `"${data.titleFont}", serif` : undefined,
                  }}
                >
                  Título da Secção
                </p>
                <p
                  className="text-sm mb-1"
                  style={{
                    color: data.bodyColor || undefined,
                    fontFamily: data.bodyFont ? `"${data.bodyFont}", serif` : undefined,
                  }}
                >
                  Texto principal da secção com as cores e fontes escolhidas.
                </p>
                <p
                  className="text-xs italic"
                  style={{ color: data.subtitleColor || undefined }}
                >
                  Subtítulo / caption
                </p>
              </div>
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
