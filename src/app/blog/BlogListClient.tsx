"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NewsCard from "@/components/NewsCard";
import { ILLUSTRATIONS } from "@/components/news-illustrations";
import { pickIllustration, ILLUSTRATION_ACCENT } from "@/lib/blog-illustrations";
import type { PostFrontmatter } from "@/lib/mdx";

const AMBER   = "#e8a020";
const CORAL   = "#ef7955";
const SAND    = "#d9b88a";
const RUST    = "#b8542f";
const CARD_BG = "#17181b";
const CARD_HI = "#1f2125";
const COLOR_CYCLE = [AMBER, CORAL, SAND, RUST];

interface Props {
  posts: { slug: string; frontmatter: PostFrontmatter }[];
  tags: string[];
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr)
      .toLocaleDateString("pl-PL", { day: "numeric", month: "short", year: "numeric" })
      .toUpperCase();
  } catch {
    return dateStr;
  }
}

export default function BlogListClient({ posts, tags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) =>
        p.frontmatter.tags.map((t) => t.toUpperCase()).includes(activeTag.toUpperCase())
      )
    : posts;

  const allTags = ["WSZYSTKIE", ...tags.map((t) => t.toUpperCase())];
  const uniqueTags = Array.from(new Set(allTags));

  const featured = !activeTag ? filtered[0] : null;
  const sidebar  = !activeTag ? filtered.slice(1, 4) : [];
  const rest     = !activeTag ? filtered.slice(4) : filtered;

  return (
    <>
      {/* ── Filter chips ─────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-10">
        {uniqueTags.map((chip) => {
          const isActive = chip === "WSZYSTKIE" ? activeTag === null : activeTag?.toUpperCase() === chip;
          return (
            <button
              key={chip}
              onClick={() => setActiveTag(chip === "WSZYSTKIE" ? null : chip)}
              style={{
                padding: "5px 12px",
                borderRadius: 999,
                border: isActive ? `1px solid ${AMBER}` : "1px solid rgba(196,168,130,0.15)",
                background: isActive ? `${AMBER}18` : "transparent",
                color: isActive ? AMBER : "#78716c",
                fontFamily: "var(--font-ibm-plex-mono), monospace",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p style={{ color: "#78716c", fontSize: 14, marginTop: 32 }}>Brak artykułów dla wybranego tagu.</p>
      )}

      {/* ── Top editorial grid (featured + 3 side cards) ─────────── */}
      {featured && (
        <div
          style={{ display: "grid", gap: 16, marginBottom: 16 }}
          className="md:grid-cols-[1.4fr_1fr]"
        >
          {/* Featured */}
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
            className="group hover:-translate-y-1"
          >
            {/* Image */}
            <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
              {featured.frontmatter.image ? (
                <>
                  <Image
                    src={featured.frontmatter.image}
                    alt={featured.frontmatter.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    style={{ objectFit: "cover", transition: "transform 0.5s" }}
                    className="group-hover:scale-[1.04]"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(to bottom, transparent 40%, ${CARD_BG} 100%)`,
                    }}
                  />
                  {/* Tag badge */}
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
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: AMBER, display: "block" }} />
                    <span
                      style={{
                        fontFamily: "var(--font-ibm-plex-mono), monospace",
                        fontSize: 9,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: AMBER,
                      }}
                    >
                      {featured.frontmatter.tags?.[0] ?? "BLOG"}
                    </span>
                  </div>
                </>
              ) : (
                /* Fallback: SVG illustration */
                (() => {
                  const illKey = pickIllustration(featured.frontmatter.tags[0] ?? "", featured.frontmatter.title);
                  const Ill = ILLUSTRATIONS[illKey];
                  return (
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${AMBER}12, ${CARD_BG})` }}>
                      <div style={{ position: "absolute", inset: 0, opacity: 0.15 }}><Ill /></div>
                    </div>
                  );
                })()
              )}
            </div>

            {/* Content */}
            <div style={{ padding: "22px 26px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                  fontFamily: "var(--font-ibm-plex-mono), monospace",
                  fontSize: 10,
                  color: "#78716c",
                  letterSpacing: "0.1em",
                }}
              >
                <span>{formatDate(featured.frontmatter.date)}</span>
                {featured.frontmatter.readTime && (
                  <>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#4a4540", display: "block" }} />
                    <span>{featured.frontmatter.readTime}</span>
                  </>
                )}
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(18px,2vw,26px)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.2,
                  color: "#ede7dc",
                  margin: "0 0 10px",
                }}
              >
                {featured.frontmatter.title}
              </h2>

              {featured.frontmatter.excerpt && (
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "#a8a29e", margin: "0 0 18px", flex: 1 }}>
                  {featured.frontmatter.excerpt}
                </p>
              )}

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

          {/* 3 sidebar cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {sidebar.map((post, i) => {
              const color = COLOR_CYCLE[(i + 1) % COLOR_CYCLE.length];
              const pfm = post.frontmatter;
              const illKey = pickIllustration(pfm.tags[0] ?? "", pfm.title);
              const Ill = ILLUSTRATIONS[illKey];
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
                    transition: "transform 0.2s, background 0.2s",
                  }}
                  className="group hover:-translate-y-0.5 hover:bg-[#1f2125]"
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
                    {pfm.image ? (
                      <Image
                        src={pfm.image}
                        alt={pfm.title}
                        fill
                        sizes="96px"
                        style={{ objectFit: "cover", transition: "transform 0.4s" }}
                        className="group-hover:scale-[1.07]"
                      />
                    ) : (
                      <div style={{ position: "absolute", inset: 0, opacity: 0.25 }}><Ill /></div>
                    )}
                  </div>

                  {/* Text */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0, flex: 1 }}>
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
                    <h3
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
                    </h3>
                  </div>

                  <span
                    style={{ color: "#4a4540", fontSize: 14, flexShrink: 0, transition: "color 0.2s, transform 0.2s", marginLeft: 4 }}
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
      )}

      {/* ── Rest — compact 3-col grid ────────────────────────────── */}
      {rest.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {rest.map((post) => {
            const primaryTag = post.frontmatter.tags[0] ?? "";
            const illKey = pickIllustration(primaryTag, post.frontmatter.title);
            const accent = ILLUSTRATION_ACCENT[illKey];
            const Ill = ILLUSTRATIONS[illKey];
            return (
              <NewsCard
                key={post.slug}
                slug={post.slug}
                title={post.frontmatter.title}
                tag={primaryTag}
                date={post.frontmatter.date}
                readTime={post.frontmatter.readTime}
                Illustration={Ill}
                accent={accent}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
