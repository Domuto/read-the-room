import type { Config } from "tailwindcss";

/**
 * ────────────────────────────────────────────────────────────
 *  BRAND COLORS — edit these in ONE place and the whole site updates.
 *  Warm, roasted, low-light palette: espresso black + coffee amber.
 * ────────────────────────────────────────────────────────────
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#16100c", // page background (warm espresso black)
        panel: "#211712", // cards / surfaces
        paper: "#f0e7d8", // primary text (warm off-white)
        haze: "#a8967f", // secondary / muted text
        ember: "#ef7d3a", // accent (roast orange)
        gold: "#d8a64e", // secondary accent, used sparingly
        line: "rgba(240,231,216,0.12)", // hairline borders
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
