"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Type, Image, Coffee, UtensilsCrossed, Cake, Users, Camera, MapPin, Package, Star } from "lucide-react";

interface SectionMeta {
  key: string;
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const ALL_SECTIONS: SectionMeta[] = [
  { key: "sobreNos", name: "Sobre Nós", description: "Texto de apresentação + highlights", href: "/admin/sobre", icon: Type },
  { key: "conceito", name: "Conceito", description: "O conceito do espaço + imagem", href: "/admin/conceito", icon: Coffee },
  { key: "graos", name: "Grãos", description: "Grãos seleccionados + imagem", href: "/admin/graos", icon: Image },
  { key: "produtos", name: "Nossos Produtos", description: "Produtos em destaque", href: "/admin/produtos", icon: Package },
  { key: "menu", name: "Menu", description: "Categorias + itens do menu", href: "/admin/menu", icon: UtensilsCrossed },
  { key: "sobremesas", name: "Sobremesas", description: "Sobremesas + textos + destaques", href: "/admin/sobremesas", icon: Cake },
  { key: "galeria", name: "Galeria", description: "Fotos do espaço", href: "/admin/galeria", icon: Camera },
  { key: "reviews", name: "Reviews", description: "Avaliações de clientes", href: "/admin/reviews", icon: Star },
  { key: "visiteNos", name: "Visite-nos", description: "Morada, horário, contactos", href: "/admin/contacto", icon: MapPin },
  { key: "equipa", name: "Equipa", description: "Membros da equipa", href: "/admin/equipa", icon: Users },
];

const DEFAULT_ORDER = [
  "sobreNos", "conceito", "graos", "produtos", "menu", "sobremesas", "galeria", "reviews", "visiteNos",
];

const SECTION_MAP = new Map(ALL_SECTIONS.map((s) => [s.key, s]));

export function HomepageSectionOrder() {
  const router = useRouter();
  const [order, setOrder] = useState<string[]>(DEFAULT_ORDER);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/content", { cache: "no-store" });
      if (res.status === 401) { router.push("/admin/login"); return; }
      const data = await res.json();
      if (data.homepageOrder && Array.isArray(data.homepageOrder)) {
        setOrder(data.homepageOrder);
      }
    } catch { /* ignore */ }
    setLoaded(true);
  }, [router]);

  useEffect(() => { load(); }, [load]);

  function moveSection(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= order.length) return;
    const updated = [...order];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setOrder(updated);
  }

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "homepageOrder", data: order }),
      });
      if (!res.ok) throw new Error();
      setMessage("Ordem guardada!");
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage("Erro ao guardar");
    }
    setSaving(false);
  }

  if (!loaded) return null;

  return (
    <div className="border-t border-linen pt-6 mt-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-sans font-semibold text-espresso">Secções da Homepage</h2>
        <div className="flex items-center gap-2">
          {message && <span className="text-xs text-sage">{message}</span>}
          <button
            onClick={save}
            disabled={saving}
            className="px-3 py-1.5 rounded-lg bg-copper text-white text-xs font-sans font-medium hover:bg-copper/90 transition-colors disabled:opacity-50"
          >
            {saving ? "A guardar..." : "Guardar ordem"}
          </button>
        </div>
      </div>
      <p className="text-xs text-mocha mb-4">
        Use as setas para reordenar as secções. Clique no nome para editar o conteúdo.
      </p>

      <div className="space-y-2">
        {order.map((key, i) => {
          const section = SECTION_MAP.get(key);
          if (!section) return null;
          const Icon = section.icon;

          return (
            <div
              key={key}
              className="flex items-center gap-2 p-3 rounded-xl border border-linen bg-warm-white hover:border-copper/30 transition-all"
            >
              {/* Reorder arrows */}
              <div className="flex flex-col gap-0.5 shrink-0">
                <button
                  onClick={() => moveSection(i, -1)}
                  disabled={i === 0}
                  className="p-0.5 rounded text-stone hover:text-copper disabled:opacity-30 disabled:hover:text-stone transition-colors"
                  title="Mover para cima"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  onClick={() => moveSection(i, 1)}
                  disabled={i === order.length - 1}
                  className="p-0.5 rounded text-stone hover:text-copper disabled:opacity-30 disabled:hover:text-stone transition-colors"
                  title="Mover para baixo"
                >
                  <ChevronDown size={14} />
                </button>
              </div>

              {/* Number */}
              <span className="w-6 h-6 rounded bg-copper/10 flex items-center justify-center text-copper text-xs font-bold font-sans shrink-0">
                {i + 2}
              </span>

              {/* Icon */}
              <span className="w-8 h-8 rounded-lg bg-parchment flex items-center justify-center text-copper shrink-0">
                <Icon size={16} />
              </span>

              {/* Content + Link */}
              <Link href={section.href} className="flex-1 min-w-0 group">
                <span className="font-sans font-medium text-sm text-espresso group-hover:text-copper transition-colors">
                  {section.name}
                </span>
                <p className="text-xs text-mocha truncate">{section.description}</p>
              </Link>

              <Link href={section.href} className="shrink-0">
                <ChevronRight size={16} className="text-stone hover:text-copper transition-colors" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
