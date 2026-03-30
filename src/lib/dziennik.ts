import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DZIENNIK_DIR = path.join(process.cwd(), "src/content/dziennik");

export interface DziennikFrontmatter {
  title: string;
  date: string; // ISO datetime with timezone, e.g. "2026-03-30T08:00:00+02:00"
  category: "publikacja-dnia" | "ccn" | "przeglad";
  tags: string[];
  excerpt: string;
  readTime: string;
  linkedinPost?: boolean; // true if post contains a LinkedIn section
}

export interface DziennikPost {
  slug: string;
  frontmatter: DziennikFrontmatter;
  content: string;
}

export function getDziennikPostBySlug(slug: string): DziennikPost | null {
  const filePath = path.join(DZIENNIK_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: data as DziennikFrontmatter,
    content,
  };
}

export function getAllDziennikPosts(): DziennikPost[] {
  if (!fs.existsSync(DZIENNIK_DIR)) return [];

  const files = fs
    .readdirSync(DZIENNIK_DIR)
    .filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((file) => getDziennikPostBySlug(file.replace(/\.mdx$/, "")))
    .filter((p): p is DziennikPost => p !== null);

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getDziennikPostsByCategory(
  category: DziennikFrontmatter["category"]
): DziennikPost[] {
  return getAllDziennikPosts().filter(
    (p) => p.frontmatter.category === category
  );
}

/** Returns unique calendar dates (YYYY-MM-DD) present in the dziennik, newest first. */
export function getUniqueDziennikDates(): string[] {
  const dates = new Set<string>();
  for (const post of getAllDziennikPosts()) {
    // Extract YYYY-MM-DD from any ISO datetime string
    const day = post.frontmatter.date.slice(0, 10);
    dates.add(day);
  }
  // Set iteration order matches insertion order (posts are already sorted desc)
  return Array.from(dates);
}
