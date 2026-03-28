import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import BlogCard from "./BlogCard";

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 4);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-cyan" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
                Blog
              </span>
            </div>
            <h2 className="font-heading text-[clamp(28px,4vw,42px)] font-bold tracking-[-1px] text-text-primary mb-4">
              Wiedza i inspiracje
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Praktyczne poradniki i&nbsp;nowości ze świata automatyzacji
              i&nbsp;AI dla biznesu.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex text-sm text-text-secondary hover:text-cyan transition-colors whitespace-nowrap"
          >
            Wszystkie artykuły →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/blog"
            className="text-sm text-text-secondary hover:text-cyan transition-colors"
          >
            Wszystkie artykuły →
          </Link>
        </div>
      </div>
    </section>
  );
}
