import Link from "next/link";
import Hero from "@/components/Hero";
import FeatureSpotlight from "@/components/FeatureSpotlight";
import CtaSection from "@/components/CtaSection";
import ScrollReveal from "@/components/ScrollReveal";
import SchemaOrg from "@/components/SchemaOrg";
import { generateFaqSchema } from "@/lib/schema";

const faqItems = [
  {
    question: "Czy automatyzacja sprawdzi się w mojej małej firmie?",
    answer:
      "Tak! Automatyzacja najlepiej działa właśnie w małych firmach, gdzie każda zaoszczędzona godzina ma realne znaczenie. Zaczynamy od prostych workflow i rozwijamy w miarę potrzeb.",
  },
  {
    question: "Ile trwa wdrożenie chatbota AI?",
    answer:
      "Prosty chatbot FAQ wdrażamy w 2–3 dni. Chatbot z bazą wiedzy RAG to 5–7 dni roboczych. Złożone rozwiązania z integracjami CRM/ERP — do 2 tygodni.",
  },
  {
    question: "Czy muszę mieć wiedzę techniczną?",
    answer:
      "Nie. Nasze rozwiązania są low-code/no-code — konfigurujemy wszystko za Ciebie. Po wdrożeniu otrzymujesz przeszkolenie i dokumentację.",
  },
  {
    question: "Dlaczego lokalna firma, a nie agencja z Warszawy?",
    answer:
      "Znamy lokalny rynek i specyfikę firm z regionu kujawsko-pomorskiego. Jesteśmy dostępni na spotkania na żywo, reagujemy szybciej i oferujemy ceny dopasowane do budżetów MŚP.",
  },
];

export default function Home() {
  return (
    <>
      <SchemaOrg schema={generateFaqSchema(faqItems)} />
      <Hero />
      <ScrollReveal delay={100}>
        <FeatureSpotlight />
      </ScrollReveal>

      {/* Sekcja bezpłatna konsultacja */}
      <ScrollReveal>
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-surface-container ghost-border overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-10 lg:p-14">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary block mb-4">
                    Bezpłatna konsultacja
                  </span>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tighter text-on-surface mb-6">
                    30 minut, które mogą zmienić sposób pracy Twojej firmy
                  </h2>
                  <ul className="space-y-3 text-sm text-on-surface-variant mb-8">
                    {[
                      "Audyt procesów — identyfikujemy co można zautomatyzować",
                      "Szybkie wygrane — wskazujemy gdzie zysk jest natychmiastowy",
                      "Szacunek kosztów i oszczędności",
                      "Konkretny plan działania na kolejny krok",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-secondary shrink-0 mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-surface-container-high p-10 lg:p-14 flex flex-col items-start justify-center gap-4">
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Bez zobowiązań. Bez sprzedawania. Tylko konkretna rozmowa
                    o&nbsp;tym, jak AI może pomóc Twojej firmie.
                  </p>
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center px-8 py-3.5 text-sm font-bold text-on-primary obsidian-gradient rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all"
                  >
                    Umów konsultację →
                  </Link>
                  <p className="text-xs text-outline">
                    Odpowiadamy w&nbsp;ciągu 24&nbsp;godzin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <CtaSection />
      </ScrollReveal>
    </>
  );
}
