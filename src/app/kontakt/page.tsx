import type { Metadata } from "next";
import SchemaOrg from "@/components/SchemaOrg";
import ContactForm from "@/components/ContactForm";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
  graph,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Kontakt — lok-ai | Automatyzacja i AI dla firm",
  description:
    "Skontaktuj się z lok-ai — bezpłatna konsultacja automatyzacji procesów i AI dla Twojej firmy. Grudziądz, kujawsko-pomorskie.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl"}/kontakt`,
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

const schema = graph(
  contactSchema,
  generateWebPageSchema({
    type: "ContactPage",
    name: "Kontakt",
    path: "/kontakt",
    description:
      "Skontaktuj się z lok-ai — bezpłatna konsultacja automatyzacji procesów i AI dla Twojej firmy.",
  }),
  generateBreadcrumbSchema([
    { name: "Strona główna", url: "/" },
    { name: "Kontakt", url: "/kontakt" },
  ]),
);

const BENEFITS = [
  "Audyt procesów — pokazujemy co można zautomatyzować",
  "Szybkie wygrane — gdzie zysk jest natychmiastowy",
  "Szacunek kosztów i oszczędności",
  "Konkretny plan na kolejny krok",
];

export default function KontaktPage() {
  return (
    <>
      <SchemaOrg schema={schema} />

      <section className="py-[100px] px-8 max-w-[1280px] mx-auto">
        <div
          className="grid lg:grid-cols-2 rounded-[24px] overflow-hidden"
          style={{ outline: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Left — warm accent */}
          <div
            className="relative overflow-hidden p-14"
            style={{
              background:
                "radial-gradient(circle at 20% 0%, rgba(196,138,28,0.3), transparent 60%), #17181b",
            }}
          >
            {/* Floating orb */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: 20,
                right: 20,
                width: 240,
                height: 240,
                background:
                  "radial-gradient(circle, rgba(245,184,69,0.2), transparent 70%)",
                filter: "blur(40px)",
                animation: "lokai-orb-float 10s ease-in-out infinite",
              }}
            />

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(245,184,69,0.08)",
                outline: "1px solid rgba(245,184,69,0.2)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{
                  background: "#f5b845",
                  animation: "lokai-pulse 1.8s ease-in-out infinite",
                }}
              />
              <span
                className="font-mono text-[10px] uppercase"
                style={{ color: "#f5b845", letterSpacing: "0.12em" }}
              >
                Bezpłatna konsultacja
              </span>
            </div>

            <h1
              className="font-heading font-bold text-text mb-5"
              style={{
                fontSize: "clamp(28px,3.5vw,42px)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                maxWidth: 440,
              }}
            >
              30 minut, które mogą{" "}
              <span
                className="font-display font-medium italic"
                style={{ color: "#f5b845" }}
              >
                zmienić
              </span>{" "}
              sposób pracy Twojej firmy
            </h1>

            <ul className="space-y-3 mb-8">
              {BENEFITS.map((t) => (
                <li
                  key={t}
                  className="flex gap-3 text-[14px] text-text-dim leading-relaxed"
                >
                  <span
                    className="font-bold shrink-0"
                    style={{ color: "#f5b845" }}
                  >
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div
              className="flex items-center gap-3 font-mono text-[12px] text-text-mute"
            >
              <span>kontakt@lok-ai.pl</span>
              <span>·</span>
              <span>+48 534 541 454</span>
            </div>
          </div>

          {/* Right — form */}
          <div
            className="p-14 flex flex-col gap-4"
            style={{ background: "#121315" }}
          >
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
