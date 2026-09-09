import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, getRelatedPosts, type Post, type PostFrontmatter } from "@/lib/mdx";
import SchemaOrg from "@/components/SchemaOrg";
import TldrBox from "@/components/TldrBox";
import KeyTakeaways from "@/components/KeyTakeaways";
import ArticleFaq from "@/components/ArticleFaq";
import RelatedLinks, { type RelatedItem } from "@/components/RelatedLinks";
import Tabliczka from "@/components/sciana/Tabliczka";
import Miejsce from "@/components/sciana/Miejsce";
import WierszeAB from "@/components/sciana/WierszeAB";
import CtaPole from "@/components/sciana/CtaPole";
import { createAutolinkComponents } from "@/lib/autolink";
import { getAllTerms } from "@/lib/slownik";
import { totalNodeCount } from "@/lib/procesy";
import { generateArticleSchema, generateBreadcrumbSchema, generateFaqSchema, graph } from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const fm = post.frontmatter as PostFrontmatter & { description?: string; dateModified?: string };
  const desc = fm.description || fm.excerpt;
  const ogImg = fm.image ? `${SITE_URL}${fm.image.startsWith("/") ? "" : "/"}${fm.image}` : undefined;

  return {
    title: `${fm.title} — lok-ai Blog`,
    description: desc,
    openGraph: {
      title: fm.title,
      description: desc,
      type: "article",
      locale: "pl_PL",
      publishedTime: fm.date,
      modifiedTime: fm.dateModified || fm.date,
      url: `${SITE_URL}/blog/${post.slug}`,
      ...(ogImg ? { images: [{ url: ogImg, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: desc,
      ...(ogImg ? { images: [ogImg] } : {}),
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

/**
 * Dobiera 3-4 hasła słownika powiązane z artykułem: proste dopasowanie —
 * hasła, których nazwa pojawia się w tytule / excerpt / tagach wpisu.
 * Dłuższe (bardziej konkretne) hasła mają priorytet.
 */
function pickRelatedTerms(post: Post, limit = 4): RelatedItem[] {
  const hay = [
    post.frontmatter.title,
    post.frontmatter.excerpt,
    post.frontmatter.description ?? "",
    ...(post.frontmatter.tags ?? []),
  ]
    .join(" ")
    .toLowerCase();

  const matches = getAllTerms()
    .filter((t) => {
      const h = (t.haslo || "").toLowerCase();
      return h.length >= 3 && hay.includes(h);
    })
    .sort((a, b) => b.haslo.length - a.haslo.length);

  const seen = new Set<string>();
  const out: RelatedItem[] = [];
  for (const t of matches) {
    if (seen.has(t.slug)) continue;
    seen.add(t.slug);
    out.push({ label: t.haslo, href: `/slownik/${t.slug}`, kind: "slownik" });
    if (out.length >= limit) break;
  }
  return out;
}

function plDate(iso: string) {
  return new Date(iso).toLocaleDateString("pl-PL", { year: "numeric", month: "long", day: "numeric" });
}

/**
 * Wzorzec podstrony treści (DESIGN.md §Siatka): ta sama ściana, kol. 1–8 tabliczka
 * czytania, kol. 9–12 Miejsce (skrócona) + „Skąd > dokąd” dla tego tematu + CTA.
 * Każda podstrona niesie markę bez hero.
 */
export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const fm = post.frontmatter;
  const related = getRelatedPosts(post.slug, 3);
  const all = getAllPosts();
  const index = all.findIndex((p) => p.slug === post.slug);
  const nr = String(all.length - index).padStart(3, "0"); // numer wpisu w kolejności publikacji (stopka: nr / wszystkich)

  // Autolink: świeży stan (Set) per render artykułu.
  const mdxComponents = createAutolinkComponents();

  const relatedTerms = pickRelatedTerms(post, 4);
  const relatedLinks: RelatedItem[] = [
    ...relatedTerms,
    { label: "Automatyzacja procesów", href: "/procesy", kind: "proces" },
    { label: "Wdrożenia AI", href: "/wdrozenia", kind: "wdrozenie" },
  ];
  const faqNodes = fm.faq?.length
    ? [generateFaqSchema(fm.faq.map((f) => ({ question: f.q, answer: f.a })))]
    : [];

  const modified = fm.dateModified && fm.dateModified !== fm.date ? fm.dateModified : null;
  const sideRoutes = [
    { from: "Ten wpis", to: `Blog · ${all.length}`, href: "/blog" },
    {
      from: "Pojęcia z tekstu",
      to: relatedTerms.length ? `Słownik · ${relatedTerms.length}` : "Słownik",
      href: relatedTerms[0]?.href ?? "/slownik",
    },
    { from: "Procesy w firmie", to: `${totalNodeCount()} w bazie`, href: "/procesy" },
  ];

  return (
    <>
      <SchemaOrg
        schema={graph(
          generateArticleSchema(post),
          generateBreadcrumbSchema([
            { name: "Strona główna", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: fm.title, url: `/blog/${post.slug}` },
          ]),
          ...faqNodes,
        )}
      />

      <Tabliczka
        as="article"
        nr="01"
        title={
          <>
            <Link href="/blog">Blog</Link> · {fm.date}
          </>
        }
        right={fm.readTime}
        footer={modified ? `Zaktualizowano ${plDate(modified)}` : fm.author ? `Autor: ${fm.author}` : "lok-ai · Grudziądz"}
        footerRight={`${nr} / ${all.length}`}
        className="s-read"
      >
        <header style={{ marginBottom: "var(--space-3)" }}>
          <h1 className="display" style={{ fontSize: "var(--step-3)", maxWidth: "20ch", marginBottom: "var(--space-2)" }}>
            {fm.title}
          </h1>
          <p className="mono" style={{ color: "var(--ink-3)" }}>
            <time dateTime={fm.date}>{plDate(fm.date)}</time>
            {fm.tags?.length ? <> · {fm.tags.join(" · ")}</> : null}
          </p>
        </header>

        {/* TL;DR (GEO answer-first) */}
        <TldrBox>{fm.tldr}</TldrBox>

        {/* MDX content */}
        <div className="prose prose-paper">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {/* Wnioski + FAQ (GEO) */}
        <KeyTakeaways items={fm.takeaways} />
        <ArticleFaq items={fm.faq} />

        {/* Powiązane wpisy (internal linking) */}
        {related.length > 0 && (
          <section aria-labelledby="rel" className="ruled">
            <h2 id="rel" className="label">
              Powiązane wpisy
            </h2>
            <ul className="rows">
              {related.map((r) => (
                <li key={r.slug}>
                  <span className="n">{r.frontmatter.date.slice(5, 10)}</span>
                  <span className="t">
                    <Link href={`/blog/${r.slug}`}>{r.frontmatter.title}</Link>
                    <span className="d">{r.frontmatter.excerpt}</span>
                  </span>
                  <span className="v">{r.frontmatter.readTime}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Zobacz też — internal-linking mesh (słownik + oferta) */}
        <RelatedLinks items={relatedLinks} />
      </Tabliczka>

      <aside className="s-side" aria-label="metadane">
        <Miejsce nr="02" className="" short />

        <Tabliczka nr="03" title="Skąd > dokąd" right={sideRoutes.length} footer="/blog · /slownik · /procesy">
          <WierszeAB rows={sideRoutes} />
        </Tabliczka>

        <CtaPole className="" />
      </aside>
    </>
  );
}
