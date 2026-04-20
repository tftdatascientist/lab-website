import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/mdx";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Blog — lok-ai | Automatyzacja i AI dla firm",
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
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary block mb-4">
            Resources &amp; Intelligence
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tighter text-on-surface mb-4 leading-tight">
            Baza Wiedzy i{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Nowości AI
            </span>
          </h1>
          <p className="text-on-surface-variant leading-relaxed text-lg">
            Eksperckie spojrzenie na przyszłość automatyzacji. Praktyczne
            poradniki, case studies i&nbsp;nowości ze świata AI dla biznesu.
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
