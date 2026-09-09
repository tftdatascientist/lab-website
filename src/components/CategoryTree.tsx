/**
 * CategoryTree — serwerowe, crawlowalne drzewo nawigacji jednej kategorii PCF.
 *
 * Zero JS: zagnieżdżone <details>/<summary>, aktywna ścieżka rozwinięta, aktywny węzeł
 * `aria-current`. Wszystkie pozycje to <a href> (pełna crawlowalność). 3 poziomy:
 * Grupa → Proces → Działanie (Zadania dostępne w tabelach na stronie procesu).
 * Style: `.tree` w globals.css (mono na płycie — drzewo siedzi w tabliczce grafitowej).
 */
import Link from "next/link";
import { getCategory, getChildren, buildTrail, codeToSlug } from "@/lib/procesy";

export default function CategoryTree({ categorySlug, activeCode }: { categorySlug: string; activeCode?: string }) {
  const cat = getCategory(categorySlug);
  if (!cat) return null;

  const onPath = new Set(activeCode ? buildTrail(activeCode).map((t) => t.code) : []);
  const groups = getChildren(cat.code);

  return (
    <nav aria-label={`Procesy — ${cat.namePl}`} className="tree">
      <Link href={`/procesy/${cat.slug}`} className="root">
        {cat.code} {cat.namePl}
      </Link>
      <ul>
        {groups.map((g) => {
          const processes = getChildren(g.code);
          const groupHref = `/procesy/${cat.slug}/${codeToSlug(g.code)}`;
          return (
            <li key={g.code}>
              {processes.length > 0 ? (
                <details open={onPath.has(g.code)}>
                  <summary>
                    <NodeLink href={groupHref} code={g.code} name={g.namePl} active={g.code === activeCode} />
                  </summary>
                  <ul>
                    {processes.map((p) => {
                      const activities = getChildren(p.code);
                      const procHref = `/procesy/proces/${codeToSlug(p.code)}`;
                      return (
                        <li key={p.code}>
                          {activities.length > 0 ? (
                            <details open={onPath.has(p.code)}>
                              <summary>
                                <NodeLink href={procHref} code={p.code} name={p.namePl} active={p.code === activeCode} />
                              </summary>
                              <ul>
                                {activities.map((a) => (
                                  <li key={a.code} className="leaf">
                                    <NodeLink
                                      href={`${procHref}#a-${codeToSlug(a.code)}`}
                                      code={a.code}
                                      name={a.namePl}
                                      active={a.code === activeCode}
                                    />
                                  </li>
                                ))}
                              </ul>
                            </details>
                          ) : (
                            <div className="leaf">
                              <NodeLink href={procHref} code={p.code} name={p.namePl} active={p.code === activeCode} />
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </details>
              ) : (
                <div className="leaf">
                  <NodeLink href={groupHref} code={g.code} name={g.namePl} active={g.code === activeCode} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function NodeLink({ href, code, name, active }: { href: string; code: string; name: string; active?: boolean }) {
  return (
    <Link href={href} aria-current={active ? "page" : undefined}>
      <span className="code">{code}</span>
      <span>{name}</span>
    </Link>
  );
}
