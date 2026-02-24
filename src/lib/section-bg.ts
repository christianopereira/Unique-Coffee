import type { CSSProperties, ReactNode } from "react";
import { createElement } from "react";
import { getSiteData } from "@/lib/get-site-data";

/** Defaults that use dark bg with light text */
const DARK_DEFAULTS = new Set([
  "bg-espresso",
]);

/** Serializable version — safe to pass as props to client components */
export interface SectionBgData {
  className: string;
  style?: CSSProperties;
  overlayColor?: string;
  isLight: boolean;
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

  // No custom config → use defaults
  if (!cfg || (!cfg.color && !cfg.image)) {
    return {
      className: defaultClass,
      overlay: null,
      isLight: !DARK_DEFAULTS.has(defaultClass),
    };
  }

  const style: CSSProperties = {};
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

    overlay = createElement("div", {
      className: "absolute inset-0 z-0",
      style: { backgroundColor: overlayColor },
      "aria-hidden": true,
    });
  }

  return { className, style, overlay, isLight };
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
  };
}
