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
          DEFAULT: "#0a0f14",
          raised: "#0f1620",
          border: "#1a2733",
        },
        accent: {
          cyan: "#22d3ee",
          muted: "#0e7490",
          green: "#4ade80",
        },
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(34, 211, 238, 0.15)",
        "glow-strong": "0 0 32px rgba(34, 211, 238, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
