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
        className="group shrink-0 w-[160px] sm:w-[180px] md:w-[200px]"
      >
        <div className="bg-warm-white p-1.5 rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-400">
          <div className="relative aspect-[4/3] overflow-hidden rounded">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-600 group-hover:scale-[1.06]"
              sizes="200px"
            />
            <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/10 transition-colors duration-400" />
          </div>
        </div>
        <p className="mt-2 font-sans text-[10px] sm:text-xs uppercase tracking-[0.1em] text-espresso text-center font-medium group-hover:text-copper transition-colors">
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
        <div className="flex gap-4 md:gap-5 shrink-0 pr-4 md:pr-5">
          {renderItems("a")}
        </div>
        <div className="flex gap-4 md:gap-5 shrink-0 pr-4 md:pr-5">
          {renderItems("b")}
        </div>
      </div>
    </div>
  );
}
