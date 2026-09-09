import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/SchemaOrg";
import Tabliczka from "@/components/sciana/Tabliczka";
import KolumnaBoczna from "@/components/sciana/KolumnaBoczna";
import TabelaWpisow from "@/components/sciana/TabelaWpisow";
import { getTagInfos, getPostsByTagSlug } from "@/lib/tags";
import { getAllPosts } from "@/lib/mdx";
import { generateBreadcrumbSchema, generateItemListSchema, graph } from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

interface Props {
  params: { tag: string };
}

/** Filtr tagów jako osobne strony statyczne (nie ?tag= — czytanie MDX z dysku zostaje na buildzie). */
export function generateStaticParams() {
  return getTagInfos(1).map((t) => ({ tag: t.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const info = getTagInfos(1).find((t) => t.slug === params.tag);
  if (!info) return {};
  return {
    title: `${info.label} — wpisy | Blog lok-ai`,
    description: `Wpisy z tagiem „${info.label}” (${info.count}) — automatyzacja i AI dla firm z regionu.`,
    robots: { index: false, follow: true },
    // self-canonical: noindex + canonical na inny adres to sprzeczny sygnał dla Google;
    // bez własnego wpisu strona odziedziczyłaby canonical strony głównej z layoutu.
    alternates: { canonical: `${SITE_URL}/blog/tag/${params.tag}` },
  };
}

export default function BlogTagPage({ params }: Props) {
  const info = getTagInfos(1).find((t) => t.slug === params.tag);
  if (!info) notFound();
  const posts = getPostsByTagSlug(params.tag);
  const all = getAllPosts().length;

  return (
    <>
      <SchemaOrg
        schema={graph(
          generateItemListSchema(
            `Blog lok-ai — ${info.label}`,
            posts.map((p) => ({ name: p.frontmatter.title, url: `/blog/${p.slug}` })),
          ),
          generateBreadcrumbSchema([
            { name: "Strona główna", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: info.label, url: `/blog/tag/${params.tag}` },
          ]),
        )}
      />
      <Tabliczka nr="01" title={`Blog · ${info.label}`} right={`${posts.length} z ${all}`} footer="/blog" className="s-read">
        <h1 className="display" style={{ fontSize: "var(--step-2)", marginBottom: "var(--space-3)" }}>
          {info.label}
        </h1>
        <TabelaWpisow posts={posts} activeTag={params.tag} />
      </Tabliczka>

      <KolumnaBoczna
        routes={[
          { from: "Ten tag", to: `Blog · ${all}`, href: "/blog" },
          { from: "Ostatni wpis", to: posts[0]?.frontmatter.date ?? "", href: posts[0] ? `/blog/${posts[0].slug}` : "/blog" },
        ]}
        routesFooter="/blog"
      />
    </>
  );
}
