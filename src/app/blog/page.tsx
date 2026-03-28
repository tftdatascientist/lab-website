import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/mdx";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Blog — LAB | Automatyzacja i AI dla firm",
  description:
    "Artykuły o automatyzacji procesów, chatbotach AI, agentach głosowych i rozwiązaniach low-code dla MŚP.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-cyan" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
              Blog
            </span>
          </div>
          <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-bold tracking-[-1px] text-text-primary mb-4">
            Wiedza i inspiracje
          </h1>
          <p className="text-text-secondary leading-relaxed">
            Praktyczne poradniki, case studies i&nbsp;nowości ze świata
            automatyzacji i&nbsp;AI dla biznesu.
          </p>
        </div>

        <BlogListClient
          posts={posts.map((p) => ({ slug: p.slug, frontmatter: p.frontmatter }))}
          tags={tags}
        />
      </div>
    </section>
  );
}
