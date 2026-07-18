import type { Metadata } from "next";
import Link from "next/link";
import SchemaOrg from "@/components/SchemaOrg";
import { SubpageHeader, SectionDivider } from "@/components/mechanism";
import { getCategories, totalNodeCount, countByLevel } from "@/lib/procesy";
import {
  generateDefinedTermSetSchema,
  generateItemListSchema,
  generateBreadcrumbSchema,
  graph,
} from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

export const metadata: Metadata = {
  title: "Procesy biznesowe — APQC PCF 7.4 po polsku (13 kategorii)",
  description:
    "Kompletna, hierarchiczna klasyfikacja procesów biznesowych według APQC Process Classification Framework® 7.4 w polskim tłumaczeniu — 13 kategorii, 5 poziomów. Mapa procesów, które automatyzujemy.",
  alternates: { canonical: `${SITE_URL}/procesy` },
  openGraph: {
    title: "Procesy biznesowe — APQC PCF 7.4 po polsku",
    description:
      "Hierarchiczna klasyfikacja procesów biznesowych (APQC PCF 7.4) po polsku: 13 kategorii, 5 poziomów. Standard klasyfikacji procesów.",
    url: `${SITE_URL}/procesy`,
    type: "website",
    locale: "pl_PL",
  },
};

export default function ProcesyPage() {
  const categories = getCategories();
  const stats = [
    { value: totalNodeCount() + 13, label: "elementów" },
    { value: categories.length, label: "kategorii" },
    { value: countByLevel("Grupa procesów"), label: "grup procesów" },
    { value: countByLevel("Proces"), label: "procesów" },
    { value: 5, label: "poziomów" },
  ];

  const schema = graph(
    generateDefinedTermSetSchema({
      name: "Klasyfikacja procesów biznesowych — APQC PCF 7.4 (PL)",
      description:
        "Hierarchiczna taksonomia procesów biznesowych według APQC Process Classification Framework 7.4 w polskim tłumaczeniu: 13 kategorii, 5 poziomów.",
      url: "/procesy",
      terms: categories.map((c) => ({
        name: c.namePl,
        url: `/procesy/${c.slug}`,
        description: c.descPl,
      })),
    }),
    generateItemListSchema(
      "Kategorie procesów biznesowych (APQC PCF)",
      categories.map((c) => ({ name: `${c.code} ${c.namePl}`, url: `/procesy/${c.slug}` })),
      "13 kategorii najwyższego poziomu klasyfikacji procesów biznesowych APQC PCF.",
    ),
    generateBreadcrumbSchema([
      { name: "Strona główna", url: "/" },
      { name: "Procesy", url: "/procesy" },
    ]),
  );

  return (
    <>
      <SchemaOrg schema={schema} />
      <div className="pt-13" style={{ paddingTop: 52 }}>
        <SubpageHeader
          eyebrow="Procesy · APQC PCF 7.4"
          title="Jeden standard, cała"
          accent="organizacja"
          titleAfter="w procesach."
          cluster="procesy"
          description={
            <>
              Kompletna, hierarchiczna klasyfikacja procesów biznesowych według{" "}
              <strong className="text-on-surface">APQC Process Classification Framework® 7.4</strong> w polskim
              tłumaczeniu — 13 kategorii, 5 poziomów. To mapa procesów, które pomagamy automatyzować.
            </>
          }
        />

        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-10">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-border bg-bg-soft px-6 py-5">
            {stats.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="font-heading font-bold text-on-surface text-[22px]">{s.value}</span>
                <span className="text-text-mute text-[13px]">{s.label}</span>
              </div>
            ))}
            <div className="ml-auto hidden sm:flex items-center gap-2 text-text-mute text-[12px]">
              <span>Szukaj w całej bazie:</span>
              <kbd className="font-mono text-[11px] text-text-dim border border-border rounded px-1.5 py-0.5">⌘K</kbd>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/procesy/${c.slug}`}
                className="group relative block rounded-2xl border border-border bg-surface hover:border-amber/40 transition-all p-6 overflow-hidden"
              >
                <div className="font-mono text-[11px] tracking-[0.14em] text-amber mb-3">
                  PCF {c.code}
                </div>
                <h2 className="font-heading font-bold text-on-surface text-[18px] leading-snug mb-2 group-hover:text-amber transition-colors">
                  {c.namePl}
                </h2>
                <p className="text-text-dim text-[13px] leading-relaxed line-clamp-3">{c.descPl}</p>
                <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-text-mute">
                  {c.nameEng}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <SectionDivider label="Automatyzacja procesów" />
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12">
          <div className="rounded-2xl border border-border bg-bg-soft px-6 py-8 sm:px-10 sm:py-10 text-center">
            <h2 className="font-heading text-[clamp(20px,2.5vw,28px)] font-bold text-on-surface mb-3">
              Który z tych procesów zjada Wam czas?
            </h2>
            <p className="text-text-dim text-[15px] max-w-xl mx-auto mb-6">
              Automatyzujemy procesy biznesowe — od obsługi klienta po łańcuch dostaw. Wskaż obszar, a my
              pokażemy, gdzie AI i automatyzacja dają najszybszy zwrot.
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
