import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readTime: string;
  image?: string;
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

    return {
      slug,
      frontmatter: data as PostFrontmatter,
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

  return { getPostBySlug, getAllPosts, getPostsByTag, getAllTags };
}

const blogReader = createMdxReader("src/content/blog");
export const getPostBySlug = blogReader.getPostBySlug;
export const getAllPosts = blogReader.getAllPosts;
export const getPostsByTag = blogReader.getPostsByTag;
export const getAllTags = blogReader.getAllTags;

const techReader = createMdxReader("src/content/technologia");
export const getTechPostBySlug = techReader.getPostBySlug;
export const getAllTechPosts = techReader.getAllPosts;
export const getTechPostsByTag = techReader.getPostsByTag;
export const getAllTechTags = techReader.getAllTags;
