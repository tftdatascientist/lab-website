import type { Metadata } from "next";
import Link from "next/link";
import SchemaOrg from "@/components/SchemaOrg";
import { SubpageHeader, SectionDivider } from "@/components/mechanism";
import { generateDefinedTermSetSchema, generateItemListSchema, generateBreadcrumbSchema, graph } from "@/lib/schema";
import { getAllTerms, getCategories, getAllL2Pairs, getAllL3Slugs } from "@/lib/slownik";
import SlownikListClient from "./SlownikListClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

export const metadata: Metadata = {
  title: "Słownik IT — 1200+ pojęć z informatyki, AI i automatyzacji",
  description:
    "Przejrzysty słownik terminologii IT: algorytmy, sieci, bazy danych, bezpieczeństwo, AI/ML, chmura i DevOps. Ponad 1200 haseł z prostymi definicjami i źródłami.",
  alternates: { canonical: `${SITE_URL}/slownik` },
  openGraph: {
    title: "Słownik IT — 1200+ pojęć | lok-ai",
    description:
      "Ponad 1200 terminów IT z prostymi definicjami: od algorytmów po AI/ML. Wyszukiwarka i kategorie.",
    url: `${SITE_URL}/slownik`,
    type: "website",
    locale: "pl_PL",
  },
};

export default function SlownikPage() {
  const terms = getAllTerms();
  const categories = getCategories();

  const schema = graph(
    generateDefinedTermSetSchema({
      name: "Słownik IT lok-ai",
      description:
        "Słownik terminologii informatycznej: algorytmy, systemy, sieci, dane, bezpieczeństwo, AI/ML, chmura i inżynieria oprogramowania.",
      url: "/slownik",
      terms: terms.slice(0, 40).map((t) => ({
        name: t.haslo,
        url: `/slownik/${t.slug}`,
        description: t.definicja,
      })),
    }),
    generateItemListSchema(
      "Kategorie słownika IT",
      categories.map((c) => ({ name: c.label, url: `/slownik?kat=${c.key}` })),
      "Główne dziedziny terminologii IT w słowniku lok-ai.",
    ),
    generateBreadcrumbSchema([
      { name: "Strona główna", url: "/" },
      { name: "Słownik", url: "/slownik" },
    ]),
  );

  // lekki payload dla klienta
  const items = terms.map((t) => ({
    slug: t.slug,
    haslo: t.haslo,
    skrot: t.skrot,
    typ: t.typ,
    def: t.definicja,
    L1: t.L1,
  }));

  return (
    <>
      <SchemaOrg schema={schema} />
      <div className="pt-13" style={{ paddingTop: 52 }}>
        <SubpageHeader
          eyebrow={`Słownik · ${terms.length} pojęć`}
          title="Słownik"
          accent="terminologii"
          titleAfter="IT."
          cluster="slownik"
          description={
            <>
              Ponad {terms.length} pojęć z informatyki — od algorytmów i&nbsp;sieci po AI/ML
              i&nbsp;chmurę. Każde hasło ma prostą definicję, kategorię i&nbsp;źródło. Bez żargonu,
              po&nbsp;ludzku.
            </>
          }
        />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 pt-10">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-border bg-bg-soft px-6 py-5">
            {[
              { value: terms.length, label: "haseł" },
              { value: categories.length, label: "kategorii" },
              { value: getAllL2Pairs().length, label: "poddziedzin" },
              { value: getAllL3Slugs().length, label: "grup tematycznych" },
              { value: 4, label: "poziomy" },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="font-heading font-bold text-on-surface text-[22px]">{s.value}</span>
                <span className="text-text-mute text-[13px]">{s.label}</span>
              </div>
            ))}
            <div className="ml-auto hidden sm:flex items-center gap-2 text-text-mute text-[12px]">
              <span>Szukaj w słowniku:</span>
              <kbd className="font-mono text-[11px] text-text-dim border border-border rounded px-1.5 py-0.5">⌘K</kbd>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-12">
          {/* Huby kategorii */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
            {categories.map((c) => (
              <Link
                key={c.key}
                href={`/slownik/kategoria/${c.key}`}
                className="group relative block rounded-xl border border-border bg-surface hover:border-amber/40 transition-all px-4 py-4 overflow-hidden"
              >
                <h2 className="font-heading font-semibold text-on-surface text-[15px] leading-snug group-hover:text-amber transition-colors">
                  {c.label}
                </h2>
                <div className="mt-2 font-mono text-[11px] tracking-[0.1em] text-text-mute">
                  {c.count} pojęć
                </div>
              </Link>
            ))}
          </div>

          <SectionDivider label="Wszystkie hasła" />

          <div className="pt-12">
            <SlownikListClient items={items} categories={categories} />
          </div>
        </div>
      </div>
    </>
  );
}
