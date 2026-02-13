import type { TypographyConfig } from "@/types/site-data";

export interface FontOption {
  name: string;
  label: string;
  weights: string;
}

// Serif fonts para títulos/display
export const DISPLAY_FONTS: FontOption[] = [
  { name: "Playfair Display", label: "Playfair Display", weights: "400;700" },
  { name: "Cormorant Garamond", label: "Cormorant Garamond", weights: "400;600" },
  { name: "Libre Baskerville", label: "Libre Baskerville", weights: "400;700" },
  { name: "DM Serif Display", label: "DM Serif Display", weights: "400" },
  { name: "EB Garamond", label: "EB Garamond", weights: "400;700" },
  { name: "Merriweather", label: "Merriweather", weights: "400;700" },
  { name: "Spectral", label: "Spectral", weights: "400;600" },
  { name: "Crimson Text", label: "Crimson Text", weights: "400;700" },
];

// Serif fonts para texto de corpo
export const BODY_FONTS: FontOption[] = [
  { name: "Lora", label: "Lora", weights: "400;700" },
  { name: "Source Serif 4", label: "Source Serif 4", weights: "400;600" },
  { name: "Libre Baskerville", label: "Libre Baskerville", weights: "400;700" },
  { name: "EB Garamond", label: "EB Garamond", weights: "400;700" },
  { name: "Merriweather", label: "Merriweather", weights: "300;400;700" },
  { name: "Crimson Text", label: "Crimson Text", weights: "400;700" },
  { name: "Cormorant Garamond", label: "Cormorant Garamond", weights: "400;600" },
  { name: "PT Serif", label: "PT Serif", weights: "400;700" },
];

// Sans-serif fonts para navegação/UI
export const UI_FONTS: FontOption[] = [
  { name: "Raleway", label: "Raleway", weights: "400;500;600;700" },
  { name: "Montserrat", label: "Montserrat", weights: "400;500;600;700" },
  { name: "Lato", label: "Lato", weights: "400;700" },
  { name: "Open Sans", label: "Open Sans", weights: "400;600;700" },
  { name: "Nunito", label: "Nunito", weights: "400;600;700" },
  { name: "Work Sans", label: "Work Sans", weights: "400;500;600" },
  { name: "DM Sans", label: "DM Sans", weights: "400;500;700" },
  { name: "Poppins", label: "Poppins", weights: "400;500;600" },
];

export const DEFAULT_TYPOGRAPHY: TypographyConfig = {
  fonts: {
    display: "Playfair Display",
    body: "Lora",
    ui: "Raleway",
  },
  sizes: {
    heroTitle: "clamp(2.5rem, 5vw, 5rem)",
    sectionTitle: "clamp(1.75rem, 3vw, 3rem)",
    subtitle: "clamp(1.125rem, 1.5vw, 1.5rem)",
    body: "16px",
  },
};

export const SIZE_PRESETS = {
  heroTitle: [
    { label: "Pequeno", value: "clamp(2rem, 4vw, 4rem)" },
    { label: "Normal", value: "clamp(2.5rem, 5vw, 5rem)" },
    { label: "Grande", value: "clamp(3rem, 6vw, 6rem)" },
  ],
  sectionTitle: [
    { label: "Pequeno", value: "clamp(1.5rem, 2.5vw, 2.5rem)" },
    { label: "Normal", value: "clamp(1.75rem, 3vw, 3rem)" },
    { label: "Grande", value: "clamp(2rem, 3.5vw, 3.5rem)" },
  ],
  subtitle: [
    { label: "Pequeno", value: "clamp(1rem, 1.2vw, 1.25rem)" },
    { label: "Normal", value: "clamp(1.125rem, 1.5vw, 1.5rem)" },
    { label: "Grande", value: "clamp(1.25rem, 1.8vw, 1.75rem)" },
  ],
  body: [
    { label: "Pequeno (15px)", value: "15px" },
    { label: "Normal (16px)", value: "16px" },
    { label: "Grande (18px)", value: "18px" },
    { label: "Extra grande (20px)", value: "20px" },
  ],
};

/** Procura os weights de uma fonte nas listas curadas */
export function findFontWeights(name: string): string {
  const allFonts = [...DISPLAY_FONTS, ...BODY_FONTS, ...UI_FONTS];
  const found = allFonts.find((f) => f.name === name);
  return found?.weights || "400;700";
}
