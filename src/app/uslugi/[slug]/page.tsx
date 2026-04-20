import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/content/services";
import SchemaOrg from "@/components/SchemaOrg";
import { generateServiceSchema } from "@/lib/schema";

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
    title: `${service.title} — lok-ai | Automatyzacja i AI`,
    description: service.desc,
    openGraph: {
      title: `${service.title} — lok-ai`,
      description: service.desc,
      type: "website",
      locale: "pl_PL",
      url: `${SITE_URL}/uslugi/${service.slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/uslugi/${service.slug}`,
    },
  };
}

export default function ServicePage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return (
    <>
      <SchemaOrg schema={generateServiceSchema(service)} />

      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-outline mb-10">
            <Link href="/" className="hover:text-on-surface-variant transition-colors">
              Strona główna
            </Link>
            <span>/</span>
            <Link
              href="/uslugi"
              className="hover:text-on-surface-variant transition-colors"
            >
              Usługi
            </Link>
            <span>/</span>
            <span className="text-on-surface-variant">{service.title}</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <span className="text-5xl block mb-5">{service.icon}</span>
            <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-bold tracking-[-1px] text-on-surface mb-4">
              {service.title}
            </h1>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              {service.desc}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] uppercase tracking-[0.1em] text-primary/80 border border-primary/20 rounded-full px-3 py-1.5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Rich content when available */}
          {service.longDesc ? (
            <div className="space-y-10">
              <div className="rounded-2xl border border-outline-variant/15 bg-surface-container p-8 lg:p-10">
                <p className="text-on-surface-variant leading-relaxed">
                  {service.longDesc}
                </p>
              </div>

              {service.benefits && (
                <section>
                  <h2 className="font-heading text-xl font-bold text-on-surface mb-4">
                    Korzyści
                  </h2>
                  <ul className="space-y-3">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-on-surface-variant">
                        <span className="text-secondary mt-0.5 shrink-0">✓</span>
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
                      <li key={u} className="flex items-start gap-3 text-sm text-on-surface-variant">
                        <span className="text-primary mt-0.5 shrink-0">→</span>
                        {u}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-outline-variant/15 bg-surface-container p-8 lg:p-10">
              <p className="text-on-surface-variant leading-relaxed">
                Szczegółowy opis usługi w przygotowaniu.
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 text-center">
            <a
              href="/kontakt"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-on-primary obsidian-gradient rounded-lg hover:shadow-[0_0_24px_rgba(0,212,255,0.35)] transition-shadow"
            >
              {service.ctaText ?? "Zapytaj o tę usługę"} →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
