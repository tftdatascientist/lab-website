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
    <section className="py-[100px] px-8 max-w-[1280px] mx-auto">
      {/* Header */}
      <div
        className="flex items-end justify-between gap-8 mb-12"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-7 h-px" style={{ background: "#ef7955" }} />
            <span
              className="font-mono text-[11px] uppercase"
              style={{ color: "#ef7955", letterSpacing: "0.15em" }}
            >
              Blog · codzienny przegląd AI
            </span>
          </div>
          <h1
            className="font-heading font-bold text-text"
            style={{
              fontSize: "clamp(28px,4vw,48px)",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            Co się{" "}
            <span
              className="font-display font-medium italic"
              style={{ color: "#ef7955" }}
            >
              naprawdę
            </span>{" "}
            dzieje w&nbsp;AI w&nbsp;Polsce
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: "#f5b845",
              animation: "lokai-pulse 2s ease-in-out infinite",
            }}
          />
          <span
            className="font-mono text-[11px] text-text-dim"
            style={{ letterSpacing: "0.1em" }}
          >
            AKTUALIZOWANE 4× DZIENNIE
          </span>
        </div>
      </div>

      <BlogListClient
        posts={posts.map((p) => ({ slug: p.slug, frontmatter: p.frontmatter }))}
        tags={tags}
      />
    </section>
  );
}
