"use client";

import Image from "next/image";
import Link from "next/link";
import type { SobremesaItem } from "@/types/site-data";

interface SobremesasCarouselProps {
  items: SobremesaItem[];
}

export function SobremesasCarousel({ items }: SobremesasCarouselProps) {
  if (items.length === 0) return null;

  // Speed: ~4s per item for comfortable reading
  const duration = Math.max(items.length * 4, 20);

  const renderItems = (keyPrefix: string) =>
    items.map((item, i) => (
      <Link
        key={`${keyPrefix}-${item.slug}-${i}`}
        href={`/sobremesas/${item.slug}`}
        className="group shrink-0 w-[220px] sm:w-[240px] md:w-[260px]"
      >
        <div className="bg-warm-white p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-400">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-600 group-hover:scale-[1.06]"
              sizes="260px"
            />
            <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/10 transition-colors duration-400" />
          </div>
        </div>
        <p className="mt-3 font-sans text-xs sm:text-sm uppercase tracking-[0.1em] text-espresso text-center font-medium group-hover:text-copper transition-colors">
          {item.name}
        </p>
      </Link>
    ));

  return (
    <div className="overflow-hidden">
      <div
        className="flex hover:[animation-play-state:paused]"
        style={{ animation: `marquee ${duration}s linear infinite` }}
      >
        {/* Two identical sets side-by-side: translateX(-50%) loops seamlessly */}
        <div className="flex gap-5 md:gap-6 shrink-0 pr-5 md:pr-6">
          {renderItems("a")}
        </div>
        <div className="flex gap-5 md:gap-6 shrink-0 pr-5 md:pr-6">
          {renderItems("b")}
        </div>
      </div>
    </div>
  );
}
