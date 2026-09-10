import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/SchemaOrg";
import Tabliczka from "@/components/sciana/Tabliczka";
import KolumnaBoczna from "@/components/sciana/KolumnaBoczna";
import SzukajPrzycisk from "@/components/sciana/SzukajPrzycisk";
import CategoryTree from "@/components/CategoryTree";
import {
  getCategory,
  getCategorySlugs,
  getNodesByCategory,
  getChildren,
  codeToSlug,
  totalNodeCount,
  type ProcessNode,
} from "@/lib/procesy";
import { generateDefinedTermSchema, generateItemListSchema, generateBreadcrumbSchema, graph } from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

interface Props {
  params: { kategoria: string };
}

export function generateStaticParams() {
  return getCategorySlugs().map((kategoria) => ({ kategoria }));
}

export function generateMetadata({ params }: Props): Metadata {
  const c = getCategory(params.kategoria);
  if (!c) return {};
  return {
    title: `${c.namePl} — procesy biznesowe (APQC PCF ${c.code})`,
    description: c.descPl,
    alternates: { canonical: `${SITE_URL}/procesy/${c.slug}` },
    openGraph: {
      title: `${c.namePl} — APQC PCF ${c.code}`,
      description: c.descPl,
      url: `${SITE_URL}/procesy/${c.slug}`,
      type: "article",
      locale: "pl_PL",
    },
  };
}

export default function ProcesKategoriaPage({ params }: Props) {
  const c = getCategory(params.kategoria);
  if (!c) notFound();

  const nodes = getNodesByCategory(c.slug);
  const groups = nodes.filter((n) => n.level === "Grupa procesów");

  const schema = graph(
    generateDefinedTermSchema({
      name: c.namePl,
      description: c.descPl,
      url: `/procesy/${c.slug}`,
      inSetUrl: "/procesy",
      termCode: c.code,
      alternateName: c.nameEng,
    }),
    ...(groups.length
      ? [
          generateItemListSchema(
            `Grupy procesów — ${c.namePl}`,
            groups.map((g) => ({ name: `${g.code} ${g.namePl}`, url: `/procesy/${c.slug}/${codeToSlug(g.code)}` })),
          ),
        ]
      : []),
    generateBreadcrumbSchema([
      { name: "Strona główna", url: "/" },
      { name: "Procesy", url: "/procesy" },
      { name: c.namePl, url: `/procesy/${c.slug}` },
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
            <Link href="/procesy">Procesy</Link> · PCF {c.code}
          </>
        }
        right={<SzukajPrzycisk />}
        footer={`${c.nameEng} · APQC PCF 7.4, tłum. własne`}
        footerRight={`${nodes.length} węzłów`}
        className="s-read"
      >
        <h1 className="display" style={{ fontSize: "var(--step-3)", maxWidth: "18ch", marginBottom: "var(--space-2)" }}>
          {c.namePl}
        </h1>
        <p style={{ color: "var(--ink-2)", maxWidth: "var(--measure)", marginBottom: "var(--space-3)" }}>{c.descPl}</p>

        {groups.length > 0 ? (
          groups.map((g) => <ProcessGroup key={g.code} group={g} />)
        ) : (
          <p style={{ color: "var(--ink-2)", maxWidth: "var(--measure)" }}>
            Szczegółowa taksonomia tej kategorii (grupy procesów, procesy, działania i zadania według APQC PCF {c.code})
            jest synchronizowana z bazą źródłową.
          </p>
        )}
      </Tabliczka>

      <KolumnaBoczna
        routes={[
          { from: "Ta kategoria", to: `${groups.length} grup`, href: `/procesy/${c.slug}` },
          { from: "Wszystkie procesy", to: `${totalNodeCount()} w bazie`, href: "/procesy" },
          { from: "Ten obszar u Ciebie", to: "Rozmowa", href: "/kontakt" },
        ]}
        routesFooter="/procesy"
      >
        <Tabliczka nr="04" title="Drzewo kategorii" right={c.code} footer="Grupa > Proces > Działanie" plate>
          <CategoryTree categorySlug={c.slug} />
        </Tabliczka>
      </KolumnaBoczna>
    </>
  );
}

function ProcessGroup({ group }: { group: ProcessNode }) {
  const processes = getChildren(group.code);
  const groupHref = `/procesy/${group.categorySlug}/${codeToSlug(group.code)}`;
  return (
    <section id={group.code} className="ruled" style={{ marginTop: 0 }}>
      <h2 className="label" style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
        <span>
          {group.code} ·{" "}
          <Link href={groupHref} style={{ color: "var(--ink)", fontWeight: 700 }}>
            {group.namePl}
          </Link>
        </span>
        <span>{processes.length}</span>
      </h2>
      {group.descPl && (
        <p style={{ color: "var(--ink-2)", fontSize: 15, maxWidth: "var(--measure)", marginBottom: "var(--space-1)" }}>
          {group.descPl}
        </p>
      )}
      {processes.length > 0 && (
        <ul className="rows">
          {processes.map((p) => (
            <li key={p.code}>
              <span className="n">{p.code}</span>
              <span className="t" style={{ fontWeight: 400 }}>
                <Link href={`/procesy/proces/${codeToSlug(p.code)}`}>{p.namePl}</Link>
              </span>
              <span className="v">{getChildren(p.code).length || ""}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
