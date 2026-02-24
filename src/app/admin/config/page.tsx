"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { GripVertical } from "lucide-react";
import { TextInput, ImagePicker, FontSelect, SizeSelect, ColorPicker, SectionHeader, VariantSelect, ButtonsPreview } from "@/components/admin/fields";
import { DISPLAY_FONTS, BODY_FONTS, UI_FONTS, SIZE_PRESETS, DEFAULT_TYPOGRAPHY } from "@/lib/font-options";
import { COLOR_PRESETS, DEFAULT_COLORS } from "@/lib/color-options";
import { derivePalette } from "@/lib/color-utils";
import type { TypographyConfig, ColorsConfig, ButtonsConfig } from "@/types/site-data";

const DEFAULT_BUTTONS: ButtonsConfig = { defaultVariant: "primary", borderRadius: "8px" };

interface NavLink {
  label: string;
  href: string;
}

const TOGGLEABLE_PAGES = [
  { route: "/sobre", label: "Sobre Nós" },
  { route: "/conceito", label: "Conceito" },
  { route: "/graos", label: "Grãos" },
  { route: "/produtos", label: "Nossos Produtos" },
  { route: "/menu", label: "Menu" },
  { route: "/sobremesas", label: "Sobremesas" },
  { route: "/equipa", label: "Equipa" },
  { route: "/galeria", label: "Galeria" },
  { route: "/contacto", label: "Contacto" },
];

