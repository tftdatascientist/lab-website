"use client";

import { useState } from "react";
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

  return (
    <>
      <BlogTagFilter tags={tags} activeTag={activeTag} onTagChange={setActiveTag} />

      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <BlogCard
              key={post.slug}
              post={{ slug: post.slug, frontmatter: post.frontmatter, content: "" }}
            />
          ))}
        </div>
      ) : (
        <p className="text-outline text-sm">
          Brak artykułów dla wybranego tagu.
        </p>
      )}
    </>
  );
}
