import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostFaq {
  q: string;
  a: string;
}

export interface PostFrontmatter {
  title: string;
  date: string;
  dateModified?: string; // świeżość; fallback = date
  tags: string[];
  excerpt: string;
  description?: string; // meta description; fallback = excerpt
  readTime: string;
  image?: string;
  author?: string; // E-E-A-T; fallback w schema
  section?: string; // filar: Chatboty / Agenci głosowi / Automatyzacja procesów / AI w biznesie
  tldr?: string; // 1-2 zdania do TldrBox
  takeaways?: string[]; // 3-5 punktów do KeyTakeaways
  faq?: PostFaq[]; // 2-4 Q&A do ArticleFaq + FAQPage schema
  related?: string[]; // slugi powiązanych wpisów
  wordCount?: number;
  noindex?: boolean; // dla cienkich/duplikatów
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

function createMdxReader(contentDir: string) {
  const DIR = path.join(process.cwd(), contentDir);

  function getPostBySlug(slug: string): Post | null {
    const filePath = path.join(DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const fm = data as PostFrontmatter;
    if (fm.wordCount == null) {
      fm.wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    }

    return {
      slug,
      frontmatter: fm,
      content,
    };
  }

  function getAllPosts(): Post[] {
    if (!fs.existsSync(DIR)) return [];

    const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx"));

    const posts = files
      .map((file) => getPostBySlug(file.replace(/\.mdx$/, "")))
      .filter((p): p is Post => p !== null);

    return posts.sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
  }

  function getPostsByTag(tag: string): Post[] {
    return getAllPosts().filter((p) =>
      p.frontmatter.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
    );
  }

  function getAllTags(): string[] {
    const tags = new Set<string>();
    for (const post of getAllPosts()) {
      for (const tag of post.frontmatter.tags) {
        tags.add(tag);
      }
    }
    return Array.from(tags).sort();
  }

  function getRelatedPosts(slug: string, limit = 3): Post[] {
    const all = getAllPosts();
    const cur = all.find((p) => p.slug === slug);
    if (!cur) return [];
    const explicit = (cur.frontmatter.related ?? [])
      .map((s) => all.find((p) => p.slug === s))
      .filter((p): p is Post => p != null);
    if (explicit.length >= limit) return explicit.slice(0, limit);
    const scored = all
      .filter((p) => p.slug !== slug && !explicit.includes(p))
      .map((p) => ({
        p,
        score:
          (p.frontmatter.section && p.frontmatter.section === cur.frontmatter.section ? 2 : 0) +
          p.frontmatter.tags.filter((t) => cur.frontmatter.tags.includes(t)).length,
      }))
      .sort((a, b) => b.score - a.score);
    return [...explicit, ...scored.map((s) => s.p)].slice(0, limit);
  }

  return { getPostBySlug, getAllPosts, getPostsByTag, getAllTags, getRelatedPosts };
}

const blogReader = createMdxReader("src/content/blog");
export const getPostBySlug = blogReader.getPostBySlug;
export const getAllPosts = blogReader.getAllPosts;
export const getPostsByTag = blogReader.getPostsByTag;
export const getAllTags = blogReader.getAllTags;
export const getRelatedPosts = blogReader.getRelatedPosts;
