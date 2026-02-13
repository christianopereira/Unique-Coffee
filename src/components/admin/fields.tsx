"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// ---------------------------------------------------------------------------
// TextInput
// ---------------------------------------------------------------------------
interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TextInput({ label, value, onChange, placeholder }: TextInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-sans font-medium text-roast">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-linen bg-white text-espresso focus:border-copper focus:outline-none text-sm"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// TextArea
// ---------------------------------------------------------------------------
interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}

export function TextArea({ label, value, onChange, rows = 4, placeholder }: TextAreaProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-sans font-medium text-roast">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-linen bg-white text-espresso focus:border-copper focus:outline-none text-sm resize-y"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// ArrayEditor — edita arrays de strings
// ---------------------------------------------------------------------------
interface ArrayEditorProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  inputType?: "text" | "textarea";
  placeholder?: string;
}

export function ArrayEditor({
  label,
  items,
  onChange,
  inputType = "textarea",
  placeholder,
}: ArrayEditorProps) {
  function updateItem(index: number, value: string) {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function addItem() {
    onChange([...items, ""]);
  }

  function moveItem(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    const updated = [...items];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated);
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-sans font-medium text-roast">
        {label}
      </label>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-start">
          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => moveItem(i, -1)}
              disabled={i === 0}
              className="text-xs text-stone hover:text-copper disabled:opacity-30 px-1"
              title="Mover para cima"
            >
              ↑
            </button>
            <button
              onClick={() => moveItem(i, 1)}
              disabled={i === items.length - 1}
              className="text-xs text-stone hover:text-copper disabled:opacity-30 px-1"
              title="Mover para baixo"
            >
              ↓
            </button>
          </div>
          <div className="flex-1">
            {inputType === "textarea" ? (
              <textarea
                value={item}
                onChange={(e) => updateItem(i, e.target.value)}
                rows={3}
                placeholder={placeholder}
                className="w-full px-3 py-2 rounded-lg border border-linen bg-white text-espresso focus:border-copper focus:outline-none text-sm resize-y"
              />
            ) : (
              <input
                type="text"
                value={item}
                onChange={(e) => updateItem(i, e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 py-2 rounded-lg border border-linen bg-white text-espresso focus:border-copper focus:outline-none text-sm"
              />
            )}
          </div>
          <button
            onClick={() => removeItem(i)}
            className="text-red-400 hover:text-red-600 text-sm px-2 py-2 shrink-0"
            title="Remover"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={addItem}
        className="text-sm text-copper hover:text-copper/80 font-medium"
      >
        + Adicionar
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ImagePicker — upload com crop ou URL de imagem
// ---------------------------------------------------------------------------
interface ImagePickerProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  aspectRatio?: number;
  aspectRatioLabel?: string;
}

export function ImagePicker({ label, value, onChange, aspectRatio, aspectRatioLabel }: ImagePickerProps) {
  const [uploading, setUploading] = useState(false);
  const [cropSource, setCropSource] = useState<string | null>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Ficheiro demasiado grande. Máximo: 5MB.");
      return;
    }

    // SVG e GIF: upload directo sem crop
    if (file.type === "image/svg+xml" || file.type === "image/gif") {
      uploadFileDirectly(file);
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setCropSource(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  async function uploadFileDirectly(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Erro ao fazer upload");
        return;
      }
      const data = await res.json();
      onChange(data.url);
    } catch {
      alert("Erro ao fazer upload");
    } finally {
      setUploading(false);
    }
  }

  async function handleCropComplete(croppedBlob: Blob) {
    setCropSource(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", croppedBlob, "cropped.jpg");
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Erro ao fazer upload");
        return;
      }
      const data = await res.json();
      onChange(data.url);
    } catch {
      alert("Erro ao fazer upload");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-sans font-medium text-roast">
        {label}
        {aspectRatioLabel && (
          <span className="ml-2 text-xs text-mocha/70">({aspectRatioLabel})</span>
        )}
      </label>

      {value && (
        <div className="relative w-48 h-32 rounded-lg overflow-hidden border border-linen">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        <label className="cursor-pointer px-4 py-2 rounded-lg bg-parchment text-roast text-sm font-sans hover:bg-linen transition-colors">
          {uploading ? "A enviar..." : "Enviar imagem"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
          />
        </label>
        <span className="text-xs text-mocha">ou</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL da imagem"
          className="flex-1 px-3 py-2 rounded-lg border border-linen bg-white text-espresso focus:border-copper focus:outline-none text-xs"
        />
      </div>

      {/* Crop Modal */}
      {cropSource && (
        <CropModalLazy
          imageSrc={cropSource}
          aspectRatio={aspectRatio}
          onComplete={handleCropComplete}
          onCancel={() => setCropSource(null)}
        />
      )}
    </div>
  );
}

// Lazy import do CropModal para não carregar react-easy-crop em todas as páginas
import dynamic from "next/dynamic";
const CropModalLazy = dynamic(
  () => import("./CropModal").then((m) => ({ default: m.CropModal })),
  { ssr: false }
);

// ---------------------------------------------------------------------------
// FontSelect — dropdown de fonte com preview ao vivo
// ---------------------------------------------------------------------------
interface FontSelectProps {
  label: string;
  value: string;
  options: Array<{ name: string; label: string }>;
  onChange: (value: string) => void;
  previewText?: string;
}

export function FontSelect({ label, value, options, onChange, previewText }: FontSelectProps) {
  // Carrega a fonte dinamicamente para preview no admin
  useEffect(() => {
    if (!value) return;
    const fontUrl = `https://fonts.googleapis.com/css2?family=${value.replace(/ /g, "+")}&display=swap`;
    const existing = document.querySelector(`link[href="${fontUrl}"]`);
    if (!existing) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = fontUrl;
      document.head.appendChild(link);
    }
  }, [value]);

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-sans font-medium text-roast">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-linen bg-white text-espresso focus:border-copper focus:outline-none text-sm"
      >
        {options.map((opt) => (
          <option key={opt.name} value={opt.name}>
            {opt.label}
          </option>
        ))}
      </select>
      {previewText && (
        <p
          className="mt-2 text-lg text-roast border border-linen rounded-lg px-3 py-2 bg-warm-white"
          style={{ fontFamily: `"${value}", serif` }}
        >
          {previewText}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SizeSelect — dropdown de presets de tamanho
// ---------------------------------------------------------------------------
interface SizeSelectProps {
  label: string;
  value: string;
  options: Array<{ label: string; value: string }>;
  onChange: (value: string) => void;
}

export function SizeSelect({ label, value, options, onChange }: SizeSelectProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-sans font-medium text-roast">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-linen bg-white text-espresso focus:border-copper focus:outline-none text-sm"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SectionHeader — cabeçalho de secção admin
// ---------------------------------------------------------------------------
interface SectionHeaderProps {
  title: string;
  description?: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-2xl text-espresso">{title}</h1>
      {description && (
        <p className="text-sm text-mocha mt-1">{description}</p>
      )}
    </div>
  );
}
