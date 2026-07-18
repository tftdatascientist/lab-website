import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/SchemaOrg";
import TldrBox from "@/components/TldrBox";
import RelatedLinks from "@/components/RelatedLinks";
import CategoryTree from "@/components/CategoryTree";
import {
  getNode,
  getCategory,
  getChildren,
  getAllProcesses,
  buildTrail,
  isThinProcess,
  slugToCode,
  codeToSlug,
  type ProcessNode,
} from "@/lib/procesy";
import {
  generateDefinedTermSchema,
  generateItemListSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
  graph,
} from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

interface Props {
  params: { kod: string };
}

export function generateStaticParams() {
  return getAllProcesses().map((p) => ({ kod: codeToSlug(p.code) }));
}

export function generateMetadata({ params }: Props): Metadata {
  const p = getNode(slugToCode(params.kod));
  if (!p || p.level !== "Proces") return {};
  const url = `${SITE_URL}/procesy/proces/${params.kod}`;
  const desc =
    p.descPl ||
    `Proces ${p.code} „${p.namePl}" według APQC PCF 7.4 — działania, zadania i opis po polsku oraz po angielsku.`;
  // Ochrona przed thin content: proces-liść (bez działań) z krótkim opisem → noindex,follow.
  const isThin = isThinProcess(p);
  return {
    title: `${p.namePl} — proces biznesowy (APQC PCF ${p.code})`,
    description: desc.length > 155 ? desc.slice(0, 152) + "…" : desc,
    alternates: { canonical: url },
    robots: isThin ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${p.namePl} — APQC PCF ${p.code}`,
      description: desc.length > 155 ? desc.slice(0, 152) + "…" : desc,
      url,
      type: "article",
      locale: "pl_PL",
    },
  };
}

export default function ProcesPage({ params }: Props) {
  const p = getNode(slugToCode(params.kod));
  if (!p || p.level !== "Proces") notFound();

  const cat = getCategory(p.categorySlug);
  const trail = buildTrail(p.code);
  const group = trail.find((t) => t.level === "Grupa procesów");
  const activities = getChildren(p.code); // poziom 4 — Działanie
  const siblings = group ? getChildren(group.code).filter((s) => s.code !== p.code) : [];

  const schema = graph(
    generateDefinedTermSchema({
      name: p.namePl,
      description: p.descPl || `Proces ${p.code} według APQC PCF 7.4.`,
      url: `/procesy/proces/${params.kod}`,
      inSetUrl: "/procesy",
      termCode: p.code,
      alternateName: p.nameEng,
    }),
    ...(activities.length
      ? [
          generateItemListSchema(
            `Działania w procesie ${p.namePl}`,
            activities.map((a) => ({
              name: `${a.code} ${a.namePl}`,
              url: `/procesy/proces/${params.kod}#a-${codeToSlug(a.code)}`,
            })),
          ),
          generateHowToSchema({
            name: p.namePl,
            description: p.descPl || `Działania składające się na proces ${p.namePl} (APQC PCF ${p.code}).`,
            steps: activities.map((a) => ({ name: a.namePl, text: a.descPl || a.namePl })),
          }),
        ]
      : []),
    generateBreadcrumbSchema([
      { name: "Strona główna", url: "/" },
      { name: "Procesy", url: "/procesy" },
      ...trail.map((t) => ({ name: t.name, url: t.href })),
    ]),
  );

  return (
    <>
      <SchemaOrg schema={schema} />
      <article className="pt-13" style={{ paddingTop: 52 }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[12px] text-text-mute flex-wrap font-mono mb-8">
            <Link href="/procesy" className="hover:text-amber transition-colors">
              Procesy
            </Link>
            {trail.slice(0, -1).map((t) => (
              <span key={t.code} className="flex items-center gap-2">
                <span>/</span>
                <Link href={t.href} className="hover:text-amber transition-colors">
                  {t.name}
                </Link>
              </span>
            ))}
            <span>/</span>
            <span className="text-text-dim">{p.code}</span>
          </nav>

          {/* Header */}
          <header className="mb-2 max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-amber border border-amber/25 rounded-full px-2.5 py-0.5">
                PCF {p.code}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-mute">Proces</span>
            </div>
            <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.03em] text-on-surface leading-tight">
              {p.namePl}
            </h1>
            {p.nameEng && <p className="mt-2 font-mono text-[13px] text-text-dim">{p.nameEng}</p>}
          </header>

          <TldrBox>{p.descPl}</TldrBox>
          {p.descEng && (
            <p className="text-text-mute text-[14px] leading-relaxed max-w-3xl -mt-3 mb-2" lang="en">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-mute/70 mr-2">EN</span>
              {p.descEng}
            </p>
          )}
        </div>

        {/* Drzewo kategorii + treść + TOC (układ docs) */}
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-10 grid lg:grid-cols-[1fr_220px] xl:grid-cols-[248px_1fr_220px] gap-10">
          {/* Lewy rail — drzewo kategorii (crawlowalne, zero-JS) */}
          <aside className="hidden xl:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
              <CategoryTree categorySlug={p.categorySlug} activeCode={p.code} />
            </div>
          </aside>

          <div className="min-w-0">
            {/* Mobile/tablet: drzewo kategorii w rozwijanym panelu (rail ukryty < xl) */}
            <details className="xl:hidden mb-8 rounded-xl border border-border bg-surface/40">
              <summary className="cursor-pointer px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-text-mute marker:text-amber">
                Przeglądaj kategorię
              </summary>
              <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto border-t border-border pt-3">
                <CategoryTree categorySlug={p.categorySlug} activeCode={p.code} />
              </div>
            </details>

            {activities.length > 0 ? (
              <>
                <h2 className="font-heading font-bold text-on-surface text-[22px] mb-6">
                  Działania w tym procesie
                  <span className="ml-3 font-mono text-[13px] text-text-mute font-normal">{activities.length}</span>
                </h2>
                <div className="space-y-12">
                  {activities.map((a) => (
                    <ActivitySection key={a.code} activity={a} />
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-border bg-surface px-6 py-8">
                <p className="text-text-dim leading-relaxed">
                  Ten proces (<strong className="text-on-surface">APQC PCF {p.code}</strong>) jest elementem
                  liściowym taksonomii — nie ma zdefiniowanych pod-działań. Jego opis znajduje się powyżej.
                </p>
              </div>
            )}

            {siblings.length > 0 && (
              <RelatedLinks
                title={group ? `Pozostałe procesy — ${group.name}` : "Pozostałe procesy"}
                items={siblings.map((s) => ({
                  label: `${s.code} ${s.namePl}`,
                  href: `/procesy/proces/${codeToSlug(s.code)}`,
                  kind: "proces",
                }))}
              />
            )}
          </div>

          {/* TOC — statyczne, crawlowalne (podświetlanie aktywnej sekcji: faza 2) */}
          {activities.length > 1 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-mute mb-3">Na tej stronie</p>
                <nav className="space-y-1.5 border-l border-border">
                  {activities.map((a) => (
                    <a
                      key={a.code}
                      href={`#a-${codeToSlug(a.code)}`}
                      className="block -ml-px border-l border-transparent hover:border-amber pl-3 py-0.5 text-[12.5px] text-text-dim hover:text-amber transition-colors leading-snug"
                    >
                      <span className="font-mono text-[10px] text-text-mute mr-1.5">{a.code}</span>
                      {a.namePl}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>

        {/* CTA */}
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pb-16">
          <div className="rounded-2xl border border-border bg-bg-soft px-6 py-8 sm:px-10 sm:py-10 text-center">
            <h2 className="font-heading text-[clamp(20px,2.5vw,28px)] font-bold text-on-surface mb-3">
              Ten proces zjada Wam czas?
            </h2>
            <p className="text-text-dim text-[15px] max-w-xl mx-auto mb-6">
              {cat ? `Automatyzujemy procesy z obszaru „${cat.namePl}".` : "Automatyzujemy procesy biznesowe."}{" "}
              Pokażemy, gdzie AI i automatyzacja dają najszybszy zwrot.
            </p>
            <Link href="/kontakt" className="btn-primary inline-flex items-center rounded-[10px] px-6 py-3 text-[15px]">
              Bezpłatna konsultacja
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

/** Sekcja Działania (L4) z opcjonalną tabelą Zadań (L5) — rdzeń GEO (tabele + nagłówki). */
function ActivitySection({ activity }: { activity: ProcessNode }) {
  const tasks = getChildren(activity.code); // poziom 5 — Zadanie
  return (
    <section id={`a-${codeToSlug(activity.code)}`} className="scroll-mt-24">
      <div className="flex items-baseline gap-3 mb-2 flex-wrap">
        <span className="font-mono text-[12px] text-amber">{activity.code}</span>
        <h3 className="font-heading font-bold text-on-surface text-[18px] leading-snug">{activity.namePl}</h3>
      </div>
      {activity.nameEng && (
        <p className="font-mono text-[11px] text-text-mute mb-3" lang="en">
          {activity.nameEng}
        </p>
      )}
      {activity.descPl && (
        <p className="text-on-surface-variant text-[15px] leading-relaxed max-w-3xl mb-2">{activity.descPl}</p>
      )}
      {activity.descEng && (
        <p className="text-text-mute text-[13px] leading-relaxed max-w-3xl mb-4" lang="en">
          {activity.descEng}
        </p>
      )}

      {tasks.length > 0 && (
        <div className="mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-surface">
                <th className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-mute font-medium px-4 py-2.5 w-[88px]">
                  Kod
                </th>
                <th className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-mute font-medium px-4 py-2.5">
                  Zadanie
                </th>
                <th className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-mute font-medium px-4 py-2.5 hidden sm:table-cell">
                  EN
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr
                  key={t.code}
                  id={`a-${codeToSlug(t.code)}`}
                  className="scroll-mt-24 border-t border-border align-top"
                >
                  <td className="font-mono text-[11px] text-amber px-4 py-2.5 whitespace-nowrap">{t.code}</td>
                  <td className="px-4 py-2.5 text-on-surface">
                    {t.namePl}
                    {t.descPl && <span className="block text-text-dim text-[12px] leading-snug mt-0.5">{t.descPl}</span>}
                  </td>
                  <td className="px-4 py-2.5 text-text-mute hidden sm:table-cell" lang="en">
                    {t.nameEng}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
