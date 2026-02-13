/**
 * Tipos do SiteData — versão mutável para o admin.
 * Baseado na estrutura de src/content/site-data.ts.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  cta: string;
  image: string;
}

export interface SobreNosData {
  title: string;
  paragraphs: string[];
  highlights: string[];
  image: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface ValorItem {
  name: string;
  description: string;
}

export interface MissaoVisaoValoresData {
  missao: { title: string; text: string };
  visao: { title: string; text: string };
  valores: { title: string; items: ValorItem[] };
}

export interface ConceitoData {
  title: string;
  paragraphs: string[];
  ctaText?: string;
  ctaLink?: string;
}

export interface DiferencialData {
  title: string;
  intro: string;
  paragraphs: string[];
  closing: string[];
}

export interface GraosData {
  title: string;
  paragraphs: string[];
  image: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface MenuItem {
  name: string;
  description: string;
}

export interface MenuCategory {
  name: string;
  slug: string;
  image: string;
  description: string;
  items: MenuItem[];
}

export interface MenuData {
  title: string;
  subtitle: string;
  categories: MenuCategory[];
  ctaText?: string;
  ctaLink?: string;
}

export interface SobremesaItem {
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface SobremesasData {
  title: string;
  paragraphs: string[];
  highlights: string[];
  items: SobremesaItem[];
  ctaText?: string;
  ctaLink?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  hasPhoto: boolean;
  photo?: string;
}

export interface EquipaData {
  title: string;
  members: TeamMember[];
}

export interface GaleriaImage {
  src: string;
  alt: string;
}

export interface GaleriaData {
  title: string;
  description: string[];
  images: GaleriaImage[];
}

export interface VisiteNosData {
  title: string;
  intro: string;
  description: string;
  cta: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  badges: string[];
  social: {
    instagram: string;
    facebook: string;
  };
  mapCoordinates: {
    lat: number;
    lng: number;
  };
}

export interface FooterData {
  copyright: string;
  location: string;
}

export interface FontConfig {
  display: string;
  body: string;
  ui: string;
}

export interface FontSizeConfig {
  heroTitle: string;
  sectionTitle: string;
  subtitle: string;
  body: string;
}

export interface TypographyConfig {
  fonts: FontConfig;
  sizes: FontSizeConfig;
}

export interface ColorsConfig {
  dark: string;       // Cor escura (navbar, footer, secções escuras, texto)
  accent: string;     // Cor de destaque (botões, links, hover)
  background: string; // Cor de fundo principal
}

export interface ReviewItem {
  author: string;
  text: string;
  rating: number;       // 1-5 estrelas
  date?: string;        // data da review (ex: "2025-01-15")
  photo?: string;       // URL da foto do autor (opcional)
  source?: string;      // "manual" | "google"
}

export interface ReviewsData {
  mode: "manual" | "google";   // toggle: manual ou automático
  title: string;
  manualReviews: ReviewItem[];
  google?: {
    apiKey: string;
    placeId: string;
  };
  cachedGoogleReviews?: ReviewItem[];  // cache das reviews do Google
}

export interface SiteData {
  brand: {
    name: string;
    tagline: string;
    url: string;
    logo?: string;
    favicon?: string;
    ogImage?: string;
  };
  nav: { links: NavLink[] };
  typography?: TypographyConfig;
  colors?: ColorsConfig;
  hiddenPages?: string[];
  hero: HeroData;
  sobreNos: SobreNosData;
  missaoVisaoValores: MissaoVisaoValoresData;
  conceito: ConceitoData;
  diferencial: DiferencialData;
  graos: GraosData;
  menu: MenuData;
  sobremesas: SobremesasData;
  equipa: EquipaData;
  galeria: GaleriaData;
  visiteNos: VisiteNosData;
  reviews?: ReviewsData;
  footer: FooterData;
}
