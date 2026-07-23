import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette futuriste — bleu nuit profond + accents lumineux
        night: {
          950: "#04040d", // fond principal
          900: "#080816",
          800: "#0d0d22",
          700: "#141432",
        },
        electric: "#4f7cff", // bleu électrique
        neon: "#22d3ee", // cyan
        pulse: "#8b5cf6", // violet
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #4f7cff 0deg, #8b5cf6 120deg, #22d3ee 240deg, #4f7cff 360deg)",
        "grid-tech":
          "linear-gradient(rgba(79,124,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(79,124,255,.06) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 0 24px rgba(79,124,255,.35)",
        "glow-lg": "0 0 60px rgba(139,92,246,.35)",
        card: "0 8px 40px rgba(0,0,0,.45)",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "pulse-border": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "gradient-shift": "gradient-shift 8s ease infinite",
        "float-slow": "float-slow 7s ease-in-out infinite",
        "spin-slow": "spin-slow 14s linear infinite",
        "pulse-border": "pulse-border 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
