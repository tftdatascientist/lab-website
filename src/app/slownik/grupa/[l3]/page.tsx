import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/SchemaOrg";
import RelatedLinks from "@/components/RelatedLinks";
import SlownikTree from "@/components/SlownikTree";
import {
  getAllL3Slugs,
  getL2ofL3,
  getL1ofL2,
  getL3sByL2,
  getL4sByL3,
  getTermsByL3,
  getTermsByL4,
  buildSlownikTrail,
  labelL1,
  labelL2,
  labelL3,
  labelL4,
  type Term,
} from "@/lib/slownik";
import {
  generateDefinedTermSetSchema,
  generateItemListSchema,
  generateBreadcrumbSchema,
  graph,
} from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lok-ai.pl";

interface Props {
  params: { l3: string };
}

export function generateStaticParams() {
  return getAllL3Slugs().map((l3) => ({ l3 }));
}

export function generateMetadata({ params }: Props): Metadata {
  const l2 = getL2ofL3(params.l3);
  if (!l2) return {};
  const label = labelL3(params.l3);
  const terms = getTermsByL3(params.l3);
  const desc = `${label} — ${terms.length} pojęć IT z prostymi definicjami (${labelL2(l2)}). Część słownika terminologii lok-ai.`;
  return {
    title: `${label} — słownik IT (${terms.length} pojęć)`,
    description: desc,
    alternates: { canonical: `${SITE_URL}/slownik/grupa/${params.l3}` },
    openGraph: {
      title: `${label} — słownik IT | lok-ai`,
      description: desc,
      url: `${SITE_URL}/slownik/grupa/${params.l3}`,
      type: "website",
      locale: "pl_PL",
    },
  };
}

export default function SlownikGrupaPage({ params }: Props) {
  const l2 = getL2ofL3(params.l3);
  const l1 = l2 ? getL1ofL2(l2) : undefined;
  if (!l2 || !l1) notFound();

  const label = labelL3(params.l3);
  const terms = getTermsByL3(params.l3);
  if (terms.length === 0) notFound();

  const l4s = getL4sByL3(params.l3);
  const trail = buildSlownikTrail({ l3: params.l3 });
  const siblings = getL3sByL2(l2).filter((s) => s !== params.l3);

  const schema = graph(
    generateDefinedTermSetSchema({
      name: label,
      description: `${label} — pojęcia z dziedziny ${labelL2(l2)} (${labelL1(l1)}).`,
      url: `/slownik/grupa/${params.l3}`,
      terms: terms.slice(0, 60).map((t) => ({ name: t.haslo, url: `/slownik/${t.slug}`, description: t.definicja })),
    }),
    generateItemListSchema(
      `Pojęcia — ${label}`,
      terms.map((t) => ({ name: t.haslo, url: `/slownik/${t.slug}` })),
    ),
    generateBreadcrumbSchema([
      { name: "Strona główna", url: "/" },
      { name: "Słownik", url: "/slownik" },
      ...trail.map((t) => ({ name: t.label, url: t.href })),
    ]),
  );

  return (
    <>
      <SchemaOrg schema={schema} />
      <article className="pt-13" style={{ paddingTop: 52 }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[12px] text-text-mute flex-wrap font-mono mb-8">
            <Link href="/slownik" className="hover:text-amber transition-colors">
              Słownik
            </Link>
            {trail.slice(0, -1).map((t) => (
              <span key={t.href} className="flex items-center gap-2">
                <span>/</span>
                <Link href={t.href} className="hover:text-amber transition-colors">
                  {t.label}
                </Link>
              </span>
            ))}
            <span>/</span>
            <span className="text-text-dim">{label}</span>
          </nav>

          <header className="mb-2 max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-amber border border-amber/25 rounded-full px-2.5 py-0.5">
                Grupa pojęć
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-mute">{labelL2(l2)}</span>
            </div>
            <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.03em] text-on-surface leading-tight">
              {label}
            </h1>
            <p className="mt-3 text-text-dim text-[15px] leading-relaxed">
              {terms.length} pojęć w {l4s.length} {l4s.length === 1 ? "podgrupie" : "podgrupach"}, z prostymi
              definicjami i źródłami.
            </p>
          </header>
        </div>

        {/* Drzewo + treść + TOC */}
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-10 grid lg:grid-cols-[1fr_220px] xl:grid-cols-[248px_1fr_220px] gap-10">
          <aside className="hidden xl:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
              <SlownikTree l1={l1} activeL3={params.l3} />
            </div>
          </aside>

          <div className="min-w-0">
            {/* Mobile/tablet: drzewo w rozwijanym panelu */}
            <details className="xl:hidden mb-8 rounded-xl border border-border bg-surface/40">
              <summary className="cursor-pointer px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-text-mute marker:text-amber">
                Przeglądaj kategorię
              </summary>
              <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto border-t border-border pt-3">
                <SlownikTree l1={l1} activeL3={params.l3} />
              </div>
            </details>

            <div className="space-y-12">
              {l4s.map((l4) => (
                <L4Section key={l4} l3={params.l3} l4={l4} />
              ))}
            </div>

            {siblings.length > 0 && (
              <RelatedLinks
                title={`Pozostałe grupy — ${labelL2(l2)}`}
                items={siblings.map((s) => ({ label: labelL3(s), href: `/slownik/grupa/${s}`, kind: "slownik" }))}
              />
            )}
          </div>

          {/* TOC L4 */}
          {l4s.length > 1 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-mute mb-3">Na tej stronie</p>
                <nav className="space-y-1.5 border-l border-border">
                  {l4s.map((l4) => (
                    <a
                      key={l4}
                      href={`#g-${l4}`}
                      className="block -ml-px border-l border-transparent hover:border-amber pl-3 py-0.5 text-[12.5px] text-text-dim hover:text-amber transition-colors leading-snug"
                    >
                      {labelL4(l4)}
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
              Chcesz wykorzystać AI w&nbsp;swojej firmie?
            </h2>
            <p className="text-text-dim text-[15px] max-w-md mx-auto mb-6">
              Wdrażamy chatboty, agentów głosowych i&nbsp;automatyzacje dla MŚP. Pierwsza konsultacja jest bezpłatna.
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

/** Sekcja podgrupy L4 z kartami haseł (linki do stron haseł). */
function L4Section({ l3, l4 }: { l3: string; l4: string }) {
  const terms = getTermsByL4(l3, l4);
  return (
    <section id={`g-${l4}`} className="scroll-mt-24">
      <h2 className="font-heading font-bold text-on-surface text-[18px] leading-snug mb-4">{labelL4(l4)}</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {terms.map((t: Term) => (
          <Link
            key={t.slug}
            href={`/slownik/${t.slug}`}
            className="group block rounded-xl border border-border bg-surface hover:border-amber/40 transition-all p-4 h-full"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="font-heading font-semibold text-on-surface group-hover:text-amber transition-colors leading-snug">
                {t.haslo}
              </span>
              {t.skrot && <span className="font-mono text-[11px] text-text-mute">{t.skrot}</span>}
            </div>
            <p className="text-text-dim text-[13px] leading-snug line-clamp-2">{t.definicja}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
