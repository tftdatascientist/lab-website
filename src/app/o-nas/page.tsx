import type { Metadata } from "next";
import Link from "next/link";
import SchemaOrg from "@/components/SchemaOrg";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
  graph,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "O nas — lok-ai | Automatyzacja i AI dla firm",
  description:
    "lok-ai — Lokalna Automatyzacja Biznesu. Wdrażamy automatyzacje procesów i AI dla MŚP z regionu kujawsko-pomorskiego.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl"}/o-nas`,
  },
};

const VALUES = [
  {
    title: "Lokalność",
    desc: "Znamy rynek i specyfikę firm z Pomorza i Kujaw. Spotykamy się na żywo.",
    color: "#f5b845",
  },
  {
    title: "Prostota",
    desc: "Low-code / no-code — bez zbędnej złożoności. Konfigurujemy wszystko za Ciebie.",
    color: "#ef7955",
  },
  {
    title: "Wsparcie",
    desc: "Pełne wsparcie po wdrożeniu. Nie zostawiamy klienta z pytaniami bez odpowiedzi.",
    color: "#d9b88a",
  },
];

const STACK = ["n8n", "Flowise", "Typebot", "OpenAI", "ElevenLabs", "Claude"];

const schema = graph(
  generateWebPageSchema({
    type: "AboutPage",
    name: "O nas",
    path: "/o-nas",
    description:
      "lok-ai — Lokalna Automatyzacja Biznesu. Wdrażamy automatyzacje procesów i AI dla MŚP z regionu kujawsko-pomorskiego.",
  }),
  generateBreadcrumbSchema([
    { name: "Strona główna", url: "/" },
    { name: "O nas", url: "/o-nas" },
  ]),
);

export default function ONasPage() {
  return (
    <section className="py-[100px] px-8 max-w-[1280px] mx-auto">
      <SchemaOrg schema={schema} />
      {/* Header */}
      <div className="max-w-[720px] mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-px" style={{ background: "#d9b88a" }} />
          <span
            className="font-mono text-[11px] uppercase"
            style={{ color: "#d9b88a", letterSpacing: "0.15em" }}
          >
            O nas
          </span>
        </div>
        <h1
          className="font-heading font-bold text-text mb-6"
          style={{
            fontSize: "clamp(32px,4.5vw,56px)",
            letterSpacing: "-0.035em",
            lineHeight: 1,
          }}
        >
          Lokalna firma.{" "}
          <span
            className="font-display font-medium italic"
            style={{ color: "#d9b88a" }}
          >
            Realne
          </span>{" "}
          wdrożenia.
        </h1>

        <div className="space-y-5 text-[16px] text-text-dim leading-relaxed">
          <p>
            lok-ai to firma technologiczna z&nbsp;Grudziądza, specjalizująca
            się we&nbsp;wdrażaniu automatyzacji procesów biznesowych
            i&nbsp;rozwiązań opartych na sztucznej inteligencji dla małych
            i&nbsp;średnich przedsiębiorstw z&nbsp;regionu
            kujawsko-pomorskiego.
          </p>
          <p>
            Wierzymy, że nowoczesne technologie — chatboty AI, automatyzacje
            workflow, integracje systemów — nie powinny być zarezerwowane dla
            korporacji. Dlatego oferujemy rozwiązania dopasowane do skali
            i&nbsp;budżetu lokalnych firm.
          </p>
          <p>
            Pracujemy z&nbsp;narzędziami open-source i&nbsp;najlepszymi API, co
            pozwala nam budować zaawansowane rozwiązania bez nadmiernych kosztów
            licencji.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="grid sm:grid-cols-3 gap-[18px] mb-16">
        {VALUES.map((v) => (
          <div
            key={v.title}
            className="relative rounded-[16px] overflow-hidden p-7"
            style={{
              background: "#17181b",
              outline: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${v.color}, transparent)`,
                opacity: 0.6,
              }}
            />
            <h3
              className="font-heading font-bold text-text mb-2"
              style={{ fontSize: 18, letterSpacing: "-0.02em", color: v.color }}
            >
              {v.title}
            </h3>
            <p className="text-[14px] text-text-dim leading-relaxed">
              {v.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <div
        className="rounded-[16px] p-7 mb-12"
        style={{
          background: "#17181b",
          outline: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <p
          className="font-mono text-[11px] uppercase text-text-mute mb-4"
          style={{ letterSpacing: "0.15em" }}
        >
          Nasz stack
        </p>
        <div className="flex flex-wrap gap-3">
          {STACK.map((tool) => (
            <span
              key={tool}
              className="font-mono text-[12px] rounded-full px-3 py-1"
              style={{
                color: "#f5b845",
                background: "rgba(245,184,69,0.08)",
                outline: "1px solid rgba(245,184,69,0.2)",
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/kontakt"
        className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl text-[15px]"
        style={{ padding: "14px 22px" }}
      >
        Porozmawiajmy →
      </Link>
    </section>
  );
}
