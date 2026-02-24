"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ColorPicker } from "@/components/admin/fields";
import { ChevronDown, Navigation } from "lucide-react";
import type { PageHeroConfig } from "@/types/site-data";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarColorsEditorProps {
  pageKey: string;
  pageTitle: string;
}

const FALLBACK_LINKS = ["HOME", "SOBRE NÓS", "CONCEITO", "GRÃOS", "MENU", "SOBREMESAS", "PRODUTOS", "GALERIA", "VISITE-NOS"];

export function NavbarColorsEditor({ pageKey, pageTitle }: NavbarColorsEditorProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<PageHeroConfig>({});
  const [navbarBg, setNavbarBg] = useState<string>("");
  const [navLinks, setNavLinks] = useState<string[]>(FALLBACK_LINKS);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/content", { cache: "no-store" });
      if (res.status === 401) { router.push("/admin/login"); return; }
      const all = await res.json();
      const heroes = all.pageHeroes || {};
      setData(heroes[pageKey] || {});
      // Get navbar desktop bg from colors config
      setNavbarBg(all.colors?.navbarDesktop || "#2C1810");
      // Get actual nav links for preview
      const links = all.nav?.links as NavLink[] | undefined;
      if (links?.length) {
        setNavLinks(links.map((l) => l.label.toUpperCase()));
      }
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
      // Merge only navbar color fields into existing hero config
      const existing = heroes[pageKey] || {};
      const updated = {
        ...existing,
        navLinkColor: data.navLinkColor,
        navActiveLinkColor: data.navActiveLinkColor,
      };
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

  function update<K extends keyof PageHeroConfig>(key: K, value: PageHeroConfig[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  const hasCustom = !!(data.navLinkColor || data.navActiveLinkColor);

  // Determine which link should appear "active" in the preview
  const pageTitleNorm = pageTitle.toLowerCase().replace(/\s+/g, "");
  const activeIndex = navLinks.findIndex(
    (l) => l.toLowerCase().replace(/\s+/g, "") === pageTitleNorm
      || l.toLowerCase().replace(/\s+/g, "").includes(pageTitleNorm)
      || pageTitleNorm.includes(l.toLowerCase().replace(/\s+/g, ""))
  );

  // Preview colors with defaults
  const previewLinkColor = data.navLinkColor || "#4A3428";
  const previewActiveColor = data.navActiveLinkColor || "#B87333";

  if (!loaded) return null;

  return (
    <div className="mb-6 border border-linen rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-parchment/50 hover:bg-parchment transition-colors text-left"
      >
        <Navigation size={16} className="text-copper shrink-0" />
        <span className="font-sans text-sm font-medium text-espresso flex-1">
          Cores da navbar — {pageTitle}
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
          <p className="text-xs text-mocha/70">
            Define as cores dos links da barra de navegação quando o visitante está nesta página.
          </p>

          {/* Color pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <label className="text-sm font-sans font-medium text-roast">Cor dos links</label>
                {data.navLinkColor && (
                  <button
                    onClick={() => update("navLinkColor", undefined)}
                    className="text-[10px] text-mocha hover:text-copper"
                  >
                    (limpar)
                  </button>
                )}
              </div>
              <ColorPicker
                label=""
                value={data.navLinkColor || ""}
                onChange={(v) => update("navLinkColor", v)}
              />
              {!data.navLinkColor && (
                <p className="text-[10px] text-mocha/70 mt-1">Predefinida: roast</p>
              )}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <label className="text-sm font-sans font-medium text-roast">Cor do link activo</label>
                {data.navActiveLinkColor && (
                  <button
                    onClick={() => update("navActiveLinkColor", undefined)}
                    className="text-[10px] text-mocha hover:text-copper"
                  >
                    (limpar)
                  </button>
                )}
              </div>
              <ColorPicker
                label=""
                value={data.navActiveLinkColor || ""}
                onChange={(v) => update("navActiveLinkColor", v)}
              />
              {!data.navActiveLinkColor && (
                <p className="text-[10px] text-mocha/70 mt-1">Predefinida: copper</p>
              )}
            </div>
          </div>

          {/* Live preview */}
          <div className="border-t border-linen pt-4 mt-2">
            <p className="text-xs font-sans font-medium text-mocha mb-2 uppercase tracking-wider">
              Preview da navbar
            </p>
            <div
              className="rounded-lg overflow-hidden border border-linen"
              style={{ backgroundColor: navbarBg }}
            >
              <div className="px-4 py-3 flex items-center gap-6 overflow-x-auto">
                {navLinks.map((link, i) => (
                  <span
                    key={link}
                    className="text-[10px] font-sans font-medium uppercase tracking-[0.12em] whitespace-nowrap transition-colors"
                    style={{
                      color: i === activeIndex ? previewActiveColor : previewLinkColor,
                    }}
                  >
                    {link}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-[10px] text-mocha/50 mt-1">
              O link &ldquo;{activeIndex >= 0 ? navLinks[activeIndex] : pageTitle.toUpperCase()}&rdquo; aparece com a cor activa
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={save}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-copper text-white text-sm font-sans font-medium hover:bg-copper/90 transition-colors disabled:opacity-50"
            >
              {saving ? "A guardar..." : "Guardar cores"}
            </button>
            {hasCustom && (
              <button
                onClick={() => {
                  update("navLinkColor", undefined);
                  update("navActiveLinkColor", undefined);
                }}
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
