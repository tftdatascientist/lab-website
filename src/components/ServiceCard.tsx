"use client";

import Link from "next/link";
import type { Service } from "@/content/services";
import { ServiceIconBySlug } from "@/components/mechanism";

const COLOR_MAP: Record<string, string> = {
  "automatyzacja-n8n": "#d9b88a",
  "chatboty-ai": "#f5b845",
  "agenci-glosowi": "#b8542f",
  "bazy-wiedzy-rag": "#ef7955",
  "dashboardy-raporty": "#f5b845",
  "integracje-systemow": "#d9b88a",
};

const METRIC_MAP: Record<string, { v: string; l: string }> = {
  "automatyzacja-n8n": { v: "47", l: "aktywnych workflow" },
  "chatboty-ai": { v: "12ms", l: "średni czas odpowiedzi" },
  "agenci-glosowi": { v: "24/7", l: "pełna obsługa" },
  "bazy-wiedzy-rag": { v: "98%", l: "trafność odpowiedzi" },
  "dashboardy-raporty": { v: "5min", l: "częstotliwość odświeżania" },
  "integracje-systemow": { v: "400+", l: "gotowych konektorów" },
};

export default function ServiceCard({ service }: { service: Service }) {
  const c = COLOR_MAP[service.slug] ?? "#f5b845";
  const metric = METRIC_MAP[service.slug] ?? { v: "—", l: "" };

  return (
    <Link
      href={`/uslugi/${service.slug}`}
      className="group relative block rounded-[16px] overflow-hidden text-text no-underline min-h-[260px] p-7 transition-all duration-200 hover:-translate-y-[3px]"
      style={{
        background: "#17181b",
        outline: "1px solid rgba(255,255,255,0.08)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.outlineColor = c + "66";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.outlineColor =
          "rgba(255,255,255,0.08)";
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
          background: `radial-gradient(circle, ${c}30, transparent 70%)`,
          filter: "blur(30px)",
        }}
      />
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${c}, transparent)`,
          opacity: 0.6,
        }}
      />

      {/* Tag + icon */}
      <div className="flex items-center justify-between mb-7">
        <span
          className="font-mono text-[10px] uppercase"
          style={{ color: c, letterSpacing: "0.15em" }}
        >
          {service.tags[0]}
        </span>
        <span style={{ color: c, opacity: 0.85, display: "inline-flex" }}>
          <ServiceIconBySlug slug={service.slug} size={30} />
        </span>
      </div>

      <h3
        className="font-heading font-bold text-text mb-2.5"
        style={{ fontSize: 22, letterSpacing: "-0.02em" }}
      >
        {service.title}
      </h3>
      <p className="text-[14px] text-text-dim leading-[1.55] mb-7">
        {service.desc}
      </p>

      {/* Metric */}
      <div
        className="absolute bottom-5 left-7 right-7 flex items-baseline gap-2.5 pt-3.5 border-t"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <span className="num font-bold" style={{ fontSize: 22, color: c }}>
          {metric.v}
        </span>
        <span className="text-[11px] text-text-mute">{metric.l}</span>
      </div>
    </Link>
  );
}
