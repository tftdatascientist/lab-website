import type { Metadata } from "next";
import Link from "next/link";
import SchemaOrg from "@/components/SchemaOrg";
import Tabliczka from "@/components/sciana/Tabliczka";
import KolumnaBoczna from "@/components/sciana/KolumnaBoczna";
import SzukajPrzycisk from "@/components/sciana/SzukajPrzycisk";
import { getCategories, getNodesByCategory, totalNodeCount, countByLevel } from "@/lib/procesy";
import { getAllTerms } from "@/lib/slownik";
import { generateDefinedTermSetSchema, generateItemListSchema, generateBreadcrumbSchema, graph } from "@/lib/schema";

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
  const categories = getCategories().map((c) => ({ ...c, count: getNodesByCategory(c.slug).length }));
  const nodes = totalNodeCount();

  const schema = graph(
    generateDefinedTermSetSchema({
      name: "Klasyfikacja procesów biznesowych — APQC PCF 7.4 (PL)",
      description:
        "Hierarchiczna taksonomia procesów biznesowych według APQC Process Classification Framework 7.4 w polskim tłumaczeniu: 13 kategorii, 5 poziomów.",
      url: "/procesy",
      terms: categories.map((c) => ({ name: c.namePl, url: `/procesy/${c.slug}`, description: c.descPl })),
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
      <Tabliczka
        nr="01"
        title="Procesy · APQC PCF 7.4"
        right={<SzukajPrzycisk label="Szukaj" />}
        footer="Źródło: APQC PCF 7.4, tłum. własne"
        className="s-read"
      >
        <h1 className="display" style={{ fontSize: "var(--step-3)", maxWidth: "18ch", marginBottom: "var(--space-2)" }}>
          Jeden standard, cała organizacja w procesach.
        </h1>
        <p style={{ color: "var(--ink-2)", maxWidth: "var(--measure)" }}>
          Kompletna, hierarchiczna klasyfikacja procesów biznesowych według APQC Process Classification Framework® 7.4
          w polskim tłumaczeniu — 13 kategorii, 5 poziomów. To mapa procesów, które pomagamy automatyzować.
        </p>
        <p className="mono" style={{ color: "var(--ink-3)", margin: "var(--space-2) 0 var(--space-3)" }}>
          {nodes} węzłów · {categories.length} kategorii · {countByLevel("Grupa procesów")} grup ·{" "}
          {countByLevel("Proces")} procesów · 5 poziomów
        </p>

        <table>
          <thead>
            <tr>
              <th scope="col">Kod</th>
              <th scope="col">Kategoria</th>
              <th scope="col" style={{ textAlign: "right" }}>
                Węzłów
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.slug}>
                <td className="c" style={{ verticalAlign: "top", paddingTop: 9 }}>
                  {c.code}
                </td>
                <td>
                  <Link href={`/procesy/${c.slug}`} style={{ fontWeight: 600 }}>
                    {c.namePl}
                  </Link>
                  <span className="d" style={{ display: "block", color: "var(--ink-2)", fontSize: 14 }}>
                    {c.descPl}
                  </span>
                  <span className="mono" style={{ color: "var(--ink-3)", fontSize: 11 }}>
                    {c.nameEng}
                  </span>
                </td>
                <td className="k" style={{ verticalAlign: "top", paddingTop: 9 }}>
                  {c.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Tabliczka>

      <KolumnaBoczna
        routes={[
          { from: "Procesy w firmie", to: `${nodes} w bazie`, href: "/procesy" },
          { from: "Największa kategoria", to: `${categories.reduce((a, b) => (b.count > a.count ? b : a)).code}`, href: `/procesy/${categories.reduce((a, b) => (b.count > a.count ? b : a)).slug}` },
          { from: "Trudne pojęcia", to: `${getAllTerms().length} haseł`, href: "/slownik" },
        ]}
        routesFooter="/procesy · /slownik"
      />
    </>
  );
}
