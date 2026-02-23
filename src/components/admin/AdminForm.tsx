"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { SiteData } from "@/types/site-data";

interface AdminFormProps {
  section: keyof SiteData;
  children: (props: {
    data: Record<string, unknown>;
    setData: (data: Record<string, unknown>) => void;
    updateField: (path: string, value: unknown) => void;
  }) => React.ReactNode;
}

export function AdminForm({ section, children }: AdminFormProps) {
  const router = useRouter();
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/content");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error("Erro ao carregar dados");
      const allData = await res.json();
      setData((allData[section] as Record<string, unknown>) || {});
    } catch {
      setMessage({ type: "error", text: "Erro ao carregar dados" });
    } finally {
      setLoading(false);
    }
  }, [section, router]);

  // Load data on mount
  if (data === null && loading) {
    loadData();
  }

  function updateField(path: string, value: unknown) {
    if (!data) return;
    const keys = path.split(".");
    const updated = structuredClone(data);
    let current: Record<string, unknown> = updated;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (typeof current[key] !== "object" || current[key] === null) {
        current[key] = {};
      }
      current = current[key] as Record<string, unknown>;
    }
    current[keys[keys.length - 1]] = value;
    setData(updated);
  }

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao guardar");
      }

      setMessage({ type: "success", text: "Guardado com sucesso!" });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Erro ao guardar",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-mocha">A carregar...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Erro ao carregar dados</p>
        <button
          onClick={loadData}
          className="mt-4 text-copper hover:underline"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div>
      {children({ data, setData, updateField })}

      <div className="flex items-center gap-4 mt-8 pt-6 border-t border-linen">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-lg bg-copper text-white font-sans font-medium hover:bg-copper/90 transition-colors disabled:opacity-50"
        >
          {saving ? "A guardar..." : "Guardar alterações"}
        </button>

        {message && (
          <p
            className={`text-sm ${
              message.type === "success" ? "text-sage" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}
