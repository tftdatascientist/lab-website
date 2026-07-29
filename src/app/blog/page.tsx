import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/mdx";
import BlogListClient from "./BlogListClient";
import SchemaOrg from "@/components/SchemaOrg";
import { SubpageHeader } from "@/components/mechanism";
import {
  generateItemListSchema,
  generateWebPageSchema,
  generateBreadcrumbSchema,
  graph,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Blog — lok-ai | Automatyzacja i AI dla firm",
  description:
    "Artykuły o automatyzacji procesów, chatbotach AI, agentach głosowych i rozwiązaniach low-code dla MŚP.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl"}/blog`,
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  const schema = graph(
    generateItemListSchema(
      "Blog lok-ai",
      posts.map((p) => ({
        name: p.frontmatter.title,
        url: `/blog/${p.slug}`,
      })),
      "Artykuły o automatyzacji procesów, AI i rozwiązaniach low-code dla MŚP.",
    ),
    generateWebPageSchema({
      type: "CollectionPage",
      name: "Blog",
      path: "/blog",
      description:
        "Artykuły o automatyzacji procesów, chatbotach AI, agentach głosowych i rozwiązaniach low-code dla MŚP.",
    }),
    generateBreadcrumbSchema([
      { name: "Strona główna", url: "/" },
      { name: "Blog", url: "/blog" },
    ]),
  );

  return (
    <>
      <SchemaOrg schema={schema} />
      <SubpageHeader
        eyebrow="Blog · AI dla biznesu"
        title="Polska w dobie"
        accent="cyfrowej rewolucji"
        cluster="blog"
        description="Praktyczna wiedza o automatyzacji procesów, chatbotach i agentach AI oraz rozwiązaniach low-code dla małych i średnich firm — bez żargonu, z konkretami dla MŚP."
      />

      <section className="py-12 px-8 max-w-[1280px] mx-auto">
        <BlogListClient
          posts={posts.map((p) => ({ slug: p.slug, frontmatter: p.frontmatter }))}
          tags={tags}
        />
      </section>
    </>
  );
}
