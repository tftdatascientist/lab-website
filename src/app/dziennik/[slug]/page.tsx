import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllDziennikPosts, getDziennikPostBySlug } from "@/lib/dziennik";
import LinkedInCopyButton from "@/components/LinkedInCopyButton";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lok-ai.pl";

const CATEGORY_CONFIG = {
  "publikacja-dnia": {
    label: "Publikacja dnia",
    className: "text-amber-400/90 border-amber-400/30",
  },
  ccn: {
    label: "CCN",
    className: "text-red-400/90 border-red-400/30",
  },
  przeglad: {
    label: "Przegląd",
    className: "text-cyan/80 border-cyan/20",
  },
} as const;

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllDziennikPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getDziennikPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.frontmatter.title} — Dziennik AI`,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: "article",
      locale: "pl_PL",
      publishedTime: post.frontmatter.date,
      url: `${SITE_URL}/dziennik/${post.slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/dziennik/${post.slug}`,
    },
  };
}

export default function DziennikPostPage({ params }: Props) {
  const post = getDziennikPostBySlug(params.slug);
  if (!post) notFound();

  const { frontmatter, content } = post;
  const category = CATEGORY_CONFIG[frontmatter.category];

  const datetime = new Date(frontmatter.date);
  const dateStr = datetime.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Europe/Warsaw",
  });
  const timeStr = datetime.toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Warsaw",
  });

  return (
    <article className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-10 flex-wrap">
          <Link href="/" className="hover:text-text-secondary transition-colors">
            Strona główna
          </Link>
          <span>/</span>
          <Link
            href="/dziennik"
            className="hover:text-text-secondary transition-colors"
          >
            Dziennik
          </Link>
          <span>/</span>
          <span className="text-text-secondary truncate">
            {frontmatter.title}
          </span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.1em] border rounded-full px-2.5 py-0.5 ${category.className}`}
            >
              {category.label}
            </span>
          </div>
          <h1 className="font-heading text-[clamp(24px,3.5vw,38px)] font-bold tracking-[-0.5px] text-text-primary mb-4">
            {frontmatter.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-text-muted">
            <time dateTime={frontmatter.date}>
              {dateStr}, {timeStr}
            </time>
            {frontmatter.readTime && (
              <>
                <span>·</span>
                <span>{frontmatter.readTime}</span>
              </>
            )}
          </div>
        </header>

        {/* MDX content */}
        <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-a:text-cyan prose-strong:text-text-primary prose-cyan">
          <MDXRemote source={content} />
        </div>

        {/* LinkedIn post box */}
        {frontmatter.linkedinPost && (
          <div className="mt-10 rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-amber-400/70 mb-3">
              Post LinkedIn
            </p>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Ten wpis zawiera gotowy post na LinkedIn. Skopiuj treść z sekcji
              powyżej i&nbsp;opublikuj na swoim profilu.
            </p>
            <LinkedInCopyButton />
          </div>
        )}

        {/* Back link */}
        <div className="mt-14 pt-8 border-t border-white/[0.06]">
          <Link
            href="/dziennik"
            className="text-sm text-text-secondary hover:text-cyan transition-colors"
          >
            ← Wróć do dziennika
          </Link>
        </div>
      </div>
    </article>
  );
}
