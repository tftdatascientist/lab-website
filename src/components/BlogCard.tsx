"use client";

import Link from "next/link";
import type { Post } from "@/lib/mdx";

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

export default function BlogCard({ post }: { post: Post }) {
  const { frontmatter, slug } = post;
  const primaryTag = frontmatter.tags[0] ?? "";
  const c = tagColor(primaryTag);

  return (
    <Link
      href={`/blog/${slug}`}
      className="group relative block rounded-[14px] overflow-hidden text-text no-underline p-6 transition-all duration-200 hover:-translate-y-[3px]"
      style={{
        background: "#17181b",
        outline: "1px solid rgba(255,255,255,0.08)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.outlineColor = c + "55";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.outlineColor =
          "rgba(255,255,255,0.08)";
      }}
    >
      {/* Top accent */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${c}, transparent)`,
          opacity: 0.5,
        }}
      />

      {/* Tag + date */}
      <div className="flex items-center gap-2.5 mb-3">
        <span
          className="font-mono text-[10px] uppercase"
          style={{ color: c, letterSpacing: "0.15em" }}
        >
          {primaryTag}
        </span>
        <span
          className="w-[3px] h-[3px] rounded-full"
          style={{ background: "#78716c" }}
        />
        <time
          className="font-mono text-[10px] text-text-mute"
          dateTime={frontmatter.date}
        >
          {new Date(frontmatter.date).toLocaleDateString("pl-PL", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>
      </div>

      <h3
        className="font-heading font-semibold text-text mb-2 leading-snug group-hover:text-text transition-colors"
        style={{ fontSize: 17, letterSpacing: "-0.015em", lineHeight: 1.3 }}
      >
        {frontmatter.title}
      </h3>

      {frontmatter.excerpt && (
        <p className="text-[13px] text-text-dim leading-relaxed line-clamp-2">
          {frontmatter.excerpt}
        </p>
      )}

      {frontmatter.readTime && (
        <p
          className="font-mono text-[10px] text-text-mute mt-3"
          style={{ letterSpacing: "0.05em" }}
        >
          {frontmatter.readTime}
        </p>
      )}
    </Link>
  );
}
