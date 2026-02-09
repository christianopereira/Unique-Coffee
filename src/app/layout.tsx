import type { Metadata } from "next";
import { Playfair_Display, Lora, Raleway } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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

export const metadata: Metadata = {
  title: {
    template: "%s | Unique Coffee",
    default: "Unique Coffee — Cafeteria Premium em Caldas da Rainha",
  },
  description:
    "Café de especialidade, ambiente sofisticado e tranquilo em Caldas da Rainha. Um espaço pensado para quem valoriza a pausa, o sabor e os pequenos detalhes.",
  keywords: [
    "café especialidade Caldas da Rainha",
    "cafeteria premium Portugal",
    "unique coffee",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: "Unique Coffee",
    title: "Unique Coffee — Cafeteria Premium em Caldas da Rainha",
    description:
      "Um café de especialidade pensado para quem aprecia a pausa, o sabor e os detalhes.",
    images: ["/images/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "Unique Coffee",
  description: "Cafeteria premium de café de especialidade em Caldas da Rainha, Portugal.",
  url: "https://uniquecoffee.pt",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Caldas da Rainha",
    addressCountry: "PT",
  },
  servesCuisine: "Café de Especialidade",
  priceRange: "€€",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-PT"
      className={`${playfair.variable} ${lora.variable} ${raleway.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
