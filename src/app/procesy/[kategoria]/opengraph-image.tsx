import { ImageResponse } from "next/og";
import { getCategory } from "@/lib/procesy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "lok-ai.pl — procesy biznesowe";

const AMBER = "#f5b845";
const SAND = "#cbb89a";
const BG = "#0b0c0e";
const PANEL = "#17181b";

interface Props {
  params: { kategoria: string };
}

function titleSize(len: number): number {
  if (len > 60) return 66;
  if (len > 38) return 78;
  return 92;
}

export default async function Image({ params }: Props) {
  const c = getCategory(params.kategoria);
  const eyebrow = c ? `Procesy · PCF ${c.code}` : "Procesy biznesowe";
  const title = c?.namePl || "lok-ai";

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
            lineHeight: 1.06,
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
