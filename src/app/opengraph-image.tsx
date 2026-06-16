import { ImageResponse } from "next/og";

export const runtime = "nodejs";
// Generowane na żądanie (Vercel/Linux). Pomija prerender przy buildzie —
// @vercel/og nie radzi sobie ze ścieżką projektu ze spacjami/znakami PL na Windows.
export const dynamic = "force-dynamic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "lok-ai.pl — Lokalna automatyzacja biznesu";

// ── Branding ──────────────────────────────────────────────────────────────
const AMBER = "#f5b845";
const SAND = "#cbb89a";
const BG = "#0b0c0e";
const PANEL = "#17181b";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `linear-gradient(135deg, ${BG} 0%, ${PANEL} 100%)`,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* amber rail */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 12,
            background: AMBER,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: AMBER,
          }}
        >
          Lokalna automatyzacja biznesu
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.04,
              color: "#ffffff",
              letterSpacing: -1,
            }}
          >
            Chatboty, agenci głosowi i automatyzacja AI
          </div>
          <div style={{ display: "flex", fontSize: 34, color: SAND, fontWeight: 400 }}>
            Region kujawsko-pomorski
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            fontWeight: 700,
            color: SAND,
          }}
        >
          <span style={{ color: AMBER }}>lok-ai.pl</span>
          <span style={{ margin: "0 14px", color: "#3a3c40" }}>·</span>
          <span>Lokalna automatyzacja biznesu</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
