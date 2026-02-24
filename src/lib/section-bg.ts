import type { CSSProperties, ReactNode } from "react";
import { createElement } from "react";
import { getSiteData } from "@/lib/get-site-data";

/** Defaults that use dark bg with light text */
const DARK_DEFAULTS = new Set([
  "bg-espresso",
]);

const PADDING_MAP: Record<string, { paddingTop: string; paddingBottom: string }> = {
  none:     { paddingTop: "0px",  paddingBottom: "0px" },
  compact:  { paddingTop: "2rem", paddingBottom: "2rem" },
  spacious: { paddingTop: "8rem", paddingBottom: "8rem" },
};

const TITLE_SIZE_MAP: Record<string, string> = {
  sm: "clamp(1rem, 2.5vw, 1.5rem)",
  lg: "clamp(2rem, 4.5vw, 3.25rem)",
  xl: "clamp(2.5rem, 6vw, 4.5rem)",
};

const MIN_HEIGHT_MAP: Record<string, string> = {
  sm:   "40vh",
  md:   "60vh",
  full: "100vh",
};

export interface TextStyles {
  title?: CSSProperties;
  body?: CSSProperties;
  subtitle?: CSSProperties;
}

/** Serializable version — safe to pass as props to client components */
export interface SectionBgData {
  className: string;
  style?: CSSProperties;
  overlayColor?: string;
  isLight: boolean;
  textStyles: TextStyles;
}

export interface SectionBgResult {
  /** Tailwind class(es) for the <section> */
  className: string;
  /** Inline styles (backgroundColor, backgroundImage) */
  style?: CSSProperties;
  /** Optional overlay <div> — render as first child inside <section> */
  overlay: ReactNode;
  /** Whether the section has light text (dark background) */
  isLight: boolean;
  /** Per-section text color/font overrides */
  textStyles: TextStyles;
}

/** Build CSSProperties for text overrides from a SectionBgConfig */
function buildTextStyles(cfg: { titleColor?: string; bodyColor?: string; subtitleColor?: string; titleFont?: string; bodyFont?: string; titleSize?: string } | undefined): TextStyles {
  if (!cfg) return {};
  const title: CSSProperties = {};
  const body: CSSProperties = {};
  const subtitle: CSSProperties = {};

  if (cfg.titleColor) title.color = cfg.titleColor;
  if (cfg.titleFont) title.fontFamily = `"${cfg.titleFont}", serif`;
  if (cfg.titleSize && TITLE_SIZE_MAP[cfg.titleSize]) title.fontSize = TITLE_SIZE_MAP[cfg.titleSize];
  if (cfg.bodyColor) body.color = cfg.bodyColor;
  if (cfg.bodyFont) body.fontFamily = `"${cfg.bodyFont}", serif`;
  if (cfg.subtitleColor) subtitle.color = cfg.subtitleColor;

  return {
    ...(Object.keys(title).length > 0 ? { title } : {}),
    ...(Object.keys(body).length > 0 ? { body } : {}),
    ...(Object.keys(subtitle).length > 0 ? { subtitle } : {}),
  };
}

/**
 * Resolve background config for a section.
 * Falls back to the default Tailwind class when nothing is customised.
 */
export function getSectionBgStyle(
  sectionKey: string,
  defaultClass: string,
): SectionBgResult {
  const { sectionBgs } = getSiteData();
  const cfg = sectionBgs?.[sectionKey];

  const textStyles = buildTextStyles(cfg);

  // Layout overrides (apply even when no colour/image override)
  const layoutStyle: CSSProperties = {};
  if (cfg?.paddingY && cfg.paddingY !== "normal" && PADDING_MAP[cfg.paddingY]) {
    Object.assign(layoutStyle, PADDING_MAP[cfg.paddingY]);
  }
  if (cfg?.minHeight && cfg.minHeight !== "none" && MIN_HEIGHT_MAP[cfg.minHeight]) {
    layoutStyle.minHeight = MIN_HEIGHT_MAP[cfg.minHeight];
  }

  // No custom bg config → use defaults + layout overrides
  if (!cfg || (!cfg.color && !cfg.image)) {
    return {
      className: defaultClass,
      style: Object.keys(layoutStyle).length > 0 ? layoutStyle : undefined,
      overlay: null,
      isLight: !DARK_DEFAULTS.has(defaultClass),
      textStyles,
    };
  }

  const style: CSSProperties = { ...layoutStyle };
  let className = "";
  let overlay: ReactNode = null;
  const isLight = cfg.textLight ? false : true;

  // Custom colour
  if (cfg.color) {
    style.backgroundColor = cfg.color;
    // No Tailwind bg class needed — colour comes from inline style
  } else {
    className = defaultClass;
  }

  // Background image with overlay
  if (cfg.image) {
    const opacity = (cfg.imageOverlay ?? 50) / 100;
    const overlayColor = isLight
      ? `rgba(255,255,255,${opacity})`
      : `rgba(0,0,0,${opacity})`;

    style.backgroundImage = `url(${cfg.image})`;
    style.backgroundSize = "cover";
    style.backgroundPosition = "center";
    if (cfg.parallax) {
      style.backgroundAttachment = "fixed";
    }

    overlay = createElement("div", {
      className: "absolute inset-0 z-0",
      style: { backgroundColor: overlayColor },
      "aria-hidden": true,
    });
  }

  // Parallax without image (colour bg) — apply to className
  if (cfg.parallax && !cfg.image) {
    className += " bg-fixed";
  }

  return { className, style, overlay, isLight, textStyles };
}

/**
 * Serializable version of getSectionBgStyle — safe to pass as props
 * to "use client" components (no ReactNode, no fs dependency).
 */
export function getSectionBgData(
  sectionKey: string,
  defaultClass: string,
): SectionBgData {
  const result = getSectionBgStyle(sectionKey, defaultClass);
  // Extract overlayColor from the overlay element if present
  let overlayColor: string | undefined;
  if (result.overlay && typeof result.overlay === "object" && "props" in result.overlay) {
    const props = (result.overlay as { props?: { style?: { backgroundColor?: string } } }).props;
    overlayColor = props?.style?.backgroundColor;
  }
  return {
    className: result.className,
    style: result.style,
    overlayColor,
    isLight: result.isLight,
    textStyles: result.textStyles,
  };
}
