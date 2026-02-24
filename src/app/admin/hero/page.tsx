"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { TextInput, ImagePicker, SectionHeader } from "@/components/admin/fields";
import { HomepageSectionOrder } from "@/components/admin/HomepageSectionOrder";

export default function AdminHeroPage() {
  return (
    <>
      <SectionHeader title="Homepage" description="Hero e secções que aparecem na página inicial" />

      {/* Hero — editável directamente */}
      <div className="mb-8">
        <h2 className="font-sans font-semibold text-espresso mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-copper/10 flex items-center justify-center text-copper text-xs font-bold">1</span>
          Hero (topo da página)
        </h2>
        <AdminForm section="hero">
          {({ data, updateField }) => {
            const HERO_POSITIONS = [
              { label: "↖", value: "left top", title: "Topo esquerda" },
              { label: "↑", value: "center top", title: "Topo centro" },
              { label: "↗", value: "right top", title: "Topo direita" },
              { label: "←", value: "left center", title: "Centro esquerda" },
              { label: "●", value: "center center", title: "Centro" },
              { label: "→", value: "right center", title: "Centro direita" },
              { label: "↙", value: "left bottom", title: "Base esquerda" },
              { label: "↓", value: "center bottom", title: "Base centro" },
              { label: "↘", value: "right bottom", title: "Base direita" },
            ];
            return (
              <div className="space-y-5">
                <TextInput label="Título" value={data.title as string} onChange={(v) => updateField("title", v)} />
                <TextInput label="Subtítulo" value={data.subtitle as string} onChange={(v) => updateField("subtitle", v)} />
                <TextInput label="Texto do botão (CTA)" value={data.cta as string} onChange={(v) => updateField("cta", v)} />
                <TextInput
                  label="Link do botão"
                  value={(data.ctaLink as string) || ""}
                  onChange={(v) => updateField("ctaLink", v)}
                  placeholder="/sobre"
                  hint="Página interna: /sobre, /menu, /contacto — Link externo: https://exemplo.com"
                />
                <ImagePicker label="Imagem de fundo" value={data.image as string} onChange={(v) => updateField("image", v)} aspectRatio={16 / 9} aspectRatioLabel="16:9" />
                {!!(data.image) && (
                  <div className="space-y-1.5">
                    <label className="block text-sm font-sans font-medium text-roast">
                      Ponto focal da imagem
                    </label>
                    <div className="grid grid-cols-3 gap-1 w-32">
                      {HERO_POSITIONS.map((pos) => (
                        <button
                          key={pos.value}
                          type="button"
                          onClick={() => updateField("imagePosition", pos.value)}
                          title={pos.title}
                          className={`w-10 h-10 rounded text-xs font-bold transition-colors ${
                            ((data.imagePosition as string) || "center center") === pos.value
                              ? "bg-copper text-white"
                              : "bg-linen/50 text-mocha hover:bg-copper/20"
                          }`}
                        >
                          {pos.label}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-mocha/70">Escolha onde deve ficar o foco da imagem</p>
                  </div>
                )}
              </div>
            );
          }}
        </AdminForm>
      </div>

      <HomepageSectionOrder />
    </>
  );
}
