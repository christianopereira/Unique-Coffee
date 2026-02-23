import type { Metadata } from "next";
import { Playfair_Display, Lora, Raleway } from "next/font/google";
import { getSiteData } from "@/lib/get-site-data";
import { DEFAULT_TYPOGRAPHY } from "@/lib/font-options";
import { DEFAULT_COLORS } from "@/lib/color-options";
import { FontLoader } from "@/components/layout/FontLoader";
import { derivePalette, hexToRgbChannels } from "@/lib/color-utils";
import type { TypographyConfig, ColorsConfig } from "@/types/site-data";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export function generateMetadata(): Metadata {
  const siteData = getSiteData();
  const faviconUrl = siteData.brand.favicon || "/favicon.ico";
  const ogImageUrl = siteData.brand.ogImage || "/images/og-image.png";
  const seo = siteData.seo;

  const defaultTitle = "Unique Coffee — Cafeteria Premium em Caldas da Rainha";
  const defaultDescription =
    "Café de especialidade, ambiente sofisticado e tranquilo em Caldas da Rainha. Um espaço pensado para quem valoriza a pausa, o sabor e os pequenos detalhes.";
  const defaultKeywords = [
    "café especialidade Caldas da Rainha",
    "cafeteria premium Portugal",
    "unique coffee",
    "specialty coffee Caldas da Rainha",
    "melhor café Caldas da Rainha",
    "café premium Portugal",
    "cafetaria Caldas da Rainha",
    "brunch Caldas da Rainha",
    "tostas artesanais Caldas da Rainha",
    "sobremesas Caldas da Rainha",
    "pet friendly café Portugal",
  ];

  const title = seo?.global?.title || defaultTitle;
  const description = seo?.global?.description || defaultDescription;
  const keywords = seo?.global?.keywords?.length ? seo.global.keywords : defaultKeywords;

  const other: Record<string, string> = {};
  if (seo?.googleVerification) {
    other["google-site-verification"] = seo.googleVerification;
  }

  return {
    metadataBase: new URL("https://uniquecoffee.pt"),
    title: {
      template: "%s | Unique Coffee",
      default: title,
    },
    description,
    keywords,
    icons: {
      icon: faviconUrl,
      apple: "/apple-icon.png",
    },
    openGraph: {
      type: "website",
      url: "https://uniquecoffee.pt",
      locale: "pt_PT",
      siteName: "Unique Coffee",
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: title,
        },
      ],
    },
    ...(Object.keys(other).length > 0 ? { other } : {}),
  };
}

function buildJsonLd() {
  const siteData = getSiteData();
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: siteData.brand.name || "Unique Coffee",
    description: "Cafeteria premium de café de especialidade em Caldas da Rainha, Portugal. Tostas artesanais, sobremesas caseiras e ambiente sofisticado.",
    url: `https://${siteData.brand.url || "uniquecoffee.pt"}`,
    telephone: siteData.visiteNos.phone || "+351925903132",
    email: siteData.visiteNos.email || "hello@uniquecoffee.pt",
    image: siteData.brand.ogImage || "/images/og-image.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "R. Vitorino Fróis 12A",
      addressLocality: "Caldas da Rainha",
      postalCode: "2500-256",
      addressCountry: "PT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteData.visiteNos.mapCoordinates?.lat || 39.4036,
      longitude: siteData.visiteNos.mapCoordinates?.lng || -9.1366,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:00",
        closes: "18:00",
      },
    ],
    servesCuisine: ["Café de Especialidade", "Tostas", "Sobremesas", "Brunch"],
    priceRange: "€€",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Wi-Fi Gratuito", value: true },
      { "@type": "LocationFeatureSpecification", name: "Pet Friendly", value: true },
    ],
    sameAs: [
      siteData.visiteNos.social?.instagram || "https://instagram.com/uniquecoffee.cr",
    ].filter(Boolean),
  };
}

