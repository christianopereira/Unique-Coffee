/**
 * Utilitários de manipulação de cores.
 * Converte hex ↔ RGB, mistura cores, gera paletas derivadas.
 */

/** Converte hex (#RRGGBB) para [R, G, B] */
export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

/** Converte [R, G, B] para #RRGGBB */
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `#${[clamp(r), clamp(g), clamp(b)].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

/** Converte hex para "R G B" (formato para CSS variables com Tailwind alpha) */
export function hexToRgbChannels(hex: string): string {
  const [r, g, b] = hexToRgb(hex);
  return `${r} ${g} ${b}`;
}

/** Mistura duas cores. weight=0 → color1, weight=1 → color2 */
export function mixColors(hex1: string, hex2: string, weight: number): string {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const w = Math.max(0, Math.min(1, weight));
  return rgbToHex(
    r1 + (r2 - r1) * w,
    g1 + (g2 - g1) * w,
    b1 + (b2 - b1) * w,
  );
}

/** Clareia uma cor misturando com branco */
export function lighten(hex: string, amount: number): string {
  return mixColors(hex, "#FFFFFF", amount);
}

/** Escurece uma cor misturando com preto */
export function darken(hex: string, amount: number): string {
  return mixColors(hex, "#000000", amount);
}

/** Dessatura uma cor levemente */
export function desaturate(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const gray = 0.299 * r + 0.587 * g + 0.114 * b;
  const a = Math.max(0, Math.min(1, amount));
  return rgbToHex(
    r + (gray - r) * a,
    g + (gray - g) * a,
    b + (gray - b) * a,
  );
}

export interface DerivedPalette {
  espresso: string;
  roast: string;
  mocha: string;
  copper: string;
  "gold-soft": string;
  cream: string;
  "warm-white": string;
  parchment: string;
  sage: string;
  stone: string;
  linen: string;
  "navbar-bg"?: string;
  "footer-bg"?: string;
  "text-main"?: string;
}

/**
 * Deriva toda a paleta de cores a partir de 3 cores base.
 * dark → espresso, roast, mocha, stone, linen
 * accent → copper, gold-soft
 * background → cream, warm-white, parchment
 */
export function derivePalette(
  dark: string,
  accent: string,
  background: string,
  extras?: { navbar?: string; footer?: string; text?: string },
): DerivedPalette {
  return {
    espresso: dark,
    roast: lighten(dark, 0.18),
    mocha: lighten(dark, 0.32),
    copper: accent,
    "gold-soft": desaturate(lighten(accent, 0.2), 0.15),
    cream: background,
    "warm-white": lighten(background, 0.35),
    parchment: darken(background, 0.04),
    sage: "#8B9A7B", // verde — independente do tema
    stone: desaturate(lighten(dark, 0.5), 0.4),
    linen: desaturate(lighten(dark, 0.7), 0.5),
    ...(extras?.navbar ? { "navbar-bg": extras.navbar } : {}),
    ...(extras?.footer ? { "footer-bg": extras.footer } : {}),
    ...(extras?.text ? { "text-main": extras.text } : {}),
  };
}
