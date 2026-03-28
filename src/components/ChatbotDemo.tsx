import ChatWindow from "./ChatWindow";

export default function ChatbotDemo() {
  return (
    <section id="demo" className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — centered */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-cyan" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
              Demo
            </span>
            <span className="w-8 h-px bg-cyan" />
          </div>
          <h2 className="font-heading text-[clamp(28px,4vw,42px)] font-bold tracking-[-1px] text-text-primary mb-4">
            Przetestuj naszego chatbota AI
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-xl mx-auto">
            Tak wygląda inteligentny asystent, którego możemy wdrożyć
            na&nbsp;Twojej stronie — odpowiada na pytania klientów 24/7.
          </p>
        </div>

        {/* Chat window */}
        <ChatWindow />

        {/* Note */}
        <p className="mt-5 text-center text-xs text-text-muted">
          Demo chatbot w przygotowaniu. Wkrótce podłączymy pełną wersję AI.
        </p>
      </div>
    </section>
  );
}
