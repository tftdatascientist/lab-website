import type { Metadata } from "next";
import SchemaOrg from "@/components/SchemaOrg";
import Tabliczka from "@/components/sciana/Tabliczka";
import KolumnaBoczna from "@/components/sciana/KolumnaBoczna";
import { generateWebPageSchema, generateItemListSchema, generateBreadcrumbSchema, graph } from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

/**
 * Realizacje — gęsta tabela 16 wierszy z linkami zewnętrznymi. Zrzuty ekranu (public/portfolio/*.webp)
 * zostają na dysku, ale NIE na stronie (dewiacja #3: jedyny obraz to rysunek urządzenia) — UWAGA, do
 * decyzji właściciela; odwracalne jako Fig w tabliczce grafitowej.
 */
const PROJECTS = [
  { name: "Micro-Serwis", desc: "Serwis komputerów i elektroniki — Grudziądz", url: "https://tftdatascientist.github.io/micro-serwis/" },
  { name: "Pro Athlete Grudziądz", desc: "Klub lekkoatletyczny — strona zawodnicza", url: "https://pro-athlete-grudziadz.razd.workers.dev/" },
  { name: "lok-ai", desc: "Automatyzacja i AI dla firm — Grudziądz, Toruń, Bydgoszcz", url: "https://lok-aipl.vercel.app/" },
  { name: "Szym znad Wisły", desc: "Portfolio snycerza artystycznego", url: "https://guileless-phoenix-f8e896.netlify.app/" },
  { name: "Roof Unicorns", desc: "Landing page — startup z humorem", url: "https://tftdatascientist.github.io/roof-unicorns/" },
  { name: "Europump Polska", desc: "Dostawca wyposażenia stacji paliw — LPG, LNG, CNG", url: "https://src-lovat-tau.vercel.app/" },
  { name: "PCF Polska", desc: "Strona korporacyjna organizacji", url: "https://wwwpcfpl.vercel.app/" },
  { name: "AUTOmatyczni — Baza Wiedzy", desc: "Baza wiedzy o automatycznych skrzyniach biegów", url: "https://wwwiedza.vercel.app/" },
  { name: "Grudziądz — Historia w Obiektywie", desc: "Archiwalne fotografie miasta odrestaurowane przez AI", url: "https://grudziadz-historia.vercel.app/" },
  { name: "Biuro Rachunkowe WEGA", desc: "Profesjonalna księgowość — Włocławek", url: "https://biurowega.vercel.app/" },
  { name: "Lokalna Automatyzacja Biznesu", desc: "Landing page — AI i automatyzacja dla firm", url: "https://lokalna-automatyzacja-biznesu.vercel.app/" },
  { name: "RSG Clean", desc: "Profesjonalne mycie elewacji i dachów — Gloucester", url: "https://clean-it-up-exterior.netlify.app/" },
  { name: "Strona za 500 zł", desc: "Landing page — strony internetowe dla małych firm", url: "https://www500pln.netlify.app/" },
  { name: "Claude Code /buddy", desc: "Kompletny przewodnik po funkcji wirtualnego zwierzaka Claude Code", url: "https://claude-code-buddy.netlify.app/" },
  { name: "Portal Grudziądz", desc: "Portal miejski — historia, ludzie, biznes", url: "https://portal-grudziadz-mvp.netlify.app/" },
  { name: "Claude Code Best Practices", desc: "Baza wiedzy — ponad 164 wskazówki do pracy z Claude Code", url: "https://site-five-pearl-11.vercel.app/" },
];

const schema = graph(
  generateWebPageSchema({
    type: "CollectionPage",
    name: "Portfolio",
    path: "/portfolio",
    description: "Przykładowe realizacje stron internetowych — od serwisów lokalnych po portale biznesowe i landing page'e.",
  }),
  generateItemListSchema(
    "Portfolio realizacji lok-ai",
    PROJECTS.map((p) => ({ name: p.name, url: p.url })),
    "Wybrane strony internetowe zaprojektowane i wdrożone przez lok-ai.",
  ),
  generateBreadcrumbSchema([
    { name: "Strona główna", url: "/" },
    { name: "Portfolio", url: "/portfolio" },
  ]),
);

export const metadata: Metadata = {
  title: "Portfolio — lok-ai | Realizacje stron WWW",
  description: "Przykładowe realizacje stron internetowych — od serwisów lokalnych po portale biznesowe i landing page'e.",
  alternates: {
    canonical: `${SITE_URL}/portfolio`,
  },
};

function host(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export default function PortfolioPage() {
  return (
    <>
      <SchemaOrg schema={schema} />
      <Tabliczka nr="01" title="Portfolio · Strony WWW" right={PROJECTS.length} footer="Adresy na żywo, otwierają się w nowej karcie" className="s-read">
        <h1 className="display" style={{ fontSize: "var(--step-3)", maxWidth: "18ch", marginBottom: "var(--space-2)" }}>
          Zrealizowane projekty.
        </h1>
        <p style={{ color: "var(--ink-2)", maxWidth: "var(--measure)", marginBottom: "var(--space-3)" }}>
          Wybrane strony internetowe zaprojektowane i wdrożone dla klientów z różnych branż.
        </p>
        <table>
          <thead>
            <tr>
              <th scope="col">Nr</th>
              <th scope="col">Realizacja</th>
              <th scope="col" className="hide-m" style={{ textAlign: "right" }}>
                Adres
              </th>
            </tr>
          </thead>
          <tbody>
            {PROJECTS.map((p, i) => (
              <tr key={p.url}>
                <td className="c" style={{ verticalAlign: "top", paddingTop: 8 }}>
                  {String(i + 1).padStart(2, "0")}
                </td>
                <td>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>
                    {p.name}
                  </a>
                  <span style={{ display: "block", color: "var(--ink-2)", fontSize: 14 }}>{p.desc}</span>
                </td>
                <td className="hide-m mono" style={{ textAlign: "right", verticalAlign: "top", paddingTop: 8, color: "var(--ink-3)", fontSize: 11 }}>
                  {host(p.url)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Tabliczka>

      <KolumnaBoczna
        routes={[
          { from: "Realizacje", to: `${PROJECTS.length} stron`, href: "/portfolio" },
          { from: "Sprawdzona technologia", to: "Prosta rzecz", href: "/wdrozenia" },
          { from: "Twoja strona", to: "Rozmowa", href: "/kontakt" },
        ]}
        routesFooter="/portfolio · /wdrozenia"
        ctaLabel="Zamów stronę"
      />
    </>
  );
}
