"use client";

import { useState, useEffect } from "react";
import { TextInput, SectionHeader } from "@/components/admin/fields";

interface NavLink {
  label: string;
  href: string;
}

export default function AdminConfigPage() {
  const [brand, setBrand] = useState({ name: "", tagline: "", url: "" });
  const [footer, setFooter] = useState({ copyright: "", location: "" });
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/content");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setBrand(data.brand);
        setFooter(data.footer);
        setNavLinks(data.nav.links);
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
      <SectionHeader title="Configurações" description="Nome, tagline, footer e navegação" />

      <div className="space-y-8">
        <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-4">
          <h2 className="font-sans font-semibold text-espresso">Marca</h2>
          <TextInput label="Nome" value={brand.name} onChange={(v) => setBrand({ ...brand, name: v })} />
          <TextInput label="Tagline" value={brand.tagline} onChange={(v) => setBrand({ ...brand, tagline: v })} />
          <TextInput label="URL" value={brand.url} onChange={(v) => setBrand({ ...brand, url: v })} />
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
