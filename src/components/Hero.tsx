import { ArrowRight } from "lucide-react";
import Link from "next/link";

const stats = [
  { value: "400+", label: "Integracji API", color: "text-secondary" },
  { value: "24/7", label: "chatbot AI", color: "text-secondary" },
  { value: "<48h", label: "wdrożenie", color: "text-secondary" },
  { value: "0 zł", label: "konsultacja", color: "text-secondary" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high ghost-border mb-8">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary">
                Nowa Era Automatyzacji
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-heading tracking-tighter text-on-surface mb-6 leading-[1.05]">
              Automatyzacja i{" "}
              <span className="text-primary italic">AI</span>
              <br />
              dla biznesu
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed">
              Wdrażamy{" "}
              <span className="text-secondary">
                inteligentne automatyzacje
              </span>{" "}
              i rozwiązania AI dla małych i średnich firm z regionu
              kujawsko-pomorskiego. Chatboty, agenci głosowi, integracje
              systemów — bez kodu, z pełnym wsparciem.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/#demo"
                className="px-8 py-4 obsidian-gradient text-on-primary font-bold text-base rounded-lg shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
              >
                Przetestuj chatbota AI
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/uslugi"
                className="px-8 py-4 bg-surface-container-high ghost-border hover:bg-surface-bright transition-colors text-on-surface font-semibold text-base rounded-lg flex items-center justify-center gap-2"
              >
                Zobacz realizacje
              </Link>
            </div>
          </div>

          {/* Right — Stats 2x2 Grid (1-col mobile, 2x2 desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-surface-container ghost-border rounded-xl p-6 md:p-8 flex flex-col gap-2 hover:bg-surface-bright transition-colors"
              >
                <div className={`font-mono text-3xl md:text-4xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-on-surface-variant font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
