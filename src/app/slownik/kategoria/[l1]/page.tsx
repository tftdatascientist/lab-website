import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/SchemaOrg";
import { SubpageHeader, SectionDivider } from "@/components/mechanism";
import SlownikTree from "@/components/SlownikTree";
import {
  getTermsByL1,
  getL1Slugs,
  getL2sByL1,
  getL3sByL2,
  getTermsByL3,
  getTermsByL2Count,
  L1_LABELS,
  labelL2,
  labelL3,
} from "@/lib/slownik";
import {
  generateDefinedTermSetSchema,
  generateItemListSchema,
  generateBreadcrumbSchema,
  graph,
} from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

interface Props {
  params: { l1: string };
}

export function generateStaticParams() {
  return getL1Slugs().map((l1) => ({ l1 }));
}

export function generateMetadata({ params }: Props): Metadata {
  const label = L1_LABELS[params.l1];
  if (!label) return {};
  const terms = getTermsByL1(params.l1);
  const description = `${label} — ${terms.length} pojęć IT w grupach tematycznych, z prostymi definicjami i źródłami. Część słownika terminologii lok-ai.`;
  return {
    title: `${label} — słownik IT (${terms.length} pojęć)`,
    description,
    alternates: { canonical: `${SITE_URL}/slownik/kategoria/${params.l1}` },
    openGraph: {
      title: `${label} — słownik IT | lok-ai`,
      description,
      url: `${SITE_URL}/slownik/kategoria/${params.l1}`,
      type: "website",
      locale: "pl_PL",
    },
  };
}

export default function SlownikKategoriaPage({ params }: Props) {
  const label = L1_LABELS[params.l1];
  if (!label) notFound();

  const terms = getTermsByL1(params.l1);
  if (terms.length === 0) notFound();

  const l2s = getL2sByL1(params.l1);
  const allL3 = l2s.flatMap((l2) => getL3sByL2(l2));

  const schema = graph(
    generateDefinedTermSetSchema({
      name: label,
      description: `${label} — pojęcia IT z prostymi definicjami i źródłami.`,
      url: `/slownik/kategoria/${params.l1}`,
      terms: allL3.map((l3) => ({ name: labelL3(l3), url: `/slownik/grupa/${l3}` })),
    }),
    generateItemListSchema(
      `Grupy pojęć — ${label}`,
      allL3.map((l3) => ({ name: labelL3(l3), url: `/slownik/grupa/${l3}` })),
    ),
    generateBreadcrumbSchema([
      { name: "Strona główna", url: "/" },
      { name: "Słownik", url: "/slownik" },
      { name: label, url: `/slownik/kategoria/${params.l1}` },
    ]),
  );

  return (
    <>
      <SchemaOrg schema={schema} />
      <div className="pt-13" style={{ paddingTop: 52 }}>
        <SubpageHeader
          eyebrow="Słownik · kategoria"
          title={label}
          cluster="slownik"
          description={
            <>
              {terms.length} pojęć z dziedziny{" "}
              <strong className="text-on-surface">{label.toLowerCase()}</strong> — uporządkowanych w grupy
              tematyczne, każde z&nbsp;prostą definicją i&nbsp;źródłem.
            </>
          }
        >
          <nav className="mt-5 flex items-center gap-2 text-[12px] text-text-mute flex-wrap font-mono">
            <Link href="/slownik" className="hover:text-amber transition-colors">
              ← Cały słownik
            </Link>
          </nav>
        </SubpageHeader>

        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12 grid lg:grid-cols-[248px_1fr] gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
              <SlownikTree l1={params.l1} />
            </div>
          </aside>

          <div className="min-w-0 space-y-12">
            <details className="lg:hidden rounded-xl border border-border bg-surface/40">
              <summary className="cursor-pointer px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-text-mute marker:text-amber">
                Przeglądaj kategorię
              </summary>
              <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto border-t border-border pt-3">
                <SlownikTree l1={params.l1} />
              </div>
            </details>

            {l2s.map((l2) => {
              const l3s = getL3sByL2(l2);
              return (
                <section key={l2}>
                  <div className="flex items-baseline gap-3 mb-4">
                    <h2 className="font-heading font-bold text-on-surface text-[20px]">
                      <Link href={`/slownik/kategoria/${params.l1}/${l2}`} className="hover:text-amber transition-colors">
                        {labelL2(l2)}
                      </Link>
                    </h2>
                    <span className="font-mono text-[12px] text-text-mute">{getTermsByL2Count(l2)} pojęć</span>
                  </div>
                  <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {l3s.map((l3) => {
                      const n = getTermsByL3(l3).length;
                      return (
                        <li key={l3}>
                          <Link
                            href={`/slownik/grupa/${l3}`}
                            className="group block rounded-xl border border-border bg-surface hover:border-amber/40 transition-all px-4 py-3 h-full"
                          >
                            <span className="font-heading font-semibold text-on-surface text-[14px] group-hover:text-amber transition-colors leading-snug">
                              {labelL3(l3)}
                            </span>
                            <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-text-mute">
                              {n} {n === 1 ? "pojęcie" : "pojęć"}
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>

        <SectionDivider label="Automatyzacja z AI" />
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12">
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
      </div>
    </>
  );
}
