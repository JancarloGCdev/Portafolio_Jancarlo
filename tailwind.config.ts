import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#050b14",
          raised: "#0a121e",
          border: "#162232",
        },
        accent: {
          cyan: "#22d3ee",
          muted: "#0e7490",
          green: "#4ade80",
          emerald: "#10b981",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(34, 211, 238, 0.12)",
        "glow-strong": "0 0 36px rgba(34, 211, 238, 0.24)",
        "glow-emerald": "0 0 24px rgba(74, 222, 128, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
