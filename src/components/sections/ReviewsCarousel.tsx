"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { ReviewItem } from "@/types/site-data";

interface ReviewsCarouselProps {
  title: string;
  reviews: ReviewItem[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={star <= rating ? "text-copper fill-copper" : "text-linen"}
        />
      ))}
    </div>
  );
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-PT", { month: "short", year: "numeric" });
  } catch {
    return dateStr;
  }
}

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div className="bg-warm-white rounded-xl border border-linen p-5 flex flex-col h-full">
      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Author info */}
      <div className="flex items-center gap-3 mt-4">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-parchment flex items-center justify-center shrink-0 border border-linen">
          <span className="font-sans font-semibold text-roast text-sm">
            {review.author.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-sans font-semibold text-espresso text-sm truncate">
            {review.author}
          </p>
          {review.date && (
            <p className="text-xs text-stone">{formatDate(review.date)}</p>
          )}
        </div>
        {/* Google indicator */}
        {review.source === "google" && (
          <span className="ml-auto text-xs font-sans font-medium text-stone bg-parchment px-2 py-0.5 rounded-full shrink-0">
            G
          </span>
        )}
      </div>

      {/* Review text */}
      <p className="font-body text-roast text-sm leading-relaxed mt-4 flex-1">
        {review.text}
      </p>
    </div>
  );
}

export function ReviewsCarousel({ title, reviews }: ReviewsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const total = reviews.length;
  if (total === 0) return null;

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    // Scroll by approximately one card width + gap
    const cardWidth = el.querySelector<HTMLElement>("[data-review-card]")?.offsetWidth || 300;
    const amount = direction === "left" ? -cardWidth - 16 : cardWidth + 16;
    el.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section className="section-padding bg-warm-white">
      <div className="section-container">
        {/* Header with title and arrows */}
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-section font-display text-espresso">
            {title}
          </h2>
          {total > 1 && (
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-linen text-mocha hover:text-copper hover:border-copper transition-colors disabled:opacity-30 disabled:hover:text-mocha disabled:hover:border-linen bg-warm-white"
                aria-label="Anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-linen text-mocha hover:text-copper hover:border-copper transition-colors disabled:opacity-30 disabled:hover:text-mocha disabled:hover:border-linen bg-warm-white"
                aria-label="Próxima"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Cards row — horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 -mb-2 snap-x snap-mandatory scrollbar-hide"
        >

          {reviews.map((review, i) => (
            <div
              key={i}
              data-review-card
              className="w-[280px] sm:w-[300px] md:w-[320px] shrink-0 snap-start"
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
