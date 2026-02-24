/**
 * Tipos do SiteData — versão mutável para o admin.
 * Baseado na estrutura de src/content/site-data.ts.
 */

export type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonsConfig {
  defaultVariant?: ButtonVariant;
  borderRadius?: string;
  primaryBg?: string;       // cor de fundo do botão primário (default: copper)
  primaryText?: string;     // cor do texto do botão primário (default: warm-white)
  secondaryBorder?: string; // cor da borda do botão secundário (default: copper)
  secondaryText?: string;   // cor do texto do botão secundário (default: copper)
  ghostText?: string;       // cor do texto/underline do ghost (default: copper)
}

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroData {
  title: string;
  subtitle: string;
  cta: string;
  ctaLink?: string;
  ctaVariant?: ButtonVariant;
  image: string;
  images?: string[];
}

export interface SobreNosData {
  title: string;
  paragraphs: string[];
  highlights: string[];
  image: string;
  ctaText?: string;
  ctaLink?: string;
  ctaVariant?: ButtonVariant;
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
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
  ctaVariant?: ButtonVariant;
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
  ctaVariant?: ButtonVariant;
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
  ctaVariant?: ButtonVariant;
  detailCtaText?: string;
  detailCtaLink?: string;
  detailCtaVariant?: ButtonVariant;
}

export interface ProdutoItem {
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface ProdutosData {
  title: string;
  subtitle: string;
  items: ProdutoItem[];
  detailCtaText?: string;
  detailCtaLink?: string;
  detailCtaVariant?: ButtonVariant;
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
  ctaVariant?: ButtonVariant;
  detailCtaText?: string;
  detailCtaLink?: string;
  detailCtaVariant?: ButtonVariant;
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
  ctaText?: string;
  ctaLink?: string;
  ctaVariant?: ButtonVariant;
}

export interface VisiteNosData {
  title: string;
  intro: string;
  description: string;
  cta: string;
  ctaVariant?: ButtonVariant;
  mapCtaText?: string;
  mapCtaVariant?: ButtonVariant;
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
  dark: string;       // Cor escura base (seccoes escuras, texto)
  accent: string;     // Cor de destaque (botoes, links, hover)
  background: string; // Cor de fundo principal
  navbar?: string;    // Cor de fundo da navbar mobile (default: dark)
  navbarDesktop?: string; // Cor de fundo da navbar desktop (default: warm-white)
  footer?: string;    // Cor de fundo do footer (default: dark)
  text?: string;      // Cor do texto principal (default: dark)
  // Overrides opcionais para cores derivadas (se vazio, usa derivação automática)
  roast?: string;
  mocha?: string;
  goldSoft?: string;
  warmWhite?: string;
  parchment?: string;
  sage?: string;
  stone?: string;
  linen?: string;
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

export interface PageSeo {
  title: string;
  description: string;
}

export interface LegalSection {
  title: string;
  intro?: string;
  sections: { heading: string; content: string }[];
  lastUpdated?: string;
  link?: string;
}

export interface PageHeroConfig {
  enabled?: boolean;
  title?: string;
  subtitle?: string;
  image?: string;
  overlayOpacity?: number;   // 0-100 (default: 50)
  height?: "small" | "medium" | "large"; // 25vh, 35vh, 45vh
  titleColor?: string;       // cor do título (hex)
  subtitleColor?: string;    // cor do subtítulo (hex)
  titleFont?: string;        // fonte do título (ex: "Playfair Display")
}

export interface SectionBgConfig {
  color?: string;            // hex (ex: "#F5F0EB")
  image?: string;            // URL da imagem de fundo
  imageOverlay?: number;     // 0-100 opacidade do overlay (default: 50)
  textLight?: boolean;       // true = texto claro (para fundos escuros)
  parallax?: boolean;        // true = efeito parallax (bg-fixed)
  // Overrides de texto por secção
  titleColor?: string;       // cor do título (hex)
  bodyColor?: string;        // cor do texto principal (hex)
  subtitleColor?: string;    // cor de subtítulos/captions (hex)
  titleFont?: string;        // fonte do título (ex: "Playfair Display")
  bodyFont?: string;         // fonte do corpo (ex: "Lora")
}

export type AnimationType = "fade-up" | "fade-left" | "fade-right" | "fade-in" | "zoom-in" | "none";
export type AnimationSpeed = "fast" | "normal" | "slow";

export interface SectionAnimation {
  type?: AnimationType;
  speed?: AnimationSpeed;    // fast=0.4s, normal=0.7s, slow=1.2s
}

export interface SeoConfig {
  global: {
    title: string;
    description: string;
    keywords: string[];
  };
  pages: Record<string, PageSeo>;           // chave = rota (ex: "/sobre")
  googleVerification?: string;              // meta tag de verificação do Google Search Console
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
  buttons?: ButtonsConfig;
  hiddenPages?: string[];
  hero: HeroData;
  sobreNos: SobreNosData;
  missaoVisaoValores: MissaoVisaoValoresData;
  conceito: ConceitoData;
  diferencial: DiferencialData;
  graos: GraosData;
  produtos?: ProdutosData;
  menu: MenuData;
  sobremesas: SobremesasData;
  equipa: EquipaData;
  galeria: GaleriaData;
  visiteNos: VisiteNosData;
  reviews?: ReviewsData;
  seo?: SeoConfig;
  homepageOrder?: string[];
  sectionAnimations?: Record<string, SectionAnimation>;
  pageHeroes?: Record<string, PageHeroConfig>;
  sectionBgs?: Record<string, SectionBgConfig>;
  footer: FooterData;
  privacidade?: LegalSection;
  cookies?: LegalSection;
  livroReclamacoes?: LegalSection;
}
