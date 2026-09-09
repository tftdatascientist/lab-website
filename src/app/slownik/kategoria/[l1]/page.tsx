import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/SchemaOrg";
import Tabliczka from "@/components/sciana/Tabliczka";
import KolumnaBoczna from "@/components/sciana/KolumnaBoczna";
import SzukajPrzycisk from "@/components/sciana/SzukajPrzycisk";
import SlownikTree from "@/components/SlownikTree";
import {
  getTermsByL1,
  getL1Slugs,
  getL2sByL1,
  getL3sByL2,
  getTermsByL3,
  getTermsByL2Count,
  getAllTerms,
  getCategories,
  L1_LABELS,
  labelL2,
  labelL3,
} from "@/lib/slownik";
import { generateDefinedTermSetSchema, generateItemListSchema, generateBreadcrumbSchema, graph } from "@/lib/schema";

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
  const categories = getCategories();

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
      <Tabliczka
        nr="01"
        title={
          <>
            <Link href="/slownik">Słownik</Link> · kategoria
          </>
        }
        right={<SzukajPrzycisk />}
        footer="Poddziedzina > Grupa > Hasło"
        footerRight={`${terms.length} haseł`}
        className="s-read"
      >
        <h1 className="display" style={{ fontSize: "var(--step-3)", maxWidth: "18ch", marginBottom: "var(--space-2)" }}>
          {label}
        </h1>
        <p style={{ color: "var(--ink-2)", maxWidth: "var(--measure)", marginBottom: "var(--space-2)" }}>
          {terms.length} pojęć z dziedziny {label.toLowerCase()} — uporządkowanych w grupy tematyczne, każde z prostą
          definicją i źródłem.
        </p>

        <nav className="filters" aria-label="kategorie">
          <Link href="/slownik">
            Wszystkie <span className="n">{getAllTerms().length}</span>
          </Link>
          {categories.map((c) => (
            <Link key={c.key} href={`/slownik/kategoria/${c.key}`} aria-current={c.key === params.l1 ? "page" : undefined}>
              {c.label} <span className="n">{c.count}</span>
            </Link>
          ))}
        </nav>

        {l2s.map((l2) => {
          const l3s = getL3sByL2(l2);
          return (
            <section key={l2} className="ruled" style={{ marginTop: 0 }}>
              <h2 className="label" style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                <Link href={`/slownik/kategoria/${params.l1}/${l2}`} style={{ color: "var(--ink)", fontWeight: 700 }}>
                  {labelL2(l2)}
                </Link>
                <span>{getTermsByL2Count(l2)} pojęć</span>
              </h2>
              <ul className="rows">
                {l3s.map((l3) => {
                  const n = getTermsByL3(l3).length;
                  return (
                    <li key={l3}>
                      <span className="n">{n}</span>
                      <span className="t" style={{ fontWeight: 400 }}>
                        <Link href={`/slownik/grupa/${l3}`}>{labelL3(l3)}</Link>
                      </span>
                      <span className="v" />
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </Tabliczka>

      <KolumnaBoczna
        routes={[
          { from: "Ta dziedzina", to: `${terms.length} haseł`, href: `/slownik/kategoria/${params.l1}` },
          { from: "Cały słownik", to: `${getAllTerms().length} haseł`, href: "/slownik" },
          { from: "AI w Twojej firmie", to: "Rozmowa", href: "/kontakt" },
        ]}
        routesFooter="/slownik"
      >
        <Tabliczka nr="04" title="Drzewo dziedziny" right={l2s.length} footer="Poddziedzina > Grupa > Podgrupa" plate>
          <SlownikTree l1={params.l1} />
        </Tabliczka>
      </KolumnaBoczna>
    </>
  );
}
