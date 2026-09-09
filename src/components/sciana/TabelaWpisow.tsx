import Link from "next/link";
import type { Post } from "@/lib/mdx";
import { getTagInfos, tagSlug } from "@/lib/tags";

/**
 * Gęsta tabela wpisów bloga: 1 wpis = 1 wiersz (data | tytuł | tagi | czas), bez miniatur.
 * Pasek tagów to linki na /blog/tag/[tag]; `activeTag` = bieżący slug (aria-current).
 */
export default function TabelaWpisow({ posts, activeTag }: { posts: Post[]; activeTag?: string }) {
  const tags = getTagInfos(2);
  return (
    <>
      <nav className="filters" aria-label="tagi">
        <Link href="/blog" aria-current={activeTag ? undefined : "page"}>
          Wszystkie
        </Link>
        {tags.map((t) => (
          <Link key={t.slug} href={`/blog/tag/${t.slug}`} aria-current={activeTag === t.slug ? "page" : undefined}>
            {t.label} <span className="n">{t.count}</span>
          </Link>
        ))}
      </nav>
      <table>
        <thead>
          <tr>
            <th scope="col">Data</th>
            <th scope="col">Tytuł</th>
            <th scope="col" className="hide-m">
              Tagi
            </th>
            <th scope="col" style={{ textAlign: "right" }}>
              Czas
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.slug}>
              <td className="c" style={{ width: 92 }}>
                {p.frontmatter.date}
              </td>
              <td>
                <Link href={`/blog/${p.slug}`}>{p.frontmatter.title}</Link>
              </td>
              <td className="hide-m" style={{ width: 200 }}>
                <span className="mono" style={{ color: "var(--ink-3)" }}>
                  {(p.frontmatter.tags ?? []).slice(0, 2).map((t, i) => (
                    <span key={t}>
                      {i > 0 && " · "}
                      <Link href={`/blog/tag/${tagSlug(t)}`}>{t}</Link>
                    </span>
                  ))}
                </span>
              </td>
              <td className="k">{p.frontmatter.readTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
