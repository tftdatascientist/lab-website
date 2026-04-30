"use client";

import { useState } from "react";
import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import { ILLUSTRATIONS } from "@/components/news-illustrations";
import { pickIllustration, ILLUSTRATION_ACCENT } from "@/lib/blog-illustrations";
import type { PostFrontmatter } from "@/lib/mdx";

interface Props {
  posts: { slug: string; frontmatter: PostFrontmatter }[];
  tags: string[];
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
  const rest = !activeTag ? filtered.slice(1) : filtered;

  return (
    <>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {uniqueTags.map((chip) => {
          const isActive = chip === "WSZYSTKIE" ? activeTag === null : activeTag?.toUpperCase() === chip;
          return (
            <button
              key={chip}
              onClick={() => setActiveTag(chip === "WSZYSTKIE" ? null : chip)}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                border: isActive ? "1px solid #f5b845" : "1px solid rgba(196,168,130,0.15)",
                background: isActive ? "#f5b84518" : "transparent",
                color: isActive ? "#f5b845" : "#78716c",
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
        <p className="text-text-mute text-sm mt-8">Brak artykułów dla wybranego tagu.</p>
      )}

      {/* Featured post */}
      {featured && (() => {
        const primaryTag = featured.frontmatter.tags[0] ?? "";
        const illKey = pickIllustration(primaryTag, featured.frontmatter.title);
        const accent = ILLUSTRATION_ACCENT[illKey];
        const c = accent === "amber" ? "#f5b845" : "#ef7955";
        const Ill = ILLUSTRATIONS[illKey];
        return (
          <Link
            href={`/blog/${featured.slug}`}
            className="block no-underline text-text mb-5 transition-all duration-200 hover:-translate-y-[2px]"
            style={{
              position: "relative",
              background: "#1E1B18",
              border: "1px solid rgba(196,168,130,0.15)",
              borderRadius: 16,
              overflow: "hidden",
              padding: "28px 32px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {/* Illustration — right-anchored, semi-transparent */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: "55%",
                opacity: 0.18,
                pointerEvents: "none",
              }}
            >
              <Ill />
            </div>
            {/* Vignette left-to-right */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, #1E1B18 40%, rgba(30,27,24,0.6) 70%, rgba(30,27,24,0.2) 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Content */}
            <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    display: "inline-flex",
                    padding: "3px 10px",
                    background: `${c}18`,
                    border: `1px solid ${c}80`,
                    borderRadius: 999,
                    color: c,
                    fontFamily: "var(--font-ibm-plex-mono), monospace",
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {primaryTag}
                </span>
                <time
                  style={{
                    fontFamily: "var(--font-ibm-plex-mono), monospace",
                    fontSize: 11,
                    color: "#9A8672",
                    letterSpacing: "0.04em",
                  }}
                  dateTime={featured.frontmatter.date}
                >
                  {new Date(featured.frontmatter.date).toLocaleDateString("pl-PL", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </div>

              {/* Short headline — bold only here */}
              <h2
                className="font-heading"
                style={{
                  fontSize: "clamp(18px, 2vw, 24px)",
                  fontWeight: 600,
                  color: "#EDE7DC",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  margin: 0,
                  maxWidth: 680,
                }}
              >
                {featured.frontmatter.title}
              </h2>

              {featured.frontmatter.excerpt && (
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    color: "#9A8672",
                    lineHeight: 1.55,
                    margin: 0,
                    maxWidth: 580,
                  }}
                >
                  {featured.frontmatter.excerpt}
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: c,
                  fontSize: 12,
                  fontFamily: "var(--font-ibm-plex-mono), monospace",
                  letterSpacing: "0.05em",
                }}
              >
                Czytaj <span style={{ fontSize: 14 }}>→</span>
              </div>
            </div>
          </Link>
        );
      })()}

      {/* Rest — compact 3-col grid */}
      {rest.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
