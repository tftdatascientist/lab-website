import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import { getAllTerms } from "@/lib/slownik";
import { totalNodeCount } from "@/lib/procesy";
import SchemaOrg from "@/components/SchemaOrg";
import Tabliczka from "@/components/sciana/Tabliczka";
import KolumnaBoczna from "@/components/sciana/KolumnaBoczna";
import TabelaWpisow from "@/components/sciana/TabelaWpisow";
import { generateItemListSchema, generateWebPageSchema, generateBreadcrumbSchema, graph } from "@/lib/schema";

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

  const schema = graph(
    generateItemListSchema(
      "Blog lok-ai",
      posts.map((p) => ({ name: p.frontmatter.title, url: `/blog/${p.slug}` })),
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
      <Tabliczka nr="01" title="Blog · Przegląd dnia" right={posts.length} footer="Codziennie, ze źródłami" className="s-read">
        <h1 className="display" style={{ fontSize: "var(--step-3)", maxWidth: "16ch", marginBottom: "var(--space-2)" }}>
          Polska w dobie cyfrowej rewolucji
        </h1>
        <p style={{ color: "var(--ink-2)", maxWidth: "var(--measure)", marginBottom: "var(--space-3)" }}>
          Praktyczna wiedza o automatyzacji procesów, chatbotach i agentach AI oraz rozwiązaniach low-code dla małych
          i średnich firm — bez żargonu, z konkretami dla MŚP.
        </p>
        <TabelaWpisow posts={posts} />
      </Tabliczka>

      <KolumnaBoczna
        routes={[
          { from: "Ostatni wpis", to: posts[0]?.frontmatter.date ?? "", href: posts[0] ? `/blog/${posts[0].slug}` : "/blog" },
          { from: "Trudne pojęcia", to: `${getAllTerms().length} haseł`, href: "/slownik" },
          { from: "Procesy w firmie", to: `${totalNodeCount()} w bazie`, href: "/procesy" },
        ]}
      />
    </>
  );
}
