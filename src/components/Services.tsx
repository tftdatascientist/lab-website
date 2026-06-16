"use client";

import Link from "next/link";

const SERVICES = [
  {
    tag: "AUTOMATYZACJA",
    title: "Workflow n8n",
    desc: "Łączymy CRM, email, faktury i formularze w jeden rytm. 400+ integracji.",
    icon: "⚙",
    color: "#d9b88a",
    metric: { v: "47", l: "aktywnych workflow" },
    href: "/wdrozenia/automatyzacja-n8n",
  },
  {
    tag: "CHATBOTY",
    title: "Asystenci AI na www",
    desc: "Odpowiadają 24/7, kwalifikują leady, rezerwują terminy.",
    icon: "◎",
    color: "#f5b845",
    metric: { v: "12ms", l: "średni czas odpowiedzi" },
    href: "/wdrozenia/chatboty-ai",
  },
  {
    tag: "AGENCI GŁOSOWI",
    title: "Voiceboty telefoniczne",
    desc: "Naturalny polski głos (ElevenLabs). Umawiają wizyty, potwierdzają zamówienia.",
    icon: "◐",
    color: "#b8542f",
    metric: { v: "24/7", l: "pełna obsługa" },
    href: "/wdrozenia/agenci-glosowi",
  },
  {
    tag: "RAG",
    title: "Bazy wiedzy firmy",
    desc: "AI odpowiada na dokumentach Twojej organizacji, nie na wymyśleniach.",
    icon: "▲",
    color: "#ef7955",
    metric: { v: "98%", l: "trafność odpowiedzi" },
    href: "/wdrozenia/bazy-wiedzy-rag",
  },
  {
    tag: "DASHBOARDY",
    title: "Raporty na żywo",
    desc: "KPI z rozproszonych źródeł spięte w jeden widok.",
    icon: "▦",
    color: "#f5b845",
    metric: { v: "5min", l: "częstotliwość odświeżania" },
    href: "/wdrozenia/dashboardy-raporty",
  },
  {
    tag: "INTEGRACJE",
    title: "CRM · ERP · e-commerce",
    desc: "REST, Webhook, OAuth — łączymy dowolne systemy.",
    icon: "⬡",
    color: "#d9b88a",
    metric: { v: "400+", l: "gotowych konektorów" },
    href: "/wdrozenia/integracje-systemow",
  },
];

export default function Services() {
  return (
    <section className="py-[100px] px-8 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between gap-8 mb-14">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-7 h-px" style={{ background: "#f5b845" }} />
            <span
              className="font-mono text-[11px] uppercase"
              style={{ color: "#f5b845", letterSpacing: "0.15em" }}
            >
              Co automatyzujemy
            </span>
          </div>
          <h2
            className="font-heading font-bold text-text"
            style={{
              fontSize: "clamp(32px,4.5vw,56px)",
              letterSpacing: "-0.035em",
              lineHeight: 1,
              maxWidth: 680,
            }}
          >
            Sześć kierunków,{" "}
            <span
              className="font-display font-medium italic"
              style={{ color: "#f5b845", letterSpacing: "-0.01em" }}
            >
              jeden cel
            </span>
            : odzyskać&nbsp;czas.
          </h2>
        </div>
        <Link
          href="/wdrozenia"
          className="hidden sm:block font-mono text-[12px] uppercase text-text-dim hover:text-text transition-colors whitespace-nowrap"
          style={{ letterSpacing: "0.1em" }}
        >
          Pełna oferta →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
        {SERVICES.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group relative block rounded-[16px] overflow-hidden text-text no-underline min-h-[260px] p-7 transition-all duration-200 hover:-translate-y-[3px]"
            style={{
              background: "#17181b",
              outline: "1px solid rgba(255,255,255,0.08)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.outlineColor = s.color + "66";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.outlineColor = "rgba(255,255,255,0.08)";
            }}
          >
            {/* Blur orb */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: -40,
                right: -40,
                width: 120,
                height: 120,
                background: `radial-gradient(circle, ${s.color}30, transparent 70%)`,
                filter: "blur(30px)",
              }}
            />
            {/* Top accent line */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
                opacity: 0.6,
              }}
            />

            {/* Tag + icon */}
            <div className="flex items-center justify-between mb-7">
              <span
                className="font-mono text-[10px] uppercase"
                style={{ color: s.color, letterSpacing: "0.15em" }}
              >
                {s.tag}
              </span>
              <span style={{ fontSize: 22, color: s.color, opacity: 0.7 }}>{s.icon}</span>
            </div>

            <h3
              className="font-heading font-bold text-text mb-2.5"
              style={{ fontSize: 22, letterSpacing: "-0.02em" }}
            >
              {s.title}
            </h3>
            <p className="text-[14px] text-text-dim leading-[1.55] mb-7">{s.desc}</p>

            {/* Metric */}
            <div
              className="absolute bottom-5 left-7 right-7 flex items-baseline gap-2.5 pt-3.5 border-t"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <span
                className="num font-bold"
                style={{ fontSize: 22, color: s.color }}
              >
                {s.metric.v}
              </span>
              <span className="text-[11px] text-text-mute">{s.metric.l}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
