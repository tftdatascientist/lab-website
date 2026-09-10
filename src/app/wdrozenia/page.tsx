import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";
import SchemaOrg from "@/components/SchemaOrg";
import Tabliczka from "@/components/sciana/Tabliczka";
import KolumnaBoczna from "@/components/sciana/KolumnaBoczna";
import KomputerLokalny from "@/components/sciana/KomputerLokalny";
import { totalNodeCount } from "@/lib/procesy";
import { procesyUslugi } from "@/lib/procesy-tresc";
import { KodProcesu } from "@/components/sciana/ProcesyWplatane";
import { generateItemListSchema, generateServiceSchema, generateBreadcrumbSchema, graph } from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

export const metadata: Metadata = {
  title: "Wdrożenia AI i automatyzacji — chatboty, agenci głosowi, RAG | lok-ai",
  description:
    "Wdrażamy technologie AI w lokalnych firmach: chatboty, agentów głosowych, automatyzację procesów (n8n), bazy wiedzy RAG, dashboardy i integracje systemów. Sześć obszarów wdrożeń w jednym dziale.",
  alternates: { canonical: `${SITE_URL}/wdrozenia` },
  openGraph: {
    title: "Wdrożenia AI i automatyzacji — lok-ai",
    description:
      "Chatboty, agenci głosowi, automatyzacja procesów, RAG, dashboardy i integracje — technologia jutra, dostępna dziś dla lokalnych firm.",
    url: `${SITE_URL}/wdrozenia`,
    type: "website",
    locale: "pl_PL",
  },
};

export default function WdrozeniaPage() {
  const schema = graph(
    generateItemListSchema(
      "Wdrożenia AI i automatyzacji",
      services.map((s) => ({ name: s.title, url: `/wdrozenia/${s.slug}` })),
      "Sześć obszarów wdrożeń AI i automatyzacji dla lokalnych firm: chatboty, agenci głosowi, automatyzacja procesów, RAG, dashboardy i integracje.",
    ),
    ...services.map((s) => generateServiceSchema(s)),
    generateBreadcrumbSchema([
      { name: "Strona główna", url: "/" },
      { name: "Wdrożenia", url: "/wdrozenia" },
    ]),
  );

  return (
    <>
      <SchemaOrg schema={schema} />
      <Tabliczka nr="01" title="Wdrożenia · AI i automatyzacja" right={services.length} footer="Technologia jest środkiem" className="s-read">
        <h1 className="display" style={{ fontSize: "var(--step-3)", maxWidth: "18ch", marginBottom: "var(--space-2)" }}>
          Technologia jutra, dostępna dziś.
        </h1>
        <p style={{ color: "var(--ink-2)", maxWidth: "var(--measure)", marginBottom: "var(--space-3)" }}>
          Łączymy chatboty, agentów głosowych, automatyzację procesów, bazy wiedzy, dashboardy i integracje API w jeden,
          spójny ekosystem. Wdrażamy sprawdzone narzędzia AI w lokalnych firmach — od analizy procesu po wsparcie po
          wdrożeniu.
        </p>

        <ul className="rows">
          {services.map((s, i) => (
            <li key={s.slug}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <span className="t">
                <Link href={`/wdrozenia/${s.slug}`}>{s.title}</Link>
                <span className="d">{s.desc}</span>
              </span>
              <KodProcesu node={procesyUslugi(s.slug)[0]} />
            </li>
          ))}
        </ul>

        <section className="ruled">
          <h2 className="label">Jak wdrażamy</h2>
          <ul className="routes">
            {[
              ["Rozmowa", "Audyt procesów"],
              ["Audyt", "Projekt"],
              ["Projekt", "Wdrożenie"],
              ["Wdrożenie", "Wsparcie"],
            ].map(([a, b]) => (
              <li key={a}>
                <span>{a}</span>
                <span className="arrow" aria-hidden="true">
                  &gt;
                </span>
                <span className="to">{b}</span>
              </li>
            ))}
          </ul>
        </section>
      </Tabliczka>

      <KolumnaBoczna
        routes={[
          { from: "Sprawdzona technologia", to: "Prosta rzecz", href: "/wdrozenia" },
          { from: "Procesy w firmie", to: `${totalNodeCount()} w bazie`, href: "/procesy" },
          { from: "Twój proces", to: "Rozmowa", href: "/kontakt" },
        ]}
        routesFooter="/wdrozenia · /procesy"
      >
        <Tabliczka nr="04" title="Komputer lokalny" right="u klienta" footer="Rys. 1">
          <KomputerLokalny />
          <p style={{ color: "var(--ink-2)", fontSize: 15, marginTop: "var(--space-1)" }}>
            Proste automatyzacje na lokalnym komputerze i lokalnych modelach — sprzedawane razem ze sprzętem.
          </p>
        </Tabliczka>
      </KolumnaBoczna>
    </>
  );
}
