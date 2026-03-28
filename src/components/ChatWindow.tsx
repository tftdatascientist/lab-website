export default function ChatWindow() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-bg-card overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-bg-deep/60">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-text-muted">
          lab-assistant.ai
        </span>
      </div>

      {/* Chat area */}
      <div className="p-5 sm:p-6 min-h-[240px]">
        {/* Bot message */}
        <div className="max-w-[85%] rounded-xl rounded-tl-sm border border-cyan/12 bg-cyan/[0.08] px-4 py-3">
          <p className="text-sm text-text-primary leading-relaxed">
            Cześć! Jestem asystentem LAB. Mogę opowiedzieć o&nbsp;automatyzacji
            procesów, chatbotach, agentach AI i&nbsp;rozwiązaniach low-code.
            O&nbsp;czym chcesz porozmawiać?
          </p>
        </div>
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 sm:px-5 py-3 border-t border-white/[0.06]">
        <input
          type="text"
          placeholder="Napisz wiadomość..."
          disabled
          className="flex-1 bg-transparent text-sm text-text-muted placeholder:text-text-muted/60 outline-none cursor-not-allowed"
        />
        <button
          disabled
          className="px-4 py-2 text-sm font-medium text-white/40 bg-white/[0.04] rounded-lg cursor-not-allowed"
        >
          Wyślij
        </button>
      </div>
    </div>
  );
}