function buildTypographyCSS(typo: TypographyConfig): string {
  const defaults = DEFAULT_TYPOGRAPHY;
  const lines: string[] = [];

  // Font overrides no selector html (mesma especificidade que next/font classes)
  const fontOverrides: string[] = [];
  if (typo.fonts.display !== defaults.fonts.display) {
    fontOverrides.push(`  --font-display: "${typo.fonts.display}", Georgia, serif;`);
  }
  if (typo.fonts.body !== defaults.fonts.body) {
    fontOverrides.push(`  --font-body: "${typo.fonts.body}", Georgia, serif;`);
  }
  if (typo.fonts.ui !== defaults.fonts.ui) {
    fontOverrides.push(`  --font-sans: "${typo.fonts.ui}", sans-serif;`);
  }
  if (fontOverrides.length > 0) {
    lines.push("html {", ...fontOverrides, "}");
  }

  // Size overrides em :root
  lines.push(":root {");
  lines.push(`  --size-hero: ${typo.sizes.heroTitle};`);
  lines.push(`  --size-section: ${typo.sizes.sectionTitle};`);
  lines.push(`  --size-subtitle: ${typo.sizes.subtitle};`);
  lines.push(`  --size-body: ${typo.sizes.body};`);
  lines.push("}");

  return lines.join("\n");
}

function buildColorsCSS(colors: ColorsConfig): string {
  const palette = derivePalette(colors.dark, colors.accent, colors.background, {
    navbar: colors.navbar,
    footer: colors.footer,
    text: colors.text,
  });
  const lines = [":root {"];

  const mapping: Record<string, string> = {
    "color-espresso": palette.espresso,
    "color-roast": palette.roast,
    "color-mocha": palette.mocha,
    "color-copper": palette.copper,
    "color-gold-soft": palette["gold-soft"],
    "color-cream": palette.cream,
    "color-warm-white": palette["warm-white"],
    "color-parchment": palette.parchment,
    "color-sage": palette.sage,
    "color-stone": palette.stone,
    "color-linen": palette.linen,
  };

  if (palette["navbar-bg"]) {
    mapping["color-navbar-bg"] = palette["navbar-bg"];
  }
  if (palette["footer-bg"]) {
    mapping["color-footer-bg"] = palette["footer-bg"];
  }
  if (palette["text-main"]) {
    mapping["color-text-main"] = palette["text-main"];
  }

  for (const [varName, hex] of Object.entries(mapping)) {
    lines.push(`  --${varName}: ${hexToRgbChannels(hex)};`);
  }

  lines.push("}");
  return lines.join("\n");
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteData = getSiteData();
  const typography = siteData.typography || DEFAULT_TYPOGRAPHY;
  const colors = siteData.colors || DEFAULT_COLORS;
  const defaults = DEFAULT_TYPOGRAPHY;

  const hasCustomFonts =
    typography.fonts.display !== defaults.fonts.display ||
    typography.fonts.body !== defaults.fonts.body ||
    typography.fonts.ui !== defaults.fonts.ui;

  const hasCustomSizes =
    typography.sizes.heroTitle !== defaults.sizes.heroTitle ||
    typography.sizes.sectionTitle !== defaults.sizes.sectionTitle ||
    typography.sizes.subtitle !== defaults.sizes.subtitle ||
    typography.sizes.body !== defaults.sizes.body;

  const hasCustomColors =
    colors.dark !== DEFAULT_COLORS.dark ||
    colors.accent !== DEFAULT_COLORS.accent ||
    colors.background !== DEFAULT_COLORS.background ||
    !!colors.navbar ||
    !!colors.footer ||
    !!colors.text;

  return (
    <html
      lang="pt-PT"
      className={`${playfair.variable} ${lora.variable} ${raleway.variable}`}
    >
      <head>
        {hasCustomFonts && <FontLoader typography={typography} />}
        {(hasCustomFonts || hasCustomSizes) && (
          <style
            dangerouslySetInnerHTML={{ __html: buildTypographyCSS(typography) }}
          />
        )}
        {hasCustomColors && (
          <style
            dangerouslySetInnerHTML={{ __html: buildColorsCSS(colors) }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                window.addEventListener("error",function(e){
                  var msg=e.message||"";
                  if(msg.indexOf("Loading chunk")!==-1||msg.indexOf("ChunkLoadError")!==-1){
                    var k="__chunk_reload",v=sessionStorage.getItem(k),n=Date.now();
                    if(!v||n-Number(v)>30000){sessionStorage.setItem(k,String(n));window.location.reload()}
                  }
                });
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
