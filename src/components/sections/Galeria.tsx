"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { siteData } from "@/content/site-data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Galeria() {
  const { galeria } = siteData;
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
      <section id="galeria" className="section-padding bg-warm-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-12">
            {/* Text column */}
            <div>
              <SectionTitle title={galeria.title} align="left" />
              <div className="space-y-4">
                {galeria.description.map((paragraph, i) => (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <p className="font-body text-roast leading-relaxed text-sm md:text-base">
                      {paragraph}
                    </p>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Image grid */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-3 md:gap-4">
              {galeria.images.map((img, i) => (
                <ScrollReveal
                  key={i}
                  delay={i * 0.08}
                  className={i === 2 || i === 4 ? "row-span-2" : ""}
                >
                  <button
                    onClick={() => setSelectedImage(i)}
                    className="group relative w-full h-full overflow-hidden cursor-pointer"
                    style={{ aspectRatio: i === 2 || i === 4 ? "3/4" : "4/3" }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-600 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/10 transition-colors duration-400" />
                  </button>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-espresso/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-warm-white/70 hover:text-warm-white transition-colors"
              aria-label="Fechar"
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galeria.images[selectedImage].src}
                alt={galeria.images[selectedImage].alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
