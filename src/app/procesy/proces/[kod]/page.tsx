import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/SchemaOrg";
import TldrBox from "@/components/TldrBox";
import RelatedLinks from "@/components/RelatedLinks";
import CategoryTree from "@/components/CategoryTree";
import Tabliczka from "@/components/sciana/Tabliczka";
import KolumnaBoczna from "@/components/sciana/KolumnaBoczna";
import SzukajPrzycisk from "@/components/sciana/SzukajPrzycisk";
import {
  getNode,
  getCategory,
  getChildren,
  getAllProcesses,
  buildTrail,
  isThinProcess,
  slugToCode,
  codeToSlug,
  type ProcessNode,
} from "@/lib/procesy";
import {
  generateDefinedTermSchema,
  generateItemListSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
  graph,
} from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

interface Props {
  params: { kod: string };
}

export function generateStaticParams() {
  return getAllProcesses().map((p) => ({ kod: codeToSlug(p.code) }));
}

export function generateMetadata({ params }: Props): Metadata {
  const p = getNode(slugToCode(params.kod));
  if (!p || p.level !== "Proces") return {};
  const url = `${SITE_URL}/procesy/proces/${params.kod}`;
  const desc =
    p.descPl || `Proces ${p.code} „${p.namePl}" według APQC PCF 7.4 — działania, zadania i opis po polsku oraz po angielsku.`;
  // Ochrona przed thin content: proces-liść (bez działań) z krótkim opisem → noindex,follow.
  const isThin = isThinProcess(p);
  return {
    title: `${p.namePl} — proces biznesowy (APQC PCF ${p.code})`,
    description: desc.length > 155 ? desc.slice(0, 152) + "…" : desc,
    alternates: { canonical: url },
    robots: isThin ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${p.namePl} — APQC PCF ${p.code}`,
      description: desc.length > 155 ? desc.slice(0, 152) + "…" : desc,
      url,
      type: "article",
      locale: "pl_PL",
    },
  };
}

export default function ProcesPage({ params }: Props) {
  const p = getNode(slugToCode(params.kod));
  if (!p || p.level !== "Proces") notFound();

  const cat = getCategory(p.categorySlug);
  const trail = buildTrail(p.code);
  const group = trail.find((t) => t.level === "Grupa procesów");
  const activities = getChildren(p.code); // poziom 4 — Działanie
  const siblings = group ? getChildren(group.code).filter((s) => s.code !== p.code) : [];

  const schema = graph(
    generateDefinedTermSchema({
      name: p.namePl,
      description: p.descPl || `Proces ${p.code} według APQC PCF 7.4.`,
      url: `/procesy/proces/${params.kod}`,
      inSetUrl: "/procesy",
      termCode: p.code,
      alternateName: p.nameEng,
    }),
    ...(activities.length
      ? [
          generateItemListSchema(
            `Działania w procesie ${p.namePl}`,
            activities.map((a) => ({ name: `${a.code} ${a.namePl}`, url: `/procesy/proces/${params.kod}#a-${codeToSlug(a.code)}` })),
          ),
          generateHowToSchema({
            name: p.namePl,
            description: p.descPl || `Działania składające się na proces ${p.namePl} (APQC PCF ${p.code}).`,
            steps: activities.map((a) => ({ name: a.namePl, text: a.descPl || a.namePl })),
          }),
        ]
      : []),
    generateBreadcrumbSchema([
      { name: "Strona główna", url: "/" },
      { name: "Procesy", url: "/procesy" },
      ...trail.map((t) => ({ name: t.name, url: t.href })),
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
            <Link href="/procesy">Procesy</Link>
            {trail.slice(0, -1).map((t) => (
              <span key={t.code}>
                {" "}
                · <Link href={t.href}>{t.code}</Link>
              </span>
            ))}{" "}
            · PCF {p.code}
          </>
        }
        right={<SzukajPrzycisk />}
        footer={`${p.nameEng ?? "Process"} · APQC PCF 7.4, tłum. własne`}
        footerRight={`${activities.length} działań`}
        className="s-read"
      >
        <h1 className="display" style={{ fontSize: "var(--step-3)", maxWidth: "18ch", marginBottom: "var(--space-2)" }}>
          {p.namePl}
        </h1>
        {p.nameEng && (
          <p className="mono" style={{ color: "var(--ink-3)" }} lang="en">
            {p.nameEng}
          </p>
        )}

        <TldrBox>{p.descPl}</TldrBox>
        {p.descEng && (
          <p style={{ color: "var(--ink-3)", fontSize: 14, maxWidth: "var(--measure)", marginTop: "calc(-1 * var(--space-2))" }} lang="en">
            <span className="mono">EN</span> {p.descEng}
          </p>
        )}

        {activities.length > 0 ? (
          <>
            <h2 className="label mono" style={{ color: "var(--ink-3)", margin: "var(--space-3) 0 var(--space-1)" }}>
              Działania w tym procesie · {activities.length}
            </h2>
            {activities.map((a) => (
              <ActivitySection key={a.code} activity={a} />
            ))}
          </>
        ) : (
          <p style={{ color: "var(--ink-2)", maxWidth: "var(--measure)" }}>
            Ten proces (APQC PCF {p.code}) jest elementem liściowym taksonomii — nie ma zdefiniowanych pod-działań. Jego
            opis znajduje się powyżej.
          </p>
        )}

        {siblings.length > 0 && (
          <RelatedLinks
            title={group ? `Pozostałe procesy — ${group.name}` : "Pozostałe procesy"}
            items={siblings.map((s) => ({ label: `${s.code} ${s.namePl}`, href: `/procesy/proces/${codeToSlug(s.code)}`, kind: "proces" }))}
          />
        )}
      </Tabliczka>

      <KolumnaBoczna
        routes={[
          { from: "Ten proces", to: `${activities.length} działań`, href: `/procesy/proces/${params.kod}` },
          ...(group ? [{ from: "Grupa", to: group.code, href: group.href }] : []),
          ...(cat ? [{ from: "Kategoria", to: cat.code, href: `/procesy/${cat.slug}` }] : []),
          { from: "Ten proces u Ciebie", to: "Rozmowa", href: "/kontakt" },
        ]}
        routesFooter="/procesy"
      >
        {activities.length > 1 && (
          <Tabliczka nr="04" title="Na tej stronie" right={activities.length} footer="Działania" >
            <ul className="rows">
              {activities.map((a) => (
                <li key={a.code}>
                  <span className="n">{a.code}</span>
                  <span className="t" style={{ fontWeight: 400, fontSize: 14 }}>
                    <a href={`#a-${codeToSlug(a.code)}`}>{a.namePl}</a>
                  </span>
                  <span className="v" />
                </li>
              ))}
            </ul>
          </Tabliczka>
        )}
        {cat && (
          <Tabliczka nr={activities.length > 1 ? "05" : "04"} title="Drzewo kategorii" right={cat.code} footer="Grupa > Proces > Działanie" plate>
            <CategoryTree categorySlug={p.categorySlug} activeCode={p.code} />
          </Tabliczka>
        )}
      </KolumnaBoczna>
    </>
  );
}

