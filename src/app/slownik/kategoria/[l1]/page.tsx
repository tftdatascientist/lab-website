import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/SchemaOrg";
import { SubpageHeader, SectionDivider } from "@/components/mechanism";
import {
  getTermsByL1,
  getL1Slugs,
  L1_LABELS,
  L2_LABELS,
} from "@/lib/slownik";
import {
  generateDefinedTermSetSchema,
  generateBreadcrumbSchema,
  graph,
} from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lok-ai.pl";

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
  const description = `${label} — ${terms.length} pojęć z prostymi definicjami i źródłami. Część słownika terminologii IT lok-ai: algorytmy, sieci, dane, bezpieczeństwo, AI/ML, chmura i inżynieria oprogramowania.`;
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

  const description = `${label} — ${terms.length} pojęć z prostymi definicjami i źródłami. Część słownika terminologii IT lok-ai.`;

  const schema = graph(
    generateDefinedTermSetSchema({
      name: label,
      description,
      url: `/slownik/kategoria/${params.l1}`,
      terms: terms.slice(0, 40).map((t) => ({
        name: t.haslo,
        url: `/slownik/${t.slug}`,
        description: t.definicja,
      })),
    }),
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
              <strong className="text-on-surface">{label.toLowerCase()}</strong> — każde z prostą
              definicją, kategorią i&nbsp;źródłem.
            </>
          }
        >
          <nav className="mt-5 flex items-center gap-2 text-sm text-text-mute flex-wrap font-mono text-[12px]">
            <Link href="/slownik" className="hover:text-amber transition-colors">
              ← Cały słownik
            </Link>
          </nav>
        </SubpageHeader>

        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {terms.map((t) => (
              <Link
                key={t.slug}
                href={`/slownik/${t.slug}`}
                className="group relative block rounded-2xl border border-border bg-surface hover:border-amber/40 transition-all p-5 overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-heading font-bold text-on-surface text-[17px] leading-snug group-hover:text-amber transition-colors">
                    {t.haslo}
                  </h2>
                  {t.skrot && (
                    <span className="font-mono text-[11px] text-text-mute">{t.skrot}</span>
                  )}
                </div>
                <p className="text-text-dim text-[13px] leading-relaxed line-clamp-3">
                  {t.definicja}
                </p>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-text-mute">
                  {L2_LABELS[t.L2] || t.L2}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <SectionDivider label="Automatyzacja z AI" />
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12">
          <div className="rounded-2xl border border-border bg-bg-soft px-6 py-8 sm:px-10 sm:py-10 text-center">
            <h2 className="font-heading text-[clamp(20px,2.5vw,28px)] font-bold text-on-surface mb-3">
              Chcesz wykorzystać AI w&nbsp;swojej firmie?
            </h2>
            <p className="text-text-dim text-[15px] max-w-md mx-auto mb-6">
              Wdrażamy chatboty, agentów głosowych i&nbsp;automatyzacje dla MŚP. Pierwsza
              konsultacja jest bezpłatna.
            </p>
            <Link
              href="/kontakt"
              className="btn-primary inline-flex items-center rounded-[10px] px-6 py-3 text-[15px]"
            >
              Bezpłatna konsultacja
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
