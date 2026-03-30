import Link from "next/link";
import type { DziennikPost } from "@/lib/dziennik";

const CATEGORY_CONFIG = {
  "publikacja-dnia": {
    label: "Publikacja dnia",
    className:
      "text-amber-400/90 border-amber-400/30",
  },
  ccn: {
    label: "CCN",
    className:
      "text-red-400/90 border-red-400/30",
  },
  przeglad: {
    label: "Przegląd",
    className:
      "text-cyan/80 border-cyan/20",
  },
} as const;

export default function DziennikCard({ post }: { post: DziennikPost }) {
  const { frontmatter, slug } = post;
  const date = new Date(frontmatter.date);

  const timeStr = date.toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Warsaw",
  });

  const dateStr = date.toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "short",
    timeZone: "Europe/Warsaw",
  });

  const category = CATEGORY_CONFIG[frontmatter.category];

  return (
    <Link
      href={`/dziennik/${slug}`}
      className="group flex items-start gap-4 rounded-xl border border-white/[0.05] bg-bg-card px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:bg-bg-card-hover hover:border-cyan/20 hover:shadow-[0_0_20px_rgba(0,212,255,0.05)]"
    >
      {/* Left: timestamp */}
      <div className="flex-shrink-0 w-14 text-right pt-0.5">
        <span className="block font-mono text-sm font-medium text-text-secondary">
          {timeStr}
        </span>
        <span className="block font-mono text-[10px] text-text-muted mt-0.5">
          {dateStr}
        </span>
      </div>

      {/* Divider */}
      <div className="flex-shrink-0 w-px self-stretch bg-white/[0.06] group-hover:bg-cyan/20 transition-colors duration-200" />

      {/* Right: badge + title + excerpt */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.1em] border rounded-full px-2.5 py-0.5 ${category.className}`}
          >
            {category.label}
          </span>
          {frontmatter.linkedinPost && (
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted border border-white/10 rounded-full px-2 py-0.5">
              LinkedIn
            </span>
          )}
        </div>

        <h3 className="font-heading text-sm font-semibold text-text-primary group-hover:text-cyan transition-colors duration-200 truncate">
          {frontmatter.title}
        </h3>

        <p className="text-xs text-text-secondary mt-0.5 truncate leading-relaxed">
          {frontmatter.excerpt}
        </p>
      </div>
    </Link>
  );
}
