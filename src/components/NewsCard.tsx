"use client";

import Link from "next/link";
import { useState } from "react";
import type { ComponentType } from "react";

const ACCENT_HEX = {
  amber: "#f5b845",
  coral: "#ef7955",
} as const;

interface Props {
  slug: string;
  title: string;
  tag: string;
  date: string;
  readTime?: string;
  Illustration: ComponentType;
  accent: "amber" | "coral";
}

export default function NewsCard({ slug, title, tag, date, readTime, Illustration, accent }: Props) {
  const [hovered, setHovered] = useState(false);
  const c = ACCENT_HEX[accent];

  const formattedDate = new Date(date).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${slug}`}
      className="block no-underline text-text"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: "#1E1B18",
        border: `1px solid ${hovered ? `${c}80` : "rgba(196,168,130,0.12)"}`,
        borderRadius: 14,
        overflow: "hidden",
        padding: "16px 18px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 7,
        minHeight: 0,
        transition: "all 0.25s ease",
        boxShadow: hovered ? `0 0 18px ${c}12, 0 4px 20px rgba(0,0,0,0.35)` : "none",
        transform: hovered ? "translateY(-2px)" : "none",
        textDecoration: "none",
      }}
    >
      {/* Illustration — full-bleed background, semi-transparent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.13,
          pointerEvents: "none",
        }}
      >
        <Illustration />
      </div>

      {/* Dark vignette so text stays readable */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #1E1B18 0%, rgba(30,27,24,0.75) 60%, rgba(30,27,24,0.45) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Content — full width, above illustration */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: 7 }}>
        {/* Tag + date row */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span
            style={{
              display: "inline-flex",
              padding: "2px 8px",
              background: `${c}18`,
              border: `1px solid ${c}80`,
              borderRadius: 999,
              color: c,
              fontFamily: "var(--font-ibm-plex-mono), monospace",
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {tag}
          </span>
          <span
            style={{
              fontFamily: "var(--font-ibm-plex-mono), monospace",
              fontSize: 10,
              color: "#9A8672",
              letterSpacing: "0.04em",
            }}
          >
            {formattedDate}
          </span>
          {readTime && (
            <span
              style={{
                fontFamily: "var(--font-ibm-plex-mono), monospace",
                fontSize: 10,
                color: "#6A5D50",
                letterSpacing: "0.04em",
                marginLeft: "auto",
              }}
            >
              {readTime}
            </span>
          )}
        </div>

        {/* Title — lighter weight, compact */}
        <p
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: "#D8D0C8",
            lineHeight: 1.45,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </p>
      </div>
    </Link>
  );
}
