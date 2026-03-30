import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Cennik — LAB | Plany automatyzacji AI dla firm",
  description:
    "Elastyczne plany cenowe LAB — od darmowej konsultacji po dedykowane wdrożenia enterprise. Automatyzacja i AI dla MŚP.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lab-ai.pl"}/cennik`,
  },
};

interface PlanFeature {
  label: string;
}

interface PricingPlan {
  name: string;
  price: string;
  priceSuffix?: string;
  description: string;
  features: PlanFeature[];
  cta: string;
  ctaHref: string;
  highlighted?: boolean;
  badge?: string;
  featureIconClass: string;
  featureTextClass: string;
}

const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: "0 zł",
    priceSuffix: "/ mies.",
    description: "Idealny na start — sprawdź, jak AI może pomóc Twojej firmie.",
    features: [
      { label: "Konsultacja wstępna" },
      { label: "Analiza procesów" },
      { label: "Raport z rekomendacjami" },
      { label: "Dostęp do bazy wiedzy" },
    ],
    cta: "Zacznij za darmo",
    ctaHref: "/kontakt",
    featureIconClass: "text-secondary",
    featureTextClass: "text-on-surface-variant",
  },
  {
    name: "Professional",
    price: "199 zł",
    priceSuffix: "/ mies.",
    description: "Dla zespołów wymagających pełnej automatyzacji i wsparcia AI.",
    features: [
      { label: "Pełna automatyzacja n8n" },
      { label: "Chatbot AI 24/7" },
      { label: "Integracje API" },
      { label: "Wsparcie priorytetowe" },
      { label: "Analityka zaawansowana" },
    ],
    cta: "Wybierz plan",
    ctaHref: "/kontakt",
    highlighted: true,
    badge: "Najpopularniejszy",
    featureIconClass: "text-primary",
    featureTextClass: "text-on-surface",
  },
  {
    name: "Enterprise",
    price: "Indywidualnie",
    description: "Pełna kontrola, bezpieczeństwo i dedykowane zasoby.",
    features: [
      { label: "Wdrożenie on-premise" },
      { label: "Dedykowane szkolenia" },
      { label: "SLA 99.99%" },
      { label: "Dedykowany opiekun" },
    ],
    cta: "Skontaktuj się",
    ctaHref: "/kontakt",
    featureIconClass: "text-secondary",
    featureTextClass: "text-on-surface-variant",
  },
];

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "99.9%", label: "Uptime" },
  { value: "<20ms", label: "Latency" },
  { value: "24/7", label: "Monitoring" },
];

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "Czy mogę zmienić plan w dowolnym momencie?",
    answer:
      "Tak, możesz zwiększyć lub zmniejszyć swój plan w panelu sterowania. Zmiany zostaną naliczone proporcjonalnie do cyklu rozliczeniowego.",
  },
  {
    question: "Co się stanie po przekroczeniu limitu?",
    answer:
      "W planie Starter zapytania zostaną wstrzymane. W planach Professional i Enterprise stosujemy system \u2018soft limits\u2019 z automatycznym rozliczaniem nadwyżek.",
  },
];

export default function CennikPage() {
  return (
    <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center mb-24">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-surface-container-high ghost-border mb-6">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-secondary">
            Integracja z ekosystemem LAB
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-heading tracking-tighter text-on-surface mb-8">
          Elastyczne Plany dla{" "}
          <span className="text-primary italic">Każdej Skali</span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Wybierz fundament dla swojej infrastruktury AI. Od darmowej
          konsultacji po dedykowane wdrożenia enterprise — dopasujemy plan do
          Twojej skali działania.
        </p>
      </section>

      {/* Pricing Bento Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={
              plan.highlighted
                ? "group relative flex flex-col p-8 rounded-xl bg-surface-container shadow-2xl border border-primary/20 md:scale-105 z-10"
                : "group relative flex flex-col p-8 rounded-xl bg-surface-low ghost-border hover:bg-surface-container transition-all duration-300"
            }
          >
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 obsidian-gradient px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-on-primary">
                {plan.badge}
              </div>
            )}

            <div className="mb-8">
              <h3
                className={`text-sm font-mono uppercase tracking-[0.2em] mb-4 ${
                  plan.highlighted
                    ? "text-primary"
                    : plan.name === "Enterprise"
                      ? "text-on-surface"
                      : "text-secondary"
                }`}
              >
                {plan.name}
              </h3>
              <div className="flex items-baseline space-x-1">
                <span
                  className={`font-heading font-bold text-on-surface ${
                    plan.highlighted ? "text-5xl" : "text-4xl"
                  }`}
                >
                  {plan.price}
                </span>
                {plan.priceSuffix && (
                  <span className="text-on-surface-variant text-sm">
                    {plan.priceSuffix}
                  </span>
                )}
              </div>
              <p className="text-xs text-on-surface-variant mt-4">
                {plan.description}
              </p>
            </div>

            <div className="flex-grow space-y-4 mb-10">
              {plan.features.map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle
                    className={`w-4 h-4 ${plan.featureIconClass} shrink-0 mt-0.5`}
                  />
                  <span className={`text-sm ${plan.featureTextClass}`}>
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>

            {plan.highlighted ? (
              <Link
                href={plan.ctaHref}
                className="block w-full py-4 rounded-lg obsidian-gradient text-on-primary text-center font-black text-sm active:scale-95 transition-transform"
              >
                {plan.cta}
              </Link>
            ) : (
              <Link
                href={plan.ctaHref}
                className="block w-full py-3 rounded-lg ghost-border bg-surface-container-high text-on-surface text-center font-semibold text-sm hover:bg-surface-bright transition-colors"
              >
                {plan.cta}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Comparison / Stats Section */}
      <section className="max-w-7xl mx-auto mt-32">
        <div className="rounded-2xl overflow-hidden bg-surface-lowest ghost-border">
          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-6">
                Analiza Porównawcza
              </h2>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                Potrzebujesz głębszego wglądu w limity techniczne, czasy
                odpowiedzi i dostępność API? Nasza szczegółowa dokumentacja
                zawiera pełną tabelę specyfikacji dla każdego planu.
              </p>
              <div className="flex space-x-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="font-heading text-2xl font-bold text-secondary">
                      {stat.value}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-on-surface-variant">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full h-64 bg-surface-container rounded-xl" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto mt-32 text-center">
        <h2 className="text-2xl font-bold font-heading mb-12">
          Często Zadawane Pytania
        </h2>
        <div className="space-y-4 text-left">
          {faqItems.map((item) => (
            <div
              key={item.question}
              className="p-6 rounded-lg bg-surface-low ghost-border"
            >
              <h4 className="text-sm font-bold text-on-surface mb-2">
                {item.question}
              </h4>
              <p className="text-sm text-on-surface-variant">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
