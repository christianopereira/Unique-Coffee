"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { HeroData } from "@/types/site-data";

interface HeroProps {
  hero: HeroData;
}

export function Hero({ hero }: HeroProps) {
  const images = hero.images && hero.images.length > 0 ? hero.images : [hero.image];
  const hasMultiple = images.length > 1;
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!hasMultiple) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [hasMultiple, next]);

  return (
    <section id="inicio" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background images with fade transition */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt="Unique Coffee"
            fill
            priority={current === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/50 via-espresso/30 to-espresso/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 section-container text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-hero font-display text-warm-white max-w-4xl mx-auto"
        >
          {hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 text-lg md:text-xl font-body text-warm-white/80 max-w-2xl mx-auto"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10"
        >
          <Button
            variant="secondary"
            href="/sobre"
            className="border-warm-white/60 text-warm-white hover:bg-warm-white hover:text-espresso"
          >
            {hero.cta}
          </Button>
        </motion.div>
      </div>

      {/* Slide indicators */}
      {hasMultiple && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2"
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-400 ${
                i === current
                  ? "bg-warm-white w-6"
                  : "bg-warm-white/40 hover:bg-warm-white/60"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
}
