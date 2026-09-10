import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/content/services";
import SchemaOrg from "@/components/SchemaOrg";
import Tabliczka from "@/components/sciana/Tabliczka";
import KolumnaBoczna from "@/components/sciana/KolumnaBoczna";
import { totalNodeCount } from "@/lib/procesy";
import { generateServiceSchema, generateHowToSchema, generateBreadcrumbSchema, graph } from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

interface Props {
  params: { slug: string };
}

const STEPS = [
  { name: "Analiza procesów", text: "Mapujemy proces i wskazujemy, gdzie wdrożenie daje najszybszy zwrot." },
  { name: "Konfiguracja", text: "Budujemy i konfigurujemy rozwiązanie na sprawdzonych narzędziach." },
  { name: "Testy", text: "Testujemy na realnych danych i scenariuszach z Twojej firmy." },
  { name: "Wdrożenie i wsparcie", text: "Uruchamiamy produkcyjnie i zapewniamy wsparcie po wdrożeniu." },
];

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};

  return {
    title: `${service.title} — wdrożenia AI i automatyzacji | lok-ai`,
    description: service.longDesc || service.desc,
    openGraph: {
      title: `${service.title} — wdrożenia lok-ai`,
      description: service.longDesc || service.desc,
      type: "website",
      locale: "pl_PL",
      url: `${SITE_URL}/wdrozenia/${service.slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/wdrozenia/${service.slug}`,
    },
  };
}

/** Strona usługi = podstrona treści. Tagi z nazwami narzędzi NIE wychodzą na tabliczkę (NIE CHCĘ, warstwa 1). */
export default function WdrozeniePage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const index = services.findIndex((s) => s.slug === service.slug);
  const description = service.longDesc || service.desc;
  const others = services.filter((s) => s.slug !== service.slug);

  const schema = graph(
    generateServiceSchema(service),
    generateHowToSchema({ name: `Jak wdrażamy: ${service.title}`, description, steps: STEPS }),
    generateBreadcrumbSchema([
      { name: "Strona główna", url: "/" },
      { name: "Wdrożenia", url: "/wdrozenia" },
      { name: service.title, url: `/wdrozenia/${service.slug}` },
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
            <Link href="/wdrozenia">Wdrożenia</Link> · {String(index + 1).padStart(2, "0")} z {services.length}
          </>
        }
        right="u klienta"
        footer="Audyt > Projekt > Wdrożenie > Wsparcie"
        className="s-read"
      >
        <h1 className="display" style={{ fontSize: "var(--step-3)", maxWidth: "18ch", marginBottom: "var(--space-2)" }}>
          {service.title}
        </h1>
        <p style={{ fontSize: "var(--step-1)", lineHeight: 1.35, maxWidth: "var(--measure)", marginBottom: "var(--space-3)" }}>
          {service.desc}
        </p>

        {service.longDesc ? (
          <>
            <p style={{ color: "var(--ink-2)", maxWidth: "var(--measure)" }}>{service.longDesc}</p>

            {service.benefits && (
              <section className="ruled">
                <h2 className="label">Korzyści · {service.benefits.length}</h2>
                <ul className="rows">
                  {service.benefits.map((b, i) => (
                    <li key={b}>
                      <span className="n">{String(i + 1).padStart(2, "0")}</span>
                      <span className="t" style={{ fontWeight: 400 }}>
                        {b}
                      </span>
                      <span className="v" />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {service.useCases && (
              <section className="ruled">
                <h2 className="label">Przykłady zastosowań · {service.useCases.length}</h2>
                <ul className="rows">
                  {service.useCases.map((u, i) => (
                    <li key={u}>
                      <span className="n">{String(i + 1).padStart(2, "0")}</span>
                      <span className="t" style={{ fontWeight: 400 }}>
                        {u}
                      </span>
                      <span className="v" />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        ) : (
          <p style={{ color: "var(--ink-2)", maxWidth: "var(--measure)" }}>
            Szczegółowy opis tego wdrożenia w przygotowaniu. Napisz do nas — opowiemy, jak wygląda wdrożenie{" "}
            {service.title.toLowerCase()} w praktyce.
          </p>
        )}

        <section className="ruled">
          <h2 className="label">Jak wdrażamy · {STEPS.length}</h2>
          <ul className="rows">
            {STEPS.map((s, i) => (
              <li key={s.name}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span className="t">
                  {s.name}
                  <span className="d">{s.text}</span>
                </span>
                <span className="v" />
              </li>
            ))}
          </ul>
        </section>

        <section className="ruled">
          <h2 className="label">Pozostałe wdrożenia · {others.length}</h2>
          <ul className="routes">
            {others.map((o) => (
              <li key={o.slug}>
                <span>{service.title}</span>
                <span className="arrow" aria-hidden="true">
                  &gt;
                </span>
                <span className="to">
                  <Link href={`/wdrozenia/${o.slug}`}>{o.title}</Link>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </Tabliczka>

      <KolumnaBoczna
        routes={[
          { from: "To wdrożenie", to: `${index + 1} z ${services.length}`, href: "/wdrozenia" },
          { from: "Procesy w firmie", to: `${totalNodeCount()} w bazie`, href: "/procesy" },
          { from: service.title, to: "Rozmowa", href: "/kontakt" },
        ]}
        routesFooter="/wdrozenia · /procesy"
        ctaLabel={service.ctaText ?? "Umów rozmowę"}
      />
    </>
  );
}
