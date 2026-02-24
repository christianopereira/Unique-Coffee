"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SizeSelect } from "@/components/admin/fields";
import { ChevronDown, Sparkles } from "lucide-react";
import type { SectionAnimation } from "@/types/site-data";

interface SectionEffectsEditorProps {
  sectionKey: string;
  sectionTitle: string;
}

const ANIMATION_TYPES = [
  { label: "Fade Up (predefinido)", value: "fade-up" },
  { label: "Fade In (só opacidade)", value: "fade-in" },
  { label: "Fade Left", value: "fade-left" },
  { label: "Fade Right", value: "fade-right" },
  { label: "Zoom In", value: "zoom-in" },
  { label: "Sem animação", value: "none" },
];

const SPEED_OPTIONS = [
  { label: "Rápida (0.4s)", value: "fast" },
  { label: "Normal (0.7s)", value: "normal" },
  { label: "Lenta (1.2s)", value: "slow" },
];

export function SectionEffectsEditor({ sectionKey, sectionTitle }: SectionEffectsEditorProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<SectionAnimation>({});
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/content");
      if (res.status === 401) { router.push("/admin/login"); return; }
      const all = await res.json();
      const anims = all.sectionAnimations || {};
      setData(anims[sectionKey] || {});
    } catch { /* ignore */ }
    setLoaded(true);
  }, [sectionKey, router]);

  useEffect(() => { load(); }, [load]);

  async function save() {
    setSaving(true);
    try {
      const getRes = await fetch("/api/admin/content");
      const all = await getRes.json();
      const anims = { ...(all.sectionAnimations || {}), [sectionKey]: data };

      const res = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "sectionAnimations", data: anims }),
      });
      if (!res.ok) throw new Error();
      setMessage("Guardado!");
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage("Erro ao guardar");
    }
    setSaving(false);
  }

  function reset() {
    setData({});
  }

  const hasCustom = !!(data.type || data.speed);

  if (!loaded) return null;

  return (
    <div className="mb-6 border border-linen rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-parchment/50 hover:bg-parchment transition-colors text-left"
      >
        <Sparkles size={16} className="text-copper shrink-0" />
        <span className="font-sans text-sm font-medium text-espresso flex-1">
          Animação da secção — {sectionTitle}
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
          <SizeSelect
            label="Tipo de animação"
            value={data.type || "fade-up"}
            options={ANIMATION_TYPES}
            onChange={(v) => setData({ ...data, type: v as SectionAnimation["type"] })}
          />

          <SizeSelect
            label="Velocidade"
            value={data.speed || "normal"}
            options={SPEED_OPTIONS}
            onChange={(v) => setData({ ...data, speed: v as SectionAnimation["speed"] })}
          />

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={save}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-copper text-white text-sm font-sans font-medium hover:bg-copper/90 transition-colors disabled:opacity-50"
            >
              {saving ? "A guardar..." : "Guardar animação"}
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
