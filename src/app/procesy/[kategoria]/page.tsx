import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SchemaOrg from "@/components/SchemaOrg";
import { SubpageHeader } from "@/components/mechanism";
import {
  getCategory,
  getCategorySlugs,
  getNodesByCategory,
  getChildren,
  type ProcessNode,
} from "@/lib/procesy";
import {
  generateDefinedTermSchema,
  generateItemListSchema,
  generateBreadcrumbSchema,
  graph,
} from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lok-ai.pl";

interface Props {
  params: { kategoria: string };
}

export function generateStaticParams() {
  return getCategorySlugs().map((kategoria) => ({ kategoria }));
}

export function generateMetadata({ params }: Props): Metadata {
  const c = getCategory(params.kategoria);
  if (!c) return {};
  return {
    title: `${c.namePl} — procesy biznesowe (APQC PCF ${c.code})`,
    description: c.descPl,
    alternates: { canonical: `${SITE_URL}/procesy/${c.slug}` },
    openGraph: {
      title: `${c.namePl} — APQC PCF ${c.code}`,
      description: c.descPl,
      url: `${SITE_URL}/procesy/${c.slug}`,
      type: "article",
      locale: "pl_PL",
    },
  };
}

export default function ProcesKategoriaPage({ params }: Props) {
  const c = getCategory(params.kategoria);
  if (!c) notFound();

  const nodes = getNodesByCategory(c.slug);
  const groups = nodes.filter((n) => n.level === "Grupa procesów");

  const schema = graph(
    generateDefinedTermSchema({
      name: c.namePl,
      description: c.descPl,
      url: `/procesy/${c.slug}`,
      inSetUrl: "/procesy",
      termCode: c.code,
      alternateName: c.nameEng,
    }),
    ...(groups.length
      ? [
          generateItemListSchema(
            `Grupy procesów — ${c.namePl}`,
            groups.map((g) => ({ name: `${g.code} ${g.namePl}`, url: `/procesy/${c.slug}#${g.code}` })),
          ),
        ]
      : []),
    generateBreadcrumbSchema([
      { name: "Strona główna", url: "/" },
      { name: "Procesy", url: "/procesy" },
      { name: c.namePl, url: `/procesy/${c.slug}` },
    ]),
  );

  return (
    <>
      <SchemaOrg schema={schema} />
      <div className="pt-13" style={{ paddingTop: 52 }}>
        <SubpageHeader
          eyebrow={`PCF ${c.code} · ${c.nameEng}`}
          title={c.namePl}
          cluster="procesy"
          description={c.descPl}
        >
          <nav className="mt-5 flex items-center gap-2 text-sm text-text-mute flex-wrap font-mono text-[12px]">
            <Link href="/procesy" className="hover:text-amber transition-colors">
              ← Wszystkie kategorie
            </Link>
          </nav>
        </SubpageHeader>

        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12">
          {groups.length > 0 ? (
            <div className="space-y-10">
              {groups.map((g) => (
                <ProcessGroup key={g.code} group={g} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-surface px-6 py-8 sm:px-10 sm:py-10">
              <p className="text-text-dim leading-relaxed max-w-2xl">
                Szczegółowa taksonomia tej kategorii (grupy procesów, procesy, działania i zadania według{" "}
                <strong className="text-on-surface">APQC PCF {c.code}</strong>) jest synchronizowana z bazą
                źródłową. Jeśli automatyzujesz procesy z obszaru <em>{c.namePl.toLowerCase()}</em> —
                pokażemy, które z nich dają najszybszy zwrot.
              </p>
              <Link
                href="/kontakt"
                className="btn-primary inline-flex items-center rounded-[10px] px-6 py-3 text-[15px] mt-6"
              >
                Porozmawiajmy o automatyzacji
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ProcessGroup({ group }: { group: ProcessNode }) {
  const processes = getChildren(group.code);
  return (
    <section id={group.code} className="scroll-mt-24">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-[12px] text-amber">{group.code}</span>
        <h2 className="font-heading font-bold text-on-surface text-[20px]">{group.namePl}</h2>
      </div>
      {group.descPl && <p className="text-text-dim text-[14px] leading-relaxed mb-4 max-w-2xl">{group.descPl}</p>}
      {processes.length > 0 && (
        <ul className="grid sm:grid-cols-2 gap-2">
          {processes.map((p) => (
            <li key={p.code} className="rounded-lg border border-border bg-surface px-4 py-3">
              <span className="font-mono text-[11px] text-text-mute">{p.code}</span>{" "}
              <span className="text-on-surface text-[14px]">{p.namePl}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
