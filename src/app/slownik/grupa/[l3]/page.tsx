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
  getAllL3Slugs,
  getL2ofL3,
  getL1ofL2,
  getL3sByL2,
  getL4sByL3,
  getTermsByL3,
  getTermsByL4,
  getAllTerms,
  buildSlownikTrail,
  labelL1,
  labelL2,
  labelL3,
  labelL4,
} from "@/lib/slownik";
import { generateDefinedTermSetSchema, generateItemListSchema, generateBreadcrumbSchema, graph } from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

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
      <Tabliczka
        as="article"
        nr="01"
        title={
          <>
            <Link href="/slownik">Słownik</Link>
            {trail.slice(0, -1).map((t) => (
              <span key={t.href}>
                {" "}
                · <Link href={t.href}>{t.label}</Link>
              </span>
            ))}
          </>
        }
        right={<SzukajPrzycisk />}
        footer={`Grupa pojęć · ${labelL2(l2)}`}
        footerRight={`${terms.length} haseł`}
        className="s-read"
      >
        <h1 className="display" style={{ fontSize: "var(--step-3)", maxWidth: "18ch", marginBottom: "var(--space-2)" }}>
          {label}
        </h1>
        <p style={{ color: "var(--ink-2)", maxWidth: "var(--measure)", marginBottom: "var(--space-3)" }}>
          {terms.length} pojęć w {l4s.length} {l4s.length === 1 ? "podgrupie" : "podgrupach"}, z prostymi definicjami i
          źródłami.
        </p>

        {l4s.map((l4) => {
          const items = getTermsByL4(params.l3, l4);
          return (
            <section key={l4} id={`g-${l4}`} className="ruled" style={{ marginTop: 0, scrollMarginTop: 16 }}>
              <h2 className="label">
                {labelL4(l4)} · {items.length}
              </h2>
              <ul className="rows">
                {items.map((t) => (
                  <li key={t.slug}>
                    <span className="n">{t.skrot || ""}</span>
                    <span className="t">
                      <Link href={`/slownik/${t.slug}`}>{t.haslo}</Link>
                      <span className="d">{t.definicja}</span>
                    </span>
                    <span className="v" />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        {siblings.length > 0 && (
          <RelatedLinks
            title={`Pozostałe grupy — ${labelL2(l2)}`}
            items={siblings.map((s) => ({ label: labelL3(s), href: `/slownik/grupa/${s}`, kind: "slownik" }))}
          />
        )}
      </Tabliczka>

      <KolumnaBoczna
        routes={[
          { from: "Ta grupa", to: `${terms.length} haseł`, href: `/slownik/grupa/${params.l3}` },
          { from: "Poddziedzina", to: labelL2(l2), href: `/slownik/kategoria/${l1}/${l2}` },
          { from: "Cały słownik", to: `${getAllTerms().length} haseł`, href: "/slownik" },
        ]}
        routesFooter="/slownik"
      >
        {l4s.length > 1 && (
          <Tabliczka nr="04" title="Na tej stronie" right={l4s.length} footer="Podgrupy">
            <ul className="rows">
              {l4s.map((l4) => (
                <li key={l4}>
                  <span className="n">{getTermsByL4(params.l3, l4).length}</span>
                  <span className="t" style={{ fontWeight: 400, fontSize: 14 }}>
                    <a href={`#g-${l4}`}>{labelL4(l4)}</a>
                  </span>
                  <span className="v" />
                </li>
              ))}
            </ul>
          </Tabliczka>
        )}
        <Tabliczka nr={l4s.length > 1 ? "05" : "04"} title="Drzewo dziedziny" right={labelL1(l1)} footer="Poddziedzina > Grupa > Podgrupa" plate>
          <SlownikTree l1={l1} activeL3={params.l3} />
        </Tabliczka>
      </KolumnaBoczna>
    </>
  );
}
