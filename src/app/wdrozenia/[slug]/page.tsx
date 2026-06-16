import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/content/services";
import SchemaOrg from "@/components/SchemaOrg";
import { SubpageHeader, SectionDivider, ServiceIconBySlug } from "@/components/mechanism";
import {
  generateServiceSchema,
  generateHowToSchema,
  generateBreadcrumbSchema,
  graph,
} from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lok-ai.pl";

interface Props {
  params: { slug: string };
}

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

export default function WdrozeniePage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const description = service.longDesc || service.desc;

  const schema = graph(
    generateServiceSchema(service),
    generateHowToSchema({
      name: `Jak wdrażamy: ${service.title}`,
      description,
      steps: [
        { name: "Analiza procesów", text: "Mapujemy proces i wskazujemy, gdzie wdrożenie daje najszybszy zwrot." },
        { name: "Konfiguracja", text: "Budujemy i konfigurujemy rozwiązanie na sprawdzonych narzędziach." },
        { name: "Testy", text: "Testujemy na realnych danych i scenariuszach z Twojej firmy." },
        { name: "Wdrożenie i wsparcie", text: "Uruchamiamy produkcyjnie i zapewniamy wsparcie po wdrożeniu." },
      ],
    }),
    generateBreadcrumbSchema([
      { name: "Strona główna", url: "/" },
      { name: "Wdrożenia", url: "/wdrozenia" },
      { name: service.title, url: `/wdrozenia/${service.slug}` },
    ]),
  );

  return (
    <>
      <SchemaOrg schema={schema} />
      <div className="pt-13" style={{ paddingTop: 52 }}>
        <SubpageHeader
          eyebrow={`Wdrożenie · ${service.tags.join(" · ")}`}
          title={service.title}
          cluster="tech"
          description={description}
        >
          <div className="mt-5 flex items-center gap-4">
            <span className="text-amber shrink-0">
              <ServiceIconBySlug slug={service.slug} size={48} />
            </span>
            <nav className="flex items-center gap-2 text-sm text-text-mute flex-wrap font-mono text-[12px]">
              <Link href="/wdrozenia" className="hover:text-amber transition-colors">
                ← Wszystkie wdrożenia
              </Link>
            </nav>
          </div>
        </SubpageHeader>

        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12">
          <div className="max-w-3xl space-y-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] uppercase tracking-[0.1em] text-amber border border-border rounded-full px-3 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>

            {service.longDesc ? (
              <>
                <div className="rounded-2xl border border-border bg-surface p-8 lg:p-10">
                  <p className="text-text-dim leading-relaxed">{service.longDesc}</p>
                </div>

                {service.benefits && (
                  <section>
                    <h2 className="font-heading text-xl font-bold text-on-surface mb-4">Korzyści</h2>
                    <ul className="space-y-3">
                      {service.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-sm text-text-dim">
                          <span className="text-amber mt-0.5 shrink-0">✓</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {service.useCases && (
                  <section>
                    <h2 className="font-heading text-xl font-bold text-on-surface mb-4">
                      Przykłady zastosowań
                    </h2>
                    <ul className="space-y-3">
                      {service.useCases.map((u) => (
                        <li key={u} className="flex items-start gap-3 text-sm text-text-dim">
                          <span className="text-amber mt-0.5 shrink-0">→</span>
                          {u}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-border bg-surface p-8 lg:p-10">
                <p className="text-text-dim leading-relaxed">
                  Szczegółowy opis tego wdrożenia w przygotowaniu. Napisz do nas — opowiemy, jak
                  wygląda wdrożenie <em>{service.title.toLowerCase()}</em> w praktyce.
                </p>
              </div>
            )}

            {/* Jak wdrażamy */}
            <section>
              <h2 className="font-heading text-xl font-bold text-on-surface mb-4">
                Jak wdrażamy
              </h2>
              <ol className="space-y-3">
                {[
                  "Analiza procesów",
                  "Konfiguracja",
                  "Testy",
                  "Wdrożenie i wsparcie",
                ].map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-text-dim">
                    <span className="font-mono text-amber shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-on-surface">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Link kontekstowy do procesów */}
            <div className="rounded-2xl border border-border bg-bg-soft px-6 py-6 sm:px-8 sm:py-7">
              <p className="text-text-dim text-[15px] leading-relaxed">
                To wdrożenie wpina się w Twoje procesy biznesowe.{" "}
                <Link href="/procesy" className="text-amber hover:underline">
                  Zobacz, które procesy automatyzujemy
                </Link>{" "}
                według klasyfikacji APQC PCF.
              </p>
            </div>
          </div>
        </div>

        <SectionDivider label="Zacznijmy wdrożenie" />
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12">
          <div className="rounded-2xl border border-border bg-bg-soft px-6 py-8 sm:px-10 sm:py-10 text-center">
            <h2 className="font-heading text-[clamp(20px,2.5vw,28px)] font-bold text-on-surface mb-3">
              {service.title} w Twojej firmie
            </h2>
            <p className="text-text-dim text-[15px] max-w-xl mx-auto mb-6">
              Umów bezpłatną konsultację — pokażemy zakres, koszt i spodziewany zwrot z tego wdrożenia.
            </p>
            <Link
              href="/kontakt"
              className="btn-primary inline-flex items-center rounded-[10px] px-6 py-3 text-[15px]"
            >
              {service.ctaText ?? "Porozmawiaj o wdrożeniu"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
