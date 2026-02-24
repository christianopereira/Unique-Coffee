"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TextInput, TextArea, SectionHeader } from "@/components/admin/fields";
import { SectionBgEditor } from "@/components/admin/SectionBgEditor";
import { SectionEffectsEditor } from "@/components/admin/SectionEffectsEditor";
import { Star, Trash2, Plus, RefreshCw } from "lucide-react";
import type { ReviewItem, ReviewsData } from "@/types/site-data";

const DEFAULT_REVIEWS: ReviewsData = {
  mode: "manual",
  title: "O Que Dizem Sobre Nós",
  manualReviews: [],
  google: { apiKey: "", placeId: "" },
  cachedGoogleReviews: [],
};

function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="transition-colors"
        >
          <Star
            size={20}
            className={star <= value ? "text-copper fill-copper" : "text-linen hover:text-copper/50"}
          />
        </button>
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  const router = useRouter();
  const [data, setData] = useState<ReviewsData>(DEFAULT_REVIEWS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/content");
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        if (!res.ok) throw new Error();
        const json = await res.json();
        if (json.reviews) {
          setData({ ...DEFAULT_REVIEWS, ...json.reviews });
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
        body: JSON.stringify({ section: "reviews", data }),
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

  async function fetchGoogleReviews() {
    if (!data.google?.apiKey || !data.google?.placeId) {
      setMessage({ type: "error", text: "Preencha a API Key e o Place ID primeiro." });
      return;
    }
    setFetching(true);
    setMessage(null);
    try {
      const res = await fetch(
        `/api/admin/google-reviews?apiKey=${encodeURIComponent(data.google.apiKey)}&placeId=${encodeURIComponent(data.google.placeId)}`
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao buscar reviews");
      }
      const result = await res.json();
      setData({
        ...data,
        cachedGoogleReviews: result.reviews,
      });
      setMessage({ type: "success", text: `${result.reviews.length} reviews importadas do Google!` });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Erro ao buscar reviews do Google" });
    } finally {
      setFetching(false);
    }
  }

  function addReview() {
    setData({
      ...data,
      manualReviews: [
        ...data.manualReviews,
        { author: "", text: "", rating: 5, date: new Date().toISOString().split("T")[0], source: "manual" },
      ],
    });
  }

  function updateReview(index: number, fields: Partial<ReviewItem>) {
    const updated = [...data.manualReviews];
    updated[index] = { ...updated[index], ...fields };
    setData({ ...data, manualReviews: updated });
  }

  function removeReview(index: number) {
    setData({
      ...data,
      manualReviews: data.manualReviews.filter((_, i) => i !== index),
    });
  }

  if (loading) return <div className="text-mocha py-12 text-center">A carregar...</div>;

  return (
    <>
      <SectionHeader title="Reviews / Avaliações" description="Gerir avaliações de clientes exibidas no site" />
      <SectionBgEditor sectionKey="reviews" sectionTitle="Reviews" />
      <SectionEffectsEditor sectionKey="reviews" sectionTitle="Reviews" />

      <div className="space-y-8">
        {/* Toggle visibilidade */}
        <div className="p-5 bg-warm-white rounded-xl border border-linen">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-sans font-semibold text-espresso">Visibilidade</h2>
              <p className="text-xs text-mocha mt-0.5">
                {data.enabled !== false
                  ? "A secção Reviews está visível na homepage."
                  : "A secção Reviews está oculta na homepage."}
              </p>
            </div>
            <button
              onClick={() => setData({ ...data, enabled: data.enabled === false ? true : false })}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                data.enabled !== false ? "bg-copper" : "bg-stone/40"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  data.enabled !== false ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Título da secção */}
        <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-4">
          <h2 className="font-sans font-semibold text-espresso">Título da Secção</h2>
          <TextInput
            label="Título"
            value={data.title}
            onChange={(v) => setData({ ...data, title: v })}
          />
        </div>

        {/* Toggle de modo */}
        <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-4">
          <h2 className="font-sans font-semibold text-espresso">Fonte das Reviews</h2>
          <p className="text-xs text-mocha">
            Escolha se quer gerir as reviews manualmente ou importar automaticamente do Google.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setData({ ...data, mode: "manual" })}
              className={`flex-1 px-4 py-3 rounded-lg border text-sm font-sans font-medium transition-colors ${
                data.mode === "manual"
                  ? "border-copper bg-copper/10 text-copper"
                  : "border-linen text-mocha hover:border-copper/50"
              }`}
            >
              <span className="block font-semibold">Manual</span>
              <span className="block text-xs font-normal mt-0.5 opacity-70">
                Adicionar e editar reviews manualmente
              </span>
            </button>
            <button
              onClick={() => setData({ ...data, mode: "google" })}
              className={`flex-1 px-4 py-3 rounded-lg border text-sm font-sans font-medium transition-colors ${
                data.mode === "google"
                  ? "border-copper bg-copper/10 text-copper"
                  : "border-linen text-mocha hover:border-copper/50"
              }`}
            >
              <span className="block font-semibold">Google Reviews</span>
              <span className="block text-xs font-normal mt-0.5 opacity-70">
                Importar automaticamente do Google
              </span>
            </button>
          </div>
        </div>

        {/* Manual Reviews */}
        {data.mode === "manual" && (
          <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-sans font-semibold text-espresso">
                Reviews Manuais ({data.manualReviews.length})
              </h2>
              <button
                onClick={addReview}
                className="flex items-center gap-1.5 text-sm text-copper hover:text-copper/80 font-medium"
              >
                <Plus size={16} />
                Adicionar review
              </button>
            </div>

            {data.manualReviews.length === 0 && (
              <p className="text-sm text-mocha/70 text-center py-8">
                Nenhuma review adicionada. Clique em &ldquo;Adicionar review&rdquo; para começar.
              </p>
            )}

            {data.manualReviews.map((review, i) => (
              <div key={i} className="p-4 bg-cream rounded-lg border border-linen space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-sans font-medium text-mocha">Review #{i + 1}</span>
                  <button
                    onClick={() => removeReview(i)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                    title="Remover review"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <TextInput
                    label="Nome do autor"
                    value={review.author}
                    onChange={(v) => updateReview(i, { author: v })}
                    placeholder="Ex: Maria Silva"
                  />
                  <TextInput
                    label="Data"
                    value={review.date || ""}
                    onChange={(v) => updateReview(i, { date: v })}
                    placeholder="Ex: 2025-01-15"
                  />
                </div>

                <TextArea
                  label="Texto da review"
                  value={review.text}
                  onChange={(v) => updateReview(i, { text: v })}
                  rows={3}
                  placeholder="O que o cliente disse..."
                />

                <div className="space-y-1.5">
                  <label className="block text-sm font-sans font-medium text-roast">
                    Classificação
                  </label>
                  <StarInput
                    value={review.rating}
                    onChange={(v) => updateReview(i, { rating: v })}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Google API Config */}
        {data.mode === "google" && (
          <div className="p-5 bg-warm-white rounded-xl border border-linen space-y-4">
            <h2 className="font-sans font-semibold text-espresso">Configuração Google Reviews</h2>
            <p className="text-xs text-mocha">
              Para importar reviews automaticamente, precisa de uma API Key do Google Places e o Place ID do seu negócio.
            </p>

            <div className="bg-cream/80 rounded-lg p-4 border border-linen">
              <p className="text-xs text-mocha font-sans leading-relaxed">
                <strong className="text-roast">Como obter:</strong><br />
                1. Aceda a{" "}
                <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-copper underline">
                  Google Cloud Console
                </a><br />
                2. Crie um projecto e active a API &ldquo;Places API&rdquo;<br />
                3. Crie uma API Key em Credenciais<br />
                4. O Place ID pode ser encontrado em{" "}
                <a href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank" rel="noopener noreferrer" className="text-copper underline">
                  Place ID Finder
                </a>
              </p>
            </div>

            <TextInput
              label="Google API Key"
              value={data.google?.apiKey || ""}
              onChange={(v) => setData({ ...data, google: { ...data.google!, apiKey: v, placeId: data.google?.placeId || "" } })}
              placeholder="AIzaSy..."
            />
            <TextInput
              label="Google Place ID"
              value={data.google?.placeId || ""}
              onChange={(v) => setData({ ...data, google: { ...data.google!, placeId: v, apiKey: data.google?.apiKey || "" } })}
              placeholder="ChIJ..."
            />

            <button
              onClick={fetchGoogleReviews}
              disabled={fetching || !data.google?.apiKey || !data.google?.placeId}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-copper text-white text-sm font-sans font-medium hover:bg-copper/90 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={fetching ? "animate-spin" : ""} />
              {fetching ? "A importar..." : "Importar Reviews do Google"}
            </button>

            {/* Preview of cached Google reviews */}
            {data.cachedGoogleReviews && data.cachedGoogleReviews.length > 0 && (
              <div className="border-t border-linen pt-4 mt-4 space-y-3">
                <h3 className="text-sm font-sans font-medium text-roast">
                  Reviews importadas ({data.cachedGoogleReviews.length})
                </h3>
                {data.cachedGoogleReviews.map((review, i) => (
                  <div key={i} className="p-3 bg-cream rounded-lg border border-linen">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-sans font-medium text-sm text-espresso">{review.author}</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={12}
                            className={star <= review.rating ? "text-copper fill-copper" : "text-linen"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-roast">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
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
