import type { Metadata } from "next";
import {
  Brain,
  ShieldCheck,
  GitFork,
  Server,
  Router,
  Settings,
  Database,
  FileText,
  Table,
  Cloud,
  MessageSquare,
  Terminal,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Technologie — LAB | Stack technologiczny AI",
  description:
    "Poznaj technologie LAB — modele AI (GPT-4, Claude, Llama), infrastruktura H100, ponad 400 integracji enterprise.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lab-ai.pl"}/technologie`,
  },
};

/* ── Data ─────────────────────────────────────────────────────────── */

const models = [
  {
    icon: Brain,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    badge: "ULTRA-LATENCY",
    badgeColor: "text-secondary border-secondary/30",
    name: "GPT-4 Turbo",
    desc: "Multimodalne rozumowanie z oknem kontekstu do 128 k tokenów. Optymalizacja latencji przez dedykowane kernele LAB.",
    ttft: "12ms",
    tokens: "140",
  },
  {
    icon: ShieldCheck,
    iconColor: "text-secondary",
    iconBg: "bg-secondary/10",
    badge: "STABLE",
    badgeColor: "text-on-surface-variant border-outline-variant/30",
    name: "Claude 3.5 Sonnet",
    desc: "Precyzja i kreatywność klasy enterprise do zaawansowanych zadań generatywnych i analizy dokumentów.",
    ttft: "18ms",
    tokens: "110",
  },
  {
    icon: GitFork,
    iconColor: "text-primary-container",
    iconBg: "bg-primary-container/10",
    badge: "SELF-HOSTED",
    badgeColor: "text-secondary border-secondary/30",
    name: "Llama 3 70B",
    desc: "Najnowsze modele open-source uruchomione na dedykowanych podach GPU H100 w infrastrukturze LAB.",
    ttft: "8ms",
    tokens: "195",
  },
] as const;

const clusterCards = [
  {
    icon: Server,
    name: "H100 Cluster Alpha",
    status: "STATUS: OPERATIONAL",
    statusColor: "text-secondary",
    opacity: "",
  },
  {
    icon: Router,
    name: "Edge Node Warsaw",
    status: "STATUS: OPERATIONAL",
    statusColor: "text-secondary",
    opacity: "",
  },
  {
    icon: Settings,
    name: "B100 Early Access",
    status: "STATUS: PROVISIONING",
    statusColor: "text-tertiary-container",
    opacity: "opacity-50",
  },
] as const;

const integrations = [
  { icon: Database, label: "SQL" },
  { icon: FileText, label: "Notion" },
  { icon: Table, label: "Sheets" },
  { icon: Cloud, label: "AWS S3" },
  { icon: MessageSquare, label: "Slack" },
  { icon: Terminal, label: "GitHub" },
] as const;

const telemetryRows = [
  {
    metric: "Core LLM Gateway",
    throughput: "12.5M Req/Day",
    latency: "42ms",
    bias: "Compute-Optimized",
  },
  {
    metric: "Vector Embeddings",
    throughput: "800K Ops/Sec",
    latency: "8ms",
    bias: "Memory-Intensive",
  },
  {
    metric: "Distributed Cache",
    throughput: "4.2 PB Transfer",
    latency: "1.2ms",
    bias: "Network-Bound",
  },
] as const;

/* ── Page ──────────────────────────────────────────────────────────── */

export default function TechnologiePage() {
  return (
    <section className="pt-20 lg:pt-28 pb-24 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto">
      {/* ── Hero Header ───────────────────────────────────────── */}
      <header className="mb-24">
        <div className="flex items-center space-x-3 mb-6">
          <span className="font-mono text-secondary text-xs tracking-widest uppercase px-3 py-1 bg-surface-container-highest rounded-full">
            v4.0 Obsidian Core
          </span>
          <div className="h-[1px] w-24 bg-outline-variant/30" />
        </div>

        <h1 className="font-heading text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 max-w-4xl leading-[0.95]">
          Stworzone dla{" "}
          <span className="text-primary italic">Maksymalnej</span> Wydajności.
        </h1>

        <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
          LAB zapewnia orkiestrację na poziomie infrastruktury wymaganą dla
          nowej generacji autonomicznej inteligencji. Zero-latency inference,
          zunifikowany data-fabric i&nbsp;elastyczny compute.
        </p>
      </header>

      {/* ── Architektura Neuronowa ────────────────────────────── */}
      <section className="mb-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight mb-2">
              Architektura Neuronowa
            </h2>
            <p className="text-on-surface-variant font-mono text-sm uppercase tracking-wider">
              Wspierane Modele AI
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-4xl font-heading font-bold text-secondary">
              99.99%
            </span>
            <p className="text-[10px] font-mono text-outline uppercase tracking-widest mt-1">
              Uptime SLA
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {models.map((m) => (
            <div
              key={m.name}
              className="bg-surface-container ghost-border p-8 rounded-xl group hover:bg-surface-bright transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-12">
                <div
                  className={`w-12 h-12 ${m.iconBg} rounded-lg flex items-center justify-center`}
                >
                  <m.icon className={`w-6 h-6 ${m.iconColor}`} />
                </div>
                <span
                  className={`font-mono text-[10px] ${m.badgeColor} border px-2 py-0.5 rounded`}
                >
                  {m.badge}
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold mb-4">
                {m.name}
              </h3>
              <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
                {m.desc}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-outline-variant/10">
                <div>
                  <p className="font-mono text-lg font-bold">{m.ttft}</p>
                  <p className="text-[10px] uppercase tracking-widest text-outline">
                    TTFT
                  </p>
                </div>
                <div>
                  <p className="font-mono text-lg font-bold">{m.tokens}</p>
                  <p className="text-[10px] uppercase tracking-widest text-outline">
                    Tokens/sec
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Infrastruktura Monolith ───────────────────────────── */}
      <section className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left — Monolith */}
        <div className="lg:col-span-8 bg-surface-low ghost-border rounded-xl p-6 sm:p-10 flex flex-col justify-between overflow-hidden relative min-h-[450px]">
          <div className="relative z-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              Infrastruktura Monolith
            </h2>
            <p className="text-on-surface-variant max-w-md mb-10">
              Bezpośredni dostęp do klastrów H100 chłodzonych cieczą
              z&nbsp;połączeniami NVLink do masowego treningu i&nbsp;inferencji.
            </p>

            <div className="flex flex-wrap gap-8 sm:gap-12">
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-bold text-primary">
                  2.4 TB/s
                </p>
                <p className="text-xs uppercase tracking-widest text-outline mt-1">
                  Bandwidth
                </p>
              </div>
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-bold text-secondary">
                  0.4ms
                </p>
                <p className="text-xs uppercase tracking-widest text-outline mt-1">
                  Latency
                </p>
              </div>
            </div>
          </div>

          {/* Cluster status cards */}
          <div className="mt-12 flex space-x-4 overflow-x-auto pb-4 relative z-10">
            {clusterCards.map((c) => (
              <div
                key={c.name}
                className={`bg-surface-container-highest/50 p-4 rounded-lg min-w-[200px] border border-outline-variant/10 ${c.opacity}`}
              >
                <c.icon className="w-6 h-6 text-primary mb-2" />
                <p className="font-bold text-sm">{c.name}</p>
                <p className={`text-[10px] font-mono ${c.statusColor} mt-1`}>
                  {c.status}
                </p>
              </div>
            ))}
          </div>

          {/* Decorative gradient */}
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-l from-primary/30 to-transparent" />
          </div>
        </div>

        {/* Right — Globalna Sieć Edge */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-highest ghost-border p-8 rounded-xl h-full flex flex-col justify-center text-center">
            <Zap className="w-12 h-12 text-primary mb-6 mx-auto" />
            <h3 className="font-heading text-xl font-bold mb-2">
              Globalna Sieć Edge
            </h3>
            <p className="text-sm text-on-surface-variant mb-6">
              Wdrażaj logikę inferencji w&nbsp;odległości 10ms od
              użytkowników na całym świecie.
            </p>
            <div className="bg-surface-lowest p-4 rounded-lg">
              <p className="font-mono text-xs text-outline mb-2 uppercase tracking-widest">
                Active Edge Nodes
              </p>
              <p className="font-heading text-2xl font-bold">1,248</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ekosystem Integracji ──────────────────────────────── */}
      <section className="mb-20">
        <div className="flex items-center space-x-4 mb-10">
          <h2 className="font-heading text-3xl font-bold tracking-tight whitespace-nowrap">
            Ekosystem Integracji
          </h2>
          <div className="h-px flex-grow bg-outline-variant/20" />
          <p className="text-on-surface-variant font-mono text-xs uppercase tracking-widest whitespace-nowrap hidden sm:block">
            Integracje Enterprise
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {integrations.map((i) => (
            <div
              key={i.label}
              className="bg-surface-container ghost-border p-6 rounded-lg text-center hover:border-primary/50 transition-colors duration-300"
            >
              <div className="w-10 h-10 mx-auto mb-4 bg-surface-container-highest rounded flex items-center justify-center">
                <i.icon className="w-5 h-5 text-on-surface" />
              </div>
              <p className="font-bold text-sm uppercase tracking-tighter">
                {i.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Telemetria Systemu ────────────────────────────────── */}
      <section className="bg-surface-lowest ghost-border rounded-xl p-6 sm:p-12 overflow-hidden">
        <h2 className="font-heading text-2xl font-bold mb-8">
          Telemetria Systemu
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono">
            <thead>
              <tr className="text-[10px] text-outline border-b border-outline-variant/10 uppercase tracking-[0.2em]">
                <th className="pb-6">Interfejs Metryczny</th>
                <th className="pb-6">Przepustowość</th>
                <th className="pb-6">Latencja P99</th>
                <th className="pb-6">Profil Zasobów</th>
                <th className="pb-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {telemetryRows.map((row, idx) => (
                <tr
                  key={row.metric}
                  className={`group hover:bg-surface-container/30 transition-colors ${
                    idx < telemetryRows.length - 1
                      ? "border-b border-outline-variant/10"
                      : ""
                  }`}
                >
                  <td className="py-6 font-bold text-on-surface">
                    {row.metric}
                  </td>
                  <td className="py-6 text-on-surface-variant">
                    {row.throughput}
                  </td>
                  <td className="py-6 text-secondary">{row.latency}</td>
                  <td className="py-6 text-on-surface-variant">{row.bias}</td>
                  <td className="py-6 text-right">
                    <span className="inline-block w-2 h-2 rounded-full bg-secondary mr-2" />
                    Stable
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
