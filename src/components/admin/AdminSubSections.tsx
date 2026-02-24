"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SubSectionItem {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

interface AdminSubSectionsProps {
  title?: string;
  subtitle?: string;
  sections: SubSectionItem[];
  startIndex?: number;
}

export function AdminSubSections({
  title = "Sub-secções",
  subtitle = "Clique para editar o conteúdo completo.",
  sections,
  startIndex = 2,
}: AdminSubSectionsProps) {
  if (sections.length === 0) return null;

  return (
    <div className="border-t border-linen pt-6 mt-6">
      <h2 className="font-sans font-semibold text-espresso mb-1">{title}</h2>
      <p className="text-xs text-mocha mb-4">{subtitle}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sections.map((section, i) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="flex items-center gap-3 p-4 rounded-xl border border-linen bg-warm-white hover:border-copper/50 hover:bg-copper/5 transition-all group"
            >
              <span className="w-8 h-8 rounded-lg bg-copper/10 flex items-center justify-center text-copper shrink-0">
                <Icon size={16} />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-mocha/50 font-sans">{i + startIndex}.</span>
                  <span className="font-sans font-medium text-sm text-espresso">{section.name}</span>
                </div>
                <p className="text-xs text-mocha truncate">{section.description}</p>
              </div>
              <ChevronRight size={16} className="text-stone group-hover:text-copper transition-colors shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
