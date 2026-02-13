"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { getCroppedImg } from "@/lib/crop-image";

interface CropModalProps {
  imageSrc: string;
  aspectRatio?: number;
  onComplete: (blob: Blob) => void;
  onCancel: () => void;
}

export function CropModal({ imageSrc, aspectRatio, onComplete, onCancel }: CropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [processing, setProcessing] = useState(false);

  const onCropComplete = useCallback((_croppedArea: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  async function handleConfirm() {
    if (!croppedAreaPixels) return;
    setProcessing(true);
    try {
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
      onComplete(blob);
    } catch {
      alert("Erro ao recortar imagem");
    } finally {
      setProcessing(false);
    }
  }

  function formatAspectLabel(ratio?: number): string | null {
    if (!ratio) return null;
    if (ratio === 1) return "1:1";
    if (Math.abs(ratio - 16 / 9) < 0.01) return "16:9";
    if (Math.abs(ratio - 4 / 3) < 0.01) return "4:3";
    if (Math.abs(ratio - 4 / 5) < 0.01) return "4:5";
    if (Math.abs(ratio - 1200 / 630) < 0.01) return "1200:630";
    return null;
  }

  const ratioLabel = formatAspectLabel(aspectRatio);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/80 backdrop-blur-sm">
      <div className="bg-warm-white rounded-xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3 border-b border-linen flex items-center justify-between">
          <h3 className="font-sans font-semibold text-espresso text-sm">
            Recortar imagem
            {ratioLabel && (
              <span className="ml-2 text-mocha font-normal">({ratioLabel})</span>
            )}
          </h3>
          <button
            onClick={onCancel}
            className="text-stone hover:text-espresso text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {/* Crop area */}
        <div className="relative h-[400px]">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            showGrid={true}
            style={{
              containerStyle: { background: "#2C1810" },
            }}
          />
        </div>

        {/* Zoom control */}
        <div className="px-5 py-3 flex items-center gap-3">
          <span className="text-xs text-mocha font-sans">Zoom</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="flex-1 accent-copper"
          />
        </div>

        {/* Actions */}
        <div className="px-5 py-3 border-t border-linen flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-sans text-roast hover:bg-parchment transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={processing}
            className="px-5 py-2 rounded-lg bg-copper text-white text-sm font-sans font-medium hover:bg-copper/90 transition-colors disabled:opacity-50"
          >
            {processing ? "A processar..." : "Recortar e enviar"}
          </button>
        </div>
      </div>
    </div>
  );
}
