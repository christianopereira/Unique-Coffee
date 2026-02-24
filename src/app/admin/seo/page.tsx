"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TextInput, TextArea, SectionHeader } from "@/components/admin/fields";
import { Globe, FileText, Search } from "lucide-react";
import type { SeoConfig } from "@/types/site-data";

const DEFAULT_SEO: SeoConfig = {
  global: {
    title: "Unique Coffee — Cafeteria Premium em Caldas da Rainha",
    description:
      "Café de especialidade, ambiente sofisticado e tranquilo em Caldas da Rainha. Um espaço pensado para quem valoriza a pausa, o sabor e os pequenos detalhes.",
    keywords: [
      "café especialidade Caldas da Rainha",
      "cafeteria premium Portugal",
      "unique coffee",
      "melhor café Caldas da Rainha",
    ],
  },
  pages: {},
  googleVerification: "",
};

const PAGES = [
  { route: "/", label: "Homepage" },
  { route: "/sobre", label: "Sobre Nós" },
  { route: "/conceito", label: "Conceito" },
  { route: "/graos", label: "Grãos" },
  { route: "/menu", label: "Menu" },
  { route: "/sobremesas", label: "Sobremesas" },
  { route: "/equipa", label: "Equipa" },
  { route: "/galeria", label: "Galeria" },
  { route: "/contacto", label: "Contacto" },
];

