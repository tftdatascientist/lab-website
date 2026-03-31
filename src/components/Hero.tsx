import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high ghost-border mb-8">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary">
            Nowa Era Automatyzacji
          </span>
        </div>

        {/* H1 */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-heading tracking-tighter text-on-surface mb-6 leading-[1.1]">
          Automatyzacja i AI
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            dla biznesu
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed">
          Zoptymalizuj procesy operacyjne dzięki rozwiązaniom low-code
          i&nbsp;inteligentnym agentom AI. Skaluj swoją firmę bez zwiększania
          kosztów zatrudnienia.
        </p>

        {/* CTAs */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link
            href="/#demo"
            className="w-full md:w-auto px-8 py-4 obsidian-gradient text-on-primary font-bold text-base rounded-lg shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
          >
            Przetestuj chatbota AI
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/uslugi"
            className="w-full md:w-auto px-8 py-4 bg-surface-low ghost-border hover:bg-surface-container transition-colors text-on-surface font-semibold text-base rounded-lg flex items-center justify-center gap-2"
          >
            Zobacz realizacje
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="mt-20 flex flex-col items-center gap-2 text-outline animate-bounce">
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <ArrowRight className="w-4 h-4 rotate-90" />
      </div>
    </section>
  );
}
