import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";
import SchemaOrg from "@/components/SchemaOrg";
import { SubpageHeader, SectionDivider, ServiceIconBySlug } from "@/components/mechanism";
import {
  generateItemListSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  graph,
} from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

const TECH_PILLS = [
  "n8n",
  "Typebot",
  "OpenAI / Claude",
  "Pinecone",
  "ElevenLabs",
  "REST / OAuth",
];

export const metadata: Metadata = {
  title: "Wdrożenia AI i automatyzacji — chatboty, agenci głosowi, RAG | lok-ai",
  description:
    "Wdrażamy technologie AI w lokalnych firmach: chatboty, agentów głosowych, automatyzację procesów (n8n), bazy wiedzy RAG, dashboardy i integracje systemów. Sześć obszarów wdrożeń w jednym dziale.",
  alternates: { canonical: `${SITE_URL}/wdrozenia` },
  openGraph: {
    title: "Wdrożenia AI i automatyzacji — lok-ai",
    description:
      "Chatboty, agenci głosowi, automatyzacja procesów, RAG, dashboardy i integracje — technologia jutra, dostępna dziś dla lokalnych firm.",
    url: `${SITE_URL}/wdrozenia`,
    type: "website",
    locale: "pl_PL",
  },
};

export default function WdrozeniaPage() {
  const schema = graph(
    generateItemListSchema(
      "Wdrożenia AI i automatyzacji",
      services.map((s) => ({ name: s.title, url: `/wdrozenia/${s.slug}` })),
      "Sześć obszarów wdrożeń AI i automatyzacji dla lokalnych firm: chatboty, agenci głosowi, automatyzacja procesów, RAG, dashboardy i integracje.",
    ),
    ...services.map((s) => generateServiceSchema(s)),
    generateBreadcrumbSchema([
      { name: "Strona główna", url: "/" },
      { name: "Wdrożenia", url: "/wdrozenia" },
    ]),
  );

  return (
    <>
      <SchemaOrg schema={schema} />
      <div className="pt-13" style={{ paddingTop: 52 }}>
        <SubpageHeader
          eyebrow="Wdrożenia · AI i automatyzacja"
          title="Technologia jutra, dostępna"
          accent="dziś"
          cluster="tech"
          description={
            <>
              Łączymy <strong className="text-on-surface">chatboty</strong>, agentów głosowych,
              automatyzację procesów (n8n), bazy wiedzy <strong className="text-on-surface">RAG</strong>,
              dashboardy i integracje API w jeden, spójny ekosystem. Wdrażamy sprawdzone narzędzia AI
              w lokalnych firmach — od analizy procesu po wsparcie po wdrożeniu.
            </>
          }
        >
          <div className="mt-6 flex flex-wrap gap-2">
            {TECH_PILLS.map((p) => (
              <span
                key={p}
                className="font-mono text-[11px] uppercase tracking-[0.12em] text-amber border border-border rounded-full px-3 py-1.5"
              >
                {p}
              </span>
            ))}
          </div>
        </SubpageHeader>

        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/wdrozenia/${s.slug}`}
                className="group relative block rounded-2xl border border-border bg-surface hover:border-amber/40 transition-all p-6 overflow-hidden"
              >
                <div className="text-amber mb-5">
                  <ServiceIconBySlug slug={s.slug} size={48} />
                </div>
                <h2 className="font-heading font-bold text-on-surface text-[18px] leading-snug mb-2 group-hover:text-amber transition-colors">
                  {s.title}
                </h2>
                <p className="text-text-dim text-[13px] leading-relaxed line-clamp-3">{s.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-mute"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <SectionDivider label="Porozmawiajmy o wdrożeniu" />
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12">
          <div className="rounded-2xl border border-border bg-bg-soft px-6 py-8 sm:px-10 sm:py-10 text-center">
            <h2 className="font-heading text-[clamp(20px,2.5vw,28px)] font-bold text-on-surface mb-3">
              Które zadanie chcesz oddać technologii?
            </h2>
            <p className="text-text-dim text-[15px] max-w-xl mx-auto mb-6">
              Pokażemy, gdzie AI i automatyzacja dają najszybszy zwrot w Twojej firmie — od chatbota
              na stronie po pełną integrację systemów. Bezpłatna, konkretna konsultacja.
            </p>
            <Link
              href="/kontakt"
              className="btn-primary inline-flex items-center rounded-[10px] px-6 py-3 text-[15px]"
            >
              Bezpłatna konsultacja
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
