import type { Metadata } from "next";
import Link from "next/link";
import SchemaOrg from "@/components/SchemaOrg";
import { SubpageHeader, SectionDivider } from "@/components/mechanism";
import { generateDefinedTermSetSchema, generateItemListSchema, generateBreadcrumbSchema, graph } from "@/lib/schema";
import { getAllTerms, getCategories } from "@/lib/slownik";
import SlownikListClient from "./SlownikListClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lok-ai.pl";

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
