import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/mdx";

const AMBER   = "#e8a020";
const CORAL   = "#ef7955";
const SAND    = "#d9b88a";
const RUST    = "#b8542f";
const CARD_BG = "#17181b";
const CARD_HI = "#1f2125";

const COLOR_CYCLE = [AMBER, CORAL, SAND, RUST];

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 4);
  if (posts.length === 0) return null;

  const featured = posts[0];
  const rest = posts.slice(1, 4);
  const fm = featured.frontmatter;

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr)
        .toLocaleDateString("pl-PL", { day: "numeric", month: "short", year: "numeric" })
        .toUpperCase();
    } catch {
      return dateStr;
    }
  };

  return (
    <section
      style={{
        padding: "clamp(60px,8vw,100px) clamp(20px,4vw,32px)",
        maxWidth: 1280,
        margin: "0 auto",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 24,
          marginBottom: 48,
          flexWrap: "wrap",
        }}
      >
        <div>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ width: 28, height: 1, background: AMBER, display: "block", flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "var(--font-ibm-plex-mono), monospace",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: AMBER,
              }}
            >
              Blog · codzienny przegląd AI
            </span>
          </div>
          {/* Headline */}
          <h2
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(26px,3.5vw,44px)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "#ede7dc",
              margin: 0,
            }}
          >
            Co się{" "}
            <em
              style={{
                fontStyle: "italic",
                fontFamily: "var(--font-chakra-petch), sans-serif",
                fontWeight: 500,
                color: AMBER,
                letterSpacing: "-0.01em",
              }}
            >
              naprawdę
            </em>{" "}
            dzieje w&nbsp;AI w&nbsp;Polsce
          </h2>
        </div>

        {/* Right meta */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: AMBER,
                display: "block",
                animation: "lokai-pulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-ibm-plex-mono), monospace",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#78716c",
              }}
            >
              Aktualizowane 4× dziennie
            </span>
          </div>
          <Link
            href="/blog"
            style={{
              fontFamily: "var(--font-ibm-plex-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: AMBER,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
              opacity: 0.85,
              transition: "opacity 0.15s",
            }}
            className="hidden sm:inline-flex hover:opacity-100"
          >
            Wszystkie artykuły <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* ── Grid ───────────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 16,
        }}
        className="md:grid-cols-[1.4fr_1fr]"
      >
        {/* Featured card */}
        <Link
          href={`/blog/${featured.slug}`}
          style={{
            display: "flex",
            flexDirection: "column",
            background: CARD_BG,
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.07)",
            textDecoration: "none",
            color: "inherit",
            transition: "transform 0.2s, border-color 0.2s",
          }}
          className="group hover:-translate-y-1 hover:border-amber-500/30"
        >
          {/* Image */}
          <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
            {fm.image ? (
              <>
                <Image
                  src={fm.image}
                  alt={fm.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  style={{ objectFit: "cover", transition: "transform 0.5s" }}
                  className="group-hover:scale-[1.04]"
                />
                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(to bottom, transparent 40%, ${CARD_BG} 100%)`,
                  }}
                />
                {/* Tag badge over image */}
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    background: "rgba(0,0,0,0.65)",
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${AMBER}44`,
                    borderRadius: 6,
                    padding: "4px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: AMBER,
                      display: "block",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-ibm-plex-mono), monospace",
                      fontSize: 9,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: AMBER,
                    }}
                  >
                    {fm.tags?.[0] ?? "BLOG"}
                  </span>
                </div>
              </>
            ) : (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(135deg, ${AMBER}14 0%, ${CARD_BG} 100%)`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -60,
                    right: -60,
                    width: 260,
                    height: 260,
                    background: `radial-gradient(circle, ${AMBER}28, transparent 70%)`,
                    filter: "blur(50px)",
                  }}
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div style={{ padding: "24px 28px 28px", display: "flex", flexDirection: "column", flex: 1 }}>
            {/* Date + readtime */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
                fontFamily: "var(--font-ibm-plex-mono), monospace",
                fontSize: 10,
                color: "#78716c",
                letterSpacing: "0.1em",
              }}
            >
              <span>{formatDate(fm.date)}</span>
              {fm.readTime && (
                <>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#4a4540", display: "block" }} />
                  <span>{fm.readTime}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(18px,2vw,26px)",
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
                color: "#ede7dc",
                margin: "0 0 12px",
              }}
            >
              {fm.title}
            </h3>

            {fm.excerpt && (
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "#a8a29e",
                  margin: "0 0 20px",
                  flex: 1,
                }}
              >
                {fm.excerpt}
              </p>
            )}

            {/* CTA */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                fontWeight: 600,
                color: AMBER,
                marginTop: "auto",
              }}
            >
              Czytaj dalej{" "}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: `1px solid ${AMBER}55`,
                  fontSize: 12,
                  transition: "transform 0.2s",
                }}
                className="group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </div>
          </div>
        </Link>

        {/* Side cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {rest.map((post, i) => {
            const color = COLOR_CYCLE[(i + 1) % COLOR_CYCLE.length];
            const pfm = post.frontmatter;
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{
                  display: "flex",
                  gap: 14,
                  background: CARD_BG,
                  borderRadius: 14,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.07)",
                  textDecoration: "none",
                  color: "inherit",
                  padding: 16,
                  flex: 1,
                  alignItems: "center",
                  transition: "transform 0.2s, background 0.2s, border-color 0.2s",
                }}
                className="group hover:-translate-y-0.5 hover:bg-[#1f2125] hover:border-white/10"
              >
                {/* Thumbnail */}
                <div
                  style={{
                    position: "relative",
                    width: 96,
                    height: 72,
                    borderRadius: 10,
                    overflow: "hidden",
                    flexShrink: 0,
                    background: `linear-gradient(135deg, ${color}18, ${CARD_HI})`,
                  }}
                >
                  {pfm.image && (
                    <Image
                      src={pfm.image}
                      alt={pfm.title}
                      fill
                      sizes="96px"
                      style={{ objectFit: "cover", transition: "transform 0.4s" }}
                      className="group-hover:scale-[1.07]"
                    />
                  )}
                </div>

                {/* Text */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0, flex: 1 }}>
                  {/* Meta */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      fontFamily: "var(--font-ibm-plex-mono), monospace",
                      fontSize: 9,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    <span style={{ color }}>{pfm.tags?.[0] ?? "BLOG"}</span>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#4a4540", display: "block", flexShrink: 0 }} />
                    <span style={{ color: "#78716c", whiteSpace: "nowrap" }}>{formatDate(pfm.date)}</span>
                  </div>

                  {/* Title */}
                  <h4
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontWeight: 600,
                      fontSize: 13,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.4,
                      color: "#ede7dc",
                      margin: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {pfm.title}
                  </h4>
                </div>

                {/* Arrow indicator */}
                <span
                  style={{
                    color: "#4a4540",
                    fontSize: 14,
                    flexShrink: 0,
                    transition: "color 0.2s, transform 0.2s",
                    marginLeft: 4,
                  }}
                  className="group-hover:text-[#a8a29e] group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile link */}
      <div style={{ marginTop: 24 }} className="sm:hidden">
        <Link
          href="/blog"
          style={{
            fontFamily: "var(--font-ibm-plex-mono), monospace",
            fontSize: 12,
            color: "#78716c",
            textDecoration: "none",
            letterSpacing: "0.08em",
          }}
        >
          Wszystkie artykuły →
        </Link>
      </div>
    </section>
  );
}
