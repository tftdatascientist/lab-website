import type { Metadata } from "next";
import ChatWindow from "@/components/ChatWindow";

export const metadata: Metadata = {
  title: "Demo chatbota AI — LAB | Automatyzacja i AI",
  description:
    "Przetestuj chatbota AI, który może obsługiwać klientów na Twojej stronie 24/7.",
};

const suggestedQuestions = [
  "Czym jest automatyzacja procesów?",
  "Jak działa chatbot AI?",
  "Ile kosztuje wdrożenie?",
  "Czy mogę przetestować za darmo?",
  "Jak szybko wdrożycie rozwiązanie?",
  "Czym się różnicie od dużych agencji?",
];

export default function DemoPage() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-bold tracking-[-1px] text-text-primary mb-4">
            Demo chatbota AI
          </h1>
          <p className="text-text-secondary leading-relaxed max-w-xl mx-auto">
            Tak wygląda inteligentny asystent, którego możemy wdrożyć
            na&nbsp;Twojej stronie.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-6 items-start">
          {/* Chat */}
          <div>
            <ChatWindow />
            <p className="mt-4 text-xs text-text-muted">
              Demo chatbot w przygotowaniu. Wkrótce podłączymy pełną wersję AI.
            </p>
          </div>

          {/* Sidebar */}
          <div className="rounded-2xl border border-white/[0.06] bg-bg-card p-5">
            <h2 className="font-heading text-sm font-semibold text-text-primary mb-4">
              Przykładowe pytania
            </h2>
            <ul className="space-y-2">
              {suggestedQuestions.map((q) => (
                <li key={q}>
                  <button
                    disabled
                    className="w-full text-left text-sm text-text-secondary hover:text-text-primary px-3 py-2 rounded-lg hover:bg-white/[0.03] transition-colors cursor-not-allowed"
                  >
                    {q}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
