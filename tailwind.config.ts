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
        "bg-deep": "#060a14",
        "bg-card": "#0d1220",
        "bg-card-hover": "#111827",
        cyan: "#00d4ff",
        "cyan-glow": "rgba(0, 212, 255, 0.15)",
        amber: "#d4a574",
        "amber-glow": "rgba(212, 165, 116, 0.15)",
        "text-primary": "#e0e4ec",
        "text-secondary": "#8892a4",
        "text-muted": "#5a6478",
        border: "rgba(255, 255, 255, 0.06)",
      },
      fontFamily: {
        heading: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
