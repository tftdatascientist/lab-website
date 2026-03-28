import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "O nas — LAB | Automatyzacja i AI dla firm",
  description:
    "LAB — Lokalna Automatyzacja Biznesu. Wdrażamy automatyzacje procesów i AI dla MŚP z regionu kujawsko-pomorskiego.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lab-ai.pl"}/o-nas`,
  },
};

export default function ONasPage() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-cyan" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
            O nas
          </span>
        </div>
        <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-bold tracking-[-1px] text-text-primary mb-8">
          Lokalna Automatyzacja Biznesu
        </h1>

        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            LAB to firma technologiczna z&nbsp;Grudziądza, specjalizująca się
            we&nbsp;wdrażaniu automatyzacji procesów biznesowych
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
            Pracujemy z&nbsp;narzędziami open-source (n8n, Flowise, Typebot)
            i&nbsp;najlepszymi API (OpenAI, ElevenLabs, Claude), co pozwala nam
            budować zaawansowane rozwiązania bez nadmiernych kosztów licencji.
          </p>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-3 gap-5 mt-12">
          {[
            {
              title: "Lokalność",
              desc: "Znamy rynek i specyfikę firm z Pomorza i Kujaw.",
            },
            {
              title: "Prostota",
              desc: "Low-code / no-code — bez zbędnej złożoności.",
            },
            {
              title: "Wsparcie",
              desc: "Pełne wsparcie po wdrożeniu, nie zostawiamy klienta.",
            },
          ].map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-white/[0.06] bg-bg-card p-6"
            >
              <h3 className="font-heading text-sm font-semibold text-text-primary mb-2">
                {v.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12">
          <Link
            href="/kontakt"
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan to-blue-500 rounded-full hover:shadow-[0_0_24px_rgba(0,212,255,0.35)] transition-shadow"
          >
            Porozmawiajmy →
          </Link>
        </div>
      </div>
    </section>
  );
}
