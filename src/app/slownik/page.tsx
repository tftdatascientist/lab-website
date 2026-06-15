import type { Metadata } from "next";
import SchemaOrg from "@/components/SchemaOrg";
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

  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Słownik IT lok-ai",
    description:
      "Słownik terminologii informatycznej: algorytmy, systemy, sieci, dane, bezpieczeństwo, AI/ML, chmura i inżynieria oprogramowania.",
    url: `${SITE_URL}/slownik`,
    hasDefinedTerm: terms.slice(0, 50).map((t) => ({
      "@type": "DefinedTerm",
      name: t.haslo,
      url: `${SITE_URL}/slownik/${t.slug}`,
    })),
  };

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
      <section className="py-[100px] px-6 sm:px-8 max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-7 h-px bg-amber" />
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-amber">
              Słownik · {terms.length}&nbsp;pojęć
            </span>
          </div>
          <h1
            className="font-heading font-bold text-on-surface mb-5"
            style={{ fontSize: "clamp(28px,5vw,64px)", letterSpacing: "-0.04em", lineHeight: 0.95, maxWidth: 1000 }}
          >
            Słownik{" "}
            <span className="font-display font-medium italic text-amber">terminologii IT</span>.
          </h1>
          <p className="text-text-dim" style={{ fontSize: 17, maxWidth: 640, lineHeight: 1.55 }}>
            Ponad {terms.length} pojęć z informatyki — od algorytmów i sieci po AI/ML i&nbsp;chmurę. Każde hasło ma
            prostą definicję, kategorię i&nbsp;źródło. Bez żargonu, po&nbsp;ludzku.
          </p>
        </div>

        <SlownikListClient items={items} categories={categories} />
      </section>
    </>
  );
}
