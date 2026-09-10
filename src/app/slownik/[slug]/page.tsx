import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/SchemaOrg";
import Tabliczka from "@/components/sciana/Tabliczka";
import KolumnaBoczna from "@/components/sciana/KolumnaBoczna";
import SzukajPrzycisk from "@/components/sciana/SzukajPrzycisk";
import WierszeAB from "@/components/sciana/WierszeAB";
import { generateDefinedTermSchema, generateBreadcrumbSchema, graph } from "@/lib/schema";
import {
  getTerm,
  getAllSlugs,
  getAllTerms,
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

/** Hasło słownika = wzorzec podstrony treści: tabliczka czytania + Miejsce + Skąd > dokąd + CTA. */
export default function TermPage({ params }: Props) {
  const t = getTerm(params.slug);
  if (!t) notFound();

  const related = getRelated(t);
  const trail = buildSlownikTrail({ l3: t.L3 });
  const all = getAllTerms().length;
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

  const zobaczTez = t.zobaczTez.map((name) => {
    const ref = resolveTermByName(name);
    return { name, href: ref ? `/slownik/${ref.slug}` : undefined };
  });

  return (
    <>
      <SchemaOrg schema={schema} />
      <Tabliczka
        as="article"
        nr="01"
        title={
          <>
            <Link href="/slownik">Słownik</Link> · <Link href={`/slownik/kategoria/${t.L1}`}>{L1_LABELS[t.L1] || t.L1}</Link>
          </>
        }
        right={<SzukajPrzycisk />}
        footer={t.zrodlo ? `Źródło: ${t.zrodlo}` : "Definicja własna"}
        footerRight={t.typ}
        className="s-read"
      >
        <h1 className="display" style={{ fontSize: "var(--step-3)", maxWidth: "18ch", marginBottom: "var(--space-1)" }}>
          {t.haslo}
        </h1>
        {t.skrot && (
          <p className="mono" style={{ color: "var(--ink-3)", marginBottom: "var(--space-2)" }}>
            {t.skrot}
          </p>
        )}
        <p style={{ fontSize: "var(--step-1)", lineHeight: 1.35, maxWidth: "var(--measure)", margin: "var(--space-2) 0 var(--space-3)" }}>
          {t.definicja}
        </p>

        <section className="ruled" style={{ marginTop: 0 }}>
          <h2 className="label">Karta hasła</h2>
          <ul className="rows">
            <li>
              <span className="n">typ</span>
              <span className="t" style={{ fontWeight: 400 }}>
                {t.typ}
              </span>
              <span className="v" />
            </li>
            <li>
              <span className="n">nadrz</span>
              <span className="t" style={{ fontWeight: 400 }}>
                {t.hiperonim || "—"}
              </span>
              <span className="v" />
            </li>
            <li>
              <span className="n">kat.</span>
              <span className="t" style={{ fontWeight: 400 }}>
                {trail.map((tr, i) => (
                  <span key={tr.href}>
                    {i > 0 && " · "}
                    <Link href={tr.href}>{tr.label}</Link>
                  </span>
                ))}
              </span>
              <span className="v" />
            </li>
            <li>
              <span className="n">grupa</span>
              <span className="t" style={{ fontWeight: 400 }}>
                <Link href={`/slownik/grupa/${t.L3}`}>{labelL3(t.L3)}</Link>
              </span>
              <span className="v" />
            </li>
          </ul>
        </section>

        {zobaczTez.length > 0 && (
          <section className="ruled" aria-label="Zobacz też">
            <h2 className="label">Zobacz też</h2>
            <WierszeAB rows={zobaczTez.map((z) => ({ from: t.haslo, to: z.name, href: z.href }))} />
          </section>
        )}

        {related.length > 0 && (
          <section className="ruled" aria-label="Powiązane pojęcia">
            <h2 className="label">Powiązane pojęcia · {L2_LABELS[t.L2] || t.L2}</h2>
            <ul className="rows">
              {related.map((r, i) => (
                <li key={r.slug}>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="t">
                    <Link href={`/slownik/${r.slug}`}>{r.haslo}</Link>
                    {r.skrot && (
                      <span className="mono" style={{ color: "var(--ink-3)", marginLeft: 8, fontWeight: 400 }}>
                        {r.skrot}
                      </span>
                    )}
                    <span className="d">{r.definicja}</span>
                  </span>
                  <span className="v" />
                </li>
              ))}
            </ul>
          </section>
        )}
      </Tabliczka>

      <KolumnaBoczna
        routes={[
          { from: "To hasło", to: `Słownik · ${all}`, href: "/slownik" },
          { from: "Grupa", to: labelL3(t.L3), href: `/slownik/grupa/${t.L3}` },
          { from: "Dziedzina", to: L1_LABELS[t.L1] || t.L1, href: `/slownik/kategoria/${t.L1}` },
          { from: "AI w Twojej firmie", to: "Rozmowa", href: "/kontakt" },
        ]}
        routesFooter="/slownik"
      />
    </>
  );
}
