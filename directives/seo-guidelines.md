# Directiva: SEO & Metadados

> Optimização para pesquisas locais e boas práticas de SEO.

---

## Metadados Principais

```typescript
const metadata = {
  title: "Unique Coffee — Cafeteria Premium em Caldas da Rainha",
  description: "Café de especialidade, ambiente sofisticado e tranquilo em Caldas da Rainha. Um espaço pensado para quem valoriza a pausa, o sabor e os pequenos detalhes.",
  keywords: [
    "café especialidade Caldas da Rainha",
    "cafeteria premium Portugal",
    "café gourmet Caldas da Rainha",
    "unique coffee",
    "café tranquilo",
    "cafeteria pet friendly Caldas da Rainha"
  ],
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: "Unique Coffee",
    title: "Unique Coffee — Cafeteria Premium em Caldas da Rainha",
    description: "Um café de especialidade pensado para quem aprecia a pausa, o sabor e os detalhes.",
    // image: URL da imagem OG (1200x630)
  }
}
```

---

## Schema.org (LocalBusiness)

Incluir no `layout.tsx` como JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  "name": "Unique Coffee",
  "description": "Cafeteria premium de café de especialidade em Caldas da Rainha, Portugal.",
  "url": "https://uniquecoffee.pt",
  "telephone": "+351XXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Caldas da Rainha",
    "addressCountry": "PT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "39.4036",
    "longitude": "-9.1366"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "19:00"
    }
  ],
  "servesCuisine": "Café de Especialidade",
  "priceRange": "€€",
  "image": "URL_IMAGEM",
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Pet Friendly", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Wi-Fi", "value": true }
  ]
}
```

---

## Boas Práticas

1. **HTML semântico** — h1 único (hero), h2 para secções, h3 para sub-items
2. **Alt text** descritivo e em PT-PT para todas as imagens
3. **Links internos** — âncoras entre secções
4. **Performance** — Imagens optimizadas via next/image, fonts preloaded
5. **robots.txt** e **sitemap.xml** gerados automaticamente
6. **Linguagem natural** — Não forçar keywords. Escrever para pessoas, não para motores.
