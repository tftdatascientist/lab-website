"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Czy automatyzacja sprawdzi się w mojej małej firmie?",
    a: "Tak! Automatyzacja najlepiej działa właśnie w małych firmach, gdzie każda zaoszczędzona godzina ma realne znaczenie. Zaczynamy od prostych workflow — np. automatyczne fakturowanie, odpowiedzi na zapytania, synchronizacja danych między systemami — i rozwijamy w miarę potrzeb.",
  },
  {
    q: "Ile trwa wdrożenie chatbota AI?",
    a: "Prosty chatbot FAQ na stronie www wdrażamy w 2–3 dni. Chatbot z bazą wiedzy RAG (odpowiadający na podstawie dokumentów firmy) to 5–7 dni roboczych. Złożone rozwiązania z integracjami CRM/ERP — do 2 tygodni.",
  },
  {
    q: "Czy muszę mieć wiedzę techniczną?",
    a: "Nie. Nasze rozwiązania są low-code/no-code — konfigurujemy wszystko za Ciebie. Po wdrożeniu otrzymujesz przeszkolenie i dokumentację. Jeśli coś wymaga zmiany, robimy to w ramach wsparcia.",
  },
  {
    q: "Dlaczego lokalna firma, a nie agencja z Warszawy?",
    a: "Znamy lokalny rynek i specyfikę firm z regionu kujawsko-pomorskiego. Jesteśmy dostępni na spotkania na żywo, reagujemy szybciej i oferujemy ceny dopasowane do budżetów MŚP — bez narzutów dużych agencji.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-cyan" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
              FAQ
            </span>
            <span className="w-8 h-px bg-cyan" />
          </div>
          <h2 className="font-heading text-[clamp(28px,4vw,42px)] font-bold tracking-[-1px] text-text-primary mb-4">
            Często zadawane pytania
          </h2>
        </div>

        {/* Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-xl border bg-bg-card transition-colors ${
                  isOpen ? "border-cyan/15" : "border-white/[0.06]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-sm font-semibold text-text-primary">
                    {faq.q}
                  </span>
                  <svg
                    className={`w-4 h-4 shrink-0 text-text-muted transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-5 pb-4 text-sm text-text-secondary leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
