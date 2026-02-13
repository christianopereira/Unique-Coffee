"use client";

import { useState, useCallback, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    return date.toLocaleDateString("pt-PT", { month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
}

export function ReviewsCarousel({ title, reviews }: ReviewsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const total = reviews.length;
  if (total === 0) return null;

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent(((index % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  // Auto-advance every 8 seconds
  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next, total]);

  const review = reviews[current];

  const variants = {
    enter: (dir: number) => ({
      x: dir >= 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir >= 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <section className="section-padding bg-parchment">
      <div className="section-container max-w-4xl mx-auto">
        <h2 className="text-section font-display text-espresso text-center mb-10">
          {title}
        </h2>

        <div className="relative">
          {/* Navigation arrows */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 flex items-center justify-center rounded-full bg-warm-white border border-linen text-mocha hover:text-copper hover:border-copper transition-colors z-10"
                aria-label="Review anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 flex items-center justify-center rounded-full bg-warm-white border border-linen text-mocha hover:text-copper hover:border-copper transition-colors z-10"
                aria-label="Próxima review"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Review card */}
          <div className="overflow-hidden px-4">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-warm-white rounded-2xl p-8 md:p-10 text-center border border-linen"
              >
                <Quote size={32} className="text-copper/30 mx-auto mb-4" />

                <p className="font-body text-roast text-base md:text-lg leading-relaxed italic mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>

                <StarRating rating={review.rating} />

                <div className="mt-4">
                  <p className="font-sans font-semibold text-espresso text-sm">
                    {review.author}
                  </p>
                  {review.date && (
                    <p className="text-xs text-mocha mt-0.5">
                      {formatDate(review.date)}
                    </p>
                  )}
                  {review.source === "google" && (
                    <p className="text-[10px] text-stone mt-1">via Google Reviews</p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          {total > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current ? "bg-copper" : "bg-linen hover:bg-stone"
                  }`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
