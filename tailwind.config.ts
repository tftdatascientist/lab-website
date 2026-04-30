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
        // ── Backgrounds ──────────────────────────────────────────────────
        background: "#0b0c0e",
        "bg-soft": "#121315",
        surface: {
          DEFAULT: "#17181b",
          warm: "#1E1B18",
          hi: "#1f2125",
          "hi-hi": "#2a2d32",
          // legacy aliases (keep for unused pages during migration)
          dim: "#121315",
          bright: "#2a2d32",
          lowest: "#0b0c0e",
          low: "#17181b",
          container: "#1f2125",
          "container-high": "#2a2d32",
          "container-highest": "#2a2d32",
          variant: "#2a2d32",
          tint: "#f5b845",
        },
        // ── Accents — warm amber/coral/sand/rust ─────────────────────────
        amber: {
          DEFAULT: "#f5b845",
          deep: "#c48a1c",
        },
        coral: {
          DEFAULT: "#ef7955",
          deep: "#b84a2a",
        },
        sand: {
          DEFAULT: "#d9b88a",
          deep: "#8a6a3c",
        },
        rust: {
          DEFAULT: "#b8542f",
          deep: "#7a3018",
        },
        // ── Legacy aliases (map to warm palette, keep until full migration) ─
        primary: {
          DEFAULT: "#f5b845",
          container: "#c48a1c",
        },
        secondary: {
          DEFAULT: "#d9b88a",
          container: "#8a6a3c",
        },
        tertiary: {
          DEFAULT: "#ef7955",
          container: "#b84a2a",
        },
        error: {
          DEFAULT: "#ffb4ab",
          container: "#93000a",
        },
        // ── Text ─────────────────────────────────────────────────────────
        "on-surface": {
          DEFAULT: "#ede7dc",
          variant: "#a8a29e",
        },
        "on-primary": {
          DEFAULT: "#1a0f00",
          container: "#1a0f00",
        },
        "on-secondary": {
          DEFAULT: "#1a0f00",
          container: "#1a0f00",
        },
        "on-background": "#ede7dc",
        text: {
          DEFAULT: "#ede7dc",
          dim: "#a8a29e",
          mute: "#78716c",
        },
        outline: {
          DEFAULT: "#78716c",
          variant: "rgba(255,255,255,0.08)",
        },
        "inverse-surface": "#ede7dc",
        "inverse-primary": "#c48a1c",
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
          strong: "rgba(255,255,255,0.14)",
        },
      },
      fontFamily: {
        heading: ["var(--font-inter)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "var(--font-jetbrains-mono)", "monospace"],
        display: ["var(--font-chakra-petch)", "var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
