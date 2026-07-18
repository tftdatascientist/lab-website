import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/SchemaOrg";
import { generateDefinedTermSchema, generateBreadcrumbSchema, graph } from "@/lib/schema";
import {
  getTerm,
  getAllSlugs,
  getRelated,
  resolveTermByName,
  buildSlownikTrail,
  labelL3,
  L1_LABELS,
  L2_LABELS,
} from "@/lib/slownik";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const t = getTerm(params.slug);
  if (!t) return {};
  const desc = t.definicja.length > 155 ? t.definicja.slice(0, 152) + "…" : t.definicja;
  const title = t.skrot ? `${t.haslo} (${t.skrot})` : t.haslo;
  return {
    title: `${title} — co to jest? | Słownik IT`,
    description: desc,
    alternates: { canonical: `${SITE_URL}/slownik/${t.slug}` },
    openGraph: {
      title: `${t.haslo} — definicja`,
      description: desc,
      url: `${SITE_URL}/slownik/${t.slug}`,
      type: "article",
      locale: "pl_PL",
    },
  };
}

export default function TermPage({ params }: Props) {
  const t = getTerm(params.slug);
  if (!t) notFound();

  const related = getRelated(t);
  const trail = buildSlownikTrail({ l3: t.L3 });
  const schema = graph(
    generateDefinedTermSchema({
      name: t.haslo,
      description: t.definicja,
      url: `/slownik/${t.slug}`,
      inSetUrl: "/slownik",
      alternateName: t.skrot || undefined,
    }),
    generateBreadcrumbSchema([
      { name: "Strona główna", url: "/" },
      { name: "Słownik", url: "/slownik" },
      ...trail.map((tr) => ({ name: tr.label, url: tr.href })),
      { name: t.haslo, url: `/slownik/${t.slug}` },
    ]),
  );

  const meta: { label: string; value: React.ReactNode }[] = [
    { label: "Typ", value: t.typ },
    { label: "Pojęcie nadrzędne", value: t.hiperonim || "—" },
    {
      label: "Kategoria",
      value: (
        <>
          <Link
            href={`/slownik/kategoria/${t.L1}`}
            className="text-on-surface hover:text-amber transition-colors"
          >
            {L1_LABELS[t.L1] || t.L1}
          </Link>
          <span className="text-text-mute"> · </span>
          <Link href={`/slownik/grupa/${t.L3}`} className="text-on-surface hover:text-amber transition-colors">
            {labelL3(t.L3)}
          </Link>
        </>
      ),
    },
    { label: "Źródło", value: t.zrodlo || "—" },
  ];

  return (
    <>
      <SchemaOrg schema={schema} />
      <article className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-outline mb-10 flex-wrap">
            <Link href="/" className="hover:text-on-surface-variant transition-colors">
              Strona główna
            </Link>
            <span>/</span>
            <Link href="/slownik" className="hover:text-on-surface-variant transition-colors">
              Słownik
            </Link>
            {trail.map((tr) => (
              <span key={tr.href} className="flex items-center gap-2">
                <span>/</span>
                <Link href={tr.href} className="hover:text-on-surface-variant transition-colors">
                  {tr.label}
                </Link>
              </span>
            ))}
            <span>/</span>
            <span className="text-on-surface-variant truncate">{t.haslo}</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-amber border border-amber/25 rounded-full px-2.5 py-0.5">
                {L1_LABELS[t.L1] || t.L1}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-mute">
                {t.typ}
              </span>
            </div>
            <h1 className="font-heading text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em] text-on-surface">
              {t.haslo}
            </h1>
            {t.skrot && (
              <p className="mt-2 font-mono text-sm text-text-dim">{t.skrot}</p>
            )}
          </header>

          {/* Definicja */}
          <p className="text-on-surface text-[19px] leading-relaxed border-l-2 border-amber pl-5 mb-10">
            {t.definicja}
          </p>

          {/* Meta */}
          <dl className="grid sm:grid-cols-2 gap-px bg-border rounded-xl overflow-hidden border border-border mb-10">
            {meta.map((m) => (
              <div key={m.label} className="bg-surface px-5 py-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-mute mb-1">
                  {m.label}
                </dt>
                <dd className="text-on-surface text-[14px] leading-snug">{m.value}</dd>
              </div>
            ))}
          </dl>

          {/* Zobacz też */}
          {t.zobaczTez.length > 0 && (
            <div className="mb-10">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-mute mb-3">
                Zobacz też
              </h2>
              <div className="flex flex-wrap gap-2">
                {t.zobaczTez.map((name) => {
                  const ref = resolveTermByName(name);
                  return ref ? (
                    <Link
                      key={name}
                      href={`/slownik/${ref.slug}`}
                      className="text-sm rounded-lg border border-border bg-surface px-3 py-1.5 text-on-surface-variant hover:border-amber/40 hover:text-amber transition-colors"
                    >
                      {name}
                    </Link>
                  ) : (
                    <span
                      key={name}
                      className="text-sm rounded-lg border border-border/60 bg-surface/50 px-3 py-1.5 text-text-mute"
                    >
                      {name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Powiązane */}
          {related.length > 0 && (
            <div className="mb-14">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-mute mb-3">
                Powiązane pojęcia · {L2_LABELS[t.L2] || t.L2}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/slownik/${r.slug}`}
                    className="group block rounded-xl border border-border bg-surface hover:border-amber/40 transition-all p-4"
                  >
                    <span className="font-heading font-semibold text-on-surface group-hover:text-amber transition-colors">
                      {r.haslo}
                    </span>
                    <p className="text-text-dim text-[13px] leading-snug line-clamp-2 mt-1">
                      {r.definicja}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="rounded-2xl border border-border bg-bg-soft px-6 py-8 sm:px-10 sm:py-10 text-center">
            <h2 className="font-heading text-[clamp(20px,2.5vw,28px)] font-bold text-on-surface mb-3">
              Chcesz wykorzystać AI w&nbsp;swojej firmie?
            </h2>
            <p className="text-text-dim text-[15px] max-w-md mx-auto mb-6">
              Wdrażamy chatboty, agentów głosowych i&nbsp;automatyzacje dla MŚP. Pierwsza konsultacja jest bezpłatna.
            </p>
            <Link href="/kontakt" className="btn-primary inline-flex items-center rounded-[10px] px-6 py-3 text-[15px]">
              Bezpłatna konsultacja
            </Link>
          </div>

          {/* Back */}
          <div className="mt-12 pt-8 border-t border-outline-variant/15">
            <Link
              href="/slownik"
              className="text-sm text-on-surface-variant hover:text-amber transition-colors"
            >
              ← Wróć do słownika
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
