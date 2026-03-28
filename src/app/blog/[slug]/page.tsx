import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import SchemaOrg from "@/components/SchemaOrg";
import { generateArticleSchema } from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lab-ai.pl";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.frontmatter.title} — LAB Blog`,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: "article",
      locale: "pl_PL",
      publishedTime: post.frontmatter.date,
      url: `${SITE_URL}/blog/${post.slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <SchemaOrg schema={generateArticleSchema(post)} />

      <article className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-text-muted mb-10">
            <Link href="/" className="hover:text-text-secondary transition-colors">
              Strona główna
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-text-secondary transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-text-secondary truncate">
              {post.frontmatter.title}
            </span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] uppercase tracking-[0.1em] text-cyan/80 border border-cyan/20 rounded-full px-2.5 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-bold tracking-[-1px] text-text-primary mb-4">
              {post.frontmatter.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-text-muted">
              <time>
                {new Date(post.frontmatter.date).toLocaleDateString("pl-PL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>·</span>
              <span>{post.frontmatter.readTime}</span>
            </div>
          </header>

          {/* MDX content */}
          <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-a:text-cyan prose-strong:text-text-primary">
            <MDXRemote source={post.content} />
          </div>

          {/* Back */}
          <div className="mt-14 pt-8 border-t border-white/[0.06]">
            <Link
              href="/blog"
              className="text-sm text-text-secondary hover:text-cyan transition-colors"
            >
              ← Wróć do bloga
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
