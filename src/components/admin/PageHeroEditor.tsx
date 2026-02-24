"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { TextInput, ImagePicker, SizeSelect, ColorPicker, FontSelect } from "@/components/admin/fields";
import { ChevronDown, Image as ImageIcon } from "lucide-react";
import { DISPLAY_FONTS } from "@/lib/font-options";
import type { PageHeroConfig } from "@/types/site-data";

interface PageHeroEditorProps {
  pageKey: string;
  pageTitle: string;
}

const HEIGHT_OPTIONS = [
  { label: "Pequeno (25vh)", value: "small" },
  { label: "Médio (35vh)", value: "medium" },
  { label: "Grande (45vh)", value: "large" },
];

const OVERLAY_OPTIONS = [
  { label: "Sem overlay", value: "0" },
  { label: "Leve (20%)", value: "20" },
  { label: "Médio (50%)", value: "50" },
  { label: "Forte (70%)", value: "70" },
  { label: "Muito forte (90%)", value: "90" },
];

const POSITION_OPTIONS = [
  { label: "↖", value: "left top", title: "Topo esquerda" },
  { label: "↑", value: "center top", title: "Topo centro" },
  { label: "↗", value: "right top", title: "Topo direita" },
  { label: "←", value: "left center", title: "Centro esquerda" },
  { label: "●", value: "center center", title: "Centro" },
  { label: "→", value: "right center", title: "Centro direita" },
  { label: "↙", value: "left bottom", title: "Base esquerda" },
  { label: "↓", value: "center bottom", title: "Base centro" },
  { label: "↘", value: "right bottom", title: "Base direita" },
];

export function PageHeroEditor({ pageKey, pageTitle }: PageHeroEditorProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<PageHeroConfig>({});
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/content");
      if (res.status === 401) { router.push("/admin/login"); return; }
      const all = await res.json();
      const heroes = all.pageHeroes || {};
      setData(heroes[pageKey] || {});
    } catch { /* ignore */ }
    setLoaded(true);
  }, [pageKey, router]);

  useEffect(() => { load(); }, [load]);

  async function save() {
    setSaving(true);
    try {
      // Fetch current heroes and merge this page's config
      const getRes = await fetch("/api/admin/content");
      const all = await getRes.json();
      const heroes = { ...(all.pageHeroes || {}), [pageKey]: data };

      const res = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "pageHeroes", data: heroes }),
      });
      if (!res.ok) throw new Error();
      setMessage("Guardado!");
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage("Erro ao guardar");
    }
    setSaving(false);
  }

  function update<K extends keyof PageHeroConfig>(key: K, value: PageHeroConfig[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  if (!loaded) return null;

  return (
    <div className="mb-6 border border-linen rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-parchment/50 hover:bg-parchment transition-colors text-left"
      >
        <ImageIcon size={16} className="text-copper shrink-0" />
        <span className="font-sans text-sm font-medium text-espresso flex-1">
          Hero da página — {pageTitle}
        </span>
        {data.enabled && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-copper/10 text-copper font-sans font-medium">
            Activo
          </span>
        )}
        <ChevronDown
          size={16}
          className={`text-stone transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-4 py-4 space-y-4 bg-white">
          {/* Toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.enabled || false}
              onChange={(e) => update("enabled", e.target.checked)}
              className="w-4 h-4 rounded border-linen text-copper focus:ring-copper"
            />
            <span className="text-sm font-sans text-espresso">Mostrar hero nesta página</span>
          </label>

          {data.enabled && (
            <>
              <TextInput
                label="Título"
                value={data.title || ""}
                onChange={(v) => update("title", v)}
                placeholder={pageTitle}
              />
              <TextInput
                label="Subtítulo"
                value={data.subtitle || ""}
                onChange={(v) => update("subtitle", v)}
                placeholder="Opcional"
              />
              <ImagePicker
                label="Imagem de fundo"
                value={data.image || ""}
                onChange={(v) => update("image", v)}
                aspectRatio={21 / 9}
                aspectRatioLabel="21:9 (banner)"
              />
              {data.image && (
                <div className="space-y-1.5">
                  <label className="block text-sm font-sans font-medium text-roast">
                    Ponto focal da imagem
                  </label>
                  <div className="grid grid-cols-3 gap-1 w-32">
                    {POSITION_OPTIONS.map((pos) => (
                      <button
                        key={pos.value}
                        type="button"
                        onClick={() => update("imagePosition", pos.value)}
                        title={pos.title}
                        className={`w-10 h-10 rounded text-xs font-bold transition-colors ${
                          (data.imagePosition || "center center") === pos.value
                            ? "bg-copper text-white"
                            : "bg-linen/50 text-mocha hover:bg-copper/20"
                        }`}
                      >
                        {pos.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-mocha/70">
                    Escolha onde deve ficar o foco da imagem
                  </p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <SizeSelect
                  label="Altura"
                  value={data.height || "medium"}
                  options={HEIGHT_OPTIONS}
                  onChange={(v) => update("height", v as PageHeroConfig["height"])}
                />
                <SizeSelect
                  label="Overlay (escurecimento)"
                  value={String(data.overlayOpacity ?? 50)}
                  options={OVERLAY_OPTIONS}
                  onChange={(v) => update("overlayOpacity", Number(v))}
                />
              </div>
              {/* ─── Personalização de texto ─── */}
              <div className="border-t border-linen pt-4 mt-2">
                <p className="text-xs font-sans font-medium text-mocha mb-3 uppercase tracking-wider">
                  Personalização de texto (opcional)
                </p>
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
                      value={data.titleColor || "#FAF8F5"}
                      onChange={(v) => update("titleColor", v)}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <label className="text-sm font-sans font-medium text-roast">Cor do subtítulo</label>
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
                      value={data.subtitleColor || "#FAF8F5"}
                      onChange={(v) => update("subtitleColor", v)}
                    />
                  </div>

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
                      previewText={data.title || pageTitle}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Save */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={save}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-copper text-white text-sm font-sans font-medium hover:bg-copper/90 transition-colors disabled:opacity-50"
            >
              {saving ? "A guardar..." : "Guardar hero"}
            </button>
            {message && <span className="text-xs text-sage">{message}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
