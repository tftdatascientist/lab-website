import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/SchemaOrg";
import { SubpageHeader } from "@/components/mechanism";
import RelatedLinks from "@/components/RelatedLinks";
import CategoryTree from "@/components/CategoryTree";
import {
  getCategory,
  getNode,
  getChildren,
  getAllGroups,
  slugToCode,
  codeToSlug,
  countDescendants,
} from "@/lib/procesy";
import {
  generateDefinedTermSchema,
  generateItemListSchema,
  generateBreadcrumbSchema,
  graph,
} from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

interface Props {
  params: { kategoria: string; grupa: string };
}

export function generateStaticParams() {
  return getAllGroups().map((g) => ({
    kategoria: g.categorySlug,
    grupa: codeToSlug(g.code),
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const g = getNode(slugToCode(params.grupa));
  if (!g || g.level !== "Grupa procesów") return {};
  const url = `${SITE_URL}/procesy/${g.categorySlug}/${params.grupa}`;
  const desc =
    g.descPl ||
    `Grupa procesów ${g.code} „${g.namePl}" według APQC PCF 7.4 — lista procesów, działań i zadań po polsku.`;
  return {
    title: `${g.namePl} — grupa procesów (APQC PCF ${g.code})`,
    description: desc.length > 155 ? desc.slice(0, 152) + "…" : desc,
    alternates: { canonical: url },
    openGraph: {
      title: `${g.namePl} — APQC PCF ${g.code}`,
      description: desc.length > 155 ? desc.slice(0, 152) + "…" : desc,
      url,
      type: "article",
      locale: "pl_PL",
    },
  };
}

export default function GrupaProcesowPage({ params }: Props) {
  const g = getNode(slugToCode(params.grupa));
  const cat = getCategory(params.kategoria);
  if (!g || g.level !== "Grupa procesów" || !cat || g.categorySlug !== cat.slug) notFound();

  const processes = getChildren(g.code);
  const siblings = getChildren(cat.code).filter((s) => s.code !== g.code);

  const schema = graph(
    generateDefinedTermSchema({
      name: g.namePl,
      description: g.descPl || `Grupa procesów ${g.code} według APQC PCF 7.4.`,
      url: `/procesy/${cat.slug}/${params.grupa}`,
      inSetUrl: "/procesy",
      termCode: g.code,
      alternateName: g.nameEng,
    }),
    ...(processes.length
      ? [
          generateItemListSchema(
            `Procesy — ${g.namePl}`,
            processes.map((p) => ({
              name: `${p.code} ${p.namePl}`,
              url: `/procesy/proces/${codeToSlug(p.code)}`,
            })),
          ),
        ]
      : []),
    generateBreadcrumbSchema([
      { name: "Strona główna", url: "/" },
      { name: "Procesy", url: "/procesy" },
      { name: cat.namePl, url: `/procesy/${cat.slug}` },
      { name: g.namePl, url: `/procesy/${cat.slug}/${params.grupa}` },
    ]),
  );

  return (
    <>
      <SchemaOrg schema={schema} />
      <div className="pt-13" style={{ paddingTop: 52 }}>
        <SubpageHeader
          eyebrow={`PCF ${g.code} · ${g.nameEng ?? "Process Group"}`}
          title={g.namePl}
          cluster="procesy"
          description={g.descPl}
        >
          <nav className="mt-5 flex items-center gap-2 text-[12px] text-text-mute flex-wrap font-mono">
            <Link href="/procesy" className="hover:text-amber transition-colors">
              Procesy
            </Link>
            <span>/</span>
            <Link href={`/procesy/${cat.slug}`} className="hover:text-amber transition-colors">
              {cat.namePl}
            </Link>
            <span>/</span>
            <span className="text-text-dim">{g.code}</span>
          </nav>
        </SubpageHeader>

        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12 grid lg:grid-cols-[248px_1fr] gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
              <CategoryTree categorySlug={cat.slug} activeCode={g.code} />
            </div>
          </aside>

          <div className="min-w-0">
          {/* Mobile: drzewo kategorii w rozwijanym panelu (rail ukryty < lg) */}
          <details className="lg:hidden mb-8 rounded-xl border border-border bg-surface/40">
            <summary className="cursor-pointer px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-text-mute marker:text-amber">
              Przeglądaj kategorię
            </summary>
            <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto border-t border-border pt-3">
              <CategoryTree categorySlug={cat.slug} activeCode={g.code} />
            </div>
          </details>

          <div className="flex items-baseline gap-3 mb-6">
            <h2 className="font-heading font-bold text-on-surface text-[20px]">Procesy w tej grupie</h2>
            <span className="font-mono text-[12px] text-text-mute">{processes.length}</span>
          </div>

          {processes.length > 0 ? (
            <ul className="grid sm:grid-cols-2 gap-3">
              {processes.map((p) => {
                const sub = countDescendants(p.code);
                return (
                  <li key={p.code}>
                    <Link
                      href={`/procesy/proces/${codeToSlug(p.code)}`}
                      className="group block rounded-xl border border-border bg-surface hover:border-amber/40 transition-all p-4 h-full"
                    >
                      <div className="font-mono text-[11px] text-amber mb-1.5">PCF {p.code}</div>
                      <span className="font-heading font-semibold text-on-surface group-hover:text-amber transition-colors leading-snug">
                        {p.namePl}
                      </span>
                      {p.descPl && (
                        <p className="text-text-dim text-[13px] leading-snug line-clamp-2 mt-1.5">{p.descPl}</p>
                      )}
                      {sub > 0 && (
                        <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-text-mute">
                          {sub} {plElement(sub)}
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-text-dim leading-relaxed max-w-2xl">
              Szczegółowa taksonomia tej grupy procesów według{" "}
              <strong className="text-on-surface">APQC PCF {g.code}</strong> jest w przygotowaniu.
            </p>
          )}

          {siblings.length > 0 && (
            <RelatedLinks
              title={`Pozostałe grupy — ${cat.namePl}`}
              items={siblings.map((s) => ({
                label: `${s.code} ${s.namePl}`,
                href: `/procesy/${cat.slug}/${codeToSlug(s.code)}`,
                kind: "proces",
              }))}
            />
          )}
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pb-16">
          <div className="rounded-2xl border border-border bg-bg-soft px-6 py-8 sm:px-10 sm:py-10 text-center">
            <h2 className="font-heading text-[clamp(20px,2.5vw,28px)] font-bold text-on-surface mb-3">
              Automatyzujesz procesy z obszaru „{g.namePl.toLowerCase()}”?
            </h2>
            <p className="text-text-dim text-[15px] max-w-xl mx-auto mb-6">
              Pokażemy, które z tych procesów dają najszybszy zwrot z automatyzacji i AI.
            </p>
            <Link href="/kontakt" className="btn-primary inline-flex items-center rounded-[10px] px-6 py-3 text-[15px]">
              Bezpłatna konsultacja
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function plElement(n: number): string {
  if (n === 1) return "element";
  const last = n % 10;
  const last2 = n % 100;
  if (last >= 2 && last <= 4 && !(last2 >= 12 && last2 <= 14)) return "elementy";
  return "elementów";
}
