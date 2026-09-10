import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/SchemaOrg";
import Tabliczka from "@/components/sciana/Tabliczka";
import KolumnaBoczna from "@/components/sciana/KolumnaBoczna";
import SzukajPrzycisk from "@/components/sciana/SzukajPrzycisk";
import RelatedLinks from "@/components/RelatedLinks";
import CategoryTree from "@/components/CategoryTree";
import { getCategory, getNode, getChildren, getAllGroups, slugToCode, codeToSlug, countDescendants } from "@/lib/procesy";
import { generateDefinedTermSchema, generateItemListSchema, generateBreadcrumbSchema, graph } from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

interface Props {
  params: { kategoria: string; grupa: string };
}

export function generateStaticParams() {
  return getAllGroups().map((g) => ({ kategoria: g.categorySlug, grupa: codeToSlug(g.code) }));
}

export function generateMetadata({ params }: Props): Metadata {
  const g = getNode(slugToCode(params.grupa));
  if (!g || g.level !== "Grupa procesów") return {};
  const url = `${SITE_URL}/procesy/${g.categorySlug}/${params.grupa}`;
  const desc =
    g.descPl || `Grupa procesów ${g.code} „${g.namePl}" według APQC PCF 7.4 — lista procesów, działań i zadań po polsku.`;
  return {
    title: `${g.namePl} — grupa procesów (APQC PCF ${g.code})`,
    description: desc.length > 155 ? desc.slice(0, 152) + "…" : desc,
    alternates: { canonical: url },
    openGraph: {
      title: `${g.namePl} — APQC PCF ${g.code}`,
      description: desc.length > 155 ? desc.slice(0, 152) + "…" : desc,
      url,
      type: "article",
      locale: "pl_PL",
    },
  };
}

export default function GrupaProcesowPage({ params }: Props) {
  const g = getNode(slugToCode(params.grupa));
  const cat = getCategory(params.kategoria);
  if (!g || g.level !== "Grupa procesów" || !cat || g.categorySlug !== cat.slug) notFound();

  const processes = getChildren(g.code);
  const siblings = getChildren(cat.code).filter((s) => s.code !== g.code);

  const schema = graph(
    generateDefinedTermSchema({
      name: g.namePl,
      description: g.descPl || `Grupa procesów ${g.code} według APQC PCF 7.4.`,
      url: `/procesy/${cat.slug}/${params.grupa}`,
      inSetUrl: "/procesy",
      termCode: g.code,
      alternateName: g.nameEng,
    }),
    ...(processes.length
      ? [
          generateItemListSchema(
            `Procesy — ${g.namePl}`,
            processes.map((p) => ({ name: `${p.code} ${p.namePl}`, url: `/procesy/proces/${codeToSlug(p.code)}` })),
          ),
        ]
      : []),
    generateBreadcrumbSchema([
      { name: "Strona główna", url: "/" },
      { name: "Procesy", url: "/procesy" },
      { name: cat.namePl, url: `/procesy/${cat.slug}` },
      { name: g.namePl, url: `/procesy/${cat.slug}/${params.grupa}` },
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
            <Link href="/procesy">Procesy</Link> · <Link href={`/procesy/${cat.slug}`}>{cat.code}</Link> · PCF {g.code}
          </>
        }
        right={<SzukajPrzycisk />}
        footer={`${g.nameEng ?? "Process group"} · APQC PCF 7.4, tłum. własne`}
        footerRight={`${processes.length} procesów`}
        className="s-read"
      >
        <h1 className="display" style={{ fontSize: "var(--step-3)", maxWidth: "18ch", marginBottom: "var(--space-2)" }}>
          {g.namePl}
        </h1>
        {g.descPl && (
          <p style={{ color: "var(--ink-2)", maxWidth: "var(--measure)", marginBottom: "var(--space-3)" }}>{g.descPl}</p>
        )}

        <section className="ruled" style={{ marginTop: 0 }}>
          <h2 className="label">Procesy w tej grupie · {processes.length}</h2>
          {processes.length > 0 ? (
            <ul className="rows">
              {processes.map((p) => {
                const sub = countDescendants(p.code);
                return (
                  <li key={p.code}>
                    <span className="n">{p.code}</span>
                    <span className="t">
                      <Link href={`/procesy/proces/${codeToSlug(p.code)}`}>{p.namePl}</Link>
                      {p.descPl && <span className="d">{p.descPl}</span>}
                    </span>
                    <span className="v">{sub > 0 ? `${sub} el.` : ""}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p style={{ color: "var(--ink-2)" }}>Szczegółowa taksonomia tej grupy procesów według APQC PCF {g.code} jest w przygotowaniu.</p>
          )}
        </section>

        {siblings.length > 0 && (
          <RelatedLinks
            title={`Pozostałe grupy — ${cat.namePl}`}
            items={siblings.map((s) => ({ label: `${s.code} ${s.namePl}`, href: `/procesy/${cat.slug}/${codeToSlug(s.code)}`, kind: "proces" }))}
          />
        )}
      </Tabliczka>

      <KolumnaBoczna
        routes={[
          { from: "Ta grupa", to: `${processes.length} procesów`, href: `/procesy/${cat.slug}/${params.grupa}` },
          { from: "Kategoria", to: cat.code, href: `/procesy/${cat.slug}` },
          { from: "Ten obszar u Ciebie", to: "Rozmowa", href: "/kontakt" },
        ]}
        routesFooter="/procesy"
      >
        <Tabliczka nr="04" title="Drzewo kategorii" right={cat.code} footer="Grupa > Proces > Działanie" plate>
          <CategoryTree categorySlug={cat.slug} activeCode={g.code} />
        </Tabliczka>
      </KolumnaBoczna>
    </>
  );
}
