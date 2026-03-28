import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/content/services";
import SchemaOrg from "@/components/SchemaOrg";
import { generateServiceSchema } from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lab-ai.pl";

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
    title: `${service.title} — LAB | Automatyzacja i AI`,
    description: service.desc,
    openGraph: {
      title: `${service.title} — LAB`,
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
          <nav className="flex items-center gap-2 text-sm text-text-muted mb-10">
            <Link href="/" className="hover:text-text-secondary transition-colors">
              Strona główna
            </Link>
            <span>/</span>
            <Link
              href="/uslugi"
              className="hover:text-text-secondary transition-colors"
            >
              Usługi
            </Link>
            <span>/</span>
            <span className="text-text-secondary">{service.title}</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <span className="text-5xl block mb-5">{service.icon}</span>
            <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-bold tracking-[-1px] text-text-primary mb-4">
              {service.title}
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              {service.desc}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] uppercase tracking-[0.1em] text-cyan/80 border border-cyan/20 rounded-full px-3 py-1.5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Placeholder content */}
          <div className="rounded-2xl border border-white/[0.06] bg-bg-card p-8 lg:p-10">
            <p className="text-text-secondary leading-relaxed">
              Szczegółowy opis usługi w przygotowaniu.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <a
              href="/#kontakt"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan to-blue-500 rounded-full hover:shadow-[0_0_24px_rgba(0,212,255,0.35)] transition-shadow"
            >
              Zapytaj o tę usługę →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
