"use client";

import { useEffect, useCallback } from "react";
import { X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title?: string;
}

/**
 * Converte URLs do Google Drive de sharing para embed.
 * https://drive.google.com/file/d/ID/view?usp=sharing → https://drive.google.com/file/d/ID/preview
 */
function toEmbedUrl(url: string): string {
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }
  return url;
}

export function PdfModal({ isOpen, onClose, url, title }: PdfModalProps) {
  const embedUrl = toEmbedUrl(url);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-espresso/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-5xl h-[85vh] bg-warm-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-linen bg-cream">
              <h3 className="font-sans font-semibold text-espresso text-sm">
                {title || "Menu"}
              </h3>
              <div className="flex items-center gap-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium text-mocha hover:text-copper transition-colors rounded-lg hover:bg-parchment"
                  title="Abrir em nova aba"
                >
                  <ExternalLink size={14} />
                  Abrir
                </a>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-mocha hover:text-espresso hover:bg-parchment transition-colors"
                  aria-label="Fechar"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* PDF iframe */}
            <div className="flex-1 bg-stone/10">
              <iframe
                src={embedUrl}
                className="w-full h-full border-0"
                allow="autoplay"
                title={title || "Menu PDF"}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
