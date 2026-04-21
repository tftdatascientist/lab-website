import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Kontakt — lok-ai | Automatyzacja i AI dla firm",
  description:
    "Skontaktuj się z lok-ai — bezpłatna konsultacja automatyzacji procesów i AI dla Twojej firmy. Grudziądz, kujawsko-pomorskie.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lok-ai.pl"}/kontakt`,
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "lok-ai — Lokalna Automatyzacja Biznesu",
  telephone: "+48-534-541-454",
  email: "kontakt@lok-ai.pl",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Grudziądz",
    addressRegion: "kujawsko-pomorskie",
    addressCountry: "PL",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+48-534-541-454",
    email: "kontakt@lok-ai.pl",
    contactType: "customer service",

    availableLanguage: "Polish",
  },
};

export default function KontaktPage() {
  return (
    <>
      <SchemaOrg schema={contactSchema} />

      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary block mb-4">
              Kontakt
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tighter text-on-surface mb-4">
              Porozmawiajmy o automatyzacji
            </h1>
            <p className="text-on-surface-variant leading-relaxed text-lg">
              Opisz swoją potrzebę — odezwiemy się w ciągu 24h z&nbsp;propozycją
              rozwiązania.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_340px] gap-12 lg:gap-16">
            <ContactForm />

            <div className="space-y-8">
              <div className="rounded-2xl bg-surface-container ghost-border p-6">
                <h2 className="font-heading text-sm font-semibold text-on-surface mb-4">
                  Dane kontaktowe
                </h2>
                <ul className="space-y-3 text-sm text-on-surface-variant">
                  <li>
                    <span className="block text-outline text-xs mb-0.5">Email</span>
                    <a
                      href="mailto:kontakt@lok-ai.pl"
                      className="hover:text-primary transition-colors"
                    >
                      kontakt@lok-ai.pl
                    </a>
                  </li>
                  <li>
                    <span className="block text-outline text-xs mb-0.5">Telefon</span>
                    <a
                      href="tel:+48534541454"
                      className="hover:text-primary transition-colors"
                    >
                      +48 534 541 454
                    </a>
                  </li>
                  <li>
                    <span className="block text-outline text-xs mb-0.5">Adres</span>
                    Grudziądz, kujawsko-pomorskie
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      LinkedIn →
                    </a>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-surface-container ghost-border overflow-hidden">
                <div className="aspect-[4/3] bg-surface-low flex items-center justify-center">
                  <p className="text-xs text-outline text-center px-4">
                    Google Maps embed
                    <br />
                    <span className="text-outline/60">(placeholder)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
