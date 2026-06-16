/**
 * CategoryTree — serwerowe, crawlowalne drzewo nawigacji jednej kategorii PCF.
 *
 * Zero JS: zagnieżdżone <details>/<summary>, aktywna ścieżka rozwinięta, aktywny węzeł
 * podświetlony. Wszystkie pozycje to <a href> (pełna crawlowalność). 3 poziomy w railu:
 * Grupa → Proces → Działanie (Zadania dostępne w tabelach na stronie procesu).
 */
import Link from "next/link";
import { getCategory, getChildren, buildTrail, codeToSlug } from "@/lib/procesy";

export default function CategoryTree({
  categorySlug,
  activeCode,
}: {
  categorySlug: string;
  activeCode?: string;
}) {
  const cat = getCategory(categorySlug);
  if (!cat) return null;

  const onPath = new Set(activeCode ? buildTrail(activeCode).map((t) => t.code) : []);
  const groups = getChildren(cat.code);

  return (
    <nav aria-label={`Procesy — ${cat.namePl}`} className="text-[13px] leading-snug">
      <Link
        href={`/procesy/${cat.slug}`}
        className="flex items-baseline gap-2 mb-3 font-heading font-semibold text-on-surface hover:text-amber transition-colors"
      >
        <span className="font-mono text-[10px] text-amber">{cat.code}</span>
        <span>{cat.namePl}</span>
      </Link>

      <ul className="space-y-0.5">
        {groups.map((g) => {
          const processes = getChildren(g.code);
          const groupActive = onPath.has(g.code);
          const groupHref = `/procesy/${cat.slug}/${codeToSlug(g.code)}`;
          return (
            <li key={g.code}>
              {processes.length > 0 ? (
                <details open={groupActive}>
                  <summary className="flex items-baseline gap-2 cursor-pointer rounded px-1.5 py-1 hover:bg-surface marker:text-text-mute">
                    <NodeLink href={groupHref} code={g.code} name={g.namePl} active={g.code === activeCode} />
                  </summary>
                  <ul className="ml-3 mt-0.5 space-y-0.5 border-l border-border pl-2">
                    {processes.map((p) => {
                      const activities = getChildren(p.code);
                      const procActive = onPath.has(p.code);
                      const procHref = `/procesy/proces/${codeToSlug(p.code)}`;
                      return (
                        <li key={p.code}>
                          {activities.length > 0 ? (
                            <details open={procActive}>
                              <summary className="flex items-baseline gap-2 cursor-pointer rounded px-1.5 py-1 hover:bg-surface marker:text-text-mute">
                                <NodeLink href={procHref} code={p.code} name={p.namePl} active={p.code === activeCode} />
                              </summary>
                              <ul className="ml-3 mt-0.5 space-y-0.5 border-l border-border pl-2">
                                {activities.map((a) => (
                                  <li key={a.code} className="px-1.5 py-0.5">
                                    <NodeLink
                                      href={`/procesy/proces/${codeToSlug(p.code)}#a-${codeToSlug(a.code)}`}
                                      code={a.code}
                                      name={a.namePl}
                                      active={a.code === activeCode}
                                      muted
                                    />
                                  </li>
                                ))}
                              </ul>
                            </details>
                          ) : (
                            <div className="px-1.5 py-1">
                              <NodeLink href={procHref} code={p.code} name={p.namePl} active={p.code === activeCode} />
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </details>
              ) : (
                <div className="px-1.5 py-1">
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

function NodeLink({
  href,
  code,
  name,
  active,
  muted,
}: {
  href: string;
  code: string;
  name: string;
  active?: boolean;
  muted?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex items-baseline gap-2 min-w-0 transition-colors ${
        active ? "text-amber font-medium" : muted ? "text-text-mute hover:text-amber" : "text-text-dim hover:text-amber"
      }`}
    >
      <span className="font-mono text-[10px] opacity-70 shrink-0">{code}</span>
      <span className="truncate">{name}</span>
    </Link>
  );
}
