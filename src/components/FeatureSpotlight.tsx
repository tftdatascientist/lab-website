import { Brain, Shield, Terminal } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Deep Learning Core",
    description:
      "Zaawansowane modele językowe trenowane na danych Twojej organizacji.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Shield,
    title: "Bezpieczeństwo Enterprise",
    description:
      "Pełna szyfracja danych i zgodność z RODO przy każdym procesie.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
];

export default function FeatureSpotlight() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left — text */}
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tighter mb-8 leading-tight">
            Technologia Jutra
            <br />
            Dostępna{" "}
            <span className="text-secondary italic">Dzisiaj</span>
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-10 max-w-lg">
            Nasze systemy uczą się specyfiki Twojej firmy, przejmując
            powtarzalne zadania i pozwalając Twojemu zespołowi skupić się na
            strategii i&nbsp;kreatywności.
          </p>

          <div className="space-y-6">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="flex gap-4 p-4 rounded-xl bg-surface-low ghost-border"
              >
                <div
                  className={`w-12 h-12 rounded-lg ${feat.bgColor} flex items-center justify-center shrink-0`}
                >
                  <feat.icon className={`w-5 h-5 ${feat.color}`} />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface mb-1">
                    {feat.title}
                  </h4>
                  <p className="text-sm text-on-surface-variant">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — visual */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000" />
          <div className="relative aspect-square rounded-2xl overflow-hidden ghost-border bg-surface-container">
            {/* Placeholder gradient — replace with real image */}
            <div className="w-full h-full bg-gradient-to-br from-primary/30 via-surface-container to-secondary/20 grayscale brightness-75 transition-transform duration-700 group-hover:scale-105" />

            {/* Glass Overlay Card */}
            <div className="absolute bottom-6 left-6 right-6 p-6 glass-panel rounded-xl ghost-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-secondary" />
                  <span className="font-mono text-[10px] text-secondary uppercase tracking-widest">
                    System Status: Active
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-secondary" />
                  <div className="w-1 h-1 rounded-full bg-secondary/40" />
                  <div className="w-1 h-1 rounded-full bg-secondary/40" />
                </div>
              </div>
              <p className="text-xs font-mono text-on-surface-variant leading-relaxed">
                &gt; Initializing AI Core...
                <br />
                &gt; Training parameters optimized.
                <br />
                &gt; Response latency: 12ms
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
