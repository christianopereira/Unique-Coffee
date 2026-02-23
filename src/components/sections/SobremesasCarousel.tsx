"use client";

import Image from "next/image";
import Link from "next/link";
import type { SobremesaItem } from "@/types/site-data";

interface SobremesasCarouselProps {
  items: SobremesaItem[];
}

export function SobremesasCarousel({ items }: SobremesasCarouselProps) {
  if (items.length === 0) return null;

  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-4 md:gap-6 animate-marquee hover:[animation-play-state:paused]"
        style={{
          width: `calc(${items.length} * (240px + 1rem) * 2)`,
        }}
      >
        {doubled.map((item, i) => (
          <Link
            key={`${item.slug}-${i}`}
            href={`/sobremesas/${item.slug}`}
            className="group shrink-0 w-[200px] sm:w-[220px] md:w-[240px]"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg border border-linen/50">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-600 group-hover:scale-[1.06]"
                sizes="240px"
              />
              <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/10 transition-colors duration-400" />
            </div>
            <p className="mt-3 font-sans text-sm uppercase tracking-[0.1em] text-espresso text-center font-medium group-hover:text-copper transition-colors">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
