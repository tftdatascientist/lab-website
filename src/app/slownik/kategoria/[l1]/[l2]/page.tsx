import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/SchemaOrg";
import Tabliczka from "@/components/sciana/Tabliczka";
import KolumnaBoczna from "@/components/sciana/KolumnaBoczna";
import SzukajPrzycisk from "@/components/sciana/SzukajPrzycisk";
import RelatedLinks from "@/components/RelatedLinks";
import SlownikTree from "@/components/SlownikTree";
import {
  getAllL2Pairs,
  getL1ofL2,
  getL2sByL1,
  getL3sByL2,
  getTermsByL3,
  getTermsByL2Count,
  getAllTerms,
  buildSlownikTrail,
  labelL1,
  labelL2,
  labelL3,
} from "@/lib/slownik";
import { generateDefinedTermSetSchema, generateItemListSchema, generateBreadcrumbSchema, graph } from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

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
  const count = getTermsByL2Count(params.l2);

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
      <Tabliczka
        nr="01"
        title={
          <>
            <Link href="/slownik">Słownik</Link> · <Link href={`/slownik/kategoria/${params.l1}`}>{labelL1(params.l1)}</Link>
          </>
        }
        right={<SzukajPrzycisk />}
        footer="Grupa > Hasło"
        footerRight={`${count} haseł`}
        className="s-read"
      >
        <h1 className="display" style={{ fontSize: "var(--step-3)", maxWidth: "18ch", marginBottom: "var(--space-2)" }}>
          {label}
        </h1>
        <p style={{ color: "var(--ink-2)", maxWidth: "var(--measure)", marginBottom: "var(--space-3)" }}>
          {count} pojęć w {l3s.length} grupach tematycznych.
        </p>

        <section className="ruled" style={{ marginTop: 0 }}>
          <h2 className="label">Grupy pojęć · {l3s.length}</h2>
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

        {siblings.length > 0 && (
          <RelatedLinks
            title={`Pozostałe poddziedziny — ${labelL1(params.l1)}`}
            items={siblings.map((s) => ({ label: labelL2(s), href: `/slownik/kategoria/${params.l1}/${s}`, kind: "slownik" }))}
          />
        )}
      </Tabliczka>

      <KolumnaBoczna
        routes={[
          { from: "Ta poddziedzina", to: `${count} haseł`, href: `/slownik/kategoria/${params.l1}/${params.l2}` },
          { from: "Dziedzina", to: labelL1(params.l1), href: `/slownik/kategoria/${params.l1}` },
          { from: "Cały słownik", to: `${getAllTerms().length} haseł`, href: "/slownik" },
        ]}
        routesFooter="/slownik"
      >
        <Tabliczka nr="04" title="Drzewo dziedziny" right={labelL1(params.l1)} footer="Poddziedzina > Grupa > Podgrupa" plate>
          <SlownikTree l1={params.l1} activeL2={params.l2} />
        </Tabliczka>
      </KolumnaBoczna>
    </>
  );
}
