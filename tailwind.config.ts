import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

/**
 * Tokeny z design/DESIGN.md (CCUD, locked v1, kierunek B „Ściana tabliczek”).
 * Jedno źródło heksów: stąd idą klasy Tailwinda ORAZ zmienne CSS `:root`
 * (plugin `addBase` niżej), więc komponenty mogą pisać `bg-paper` albo `var(--paper)`.
 */
export const tokens = {
  paper: "#e8e5de",
  "paper-2": "#dcd8cf",
  "paper-3": "#cfcabf",
  plate: "#26282b",
  "plate-2": "#323538",
  "plate-3": "#3e4246",
  ink: "#171614",
  "ink-2": "#4f4c47",
  "ink-3": "#66625b",
  bone: "#e8e5de",
  "bone-2": "#a8a49c",
  accent: "#ec3d0a",
  "accent-ink": "#1a0c07",
  "rule-paper": "#171614",
  "rule-plate": "rgba(232,229,222,.18)",
} as const;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...tokens,

        // ── Aliasy LEGACY (strony nieprzeniesione w ETAP2) ───────────────
        // Mapowane na nowe podłoża, żeby stare strony były czytelne na płycie.
        // Dawne akcenty (amber/sand/rust/coral/primary) idą na NEUTRALNY bone-2,
        // NIE na sygnał — inaczej każda stara strona rozsadza budżet ≤10 % sygnału.
        // Do usunięcia po migracji wszystkich podstron (DESIGN.md §Wdrożenie).
        background: tokens.plate,
        "bg-soft": tokens["plate-2"],
        surface: {
          DEFAULT: tokens["plate-2"],
          warm: tokens["plate-2"],
          hi: tokens["plate-3"],
          "hi-hi": tokens["plate-3"],
          dim: tokens["plate-2"],
          bright: tokens["plate-3"],
          lowest: tokens.plate,
          low: tokens["plate-2"],
          container: tokens["plate-3"],
          "container-high": tokens["plate-3"],
          "container-highest": tokens["plate-3"],
          variant: tokens["plate-3"],
          tint: tokens["bone-2"],
        },
        amber: { DEFAULT: tokens["bone-2"], deep: tokens["bone-2"] },
        coral: { DEFAULT: tokens["bone-2"], deep: tokens["bone-2"] },
        sand: { DEFAULT: tokens["bone-2"], deep: tokens["bone-2"] },
        rust: { DEFAULT: tokens["bone-2"], deep: tokens["bone-2"] },
        primary: { DEFAULT: tokens["bone-2"], container: tokens["plate-3"] },
        secondary: { DEFAULT: tokens["bone-2"], container: tokens["plate-3"] },
        tertiary: { DEFAULT: tokens["bone-2"], container: tokens["plate-3"] },
        error: { DEFAULT: tokens.accent, container: tokens["plate-3"] },
        "on-surface": { DEFAULT: tokens.bone, variant: tokens["bone-2"] },
        "on-primary": { DEFAULT: tokens.ink, container: tokens.bone },
        "on-secondary": { DEFAULT: tokens.ink, container: tokens.bone },
        "on-background": tokens.bone,
        text: { DEFAULT: tokens.bone, dim: tokens["bone-2"], mute: tokens["bone-2"] },
        outline: { DEFAULT: tokens["bone-2"], variant: tokens["rule-plate"] },
        "inverse-surface": tokens.bone,
        "inverse-primary": tokens["bone-2"],
        border: { DEFAULT: tokens["rule-plate"], strong: tokens["rule-plate"] },
      },
      fontFamily: {
        display: ["var(--font-chakra-petch)", "sans-serif"],
        text: ["var(--font-archivo)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        // legacy
        heading: ["var(--font-archivo)", "sans-serif"],
        body: ["var(--font-archivo)", "sans-serif"],
      },
      fontSize: {
        "step--1": ["13px", { lineHeight: "1.4" }],
        "step-0": ["17px", { lineHeight: "1.5" }],
        "step-1": ["22px", { lineHeight: "1.1" }],
        "step-2": ["30px", { lineHeight: "1.1" }],
        "step-3": ["40px", { lineHeight: "1" }],
        "step-4": ["54px", { lineHeight: "1.1" }],
      },
      spacing: {
        s1: "8px",
        s2: "16px",
        s3: "32px",
        s4: "64px",
      },
      // tabliczka ma kanty — także na stronach legacy (rounded-* daje 0)
      borderRadius: {
        none: "0",
        DEFAULT: "0",
        sm: "0",
        md: "0",
        lg: "0",
        xl: "0",
        "2xl": "0",
        "3xl": "0",
        full: "0",
      },
      boxShadow: {
        none: "none",
        DEFAULT: "none",
        sm: "none",
        md: "none",
        lg: "none",
        xl: "none",
        "2xl": "none",
      },
      transitionDuration: {
        state: "140ms",
        context: "220ms",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ addBase }) => {
      const vars: Record<string, string> = {};
      for (const [k, v] of Object.entries(tokens)) vars[`--${k}`] = v;
      addBase({ ":root": vars });
    }),
  ],
};
export default config;
