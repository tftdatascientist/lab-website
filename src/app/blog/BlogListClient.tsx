"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import BlogTagFilter from "@/components/BlogTagFilter";
import type { PostFrontmatter } from "@/lib/mdx";

interface Props {
  posts: { slug: string; frontmatter: PostFrontmatter }[];
  tags: string[];
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
          {/* Featured Post */}
          {featured && !activeTag && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group block mb-8 bg-surface-container rounded-xl overflow-hidden hover:bg-surface-container-high transition-all duration-300"
            >
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-secondary bg-secondary/10 px-2 py-1 rounded">
                    Polecane
                  </span>
                  {featured.frontmatter.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="glass-panel px-2 py-1 text-[10px] font-mono text-on-surface-variant rounded uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-4 leading-snug group-hover:text-primary transition-colors">
                  {featured.frontmatter.title}
                </h2>
                <p className="text-on-surface-variant mb-6 max-w-2xl leading-relaxed">
                  {featured.frontmatter.excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono text-on-surface-variant">
                    {featured.frontmatter.readTime}
                  </span>
                  <span className="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Czytaj artykuł <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Rest of posts grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeTag ? filtered : rest).map((post) => (
              <BlogCard
                key={post.slug}
                post={{ slug: post.slug, frontmatter: post.frontmatter, content: "" }}
              />
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="relative mt-20 p-8 md:p-12 bg-surface-container-low rounded-2xl border border-outline-variant/10 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
              <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-primary blur-[120px] rounded-full" />
              <div className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-secondary blur-[120px] rounded-full" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold font-heading mb-3">
                Bądź na bieżąco z AI
              </h3>
              <p className="text-on-surface-variant mb-8 max-w-lg mx-auto">
                Zapisz się do naszego newslettera, aby otrzymywać praktyczne case
                studies i analizy prosto na swoją skrzynkę.
              </p>
              <div className="max-w-md mx-auto flex gap-3">
                <input
                  className="flex-grow bg-surface-lowest ghost-border rounded-lg py-3 px-4 text-sm text-on-surface focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50"
                  placeholder="Twój adres e-mail"
                  type="email"
                />
                <button className="px-6 py-3 obsidian-gradient text-on-primary font-bold text-sm rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap">
                  Subskrybuj
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-outline text-sm">
          Brak artykułów dla wybranego tagu.
        </p>
      )}
    </>
  );
}
