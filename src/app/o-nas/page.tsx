import type { Metadata } from "next";
import SchemaOrg from "@/components/SchemaOrg";
import Tabliczka from "@/components/sciana/Tabliczka";
import KolumnaBoczna from "@/components/sciana/KolumnaBoczna";
import KomputerLokalny from "@/components/sciana/KomputerLokalny";
import { getAllPosts } from "@/lib/mdx";
import { getAllTerms } from "@/lib/slownik";
import { totalNodeCount } from "@/lib/procesy";
import { generateWebPageSchema, generateBreadcrumbSchema, graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "O nas — lok-ai | Automatyzacja i AI dla firm",
  description:
    "lok-ai — Lokalna Automatyzacja Biznesu. Wdrażamy automatyzacje procesów i AI dla MŚP z regionu kujawsko-pomorskiego.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl"}/o-nas`,
  },
};

const VALUES = [
  { title: "Lokalność", desc: "Znamy rynek i specyfikę firm z Pomorza i Kujaw. Spotykamy się na żywo." },
  { title: "Prostota", desc: "Low-code / no-code — bez zbędnej złożoności. Konfigurujemy wszystko za Ciebie." },
  { title: "Wsparcie", desc: "Pełne wsparcie po wdrożeniu. Nie zostawiamy klienta z pytaniami bez odpowiedzi." },
];

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

/** O nas: proza + trzy zasady jako wiersze. Pasek „Nasz stack" (nazwy narzędzi) NIE wraca (NIE CHCĘ, warstwa 1). */
export default function ONasPage() {
  const posts = getAllPosts().length;
  return (
    <>
      <SchemaOrg schema={schema} />
      <Tabliczka nr="01" title="O nas · lok-ai" right="Grudziądz" footer="Lokalna Automatyzacja Biznesu" className="s-read">
        <h1 className="display" style={{ fontSize: "var(--step-3)", maxWidth: "18ch", marginBottom: "var(--space-2)" }}>
          Lokalna firma. Realne wdrożenia.
        </h1>
        <div style={{ maxWidth: "var(--measure)", color: "var(--ink-2)", display: "grid", gap: "var(--space-2)" }}>
          <p>
            lok-ai to firma technologiczna z Grudziądza, specjalizująca się we wdrażaniu automatyzacji procesów
            biznesowych i rozwiązań opartych na sztucznej inteligencji dla małych i średnich przedsiębiorstw z regionu
            kujawsko-pomorskiego.
          </p>
          <p>
            Wierzymy, że nowoczesne technologie — chatboty AI, automatyzacje workflow, integracje systemów — nie
            powinny być zarezerwowane dla korporacji. Dlatego oferujemy rozwiązania dopasowane do skali i budżetu
            lokalnych firm.
          </p>
          <p>
            Pracujemy z narzędziami open-source i najlepszymi API, co pozwala nam budować zaawansowane rozwiązania bez
            nadmiernych kosztów licencji.
          </p>
        </div>

        <section className="ruled">
          <h2 className="label">Trzy zasady</h2>
          <ul className="rows">
            {VALUES.map((v, i) => (
              <li key={v.title}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span className="t">
                  {v.title}
                  <span className="d">{v.desc}</span>
                </span>
                <span className="v" />
              </li>
            ))}
          </ul>
        </section>

        <section className="ruled">
          <h2 className="label">Co mamy na stronie</h2>
          <ul className="rows">
            <li>
              <span className="n">{totalNodeCount()}</span>
              <span className="t" style={{ fontWeight: 400 }}>
                węzłów procesów biznesowych (APQC PCF 7.4, tłum. własne)
              </span>
              <span className="v" />
            </li>
            <li>
              <span className="n">{getAllTerms().length}</span>
              <span className="t" style={{ fontWeight: 400 }}>
                haseł słownika IT z definicjami i źródłami
              </span>
              <span className="v" />
            </li>
            <li>
              <span className="n">{posts}</span>
              <span className="t" style={{ fontWeight: 400 }}>
                wpisów bloga, codziennie, ze źródłami
              </span>
              <span className="v" />
            </li>
          </ul>
        </section>
      </Tabliczka>

      <KolumnaBoczna
        routes={[
          { from: "Grudziądz", to: "Region", href: "/o-nas" },
          { from: "Sprawdzona technologia", to: "Prosta rzecz", href: "/wdrozenia" },
          { from: "Porozmawiajmy", to: "Kontakt", href: "/kontakt" },
        ]}
        routesFooter="/wdrozenia · /kontakt"
      >
        <Tabliczka nr="04" title="Komputer lokalny" right="u klienta" footer="Rys. 1">
          <KomputerLokalny />
        </Tabliczka>
      </KolumnaBoczna>
    </>
  );
}
