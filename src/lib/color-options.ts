/**
 * Opções de cores: presets e defaults.
 */

import type { ColorsConfig } from "@/types/site-data";

export interface ColorPreset {
  name: string;
  colors: ColorsConfig;
}

export const DEFAULT_COLORS: ColorsConfig = {
  dark: "#2C1810",
  accent: "#B87333",
  background: "#F5F0EB",
};

export const COLOR_PRESETS: ColorPreset[] = [
  {
    name: "Café (original)",
    colors: { dark: "#2C1810", accent: "#B87333", background: "#F5F0EB" },
  },
  {
    name: "Azure (logo)",
    colors: { dark: "#132C35", accent: "#B87333", background: "#F5F0EB" },
  },
  {
    name: "Midnight",
    colors: { dark: "#1A1A2E", accent: "#C9956B", background: "#F5F0EB" },
  },
  {
    name: "Forest",
    colors: { dark: "#1B2D2A", accent: "#B8864B", background: "#F3F0EA" },
  },
];
