"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { HeroData } from "@/types/site-data";

interface HeroProps {
  hero: HeroData;
}

export function Hero({ hero }: HeroProps) {
  const images = hero.images && hero.images.length > 0 ? hero.images : [hero.image];
  const hasMultiple = images.length > 1;
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const SLIDE_DURATION = 10000; // 10s por slide (tempo do zoom)
  const FADE_DURATION = 2000;  // 2s de fade entre slides

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === current) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), FADE_DURATION);
    },
    [current, isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % images.length);
  }, [current, images.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + images.length) % images.length);
  }, [current, images.length, goTo]);

  useEffect(() => {
    if (!hasMultiple) return;
    const timer = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [hasMultiple, next]);

  return (
    <section id="inicio" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background images — all layered, visibility controlled by opacity */}
      {images.map((img, i) => (
        <div
          key={img + i}
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{
            opacity: i === current ? 1 : 0,
            transitionDuration: `${FADE_DURATION}ms`,
            zIndex: i === current ? 1 : 0,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              animation: i === current ? `heroZoom ${SLIDE_DURATION + FADE_DURATION}ms ease-out forwards` : "none",
              transform: "scale(1)",
            }}
          >
            <Image
              src={img}
              alt="Unique Coffee"
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/50 via-espresso/30 to-espresso/60" />
        </div>
      ))}

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

      {/* Arrow navigation */}
      {hasMultiple && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-espresso/20 backdrop-blur-sm border border-warm-white/15 text-warm-white/70 hover:bg-espresso/40 hover:text-warm-white transition-all duration-300"
            aria-label="Slide anterior"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-espresso/20 backdrop-blur-sm border border-warm-white/15 text-warm-white/70 hover:bg-espresso/40 hover:text-warm-white transition-all duration-300"
            aria-label="Próximo slide"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

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
              onClick={() => goTo(i)}
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

      {/* Ken Burns zoom keyframes */}
      <style jsx>{`
        @keyframes heroZoom {
          from { transform: scale(1); }
          to { transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
}
