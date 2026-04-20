export default function ChatWindow() {
  return (
    <div className="rounded-2xl border border-outline-variant/15 bg-surface-container overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-outline-variant/15 bg-surface-low/60">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-outline">
          lab-assistant.ai
        </span>
      </div>

      {/* Chat area */}
      <div className="p-5 sm:p-6 min-h-[240px]">
        {/* Bot message */}
        <div className="max-w-[85%] rounded-xl rounded-tl-sm border border-primary/12 bg-primary/[0.08] px-4 py-3">
          <p className="text-sm text-on-surface leading-relaxed">
            Cześć! Jestem asystentem lok-ai. Mogę opowiedzieć o&nbsp;automatyzacji
            procesów, chatbotach, agentach AI i&nbsp;rozwiązaniach low-code.
            O&nbsp;czym chcesz porozmawiać?
          </p>
        </div>
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 sm:px-5 py-3 border-t border-outline-variant/15">
        <input
          type="text"
          placeholder="Napisz wiadomość..."
          disabled
          className="flex-1 bg-transparent text-sm text-outline placeholder:text-outline/60 outline-none cursor-not-allowed"
        />
        <button
          disabled
          className="px-4 py-2 text-sm font-medium text-on-surface/40 bg-surface-container rounded-lg cursor-not-allowed"
        >
          Wyślij
        </button>
      </div>
    </div>
  );
}
