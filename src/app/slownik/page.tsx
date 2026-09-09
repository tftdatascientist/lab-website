import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import SchemaOrg from "@/components/SchemaOrg";
import Tabliczka from "@/components/sciana/Tabliczka";
import KolumnaBoczna from "@/components/sciana/KolumnaBoczna";
import SzukajPrzycisk from "@/components/sciana/SzukajPrzycisk";
import { generateDefinedTermSetSchema, generateItemListSchema, generateBreadcrumbSchema, graph } from "@/lib/schema";
import { getAllTerms, getCategories, getAllL2Pairs, getAllL3Slugs, firstLetter, L1_LABELS } from "@/lib/slownik";
import { totalNodeCount } from "@/lib/procesy";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

export const metadata: Metadata = {
  title: "Słownik IT — 1200+ pojęć z informatyki, AI i automatyzacji",
  description:
    "Przejrzysty słownik terminologii IT: algorytmy, sieci, bazy danych, bezpieczeństwo, AI/ML, chmura i DevOps. Ponad 1200 haseł z prostymi definicjami i źródłami.",
  alternates: { canonical: `${SITE_URL}/slownik` },
  openGraph: {
    title: "Słownik IT — 1200+ pojęć | lok-ai",
    description: "Ponad 1200 terminów IT z prostymi definicjami: od algorytmów po AI/ML. Wyszukiwarka i kategorie.",
    url: `${SITE_URL}/slownik`,
    type: "website",
    locale: "pl_PL",
  },
};

export default function SlownikPage() {
  const terms = [...getAllTerms()].sort((a, b) => a.haslo.localeCompare(b.haslo, "pl"));
  const categories = getCategories();

  // grupowanie alfabetyczne — jedna gęsta tabela, litery jako wiersze-nagłówki z kotwicą
  const groups: { letter: string; items: typeof terms }[] = [];
  for (const t of terms) {
    const L = firstLetter(t.haslo);
    const g = groups[groups.length - 1];
    if (g && g.letter === L) g.items.push(t);
    else groups.push({ letter: L, items: [t] });
  }
  // hasła od cyfry/znaku („#”) na koniec — wiersz liter czyta się A–Z, potem #
  const hash = groups.filter((g) => g.letter === "#");
  if (hash.length) {
    const rest = groups.filter((g) => g.letter !== "#");
    groups.splice(0, groups.length, ...rest, { letter: "#", items: hash.flatMap((g) => g.items) });
  }

  const schema = graph(
    generateDefinedTermSetSchema({
      name: "Słownik IT lok-ai",
      description:
        "Słownik terminologii informatycznej: algorytmy, systemy, sieci, dane, bezpieczeństwo, AI/ML, chmura i inżynieria oprogramowania.",
      url: "/slownik",
      terms: terms.slice(0, 40).map((t) => ({ name: t.haslo, url: `/slownik/${t.slug}`, description: t.definicja })),
    }),
    generateItemListSchema(
      "Kategorie słownika IT",
      categories.map((c) => ({ name: c.label, url: `/slownik/kategoria/${c.key}` })),
      "Główne dziedziny terminologii IT w słowniku lok-ai.",
    ),
    generateBreadcrumbSchema([
      { name: "Strona główna", url: "/" },
      { name: "Słownik", url: "/slownik" },
    ]),
  );

  return (
    <>
      <SchemaOrg schema={schema} />
      <Tabliczka
        nr="01"
        title={`Słownik · ${terms.length} pojęć`}
        right={<SzukajPrzycisk />}
        footer="Definicje własne, źródła przy hasłach"
        className="s-read"
      >
        <h1 className="display" style={{ fontSize: "var(--step-3)", maxWidth: "16ch", marginBottom: "var(--space-2)" }}>
          Słownik terminologii IT.
        </h1>
        <p style={{ color: "var(--ink-2)", maxWidth: "var(--measure)" }}>
          Ponad {terms.length} pojęć z informatyki — od algorytmów i sieci po AI/ML i chmurę. Każde hasło ma prostą
          definicję, kategorię i źródło. Bez żargonu, po ludzku.
        </p>
        <p className="mono" style={{ color: "var(--ink-3)", margin: "var(--space-2) 0 var(--space-3)" }}>
          {terms.length} haseł · {categories.length} kategorii · {getAllL2Pairs().length} poddziedzin ·{" "}
          {getAllL3Slugs().length} grup · 4 poziomy
        </p>

        <nav className="filters" aria-label="kategorie">
          <Link href="/slownik" aria-current="page">
            Wszystkie <span className="n">{terms.length}</span>
          </Link>
          {categories.map((c) => (
            <Link key={c.key} href={`/slownik/kategoria/${c.key}`}>
              {c.label} <span className="n">{c.count}</span>
            </Link>
          ))}
        </nav>
        <nav className="filters" aria-label="litery" style={{ borderBottom: 0 }}>
          {groups.map((g) => (
            <a key={g.letter} href={`#litera-${g.letter}`}>
              {g.letter}
            </a>
          ))}
        </nav>

        <table>
          <thead>
            <tr>
              <th scope="col">Hasło</th>
              <th scope="col">Definicja</th>
              <th scope="col" className="hide-m" style={{ textAlign: "right" }}>
                Dziedzina
              </th>
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <Fragment key={g.letter}>
                <tr className="letter" id={`litera-${g.letter}`}>
                  <td colSpan={3}>{g.letter}</td>
                </tr>
                {g.items.map((t) => (
                  <tr key={t.slug}>
                    <td style={{ width: "28%", verticalAlign: "top", fontWeight: 600 }}>
                      <Link href={`/slownik/${t.slug}`}>{t.haslo}</Link>
                      {t.skrot && (
                        <span className="mono" style={{ color: "var(--ink-3)", display: "block", fontSize: 11 }}>
                          {t.skrot}
                        </span>
                      )}
                    </td>
                    <td style={{ color: "var(--ink-2)", fontSize: 14, verticalAlign: "top" }}>{t.definicja}</td>
                    <td className="hide-m mono" style={{ color: "var(--ink-3)", textAlign: "right", verticalAlign: "top", fontSize: 11, width: 140 }}>
                      {L1_LABELS[t.L1] || t.L1}
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </Tabliczka>

      <KolumnaBoczna
        routes={[
          { from: "Trudne pojęcia", to: `${terms.length} haseł`, href: "/slownik" },
          { from: "Największa dziedzina", to: categories.reduce((a, b) => (b.count > a.count ? b : a)).label, href: `/slownik/kategoria/${categories.reduce((a, b) => (b.count > a.count ? b : a)).key}` },
          { from: "Procesy w firmie", to: `${totalNodeCount()} w bazie`, href: "/procesy" },
        ]}
        routesFooter="/slownik · /procesy"
      />
    </>
  );
}

