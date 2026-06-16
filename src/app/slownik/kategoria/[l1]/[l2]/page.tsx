import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/SchemaOrg";
import { SubpageHeader } from "@/components/mechanism";
import RelatedLinks from "@/components/RelatedLinks";
import SlownikTree from "@/components/SlownikTree";
import {
  getAllL2Pairs,
  getL1ofL2,
  getL2sByL1,
  getL3sByL2,
  getTermsByL3,
  getTermsByL2Count,
  buildSlownikTrail,
  labelL1,
  labelL2,
  labelL3,
} from "@/lib/slownik";
import {
  generateDefinedTermSetSchema,
  generateItemListSchema,
  generateBreadcrumbSchema,
  graph,
} from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lok-ai.pl";

interface Props {
  params: { l1: string; l2: string };
}

export function generateStaticParams() {
  return getAllL2Pairs();
}

export function generateMetadata({ params }: Props): Metadata {
  if (getL1ofL2(params.l2) !== params.l1) return {};
  const label = labelL2(params.l2);
  const n = getTermsByL2Count(params.l2);
  const desc = `${label} — ${n} pojęć IT w grupach tematycznych, z prostymi definicjami. Część słownika terminologii lok-ai (${labelL1(params.l1)}).`;
  return {
    title: `${label} — słownik IT (${n} pojęć)`,
    description: desc,
    alternates: { canonical: `${SITE_URL}/slownik/kategoria/${params.l1}/${params.l2}` },
    openGraph: {
      title: `${label} — słownik IT | lok-ai`,
      description: desc,
      url: `${SITE_URL}/slownik/kategoria/${params.l1}/${params.l2}`,
      type: "website",
      locale: "pl_PL",
    },
  };
}

export default function SlownikL2Page({ params }: Props) {
  if (getL1ofL2(params.l2) !== params.l1) notFound();

  const label = labelL2(params.l2);
  const l3s = getL3sByL2(params.l2);
  if (l3s.length === 0) notFound();

  const trail = buildSlownikTrail({ l2: params.l2 });
  const siblings = getL2sByL1(params.l1).filter((s) => s !== params.l2);

  const schema = graph(
    generateDefinedTermSetSchema({
      name: label,
      description: `${label} — pojęcia IT z dziedziny ${labelL1(params.l1)}.`,
      url: `/slownik/kategoria/${params.l1}/${params.l2}`,
      terms: l3s.slice(0, 40).map((l3) => ({ name: labelL3(l3), url: `/slownik/grupa/${l3}` })),
    }),
    generateItemListSchema(
      `Grupy pojęć — ${label}`,
      l3s.map((l3) => ({ name: labelL3(l3), url: `/slownik/grupa/${l3}` })),
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
      <div className="pt-13" style={{ paddingTop: 52 }}>
        <SubpageHeader
          eyebrow={`Słownik · ${labelL1(params.l1)}`}
          title={label}
          cluster="slownik"
          description={`${getTermsByL2Count(params.l2)} pojęć w ${l3s.length} grupach tematycznych.`}
        >
          <nav className="mt-5 flex items-center gap-2 text-[12px] text-text-mute flex-wrap font-mono">
            <Link href="/slownik" className="hover:text-amber transition-colors">
              Słownik
            </Link>
            <span>/</span>
            <Link href={`/slownik/kategoria/${params.l1}`} className="hover:text-amber transition-colors">
              {labelL1(params.l1)}
            </Link>
          </nav>
        </SubpageHeader>

        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12 grid lg:grid-cols-[248px_1fr] gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
              <SlownikTree l1={params.l1} activeL2={params.l2} />
            </div>
          </aside>

          <div className="min-w-0">
            <details className="lg:hidden mb-8 rounded-xl border border-border bg-surface/40">
              <summary className="cursor-pointer px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-text-mute marker:text-amber">
                Przeglądaj kategorię
              </summary>
              <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto border-t border-border pt-3">
                <SlownikTree l1={params.l1} activeL2={params.l2} />
              </div>
            </details>

            <div className="flex items-baseline gap-3 mb-6">
              <h2 className="font-heading font-bold text-on-surface text-[20px]">Grupy pojęć</h2>
              <span className="font-mono text-[12px] text-text-mute">{l3s.length}</span>
            </div>

            <ul className="grid sm:grid-cols-2 gap-3">
              {l3s.map((l3) => {
                const n = getTermsByL3(l3).length;
                return (
                  <li key={l3}>
                    <Link
                      href={`/slownik/grupa/${l3}`}
                      className="group block rounded-xl border border-border bg-surface hover:border-amber/40 transition-all p-4 h-full"
                    >
                      <span className="font-heading font-semibold text-on-surface group-hover:text-amber transition-colors leading-snug">
                        {labelL3(l3)}
                      </span>
                      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-text-mute">
                        {n} {n === 1 ? "pojęcie" : "pojęć"}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {siblings.length > 0 && (
              <RelatedLinks
                title={`Pozostałe poddziedziny — ${labelL1(params.l1)}`}
                items={siblings.map((s) => ({
                  label: labelL2(s),
                  href: `/slownik/kategoria/${params.l1}/${s}`,
                  kind: "slownik",
                }))}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
