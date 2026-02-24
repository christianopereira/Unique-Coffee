"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ColorPicker } from "@/components/admin/fields";
import { ChevronDown, PaintBucket } from "lucide-react";
import type { PageHeroConfig } from "@/types/site-data";

interface PageBgEditorProps {
  pageKey: string;
  pageTitle: string;
}

export function PageBgEditor({ pageKey, pageTitle }: PageBgEditorProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pageBg, setPageBg] = useState<string>("");
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/content", { cache: "no-store" });
      if (res.status === 401) { router.push("/admin/login"); return; }
      const all = await res.json();
      const heroes = all.pageHeroes || {};
      const cfg = heroes[pageKey] as PageHeroConfig | undefined;
      setPageBg(cfg?.pageBg || "");
    } catch { /* ignore */ }
    setLoaded(true);
  }, [pageKey, router]);

  useEffect(() => { load(); }, [load]);

  async function save() {
    setSaving(true);
    try {
      const getRes = await fetch("/api/admin/content", { cache: "no-store" });
      const all = await getRes.json();
      const heroes = all.pageHeroes || {};
      const existing = heroes[pageKey] || {};
      const updated = { ...existing, pageBg: pageBg || undefined };
      const merged = { ...heroes, [pageKey]: updated };

      const res = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "pageHeroes", data: merged }),
      });
      if (!res.ok) throw new Error();
      setMessage("Guardado!");
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage("Erro ao guardar");
    }
    setSaving(false);
  }

  if (!loaded) return null;

  return (
    <div className="mb-6 border border-linen rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-parchment/50 hover:bg-parchment transition-colors text-left"
      >
        <PaintBucket size={16} className="text-copper shrink-0" />
        <span className="font-sans text-sm font-medium text-espresso flex-1">
          Fundo da página — {pageTitle}
        </span>
        {pageBg && (
          <span className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full border border-linen"
              style={{ backgroundColor: pageBg }}
            />
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-copper/10 text-copper font-sans font-medium">
              Personalizado
            </span>
          </span>
        )}
        <ChevronDown
          size={16}
          className={`text-stone transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-4 py-4 space-y-4 bg-white">
          <p className="text-xs text-mocha/70">
            Define a cor de fundo de toda a página (por baixo de todas as secções).
            Deixe vazio para usar o fundo predefinido da página.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <label className="text-sm font-sans font-medium text-roast">Cor de fundo</label>
                {pageBg && (
                  <button
                    onClick={() => setPageBg("")}
                    className="text-[10px] text-mocha hover:text-copper"
                  >
                    (limpar)
                  </button>
                )}
              </div>
              <ColorPicker
                label=""
                value={pageBg}
                onChange={setPageBg}
              />
              {!pageBg && (
                <p className="text-[10px] text-mocha/70 mt-1">Predefinido: fundo da secção principal</p>
              )}
            </div>

            {/* Preview */}
            {pageBg && (
              <div className="w-24 h-16 rounded-lg border border-linen flex items-center justify-center text-[10px] text-mocha/60 font-sans"
                style={{ backgroundColor: pageBg }}>
                preview
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={save}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-copper text-white text-sm font-sans font-medium hover:bg-copper/90 transition-colors disabled:opacity-50"
            >
              {saving ? "A guardar..." : "Guardar fundo"}
            </button>
            {pageBg && (
              <button
                onClick={() => setPageBg("")}
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
