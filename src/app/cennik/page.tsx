import type { Metadata } from "next";
import Link from "next/link";
import SchemaOrg from "@/components/SchemaOrg";
import Tabliczka from "@/components/sciana/Tabliczka";
import KolumnaBoczna from "@/components/sciana/KolumnaBoczna";
import { generateWebPageSchema, generateBreadcrumbSchema, generateFaqSchema, graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Cennik — lok-ai | Plany automatyzacji AI dla firm",
  description:
    "Elastyczne plany cenowe lok-ai — od darmowej konsultacji po dedykowane wdrożenia enterprise. Automatyzacja i AI dla MŚP.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl"}/cennik`,
  },
};

interface PricingPlan {
  name: string;
  price: string;
  priceSuffix?: string;
  description: string;
  features: string[];
  cta: string;
}

/**
 * UWAGA (do decyzji właściciela): treść planów przeniesiona 1:1 ze starej strony (ceny, zakresy) — do potwierdzenia
 * przez właściciela. Układ: jedna tabela, bez wyróżnionego środka i bez odznaki
 * „Najpopularniejszy" (NIE CHCĘ, warstwa 2). Blok „Analiza porównawcza" (99.9 % / <20 ms /
 * 24/7 + zdjęcie stockowe) wypadł — liczniki bez źródła (warstwa 1).
 */
const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: "0 zł",
    priceSuffix: "/ mies.",
    description: "Idealny na start — sprawdź, jak AI może pomóc Twojej firmie.",
    features: ["Konsultacja wstępna", "Analiza procesów", "Raport z rekomendacjami", "Dostęp do bazy wiedzy"],
    cta: "Zacznij za darmo",
  },
  {
    name: "Professional",
    price: "199 zł",
    priceSuffix: "/ mies.",
    description: "Dla zespołów wymagających pełnej automatyzacji i wsparcia AI.",
    features: ["Pełna automatyzacja", "Chatbot AI 24/7", "Integracje API", "Wsparcie priorytetowe", "Analityka zaawansowana"],
    cta: "Wybierz plan",
  },
  {
    name: "Enterprise",
    price: "Indywidualnie",
    description: "Pełna kontrola, bezpieczeństwo i dedykowane zasoby.",
    features: ["Wdrożenie on-premise", "Dedykowane szkolenia", "SLA 99.99%", "Dedykowany opiekun"],
    cta: "Skontaktuj się",
  },
];

const faqItems = [
  {
    question: "Czy mogę zmienić plan w dowolnym momencie?",
    answer:
      "Tak, możesz zwiększyć lub zmniejszyć swój plan w panelu sterowania. Zmiany zostaną naliczone proporcjonalnie do cyklu rozliczeniowego.",
  },
  {
    question: "Co się stanie po przekroczeniu limitu?",
    answer:
      "W planie Starter zapytania zostaną wstrzymane. W planach Professional i Enterprise stosujemy system ‘soft limits’ z automatycznym rozliczaniem nadwyżek.",
  },
];

const schema = graph(
  generateWebPageSchema({
    type: "WebPage",
    name: "Cennik",
    path: "/cennik",
    description: "Elastyczne plany cenowe lok-ai — od darmowej konsultacji po dedykowane wdrożenia enterprise.",
  }),
  generateFaqSchema(faqItems.map((f) => ({ question: f.question, answer: f.answer }))),
  generateBreadcrumbSchema([
    { name: "Strona główna", url: "/" },
    { name: "Cennik", url: "/cennik" },
  ]),
);

export default function CennikPage() {
  return (
    <>
      <SchemaOrg schema={schema} />
      <Tabliczka nr="01" title="Cennik · Plany" right={plans.length} footer="Każdy projekt wyceniamy osobno" className="s-read">
        <h1 className="display" style={{ fontSize: "var(--step-3)", maxWidth: "18ch", marginBottom: "var(--space-2)" }}>
          Elastyczne plany dla każdej skali.
        </h1>
        <p style={{ color: "var(--ink-2)", maxWidth: "var(--measure)", marginBottom: "var(--space-3)" }}>
          Od darmowej konsultacji po dedykowane wdrożenia — dopasujemy plan do Twojej skali działania.
        </p>

        <table>
          <thead>
            <tr>
              <th scope="col">Plan</th>
              <th scope="col">Zakres</th>
              <th scope="col" style={{ textAlign: "right" }}>
                Cena
              </th>
            </tr>
          </thead>
          <tbody>
            {plans.map((p) => (
              <tr key={p.name}>
                <td style={{ verticalAlign: "top", width: "22%", fontWeight: 600, paddingTop: 10 }}>
                  {p.name}
                  <span style={{ display: "block", color: "var(--ink-2)", fontSize: 13, fontWeight: 400 }}>{p.description}</span>
                  <Link href="/kontakt" className="mono" style={{ display: "inline-block", marginTop: 6, borderBottom: "1px solid var(--ink)" }}>
                    {p.cta}
                  </Link>
                </td>
                <td style={{ verticalAlign: "top", paddingTop: 10 }}>
                  <ul className="rows" style={{ maxWidth: "var(--measure)" }}>
                    {p.features.map((f, i) => (
                      <li key={f} style={{ padding: "3px 0" }}>
                        <span className="n">{String(i + 1).padStart(2, "0")}</span>
                        <span className="t" style={{ fontWeight: 400, fontSize: 14 }}>
                          {f}
                        </span>
                        <span className="v" />
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="k" style={{ verticalAlign: "top", paddingTop: 10, width: 110, whiteSpace: "nowrap" }}>
                  {p.price}
                  {p.priceSuffix && (
                    <span style={{ display: "block", color: "var(--ink-3)", fontSize: 11 }}>{p.priceSuffix}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <section className="ruled">
          <h2 className="label">Pytania o rozliczenia</h2>
          <div style={{ display: "grid", gap: "var(--space-2)", maxWidth: "var(--measure)" }}>
            {faqItems.map((f) => (
              <div key={f.question}>
                <h3 style={{ fontWeight: 600, marginBottom: 4 }}>{f.question}</h3>
                <p style={{ color: "var(--ink-2)" }}>{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </Tabliczka>

      <KolumnaBoczna
        routes={[
          { from: "Konsultacja", to: "0 zł", href: "/kontakt" },
          { from: "Wdrożenie", to: "Wycena osobna", href: "/wdrozenia" },
          { from: "Pytania", to: "FAQ", href: "/faq" },
        ]}
        routesFooter="/kontakt · /wdrozenia · /faq"
      />
    </>
  );
}