export default function AdminSeoPage() {
  const router = useRouter();
  const [seo, setSeo] = useState<SeoConfig>(DEFAULT_SEO);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"global" | "pages" | "tools">("global");

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
        if (data.seo) {
          setSeo({ ...DEFAULT_SEO, ...data.seo, global: { ...DEFAULT_SEO.global, ...data.seo?.global } });
        }
      } catch {
        setMessage({ type: "error", text: "Erro ao carregar dados" });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "seo", data: seo }),
      });
      if (!res.ok) throw new Error();
      setMessage({ type: "success", text: "Guardado com sucesso!" });
      setTimeout(() => setMessage(null), 3000);
    } catch {
      setMessage({ type: "error", text: "Erro ao guardar" });
    } finally {
      setSaving(false);
    }
  }

  function updatePageSeo(route: string, field: "title" | "description", value: string) {
    setSeo({
      ...seo,
      pages: {
        ...seo.pages,
        [route]: { ...(seo.pages[route] || { title: "", description: "" }), [field]: value },
      },
    });
  }

  function updateKeywords(value: string) {
    const keywords = value.split(",").map((k) => k.trim()).filter(Boolean);
    setSeo({ ...seo, global: { ...seo.global, keywords } });
  }

  if (loading) return <div className="text-mocha py-12 text-center">A carregar...</div>;

  const TABS = [
    { id: "global" as const, label: "SEO Global", icon: Globe },
    { id: "pages" as const, label: "Por Página", icon: FileText },
    { id: "tools" as const, label: "Ferramentas", icon: Search },
  ];

  return (
    <>
      <SectionHeader title="SEO" description="Optimização para motores de busca (Google, Bing, etc.)" />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-linen">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-sans font-medium transition-colors relative ${
                activeTab === tab.id ? "text-copper" : "text-mocha hover:text-espresso"
              }`}
            >
              <Icon size={15} />
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-copper rounded-t" />
              )}
            </button>
          );
        })}
      </div>

      <div className="space-y-6">
        {/* ── Tab: SEO Global ── */}
        {activeTab === "global" && (
          <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-4">
            <h2 className="font-sans font-semibold text-espresso">Meta Tags Globais</h2>
            <p className="text-xs text-mocha">
              Estas são as informações que aparecem no Google quando alguém pesquisa pelo site.
            </p>

            <TextInput
              label="Título do site (aparece na aba do browser e no Google)"
              value={seo.global.title}
              onChange={(v) => setSeo({ ...seo, global: { ...seo.global, title: v } })}
              placeholder="Unique Coffee — Cafeteria Premium em Caldas da Rainha"
            />
            <div className="text-xs text-mocha/70 -mt-2">
              {seo.global.title.length}/60 caracteres (ideal: 50-60)
            </div>

            <TextArea
              label="Descrição do site (aparece no Google abaixo do título)"
              value={seo.global.description}
              onChange={(v) => setSeo({ ...seo, global: { ...seo.global, description: v } })}
              rows={3}
              placeholder="Café de especialidade em Caldas da Rainha..."
            />
            <div className="text-xs text-mocha/70 -mt-2">
              {seo.global.description.length}/160 caracteres (ideal: 150-160)
            </div>

            <TextArea
              label="Palavras-chave (separadas por vírgula)"
              value={seo.global.keywords.join(", ")}
              onChange={updateKeywords}
              rows={3}
              placeholder="café especialidade Caldas da Rainha, cafeteria premium Portugal, ..."
            />
            <div className="text-xs text-mocha/70 -mt-2">
              {seo.global.keywords.length} palavras-chave
            </div>

            {/* Preview Google */}
            <div className="border-t border-linen pt-4 mt-4">
              <p className="text-xs text-mocha mb-3 font-sans font-medium">Preview no Google:</p>
              <div className="bg-white rounded-lg p-4 border border-linen max-w-xl">
                <p className="text-[13px] text-green-700 font-sans">uniquecoffee.pt</p>
                <p className="text-lg text-blue-700 font-sans leading-snug hover:underline cursor-default">
                  {seo.global.title || "Título do site"}
                </p>
                <p className="text-sm text-gray-600 font-sans leading-relaxed mt-0.5">
                  {seo.global.description.slice(0, 160) || "Descrição do site..."}
                  {seo.global.description.length > 160 && "..."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Por Página ── */}
        {activeTab === "pages" && (
          <div className="space-y-4">
            <p className="text-xs text-mocha">
              Personalize o título e descrição de cada página. Se deixar vazio, será usado o valor global.
            </p>

            {PAGES.map((page) => {
              const pageSeo = seo.pages[page.route] || { title: "", description: "" };
              return (
                <div key={page.route} className="p-4 bg-warm-white rounded-xl border border-linen space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-semibold text-espresso text-sm">{page.label}</span>
                    <span className="text-xs text-stone font-mono">{page.route}</span>
                  </div>
                  <TextInput
                    label="Título (aparece no Google)"
                    value={pageSeo.title}
                    onChange={(v) => updatePageSeo(page.route, "title", v)}
                    placeholder={`Ex: ${page.label} | Unique Coffee`}
                  />
                  <TextArea
                    label="Descrição"
                    value={pageSeo.description}
                    onChange={(v) => updatePageSeo(page.route, "description", v)}
                    rows={2}
                    placeholder="Descrição curta desta página..."
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* ── Tab: Ferramentas ── */}
        {activeTab === "tools" && (
          <div className="space-y-6">
            <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-4">
              <h2 className="font-sans font-semibold text-espresso">Google Search Console</h2>
              <p className="text-xs text-mocha">
                Para verificar o site no Google Search Console, cole aqui o código de verificação.
                Encontra-o em: Search Console → Definições → Verificação de propriedade → Tag HTML.
              </p>
              <TextInput
                label="Código de verificação (apenas o valor do content)"
                value={seo.googleVerification || ""}
                onChange={(v) => setSeo({ ...seo, googleVerification: v })}
                placeholder="Ex: abc123xyz..."
              />
              <p className="text-xs text-mocha/70">
                Copie apenas o valor entre aspas do atributo content, não a tag completa.
              </p>
            </div>

            <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-4">
              <h2 className="font-sans font-semibold text-espresso">Links Úteis</h2>
              <div className="space-y-2">
                <a
                  href="https://search.google.com/search-console"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-copper hover:text-copper/80 transition-colors"
                >
                  <Search size={14} />
                  Google Search Console
                </a>
                <a
                  href={`https://www.google.com/search?q=site:uniquecoffee.pt`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-copper hover:text-copper/80 transition-colors"
                >
                  <Globe size={14} />
                  Ver páginas indexadas no Google
                </a>
                <a
                  href="https://uniquecoffee.pt/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-copper hover:text-copper/80 transition-colors"
                >
                  <FileText size={14} />
                  Ver sitemap.xml
                </a>
              </div>
            </div>

            <div className="p-5 bg-cream/80 rounded-xl border border-linen space-y-3">
              <h2 className="font-sans font-semibold text-espresso text-sm">Como configurar o Google Search Console</h2>
              <ol className="text-xs text-mocha font-sans leading-relaxed space-y-1.5 list-decimal list-inside">
                <li>Aceda a <strong>search.google.com/search-console</strong></li>
                <li>Clique em &ldquo;Adicionar propriedade&rdquo; → escolha &ldquo;Prefixo do URL&rdquo;</li>
                <li>Coloque <strong>https://uniquecoffee.pt</strong></li>
                <li>Escolha a verificação por &ldquo;Tag HTML&rdquo;</li>
                <li>Copie o valor do <strong>content</strong> e cole no campo acima</li>
                <li>Guarde aqui e depois clique em &ldquo;Verificar&rdquo; no Google</li>
                <li>Depois de verificar, vá a &ldquo;Sitemaps&rdquo; e submeta: <strong>https://uniquecoffee.pt/sitemap.xml</strong></li>
              </ol>
            </div>
          </div>
        )}

        {/* Save button */}
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
