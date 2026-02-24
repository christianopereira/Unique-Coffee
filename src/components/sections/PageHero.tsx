import Image from "next/image";
import { getSiteData } from "@/lib/get-site-data";

interface PageHeroProps {
  pageKey: string;
  /** Fallback title if none set in admin */
  fallbackTitle?: string;
}

const HEIGHT_MAP = {
  small: "min-h-[25vh]",
  medium: "min-h-[35vh]",
  large: "min-h-[45vh]",
} as const;

export function PageHero({ pageKey, fallbackTitle }: PageHeroProps) {
  const { pageHeroes } = getSiteData();
  const cfg = pageHeroes?.[pageKey];

  // Hero disabled or not configured → standard spacer
  if (!cfg?.enabled) {
    return <div className="pt-24" />;
  }

  const height = HEIGHT_MAP[cfg.height || "medium"];
  const title = cfg.title || fallbackTitle;
  const overlayOpacity = (cfg.overlayOpacity ?? 50) / 100;

  return (
    <section className={`relative ${height} flex items-center justify-center overflow-hidden`}>
      {/* Background image */}
      {cfg.image ? (
        <>
          <Image
            src={cfg.image}
            alt=""
            fill
            className="object-cover"
            style={cfg.imagePosition ? { objectPosition: cfg.imagePosition } : undefined}
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
            aria-hidden
          />
        </>
      ) : (
        /* No image → solid dark background */
        <div className="absolute inset-0 bg-espresso" aria-hidden />
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-6 pt-24 pb-8">
        {title && (
          <h1
            className="font-display text-3xl sm:text-4xl md:text-5xl text-warm-white font-bold tracking-tight"
            style={{
              ...(cfg.titleColor ? { color: cfg.titleColor } : {}),
              ...(cfg.titleFont ? { fontFamily: `"${cfg.titleFont}", serif` } : {}),
            }}
          >
            {title}
          </h1>
        )}
        {cfg.subtitle && (
          <p
            className="mt-3 font-body text-base sm:text-lg text-warm-white/80 max-w-2xl mx-auto"
            style={cfg.subtitleColor ? { color: cfg.subtitleColor } : undefined}
          >
            {cfg.subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
