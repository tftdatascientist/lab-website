const technologies = [
  { name: "n8n", category: "Automatyzacja", color: "#ff6d5a" },
  { name: "Flowise", category: "AI / RAG", color: "#5b5bd6" },
  { name: "Typebot", category: "Chatbot", color: "#0ea5e9" },
  { name: "Redis", category: "Cache", color: "#dc382d" },
  { name: "Pinecone", category: "Vector DB", color: "#00c4b4" },
  { name: "OpenAI API", category: "LLM", color: "#10a37f" },
  { name: "ElevenLabs", category: "Voice AI", color: "#e040fb" },
  { name: "Claude API", category: "LLM", color: "#d4a574" },
  { name: "WordPress", category: "CMS", color: "#21759b" },
  { name: "Notion", category: "Workspace", color: "#999999" },
];

export default function TechStack() {
  return (
    <section id="technologie" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — centered */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-primary" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Technologie
            </span>
            <span className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-heading text-[clamp(28px,4vw,42px)] font-bold tracking-[-1px] text-on-surface mb-4">
            Nasz stack
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Sprawdzone narzędzia open-source i&nbsp;najlepsze API — łączymy je
            w&nbsp;rozwiązania szyte na miarę.
          </p>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="inline-flex items-center gap-3 rounded-full border border-outline-variant/15 bg-surface-container px-5 py-2.5 hover:bg-surface-container-high transition-colors"
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: tech.color }}
              />
              <span className="font-heading text-sm font-semibold text-on-surface">
                {tech.name}
              </span>
              <span className="text-xs text-outline">{tech.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
