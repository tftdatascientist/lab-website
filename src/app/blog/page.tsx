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
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-px" style={{ background: "#f5b845" }} />
          <span
            className="font-mono text-[11px] uppercase"
            style={{ color: "#f5b845", letterSpacing: "0.15em" }}
          >
            Blog · 14&nbsp;szablonów
          </span>
        </div>
        <h1
          className="font-heading font-bold text-text mb-5"
          style={{
            fontSize: "clamp(28px,5vw,64px)",
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            maxWidth: 1000,
          }}
        >
          News z&nbsp;polskiej i&nbsp;światowej{" "}
          <span
            className="font-display font-medium italic"
            style={{ color: "#f5b845" }}
          >
            sceny AI
          </span>
          .
        </h1>
        <p
          className="text-text-dim"
          style={{ fontSize: 17, maxWidth: 620, lineHeight: 1.55 }}
        >
          Każda kategoria ma własny ręcznie rysowany neon line-art w&nbsp;cieple amber/coral. Bez stockowych grafik, bez chłodnych niebieskości — wszystko trzyma się palety Amber&nbsp;&amp;&nbsp;Ash.
        </p>
      </div>

      <BlogListClient
        posts={posts.map((p) => ({ slug: p.slug, frontmatter: p.frontmatter }))}
        tags={tags}
      />
    </section>
  );
}
