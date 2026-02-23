import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "rgb(var(--color-cream, 245 240 235) / <alpha-value>)",
        "warm-white": "rgb(var(--color-warm-white, 250 248 245) / <alpha-value>)",
        parchment: "rgb(var(--color-parchment, 237 232 225) / <alpha-value>)",
        espresso: "rgb(var(--color-espresso, 44 24 16) / <alpha-value>)",
        roast: "rgb(var(--color-roast, 74 52 40) / <alpha-value>)",
        mocha: "rgb(var(--color-mocha, 107 83 68) / <alpha-value>)",
        copper: "rgb(var(--color-copper, 184 115 51) / <alpha-value>)",
        "gold-soft": "rgb(var(--color-gold-soft, 201 169 110) / <alpha-value>)",
        sage: "rgb(var(--color-sage, 139 154 123) / <alpha-value>)",
        stone: "rgb(var(--color-stone, 160 150 144) / <alpha-value>)",
        linen: "rgb(var(--color-linen, 212 204 196) / <alpha-value>)",
        "navbar-bg": "rgb(var(--color-navbar-bg, var(--color-espresso, 44 24 16)) / <alpha-value>)",
        "footer-bg": "rgb(var(--color-footer-bg, var(--color-espresso, 44 24 16)) / <alpha-value>)",
        "text-main": "rgb(var(--color-text-main, var(--color-espresso, 44 24 16)) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        sans: ["var(--font-sans)"],
      },
      fontSize: {
        "hero": ["var(--size-hero, clamp(2.5rem, 5vw, 5rem))", { lineHeight: "1.1" }],
        "section": ["var(--size-section, clamp(1.75rem, 3vw, 3rem))", { lineHeight: "1.2" }],
        "subtitle": ["var(--size-subtitle, clamp(1.125rem, 1.5vw, 1.5rem))", { lineHeight: "1.5" }],
      },
      spacing: {
        "section": "clamp(4rem, 8vw, 8rem)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "hero-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.2)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "marquee": "marquee 30s linear infinite",
        "hero-zoom": "hero-zoom 12s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
