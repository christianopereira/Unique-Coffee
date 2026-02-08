"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteData } from "@/content/site-data";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const { hero } = siteData;

  return (
    <section id="inicio" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt="Interior da Unique Coffee"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/50 via-espresso/30 to-espresso/60" />
      </div>

      <div className="relative z-10 section-container text-center">
        {/* Logo text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-sans text-xs uppercase tracking-[0.3em] text-warm-white/60 mb-6"
        >
          {siteData.brand.name}
        </motion.p>

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
            href="#sobre"
            className="border-warm-white/60 text-warm-white hover:bg-warm-white hover:text-espresso"
          >
            {hero.cta}
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-warm-white/0 via-warm-white/50 to-warm-white/0"
        />
      </motion.div>
    </section>
  );
}