/** Sekcja Działania (L4) z opcjonalną tabelą Zadań (L5) — rdzeń GEO (tabele + nagłówki). */
function ActivitySection({ activity }: { activity: ProcessNode }) {
  const tasks = getChildren(activity.code); // poziom 5 — Zadanie
  return (
    <section id={`a-${codeToSlug(activity.code)}`} className="ruled" style={{ marginTop: 0, scrollMarginTop: 16 }}>
      <h3 style={{ fontWeight: 600, marginBottom: 2 }}>
        <span className="mono" style={{ color: "var(--ink-3)", marginRight: 8 }}>
          {activity.code}
        </span>
        {activity.namePl}
      </h3>
      {activity.nameEng && (
        <p className="mono" style={{ color: "var(--ink-3)", marginBottom: 6 }} lang="en">
          {activity.nameEng}
        </p>
      )}
      {activity.descPl && <p style={{ color: "var(--ink-2)", fontSize: 15, maxWidth: "var(--measure)" }}>{activity.descPl}</p>}
      {activity.descEng && (
        <p style={{ color: "var(--ink-3)", fontSize: 13, maxWidth: "var(--measure)", marginTop: 4 }} lang="en">
          {activity.descEng}
        </p>
      )}

      {tasks.length > 0 && (
        <table style={{ marginTop: "var(--space-1)" }}>
          <thead>
            <tr>
              <th scope="col">Kod</th>
              <th scope="col">Zadanie</th>
              <th scope="col" className="hide-m">
                EN
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.code} id={`a-${codeToSlug(t.code)}`} style={{ scrollMarginTop: 16 }}>
                <td className="c" style={{ width: 72, verticalAlign: "top" }}>
                  {t.code}
                </td>
                <td>
                  {t.namePl}
                  {t.descPl && <span style={{ display: "block", color: "var(--ink-2)", fontSize: 13 }}>{t.descPl}</span>}
                </td>
                <td className="hide-m" style={{ color: "var(--ink-3)", fontSize: 13 }} lang="en">
                  {t.nameEng}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
