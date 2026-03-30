import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/lib/mdx";

export default function BlogCard({ post }: { post: Post }) {
  const { frontmatter, slug } = post;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col bg-surface-container rounded-xl overflow-hidden hover:bg-surface-container-high transition-all duration-300"
    >
      <div className="p-6 flex flex-col flex-grow">
        {/* Tags + date row */}
        <div className="flex items-center gap-3 mb-3">
          {frontmatter.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="glass-panel px-2 py-1 text-[10px] font-mono text-secondary rounded uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
          <span className="ml-auto text-xs font-mono text-on-surface-variant">
            {frontmatter.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-on-surface mb-4 leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {frontmatter.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-on-surface-variant line-clamp-2 mb-6">
          {frontmatter.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between">
          <time className="text-xs font-mono text-on-surface-variant">
            {new Date(frontmatter.date).toLocaleDateString("pl-PL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
