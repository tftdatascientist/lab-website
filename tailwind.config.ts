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
        background: "#121315",
        surface: {
          DEFAULT: "#121315",
          dim: "#121315",
          bright: "#38393a",
          lowest: "#0d0e0f",
          low: "#1b1c1d",
          container: "#1f2021",
          "container-high": "#292a2b",
          "container-highest": "#343536",
          variant: "#343536",
          tint: "#d0bcff",
        },
        primary: {
          DEFAULT: "#d0bcff",
          container: "#a078ff",
        },
        secondary: {
          DEFAULT: "#4edea3",
          container: "#00a572",
        },
        tertiary: {
          DEFAULT: "#ffb3af",
          container: "#f55e5d",
        },
        error: {
          DEFAULT: "#ffb4ab",
          container: "#93000a",
        },
        "on-surface": {
          DEFAULT: "#e3e2e3",
          variant: "#cbc3d7",
        },
        "on-primary": {
          DEFAULT: "#3c0091",
          container: "#340080",
        },
        "on-secondary": {
          DEFAULT: "#003824",
          container: "#00311f",
        },
        "on-background": "#e3e2e3",
        outline: {
          DEFAULT: "#958ea0",
          variant: "#494454",
        },
        "inverse-surface": "#e3e2e3",
        "inverse-primary": "#6d3bd7",
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
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
