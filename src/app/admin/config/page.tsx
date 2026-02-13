"use client";

import { useState, useEffect } from "react";
import { TextInput, ImagePicker, FontSelect, SizeSelect, SectionHeader } from "@/components/admin/fields";
import { DISPLAY_FONTS, BODY_FONTS, UI_FONTS, SIZE_PRESETS, DEFAULT_TYPOGRAPHY } from "@/lib/font-options";
import type { TypographyConfig } from "@/types/site-data";

interface NavLink {
  label: string;
  href: string;
}

const TOGGLEABLE_PAGES = [
  { route: "/sobre", label: "Sobre Nós" },
  { route: "/conceito", label: "Conceito" },
  { route: "/graos", label: "Grãos" },
  { route: "/menu", label: "Menu" },
  { route: "/sobremesas", label: "Sobremesas" },
  { route: "/equipa", label: "Equipa" },
  { route: "/galeria", label: "Galeria" },
  { route: "/contacto", label: "Contacto" },
];

export default function AdminConfigPage() {
  const [brand, setBrand] = useState({ name: "", tagline: "", url: "", logo: "", favicon: "", ogImage: "" });
  const [footer, setFooter] = useState({ copyright: "", location: "" });
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [typography, setTypography] = useState<TypographyConfig>(DEFAULT_TYPOGRAPHY);
  const [hiddenPages, setHiddenPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/content");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setBrand({ name: "", tagline: "", url: "", logo: "", favicon: "", ogImage: "", ...data.brand });
        setFooter(data.footer);
        setNavLinks(data.nav.links);
        if (data.typography) {
          setTypography({ ...DEFAULT_TYPOGRAPHY, ...data.typography });
        }
        if (data.hiddenPages) {
          setHiddenPages(data.hiddenPages);
        }
      } catch {
        setMessage({ type: "error", text: "Erro ao carregar dados" });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function saveSection(section: string, data: unknown) {
    const res = await fetch("/api/admin/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, data }),
    });
    if (!res.ok) throw new Error("Erro ao guardar");
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      await Promise.all([
        saveSection("brand", brand),
        saveSection("footer", footer),
        saveSection("nav", { links: navLinks }),
        saveSection("typography", typography),
        saveSection("hiddenPages", hiddenPages),
      ]);
      setMessage({ type: "success", text: "Guardado com sucesso!" });
      setTimeout(() => setMessage(null), 3000);
    } catch {
      setMessage({ type: "error", text: "Erro ao guardar" });
    } finally {
      setSaving(false);
    }
  }

  function updateNavLink(index: number, field: keyof NavLink, value: string) {
    const updated = [...navLinks];
    updated[index] = { ...updated[index], [field]: value };
    setNavLinks(updated);
  }

  function addNavLink() {
    setNavLinks([...navLinks, { label: "", href: "" }]);
  }

  function removeNavLink(index: number) {
    setNavLinks(navLinks.filter((_, i) => i !== index));
  }

  if (loading) return <div className="text-mocha py-12 text-center">A carregar...</div>;

  return (
    <>
      <SectionHeader title="Configurações" description="Nome, tagline, tipografia, footer e navegação" />

      <div className="space-y-8">
        <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-4">
          <h2 className="font-sans font-semibold text-espresso">Marca</h2>
          <TextInput label="Nome" value={brand.name} onChange={(v) => setBrand({ ...brand, name: v })} />
          <TextInput label="Tagline" value={brand.tagline} onChange={(v) => setBrand({ ...brand, tagline: v })} />
          <TextInput label="URL" value={brand.url} onChange={(v) => setBrand({ ...brand, url: v })} />
        </div>

        <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-6">
          <h2 className="font-sans font-semibold text-espresso">Imagens da Marca</h2>
          <div className="space-y-2">
            <ImagePicker
              label="Logo (usada na navbar e admin)"
              value={brand.logo || ""}
              onChange={(v) => setBrand({ ...brand, logo: v })}
            />
            <p className="text-xs text-mocha/70">Tamanho recomendado: 800x800px ou 1000x400px. Formato: SVG, PNG com fundo transparente.</p>
          </div>
          <div className="space-y-2">
            <ImagePicker
              label="Favicon (ícone do separador do browser)"
              value={brand.favicon || ""}
              onChange={(v) => setBrand({ ...brand, favicon: v })}
              aspectRatio={1}
              aspectRatioLabel="1:1"
            />
            <p className="text-xs text-mocha/70">Tamanho recomendado: 32x32px ou 64x64px. Formato: PNG, ICO. Quadrado.</p>
          </div>
          <div className="space-y-2">
            <ImagePicker
              label="OG Image (imagem para partilhas em redes sociais)"
              value={brand.ogImage || ""}
              onChange={(v) => setBrand({ ...brand, ogImage: v })}
              aspectRatio={1200 / 630}
              aspectRatioLabel="1200:630"
            />
            <p className="text-xs text-mocha/70">Tamanho recomendado: 1200x630px. Formato: PNG, JPG. Aparece quando o site é partilhado no Facebook, WhatsApp, etc.</p>
          </div>
        </div>

        {/* Tipografia */}
        <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-4">
          <h2 className="font-sans font-semibold text-espresso">Tipografia</h2>
          <p className="text-xs text-mocha">Escolha os tipos de letra e tamanhos do site.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FontSelect
              label="Títulos (Display)"
              value={typography.fonts.display}
              options={DISPLAY_FONTS}
              onChange={(v) => setTypography({
                ...typography,
                fonts: { ...typography.fonts, display: v },
              })}
              previewText="O Sabor Único"
            />
            <FontSelect
              label="Texto (Body)"
              value={typography.fonts.body}
              options={BODY_FONTS}
              onChange={(v) => setTypography({
                ...typography,
                fonts: { ...typography.fonts, body: v },
              })}
              previewText="Um espaço pensado para quem valoriza a pausa."
            />
            <FontSelect
              label="Navegação / UI"
              value={typography.fonts.ui}
              options={UI_FONTS}
              onChange={(v) => setTypography({
                ...typography,
                fonts: { ...typography.fonts, ui: v },
              })}
              previewText="SOBRE NÓS   MENU   CONTACTO"
            />
          </div>

          <div className="border-t border-linen pt-4 mt-4">
            <h3 className="text-sm font-sans font-medium text-roast mb-3">Tamanhos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SizeSelect
                label="Título Hero"
                value={typography.sizes.heroTitle}
                options={SIZE_PRESETS.heroTitle}
                onChange={(v) => setTypography({
                  ...typography,
                  sizes: { ...typography.sizes, heroTitle: v },
                })}
              />
              <SizeSelect
                label="Título de Secção"
                value={typography.sizes.sectionTitle}
                options={SIZE_PRESETS.sectionTitle}
                onChange={(v) => setTypography({
                  ...typography,
                  sizes: { ...typography.sizes, sectionTitle: v },
                })}
              />
              <SizeSelect
                label="Subtítulo"
                value={typography.sizes.subtitle}
                options={SIZE_PRESETS.subtitle}
                onChange={(v) => setTypography({
                  ...typography,
                  sizes: { ...typography.sizes, subtitle: v },
                })}
              />
              <SizeSelect
                label="Texto geral"
                value={typography.sizes.body}
                options={SIZE_PRESETS.body}
                onChange={(v) => setTypography({
                  ...typography,
                  sizes: { ...typography.sizes, body: v },
                })}
              />
            </div>
          </div>
        </div>

        {/* Páginas Visíveis */}
        <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-4">
          <h2 className="font-sans font-semibold text-espresso">Páginas Visíveis</h2>
          <p className="text-xs text-mocha">Desactive as páginas que quer ocultar temporariamente do site. A página ficará invisível na navegação e inacessível por URL.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TOGGLEABLE_PAGES.map((page) => {
              const isHidden = hiddenPages.includes(page.route);
              return (
                <label
                  key={page.route}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-linen hover:border-copper/50 transition-colors cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={!isHidden}
                    onChange={() => {
                      if (isHidden) {
                        setHiddenPages(hiddenPages.filter((r) => r !== page.route));
                      } else {
                        setHiddenPages([...hiddenPages, page.route]);
                      }
                    }}
                    className="w-4 h-4 accent-copper rounded"
                  />
                  <span className={`text-sm font-sans ${isHidden ? "text-stone line-through" : "text-espresso"}`}>
                    {page.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-4">
          <h2 className="font-sans font-semibold text-espresso">Footer</h2>
          <TextInput label="Copyright" value={footer.copyright} onChange={(v) => setFooter({ ...footer, copyright: v })} />
          <TextInput label="Localização" value={footer.location} onChange={(v) => setFooter({ ...footer, location: v })} />
        </div>

        <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-4">
          <h2 className="font-sans font-semibold text-espresso">Links de Navegação</h2>
          {navLinks.map((link, i) => (
            <div key={i} className="flex gap-3 items-end">
              <div className="flex-1">
                <TextInput label="Label" value={link.label} onChange={(v) => updateNavLink(i, "label", v)} />
              </div>
              <div className="flex-1">
                <TextInput label="URL" value={link.href} onChange={(v) => updateNavLink(i, "href", v)} />
              </div>
              <button onClick={() => removeNavLink(i)} className="text-red-400 hover:text-red-600 text-sm px-2 py-2.5 shrink-0">✕</button>
            </div>
          ))}
          <button onClick={addNavLink} className="text-sm text-copper hover:text-copper/80 font-medium">
            + Adicionar link
          </button>
        </div>

        <div className="flex items-center gap-4 pt-6 border-t border-linen">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-copper text-white font-sans font-medium hover:bg-copper/90 transition-colors disabled:opacity-50"
          >
            {saving ? "A guardar..." : "Guardar alterações"}
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
