import Link from "next/link";
import type { Post } from "@/lib/mdx";

export default function BlogCard({ post }: { post: Post }) {
  const { frontmatter, slug } = post;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group block rounded-2xl border border-white/[0.06] bg-bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-bg-card-hover hover:shadow-[0_0_30px_rgba(0,212,255,0.06)]"
    >
      {/* Tags + date row */}
      <div className="flex items-center gap-3 mb-3">
        {frontmatter.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] uppercase tracking-[0.1em] text-cyan/80 border border-cyan/20 rounded-full px-2.5 py-0.5"
          >
            {tag}
          </span>
        ))}
        <span className="ml-auto text-xs text-text-muted">
          {frontmatter.readTime}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-heading text-base font-semibold text-text-primary mb-2 group-hover:text-cyan transition-colors line-clamp-2">
        {frontmatter.title}
      </h3>

      {/* Excerpt */}
      <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
        {frontmatter.excerpt}
      </p>

      {/* Date */}
      <time className="block mt-4 text-xs text-text-muted">
        {new Date(frontmatter.date).toLocaleDateString("pl-PL", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
    </Link>
  );
}
