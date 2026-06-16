import { ImageResponse } from "next/og";
import { getTerm, L1_LABELS } from "@/lib/slownik";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "lok-ai.pl — Słownik IT";

const AMBER = "#f5b845";
const SAND = "#cbb89a";
const BG = "#0b0c0e";
const PANEL = "#17181b";

interface Props {
  params: { slug: string };
}

function titleSize(len: number): number {
  if (len > 48) return 70;
  if (len > 28) return 84;
  return 100;
}

export default async function Image({ params }: Props) {
  const t = getTerm(params.slug);
  const eyebrow = t ? `Słownik IT · ${L1_LABELS[t.L1] || "Pojęcie"}` : "Słownik IT";
  const title = t ? (t.skrot ? `${t.haslo} (${t.skrot})` : t.haslo) : "lok-ai";

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
          {eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: titleSize(title.length),
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#ffffff",
            letterSpacing: -1,
          }}
        >
          {title}
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
