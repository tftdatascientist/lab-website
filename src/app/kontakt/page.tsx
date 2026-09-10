import type { Metadata } from "next";
import SchemaOrg from "@/components/SchemaOrg";
import ContactForm from "@/components/ContactForm";
import Tabliczka from "@/components/sciana/Tabliczka";
import Miejsce from "@/components/sciana/Miejsce";
import WierszeAB from "@/components/sciana/WierszeAB";
import { getNode, nodeHref } from "@/lib/procesy";
import { PROCESY_KONTAKTU } from "@/lib/procesy-tresc";
import { generateWebPageSchema, generateBreadcrumbSchema, graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Kontakt — lok-ai | Automatyzacja i AI dla firm",
  description:
    "Skontaktuj się z lok-ai — bezpłatna konsultacja automatyzacji procesów i AI dla Twojej firmy. Grudziądz, kujawsko-pomorskie.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl"}/kontakt`,
  },
};

const PHONE = "+48 534 541 454";
const EMAIL = "kontakt@lok-ai.pl";

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "lok-ai — Lokalna Automatyzacja Biznesu",
  telephone: "+48-534-541-454",
  email: EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Grudziądz",
    addressRegion: "kujawsko-pomorskie",
    addressCountry: "PL",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+48-534-541-454",
    email: EMAIL,
    contactType: "customer service",
    availableLanguage: "Polish",
  },
};

const schema = graph(
  contactSchema,
  generateWebPageSchema({
    type: "ContactPage",
    name: "Kontakt",
    path: "/kontakt",
    description: "Skontaktuj się z lok-ai — bezpłatna konsultacja automatyzacji procesów i AI dla Twojej firmy.",
  }),
  generateBreadcrumbSchema([
    { name: "Strona główna", url: "/" },
    { name: "Kontakt", url: "/kontakt" },
  ]),
);

const BENEFITS = [
  ["Rozmowa", "Audyt procesów — co można zautomatyzować"],
  ["Audyt", "Szybkie wygrane — gdzie zysk jest natychmiastowy"],
  ["Wygrane", "Szacunek kosztów i oszczędności"],
  ["Szacunek", "Konkretny plan na kolejny krok"],
];

/** Kontakt: formularz na papierze (kol. 1–8), obok Miejsce w pełnej wersji, co dostajesz i dane kontaktowe. Bez CTA — formularz JEST celem strony. */
export default function KontaktPage() {
  return (
    <>
      <SchemaOrg schema={schema} />
      <Tabliczka nr="01" title="Kontakt · Bezpłatna rozmowa" right="30 min" footer="Odpowiadamy w ciągu 24 godzin" className="s-read">
        <h1 className="display" style={{ fontSize: "var(--step-3)", maxWidth: "18ch", marginBottom: "var(--space-2)" }}>
          30 minut, które mogą zmienić sposób pracy Twojej firmy.
        </h1>
        <p style={{ color: "var(--ink-2)", maxWidth: "var(--measure)", marginBottom: "var(--space-3)" }}>
          Napisz, co zjada czas w Twojej firmie. Wracamy z konkretem: co da się zautomatyzować, ile to kosztuje i co
          zrobić najpierw.
        </p>
        <ContactForm />
      </Tabliczka>

      <aside className="s-side" aria-label="metadane">
        <Miejsce nr="02" className="" />
        <Tabliczka nr="03" title="Co dostajesz" right={BENEFITS.length} footer="Każdy krok to proces z klasyfikacji APQC">
          <WierszeAB
            rows={BENEFITS.map(([from, to]) => {
              const node = getNode(PROCESY_KONTAKTU[from]);
              return { from, to, href: node ? nodeHref(node) : undefined };
            })}
          />
        </Tabliczka>
        <Tabliczka nr="04" title="Dane kontaktowe" right="PL" footer="Grudziądz · kujawsko-pomorskie" plate>
          <ul className="rows">
            <li>
              <span className="n">tel.</span>
              <span className="t">
                <a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a>
              </span>
              <span className="v" />
            </li>
            <li>
              <span className="n">mail</span>
              <span className="t">
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </span>
              <span className="v" />
            </li>
            <li>
              <span className="n">adres</span>
              <span className="t" style={{ fontWeight: 400 }}>
                Grudziądz, kujawsko-pomorskie
              </span>
              <span className="v" />
            </li>
          </ul>
        </Tabliczka>
      </aside>
    </>
  );
}
