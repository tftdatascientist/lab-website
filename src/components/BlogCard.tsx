import Link from "next/link";
import type { Post } from "@/lib/mdx";

export default function BlogCard({ post }: { post: Post }) {
  const { frontmatter, slug } = post;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group block py-6 border-b border-outline-variant/20 hover:bg-surface-container/50 transition-colors -mx-4 px-4 rounded-lg"
    >
      {/* Date + tags */}
      <div className="flex items-center gap-3 mb-2">
        <time className="text-sm font-mono text-on-surface-variant">
          {new Date(frontmatter.date).toLocaleDateString("pl-PL", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span className="text-outline">|</span>
        {frontmatter.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono text-secondary uppercase tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">
        {frontmatter.title}
      </h3>

      {/* Excerpt */}
      <p className="text-base text-on-surface-variant">
        {frontmatter.excerpt}
      </p>
    </Link>
  );
}
