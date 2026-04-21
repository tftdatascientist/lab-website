"use client";

import { useState } from "react";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import BlogTagFilter from "@/components/BlogTagFilter";
import type { PostFrontmatter } from "@/lib/mdx";

interface Props {
  posts: { slug: string; frontmatter: PostFrontmatter }[];
  tags: string[];
}

const TAG_COLORS: Record<string, string> = {
  startupy: "#f5b845",
  bezpieczeństwo: "#ef7955",
  prawo: "#d9b88a",
  narzędzia: "#b8542f",
  ai: "#f5b845",
  automatyzacja: "#d9b88a",
};

function tagColor(tag: string) {
  return TAG_COLORS[tag.toLowerCase()] ?? "#d9b88a";
}

export default function BlogListClient({ posts, tags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) =>
        p.frontmatter.tags
          .map((t) => t.toLowerCase())
          .includes(activeTag.toLowerCase())
      )
    : posts;

  const [featured, ...rest] = filtered;

  return (
    <>
      <BlogTagFilter tags={tags} activeTag={activeTag} onTagChange={setActiveTag} />

      {filtered.length > 0 ? (
        <>
          {/* Featured post — magazine layout */}
          {featured && !activeTag && (
            <div
              className="grid lg:grid-cols-[1.3fr_1fr] gap-6 mb-10"
            >
              {/* Featured card */}
              <Link
                href={`/blog/${featured.slug}`}
                className="group relative block rounded-[16px] overflow-hidden text-text no-underline p-10 transition-all duration-200 hover:-translate-y-[3px]"
                style={{
                  background: "#17181b",
                  outline: "1px solid rgba(255,255,255,0.08)",
                  minHeight: 420,
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={(e) => {
                  const c = tagColor(featured.frontmatter.tags[0] ?? "");
                  (e.currentTarget as HTMLElement).style.outlineColor = c + "55";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.outlineColor =
                    "rgba(255,255,255,0.08)";
                }}
              >
                {/* Blur orb */}
                {(() => {
                  const c = tagColor(featured.frontmatter.tags[0] ?? "");
                  return (
                    <div
                      className="absolute pointer-events-none"
                      style={{
                        top: -60,
                        right: -60,
                        width: 280,
                        height: 280,
                        background: `radial-gradient(circle, ${c}40, transparent 70%)`,
                        filter: "blur(50px)",
                      }}
                    />
                  );
                })()}

                {/* Tag + date */}
                <div className="relative flex items-center gap-2.5 mb-6">
                  <span
                    className="font-mono text-[10px] uppercase"
                    style={{
                      color: tagColor(featured.frontmatter.tags[0] ?? ""),
                      letterSpacing: "0.15em",
                    }}
                  >
                    {featured.frontmatter.tags[0]}
                  </span>
                  <span
                    className="w-[3px] h-[3px] rounded-full"
                    style={{ background: "#78716c" }}
                  />
                  <time
                    className="font-mono text-[10px] text-text-mute"
                    dateTime={featured.frontmatter.date}
                  >
                    {new Date(featured.frontmatter.date).toLocaleDateString(
                      "pl-PL",
                      { day: "numeric", month: "short", year: "numeric" }
                    )}
                  </time>
                </div>

                <div className="relative flex-1 flex items-center">
                  <h2
                    className="font-heading font-semibold text-text"
                    style={{
                      fontSize: "clamp(20px,2.2vw,32px)",
                      letterSpacing: "-0.025em",
                      lineHeight: 1.15,
                    }}
                  >
                    {featured.frontmatter.title}
                  </h2>
                </div>

                {featured.frontmatter.excerpt && (
                  <p
                    className="relative text-[15px] text-text-dim leading-relaxed mt-5 mb-6"
                    style={{ maxWidth: 560 }}
                  >
                    {featured.frontmatter.excerpt}
                  </p>
                )}

                <div
                  className="relative flex items-center gap-2 font-semibold text-[13px]"
                  style={{
                    color: tagColor(featured.frontmatter.tags[0] ?? ""),
                  }}
                >
                  Czytaj dalej <span>→</span>
                </div>
              </Link>

              {/* Smaller posts column */}
              <div className="flex flex-col gap-3">
                {rest.slice(0, 3).map((p) => {
                  const c = tagColor(p.frontmatter.tags[0] ?? "");
                  return (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="group relative block rounded-[14px] overflow-hidden text-text no-underline p-6 transition-all duration-200 hover:-translate-y-[2px] flex-1"
                      style={{
                        background: "#17181b",
                        outline: "1px solid rgba(255,255,255,0.08)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.outlineColor =
                          c + "55";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.outlineColor =
                          "rgba(255,255,255,0.08)";
                      }}
                    >
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <span
                          className="font-mono text-[10px] uppercase"
                          style={{ color: c, letterSpacing: "0.15em" }}
                        >
                          {p.frontmatter.tags[0]}
                        </span>
                        <span
                          className="w-[3px] h-[3px] rounded-full"
                          style={{ background: "#78716c" }}
                        />
                        <time
                          className="font-mono text-[10px] text-text-mute"
                          dateTime={p.frontmatter.date}
                        >
                          {new Date(p.frontmatter.date).toLocaleDateString(
                            "pl-PL",
                            { day: "numeric", month: "short" }
                          )}
                        </time>
                      </div>
                      <h3
                        className="font-heading font-semibold text-text"
                        style={{
                          fontSize: 17,
                          letterSpacing: "-0.015em",
                          lineHeight: 1.3,
                        }}
                      >
                        {p.frontmatter.title}
                      </h3>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Remaining posts grid */}
          {(activeTag ? filtered : rest.slice(3)).length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
              {(activeTag ? filtered : rest.slice(3)).map((post) => (
                <BlogCard
                  key={post.slug}
                  post={{ slug: post.slug, frontmatter: post.frontmatter, content: "" }}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="text-text-mute text-sm mt-8">
          Brak artykułów dla wybranego tagu.
        </p>
      )}
    </>
  );
}