const TABS = [
  { id: "marca", label: "Marca" },
  { id: "aparencia", label: "Aparência" },
  { id: "paginas", label: "Páginas" },
  { id: "navegacao", label: "Navegação" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AdminConfigPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("marca");
  const [brand, setBrand] = useState({ name: "", tagline: "", url: "", logo: "", favicon: "", ogImage: "" });
  const [footer, setFooter] = useState({ copyright: "", location: "" });
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [typography, setTypography] = useState<TypographyConfig>(DEFAULT_TYPOGRAPHY);
  const [colors, setColors] = useState<ColorsConfig>(DEFAULT_COLORS);
  const [buttons, setButtons] = useState<ButtonsConfig>(DEFAULT_BUTTONS);
  const [hiddenPages, setHiddenPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/content", { cache: "no-store" });
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        if (!res.ok) throw new Error();
        const data = await res.json();
        setBrand({ name: "", tagline: "", url: "", logo: "", favicon: "", ogImage: "", ...data.brand });
        setFooter(data.footer);
        setNavLinks(data.nav.links);
        if (data.typography) {
          setTypography({ ...DEFAULT_TYPOGRAPHY, ...data.typography });
        }
        if (data.colors) {
          setColors({ ...DEFAULT_COLORS, ...data.colors });
        }
        if (data.buttons) {
          setButtons({ ...DEFAULT_BUTTONS, ...data.buttons });
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
        saveSection("colors", colors),
        saveSection("buttons", buttons),
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

  // Drag & drop reorder
  const dragIdx = useRef<number | null>(null);
  const [dropIdx, setDropIdx] = useState<number | null>(null);

  function handleDragStart(index: number) {
    dragIdx.current = index;
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    if (dragIdx.current !== null && dragIdx.current !== index) {
      setDropIdx(index);
    }
  }

  function handleDrop(index: number) {
    if (dragIdx.current === null || dragIdx.current === index) {
      setDropIdx(null);
      return;
    }
    const updated = [...navLinks];
    const [moved] = updated.splice(dragIdx.current, 1);
    updated.splice(index, 0, moved);
    setNavLinks(updated);
    dragIdx.current = null;
    setDropIdx(null);
  }

  function handleDragEnd() {
    dragIdx.current = null;
    setDropIdx(null);
  }

  if (loading) return <div className="text-mocha py-12 text-center">A carregar...</div>;

  return (
    <>
      <SectionHeader title="Configurações" description="Marca, aparência, páginas e navegação" />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-linen">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-sans font-medium transition-colors relative ${
              activeTab === tab.id
                ? "text-copper"
                : "text-mocha hover:text-espresso"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-copper rounded-t" />
            )}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {/* ── Tab: Marca ── */}
        {activeTab === "marca" && (
          <>
            <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-4">
              <h2 className="font-sans font-semibold text-espresso">Informações</h2>
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
          </>
        )}

        {/* ── Tab: Aparência ── */}
        {activeTab === "aparencia" && (
          <>
            {/* Cores */}
            <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-4">
              <h2 className="font-sans font-semibold text-espresso">Cores</h2>
              <p className="text-xs text-mocha">Escolha as cores base do site. As cores secundárias são derivadas automaticamente.</p>

              <div className="flex flex-wrap gap-2">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setColors(preset.colors)}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                      colors.dark === preset.colors.dark && colors.accent === preset.colors.accent && colors.background === preset.colors.background
                        ? "border-copper bg-copper/10 text-copper font-medium"
                        : "border-linen text-mocha hover:border-copper/50"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full inline-block border border-linen" style={{ backgroundColor: preset.colors.dark }} />
                      <span className="w-3 h-3 rounded-full inline-block border border-linen" style={{ backgroundColor: preset.colors.accent }} />
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <ColorPicker
                  label="Cor escura base"
                  value={colors.dark}
                  onChange={(v) => setColors({ ...colors, dark: v })}
                />
                <ColorPicker
                  label="Cor de destaque (botoes, links)"
                  value={colors.accent}
                  onChange={(v) => setColors({ ...colors, accent: v })}
                />
                <ColorPicker
                  label="Cor de fundo"
                  value={colors.background}
                  onChange={(v) => setColors({ ...colors, background: v })}
                />
              </div>

              <div className="border-t border-linen pt-4 mt-2">
                <p className="text-xs text-mocha mb-3">Personalizacao avancada (opcional &mdash; deixe vazio para usar a cor escura base):</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <ColorPicker
                      label="Navbar (fundo mobile)"
                      value={colors.navbar || ""}
                      onChange={(v) => setColors({ ...colors, navbar: v || undefined })}
                    />
                    {colors.navbar && (
                      <button onClick={() => setColors({ ...colors, navbar: undefined })} className="text-[10px] text-copper hover:underline">
                        Limpar (usar cor base)
                      </button>
                    )}
                  </div>
                  <div className="space-y-1">
                    <ColorPicker
                      label="Navbar (fundo desktop)"
                      value={colors.navbarDesktop || ""}
                      onChange={(v) => setColors({ ...colors, navbarDesktop: v || undefined })}
                    />
                    {colors.navbarDesktop && (
                      <button onClick={() => setColors({ ...colors, navbarDesktop: undefined })} className="text-[10px] text-copper hover:underline">
                        Limpar (usar cor clara)
                      </button>
                    )}
                  </div>
                  <div className="space-y-1">
                    <ColorPicker
                      label="Footer (fundo)"
                      value={colors.footer || ""}
                      onChange={(v) => setColors({ ...colors, footer: v || undefined })}
                    />
                    {colors.footer && (
                      <button onClick={() => setColors({ ...colors, footer: undefined })} className="text-[10px] text-copper hover:underline">
                        Limpar (usar cor base)
                      </button>
                    )}
                  </div>
                  <div className="space-y-1">
                    <ColorPicker
                      label="Texto principal"
                      value={colors.text || ""}
                      onChange={(v) => setColors({ ...colors, text: v || undefined })}
                    />
                    {colors.text && (
                      <button onClick={() => setColors({ ...colors, text: undefined })} className="text-[10px] text-copper hover:underline">
                        Limpar (usar cor base)
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Overrides de cores derivadas */}
              <div className="border-t border-linen pt-4 mt-2">
                <p className="text-xs text-mocha mb-3">Personalização das cores derivadas (opcional — deixe vazio para usar a derivação automática):</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {([
                    { key: "roast", label: "Roast" },
                    { key: "mocha", label: "Mocha" },
                    { key: "goldSoft", label: "Gold" },
                    { key: "warmWhite", label: "Claro" },
                    { key: "parchment", label: "Neutro" },
                    { key: "sage", label: "Sage" },
                    { key: "stone", label: "Stone" },
                    { key: "linen", label: "Linen" },
                  ] as const).map(({ key, label }) => (
                    <div key={key} className="space-y-1">
                      <ColorPicker
                        label={label}
                        value={(colors as unknown as Record<string, string | undefined>)[key] || ""}
                        onChange={(v) => setColors({ ...colors, [key]: v || undefined })}
                      />
                      {(colors as unknown as Record<string, string | undefined>)[key] && (
                        <button onClick={() => setColors({ ...colors, [key]: undefined })} className="text-[10px] text-copper hover:underline">
                          Limpar (automática)
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview da paleta derivada */}
              {(() => {
                const palette = derivePalette(colors.dark, colors.accent, colors.background, {
                  navbar: colors.navbar,
                  navbarDesktop: colors.navbarDesktop,
                  footer: colors.footer,
                  text: colors.text,
                  roast: colors.roast,
                  mocha: colors.mocha,
                  goldSoft: colors.goldSoft,
                  warmWhite: colors.warmWhite,
                  parchment: colors.parchment,
                  sage: colors.sage,
                  stone: colors.stone,
                  linen: colors.linen,
                });
                const swatches = [
                  { name: "Escura", color: palette.espresso },
                  { name: "Roast", color: palette.roast },
                  { name: "Mocha", color: palette.mocha },
                  { name: "Destaque", color: palette.copper },
                  { name: "Gold", color: palette["gold-soft"] },
                  { name: "Fundo", color: palette.cream },
                  { name: "Claro", color: palette["warm-white"] },
                  { name: "Neutro", color: palette.parchment },
                  { name: "Stone", color: palette.stone },
                  { name: "Linen", color: palette.linen },
                  ...(palette["navbar-bg"] ? [{ name: "Navbar", color: palette["navbar-bg"] }] : []),
                  ...(palette["navbar-desktop-bg"] ? [{ name: "Nav Desktop", color: palette["navbar-desktop-bg"] }] : []),
                  ...(palette["footer-bg"] ? [{ name: "Footer", color: palette["footer-bg"] }] : []),
                  ...(palette["text-main"] ? [{ name: "Texto", color: palette["text-main"] }] : []),
                ];
                return (
                  <div className="border-t border-linen pt-3 mt-2">
                    <p className="text-xs text-mocha mb-2">Paleta resultante:</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {swatches.map((s) => (
                        <div key={s.name} className="text-center">
                          <button
                            type="button"
                            className="w-8 h-8 rounded-lg border border-linen cursor-pointer hover:ring-2 hover:ring-copper/50 transition-all"
                            style={{ backgroundColor: s.color }}
                            title={`${s.name}: ${s.color} — clique para copiar`}
                            onClick={() => {
                              navigator.clipboard.writeText(s.color);
                              setMessage({ type: "success", text: `Cor copiada: ${s.color}` });
                              setTimeout(() => setMessage(null), 2000);
                            }}
                          />
                          <span className="text-[10px] text-mocha block">{s.name}</span>
                          <span className="text-[9px] text-stone block">{s.color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
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

            {/* Botões */}
            <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-4">
              <h2 className="font-sans font-semibold text-espresso">Botões</h2>
              <p className="text-xs text-mocha">Configurações globais dos botões do site.</p>
              <ButtonsPreview colors={buttons} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <VariantSelect
                  label="Variante predefinida"
                  value={buttons.defaultVariant || "primary"}
                  onChange={(v) => setButtons({ ...buttons, defaultVariant: (v || "primary") as ButtonsConfig["defaultVariant"] })}
                  buttonColors={buttons}
                />
                <SizeSelect
                  label="Arredondamento (border-radius)"
                  value={buttons.borderRadius || "8px"}
                  options={[
                    { label: "Nenhum (recto)", value: "0px" },
                    { label: "Ligeiro (4px)", value: "4px" },
                    { label: "Médio (8px)", value: "8px" },
                    { label: "Arredondado (16px)", value: "16px" },
                    { label: "Pílula (9999px)", value: "9999px" },
                  ]}
                  onChange={(v) => setButtons({ ...buttons, borderRadius: v })}
                />
              </div>

              <div className="border-t border-linen pt-4 mt-2">
                <p className="text-xs text-mocha mb-3">Cores dos botões (opcional — deixe vazio para usar a cor de destaque):</p>

                <h3 className="text-xs font-sans font-medium text-roast mb-2 mt-3">Primário (preenchido)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <ColorPicker label="Fundo" value={buttons.primaryBg || ""} onChange={(v) => setButtons({ ...buttons, primaryBg: v || undefined })} />
                    {buttons.primaryBg && <button onClick={() => setButtons({ ...buttons, primaryBg: undefined })} className="text-[10px] text-copper hover:underline">Limpar</button>}
                  </div>
                  <div className="space-y-1">
                    <ColorPicker label="Texto" value={buttons.primaryText || ""} onChange={(v) => setButtons({ ...buttons, primaryText: v || undefined })} />
                    {buttons.primaryText && <button onClick={() => setButtons({ ...buttons, primaryText: undefined })} className="text-[10px] text-copper hover:underline">Limpar</button>}
                  </div>
                </div>

                <h3 className="text-xs font-sans font-medium text-roast mb-2 mt-4">Secundário (contorno)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <ColorPicker label="Borda" value={buttons.secondaryBorder || ""} onChange={(v) => setButtons({ ...buttons, secondaryBorder: v || undefined })} />
                    {buttons.secondaryBorder && <button onClick={() => setButtons({ ...buttons, secondaryBorder: undefined })} className="text-[10px] text-copper hover:underline">Limpar</button>}
                  </div>
                  <div className="space-y-1">
                    <ColorPicker label="Texto" value={buttons.secondaryText || ""} onChange={(v) => setButtons({ ...buttons, secondaryText: v || undefined })} />
                    {buttons.secondaryText && <button onClick={() => setButtons({ ...buttons, secondaryText: undefined })} className="text-[10px] text-copper hover:underline">Limpar</button>}
                  </div>
                </div>

                <h3 className="text-xs font-sans font-medium text-roast mb-2 mt-4">Ghost (sublinhado)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <ColorPicker label="Texto / Underline" value={buttons.ghostText || ""} onChange={(v) => setButtons({ ...buttons, ghostText: v || undefined })} />
                    {buttons.ghostText && <button onClick={() => setButtons({ ...buttons, ghostText: undefined })} className="text-[10px] text-copper hover:underline">Limpar</button>}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── Tab: Páginas ── */}
        {activeTab === "paginas" && (
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
        )}

        {/* ── Tab: Navegação ── */}
        {activeTab === "navegacao" && (
          <>
            <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-4">
              <h2 className="font-sans font-semibold text-espresso">Footer</h2>
              <TextInput label="Copyright" value={footer.copyright} onChange={(v) => setFooter({ ...footer, copyright: v })} />
              <TextInput label="Localização" value={footer.location} onChange={(v) => setFooter({ ...footer, location: v })} />
            </div>

            <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-4">
              <h2 className="font-sans font-semibold text-espresso">Links de Navegação</h2>
              <p className="text-xs text-mocha">Arraste o ícone ⠿ para reordenar os links.</p>
              {navLinks.map((link, i) => (
                <div
                  key={i}
                  draggable
                  onDragStart={() => handleDragStart(i)}
                  onDragOver={(e) => handleDragOver(e, i)}
                  onDrop={() => handleDrop(i)}
                  onDragEnd={handleDragEnd}
                  className={`flex gap-3 items-end transition-all ${
                    dropIdx === i ? "border-t-2 border-copper pt-1" : ""
                  }`}
                >
                  <div className="cursor-grab active:cursor-grabbing text-stone hover:text-copper transition-colors py-2.5 shrink-0" title="Arrastar para reordenar">
                    <GripVertical size={18} />
                  </div>
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
          </>
        )}

        {/* Save button — always visible */}
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
