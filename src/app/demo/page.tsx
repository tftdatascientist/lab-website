import type { Metadata } from "next";
import Image from "next/image";
import {
  Zap,
  Bot,
  User,
  Database,
  Network,
  Gauge,
  Shield,
  Plug,
  TrendingUp,
  Lock,
  ArrowRight,
  Mic,
  Paperclip,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Demo AI — LAB | Doświadcz Mocy Naszych Agentów AI",
  description:
    "Zautomatyzuj procesy w czasie rzeczywistym dzięki naszym gotowym rozwiązaniom AI. Przetestuj demo agenta.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lab-ai.pl"}/demo`,
  },
};

export default function DemoPage() {
  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <header className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest border border-outline-variant/15 mb-6">
          <Zap className="w-3.5 h-3.5 text-secondary fill-secondary" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">
            Advanced Neural Agents v2.4
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-on-surface to-on-surface-variant font-heading">
          Doświadcz Mocy Naszych Agentów AI
        </h1>
        <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto font-medium">
          Zautomatyzuj procesy w czasie rzeczywistym dzięki naszym gotowym
          rozwiązaniom.
        </p>
      </header>

      {/* Main Demo Interface */}
      <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Stats (Left) */}
        <div className="lg:col-span-3 space-y-6">
          {/* System Performance */}
          <div className="p-6 rounded-xl bg-surface-low border border-outline-variant/10">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-4">
              Wydajność Systemu
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-sm text-on-surface-variant">
                  Latencja
                </span>
                <span className="font-mono text-secondary">24ms</span>
              </div>
              <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-[85%]" />
              </div>
              <div className="flex justify-between items-end">
                <span className="text-sm text-on-surface-variant">
                  Tokeny/sek
                </span>
                <span className="font-mono text-primary">124.8</span>
              </div>
              <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[62%]" />
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="p-6 rounded-xl bg-surface-low border border-outline-variant/10">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-4">
              Główne Funkcje
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center">
                  <Plug className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium">
                  Intuicyjna integracja
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium">Skalowalne modele</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center">
                  <Lock className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium">
                  Pełna prywatność
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* AI Interface Mockup (Center/Right) */}
        <div className="lg:col-span-9">
          <div className="glass-panel rounded-2xl border border-outline-variant/20 shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
            {/* Window Controls */}
            <div className="px-6 py-4 bg-surface-container-high/50 flex justify-between items-center border-b border-outline-variant/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-error/40" />
                <div className="w-3 h-3 rounded-full bg-tertiary/40" />
                <div className="w-3 h-3 rounded-full bg-secondary/40" />
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-3 h-3 text-on-surface-variant" />
                <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
                  agent-session-x92.auth
                </span>
              </div>
              <div className="w-12" />
            </div>

            {/* Chat Area */}
            <div className="flex-grow p-8 space-y-8 overflow-y-auto">
              {/* Bot Message */}
              <div className="flex gap-4 max-w-2xl">
                <div className="w-10 h-10 rounded-lg obsidian-gradient flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-on-primary" />
                </div>
                <div className="space-y-2">
                  <div className="bg-surface-container-high p-4 rounded-xl rounded-tl-none border border-outline-variant/10 text-on-surface leading-relaxed">
                    Witaj w konsoli demonstracyjnej LAB. Jestem gotowy, aby
                    zautomatyzować Twój workflow. W czym mogę Ci dzisiaj pomóc?
                  </div>
                  <span className="font-mono text-[10px] text-on-surface-variant uppercase opacity-50">
                    System: Active &bull; 09:41:02
                  </span>
                </div>
              </div>

              {/* User Message */}
              <div className="flex gap-4 max-w-2xl ml-auto flex-row-reverse">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-on-surface-variant" />
                </div>
                <div className="space-y-2 text-right">
                  <div className="bg-primary/10 p-4 rounded-xl rounded-tr-none border border-primary/20 text-on-surface leading-relaxed">
                    Pokaż mi jak możesz zoptymalizować proces raportowania
                    miesięcznego.
                  </div>
                  <span className="font-mono text-[10px] text-on-surface-variant uppercase opacity-50">
                    User &bull; 09:41:45
                  </span>
                </div>
              </div>

              {/* Bot Reasoning (Bento style insert) */}
              <div className="flex gap-4 max-w-3xl">
                <div className="w-10 h-10 rounded-lg obsidian-gradient flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-on-primary" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="bg-surface-low p-4 rounded-xl border border-outline-variant/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-3.5 h-3.5 text-secondary" />
                      <span className="font-bold text-xs">
                        Analiza Źródeł
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant">
                      Łączenie z SQL, Notion i arkuszami Google zakończone
                      sukcesem.
                    </p>
                  </div>
                  <div className="bg-surface-low p-4 rounded-xl border border-outline-variant/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Network className="w-3.5 h-3.5 text-primary" />
                      <span className="font-bold text-xs">
                        Struktura Raportu
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant">
                      Generowanie korelacji danych i wykresów w czasie
                      rzeczywistym.
                    </p>
                  </div>
                  <div className="md:col-span-2 bg-surface-container-high p-4 rounded-xl border border-outline-variant/10">
                    <p className="text-sm text-on-surface mb-3 italic">
                      Oto propozycja Twojego nowego pipeline&apos;u:
                    </p>
                    <div className="relative w-full h-48 rounded-lg border border-outline-variant/20 overflow-hidden mb-2">
                      <Image
                        src="/images/stitch/demo-dashboard.jpg"
                        alt="Dashboard z wizualizacją danych w fioletowo-zielonych barwach"
                        fill
                        className="object-cover opacity-80"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-6 bg-surface-container-highest/30 border-t border-outline-variant/10">
              <div className="max-w-4xl mx-auto relative flex items-center rounded-xl bg-surface-lowest border border-outline-variant/15 p-1">
                <div className="flex-grow bg-transparent px-4 py-3 text-outline/50 text-sm">
                  Zadaj pytanie agentowi AI...
                </div>
                <div className="bg-primary text-on-primary-container h-10 w-10 rounded-lg flex items-center justify-center mr-1">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-outline flex items-center gap-2">
                  <Mic className="w-3 h-3" /> Voice Mode
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-outline flex items-center gap-2">
                  <Paperclip className="w-3 h-3" /> Attach Context
                </span>
              </div>
            </div>
          </div>

          {/* Call to Action Floating Bar */}
          <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 p-8 rounded-2xl bg-surface-low border border-outline-variant/10 overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 font-heading">
                Gotowy na pełną automatyzację?
              </h2>
              <p className="text-on-surface-variant">
                Przetestuj nasze zaawansowane modele na własnych danych.
              </p>
            </div>
            <div className="relative z-10 obsidian-gradient text-on-primary-container px-10 py-4 rounded-lg font-bold text-lg shadow-xl shadow-primary/20">
              Uruchom Demo Teraz
            </div>
            {/* Background Decoration */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
          </div>
        </div>
      </section>

      {/* Technical Cards Section */}
      <section className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-xl bg-surface-container border border-outline-variant/10 hover:border-primary/30 transition-colors">
          <Gauge className="w-10 h-10 text-secondary mb-6" strokeWidth={1} />
          <h4 className="text-xl font-bold mb-3 font-heading">
            Ekstremalna Prędkość
          </h4>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Nasza infrastruktura oparta o układy H100 zapewnia minimalne
            opóźnienia w generowaniu odpowiedzi.
          </p>
        </div>
        <div className="p-8 rounded-xl bg-surface-container border border-outline-variant/10 hover:border-primary/30 transition-colors">
          <Network className="w-10 h-10 text-primary mb-6" strokeWidth={1} />
          <h4 className="text-xl font-bold mb-3 font-heading">
            Multi-Agent Workflow
          </h4>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Łączymy wiele wyspecjalizowanych agentów w jeden, spójny system
            decyzyjny dla Twojej firmy.
          </p>
        </div>
        <div className="p-8 rounded-xl bg-surface-container border border-outline-variant/10 hover:border-primary/30 transition-colors">
          <Shield className="w-10 h-10 text-tertiary mb-6" strokeWidth={1} />
          <h4 className="text-xl font-bold mb-3 font-heading">
            Bezpieczeństwo Enterprise
          </h4>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Szyfrowanie end-to-end oraz lokalne instancje modeli dla zachowania
            najwyższych standardów prywatności.
          </p>
        </div>
      </section>
    </main>
  );
}
