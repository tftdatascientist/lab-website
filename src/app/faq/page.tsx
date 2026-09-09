import type { Metadata } from "next";
import SchemaOrg from "@/components/SchemaOrg";
import Tabliczka from "@/components/sciana/Tabliczka";
import KolumnaBoczna from "@/components/sciana/KolumnaBoczna";
import { generateFaqSchema, generateBreadcrumbSchema, graph } from "@/lib/schema";
import { faqData } from "./faq-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

export const metadata: Metadata = {
  title: "FAQ — lok-ai | Najczęściej Zadawane Pytania",
  description: "Odpowiedzi na najczęściej zadawane pytania o automatyzację procesów, chatboty AI i wdrożenia lok-ai.",
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
};

/** Fazy wdrożenia z pytania 1 — jako wiersze, nie kafle. */
const PHASES = [
  { n: "01", title: "Analiza procesów", time: "48–72 godziny" },
  { n: "02", title: "Konfiguracja automatyzacji", time: "96 godzin" },
  { n: "03", title: "Testy i uruchomienie", time: "24 godziny" },
];

/**
 * FAQ jako serwerowa tabliczka czytania: każde pytanie = sekcja z H2, treść zawsze w DOM
 * (faq-data.ts = jedno źródło prawdy dla UI i JSON-LD). Dawne „Protokół NN" wypadło
 * (rejestr militarny, NIE CHCĘ warstwa 1) — numeruje tabliczka.
 */
export default function FaqPage() {
  return (
    <>
      <SchemaOrg
        schema={graph(
          generateFaqSchema(faqData),
          generateBreadcrumbSchema([
            { name: "Strona główna", url: "/" },
            { name: "FAQ", url: "/faq" },
          ]),
        )}
      />
      <Tabliczka nr="01" title="Pytania i odpowiedzi" right={faqData.length} footer="Masz inne pytanie? Napisz." className="s-read">
        <h1 className="display" style={{ fontSize: "var(--step-3)", maxWidth: "18ch", marginBottom: "var(--space-2)" }}>
          Najczęściej zadawane pytania
        </h1>
        <p style={{ color: "var(--ink-2)", maxWidth: "var(--measure)", marginBottom: "var(--space-2)" }}>
          Odpowiedzi na pytania o automatyzację procesów, chatboty AI, bezpieczeństwo i integracje.
        </p>

        <nav className="filters" aria-label="pytania">
          {faqData.map((f, i) => (
            <a key={f.question} href={`#p-${i + 1}`}>
              {String(i + 1).padStart(2, "0")} {f.question}
            </a>
          ))}
        </nav>

        {faqData.map((f, i) => (
          <section key={f.question} id={`p-${i + 1}`} className="ruled" style={{ marginTop: 0, scrollMarginTop: 16 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "var(--step-1)", lineHeight: 1.1, marginBottom: "var(--space-1)" }}>
              <span className="mono" style={{ color: "var(--ink-3)", marginRight: 12 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {f.question}
            </h2>
            <p style={{ color: "var(--ink-2)", maxWidth: "var(--measure)" }}>{f.answer}</p>
            {i === 0 && (
              <ul className="rows" style={{ marginTop: "var(--space-2)", maxWidth: "var(--measure)" }}>
                {PHASES.map((ph) => (
                  <li key={ph.n}>
                    <span className="n">{ph.n}</span>
                    <span className="t">{ph.title}</span>
                    <span className="v">{ph.time}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </Tabliczka>

      <KolumnaBoczna
        routes={[
          { from: "Pytanie", to: "Odpowiedź", href: "/faq" },
          { from: "Świat AI", to: "Przegląd dnia", href: "/blog" },
          { from: "Inne pytanie", to: "Rozmowa", href: "/kontakt" },
        ]}
        routesFooter="/faq · /blog · /kontakt"
      />
    </>
  );
}
