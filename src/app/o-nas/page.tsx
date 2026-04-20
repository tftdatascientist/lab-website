import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "O nas — lok-ai | Automatyzacja i AI dla firm",
  description:
    "lok-ai — Lokalna Automatyzacja Biznesu. Wdrażamy automatyzacje procesów i AI dla MŚP z regionu kujawsko-pomorskiego.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lok-ai.pl"}/o-nas`,
  },
};

export default function ONasPage() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary block mb-4">
          O nas
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tighter text-on-surface mb-8">
          Lokalna Automatyzacja Biznesu
        </h1>

        <div className="space-y-6 text-on-surface-variant leading-relaxed">
          <p>
            lok-ai to firma technologiczna z&nbsp;Grudziądza, specjalizująca się
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
              className="rounded-2xl bg-surface-container ghost-border p-6"
            >
              <h3 className="font-heading text-sm font-semibold text-on-surface mb-2">
                {v.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12">
          <Link
            href="/kontakt"
            className="inline-flex items-center px-8 py-3 text-sm font-bold text-on-primary obsidian-gradient rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all"
          >
            Porozmawiajmy →
          </Link>
        </div>
      </div>
    </section>
  );
}
