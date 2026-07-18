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
import { createAutolinkComponents } from "@/lib/autolink";
import { getAllTerms } from "@/lib/slownik";
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

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const fm = post.frontmatter;
  const related = getRelatedPosts(post.slug, 3);

  // Autolink: świeży stan (Set) per render artykułu.
  const mdxComponents = createAutolinkComponents();

  // Powiązania "Zobacz też": hasła słownika + stałe linki do oferty.
  const relatedLinks: RelatedItem[] = [
    ...pickRelatedTerms(post, 4),
    { label: "Automatyzacja procesów", href: "/procesy", kind: "proces" },
    { label: "Wdrożenia AI", href: "/wdrozenia", kind: "wdrozenie" },
  ];
  const faqNodes = fm.faq?.length
    ? [generateFaqSchema(fm.faq.map((f) => ({ question: f.q, answer: f.a })))]
    : [];

  return (
    <>
      <SchemaOrg
        schema={graph(
          generateArticleSchema(post),
          generateBreadcrumbSchema([
            { name: "Strona główna", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: post.frontmatter.title, url: `/blog/${post.slug}` },
          ]),
          ...faqNodes,
        )}
      />

      <article className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-outline mb-10">
            <Link href="/" className="hover:text-on-surface-variant transition-colors">
              Strona główna
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-on-surface-variant transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-on-surface-variant truncate">
              {post.frontmatter.title}
            </span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] uppercase tracking-[0.1em] text-primary/80 border border-primary/20 rounded-full px-2.5 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-heading text-[clamp(24px,3.5vw,36px)] font-semibold tracking-[-1px] text-on-surface mb-4">
              {post.frontmatter.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-outline">
              <time>
                {new Date(post.frontmatter.date).toLocaleDateString("pl-PL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>·</span>
              <span>{post.frontmatter.readTime}</span>
              {fm.dateModified && fm.dateModified !== fm.date && (
                <>
                  <span>·</span>
                  <span>
                    Zaktualizowano{" "}
                    {new Date(fm.dateModified).toLocaleDateString("pl-PL", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
          </header>

          {/* TL;DR (GEO answer-first) */}
          <TldrBox>{fm.tldr}</TldrBox>

          {/* MDX content */}
          <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-a:text-primary prose-strong:text-on-surface">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          {/* Wnioski + FAQ (GEO) */}
          <KeyTakeaways items={fm.takeaways} />
          <ArticleFaq items={fm.faq} />

          {/* Powiązane wpisy (internal linking) */}
          {related.length > 0 && (
            <div className="mt-14">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-mute mb-4">
                Powiązane artykuły
              </h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group block rounded-xl border border-border bg-surface hover:border-amber/40 transition-all p-4"
                  >
                    <span className="font-heading font-semibold text-on-surface group-hover:text-amber transition-colors text-[15px] leading-snug">
                      {r.frontmatter.title}
                    </span>
                    <p className="text-text-dim text-[13px] leading-snug line-clamp-2 mt-1">
                      {r.frontmatter.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Zobacz też — internal-linking mesh (słownik + oferta) */}
          <RelatedLinks items={relatedLinks} />

          {/* Back */}
          <div className="mt-14 pt-8 border-t border-outline-variant/15">
            <Link
              href="/blog"
              className="text-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              ← Wróć do bloga
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
