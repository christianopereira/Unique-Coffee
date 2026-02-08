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
        cream: "#F5F0EB",
        "warm-white": "#FAF8F5",
        parchment: "#EDE8E1",
        espresso: "#2C1810",
        roast: "#4A3428",
        mocha: "#6B5344",
        copper: "#B87333",
        "gold-soft": "#C9A96E",
        sage: "#8B9A7B",
        stone: "#A09690",
        linen: "#D4CCC4",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Lora", "Georgia", "serif"],
        sans: ["Raleway", "sans-serif"],
      },
      fontSize: {
        "hero": ["clamp(2.5rem, 5vw, 5rem)", { lineHeight: "1.1" }],
        "section": ["clamp(1.75rem, 3vw, 3rem)", { lineHeight: "1.2" }],
        "subtitle": ["clamp(1.125rem, 1.5vw, 1.5rem)", { lineHeight: "1.5" }],
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
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
