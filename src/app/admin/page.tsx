"use client";

import Link from "next/link";
import {
  Image as ImageIcon,
  FileText,
  Coffee,
  UtensilsCrossed,
  Cake,
  Users,
  GalleryHorizontalEnd,
  MapPin,
  Settings,
  Sparkles,
  Bean,
  Target,
} from "lucide-react";

const sections = [
  { href: "/admin/hero", label: "Hero", desc: "Imagem e texto principal", icon: ImageIcon },
  { href: "/admin/sobre", label: "Sobre Nós", desc: "História e highlights", icon: FileText },
  { href: "/admin/missao", label: "Missão/Visão/Valores", desc: "Missão, visão e valores", icon: Target },
  { href: "/admin/conceito", label: "Conceito", desc: "Conceito do espaço", icon: Sparkles },
  { href: "/admin/diferencial", label: "Diferencial", desc: "O que nos torna únicos", icon: Sparkles },
  { href: "/admin/graos", label: "Grãos", desc: "Grãos seleccionados", icon: Bean },
  { href: "/admin/menu", label: "Menu", desc: "Categorias e itens", icon: UtensilsCrossed },
  { href: "/admin/sobremesas", label: "Sobremesas", desc: "Sobremesas e destaques", icon: Cake },
  { href: "/admin/equipa", label: "Equipa", desc: "Membros da equipa", icon: Users },
  { href: "/admin/galeria", label: "Galeria", desc: "Imagens do espaço", icon: GalleryHorizontalEnd },
  { href: "/admin/contacto", label: "Contacto", desc: "Morada, horários, contactos", icon: MapPin },
  { href: "/admin/config", label: "Configurações", desc: "Nome, tagline, footer", icon: Settings },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-3xl text-espresso mb-2" data-tour="dashboard-title">
        Painel de Administração
      </h1>
      <p className="text-mocha mb-8">
        Edite o conteúdo do site. As alterações ficam visíveis em cerca de 1 minuto.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-tour="section-cards">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group flex items-start gap-4 p-5 rounded-xl bg-warm-white border border-linen hover:border-copper hover:shadow-md transition-all"
              {...(idx === 0 ? { "data-tour": "section-card-first" } : {})}
            >
              <div className="p-2.5 rounded-lg bg-parchment text-copper group-hover:bg-copper group-hover:text-white transition-colors">
                <Icon size={22} />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-espresso group-hover:text-copper transition-colors">
                  {section.label}
                </h3>
                <p className="text-sm text-mocha mt-0.5">{section.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
