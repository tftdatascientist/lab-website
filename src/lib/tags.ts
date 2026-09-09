import { getAllPosts, type Post } from "@/lib/mdx";

/** Slug tagu do adresu /blog/tag/[tag]: małe litery, bez znaków diakrytycznych, myślniki. */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/ł/g, "l")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export interface TagInfo {
  slug: string;
  label: string;
  count: number;
}

/** Tagi z licznikami, scalone po slugu („AI” i „ai” to jeden tag), malejąco po liczbie wpisów. */
export function getTagInfos(minCount = 1): TagInfo[] {
  const map = new Map<string, TagInfo>();
  for (const p of getAllPosts()) {
    for (const t of p.frontmatter.tags ?? []) {
      const slug = tagSlug(t);
      if (!slug) continue;
      const cur = map.get(slug);
      if (cur) cur.count += 1;
      else map.set(slug, { slug, label: t, count: 1 });
    }
  }
  return Array.from(map.values())
    .filter((t) => t.count >= minCount)
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "pl"));
}

export function getPostsByTagSlug(slug: string): Post[] {
  return getAllPosts().filter((p) => (p.frontmatter.tags ?? []).some((t) => tagSlug(t) === slug));
}
