import type { TypographyConfig } from "@/types/site-data";
import { DEFAULT_TYPOGRAPHY, findFontWeights } from "@/lib/font-options";

interface FontLoaderProps {
  typography: TypographyConfig;
}

/**
 * Server component que renderiza <link> tags do Google Fonts
 * para fontes custom (diferentes dos defaults).
 */
export function FontLoader({ typography }: FontLoaderProps) {
  const defaults = DEFAULT_TYPOGRAPHY.fonts;
  const fontsToLoad: string[] = [];

  if (typography.fonts.display !== defaults.display) {
    const w = findFontWeights(typography.fonts.display);
    fontsToLoad.push(
      `family=${typography.fonts.display.replace(/ /g, "+")}:wght@${w}`
    );
  }

  if (typography.fonts.body !== defaults.body) {
    const w = findFontWeights(typography.fonts.body);
    fontsToLoad.push(
      `family=${typography.fonts.body.replace(/ /g, "+")}:ital,wght@0,${w};1,${w}`
    );
  }

  if (typography.fonts.ui !== defaults.ui) {
    const w = findFontWeights(typography.fonts.ui);
    fontsToLoad.push(
      `family=${typography.fonts.ui.replace(/ /g, "+")}:wght@${w}`
    );
  }

  if (fontsToLoad.length === 0) return null;

  const url = `https://fonts.googleapis.com/css2?${fontsToLoad.join("&")}&display=swap`;

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href={url} />
    </>
  );
}
