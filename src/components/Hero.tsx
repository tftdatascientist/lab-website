"use client";

import Link from "next/link";
import AuroraBg from "./AuroraBg";
import ChatDemo from "./ChatDemo";
import Counter from "./Counter";
import Ticker from "./Ticker";

const STATS = [
  { to: 400, suffix: "+", label: "integracji API", color: "#d9b88a" },
  { to: 24, suffix: "/7", label: "chatbot AI", color: "#f5b845" },
  { to: 48, prefix: "<", suffix: "h", label: "wdrożenie", color: "#ef7955" },
  { to: 0, suffix: " zł", label: "konsultacja", color: "#b8542f" },
];

const TICKER_ITEMS = [
  { label: "Bielik v3", value: "polski LLM wdrożony", color: "#d9b88a" },
  { label: "AI Act", value: "zgodność od 02.08", color: "#f5b845" },
  { label: "n8n workflows", value: "2 148 uruchomień / 24h", color: "#ef7955" },
  { label: "PARP FENG", value: "nabór do 29.04", color: "#b8542f" },
  { label: "Czas odpowiedzi", value: "12ms ±3", color: "#d9b88a" },
  { label: "Piast AI", value: "Poznań · pierwsza fabryka AI", color: "#f5b845" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-0">
      <AuroraBg intensity={1} />

      <div
        className="relative z-10 max-w-[1280px] mx-auto px-8"
        style={{ paddingTop: 80, paddingBottom: 40 }}
      >
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-20 items-center">
          {/* Left */}
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-7"
              style={{
                background: "rgba(245,184,69,0.08)",
                outline: "1px solid rgba(245,184,69,0.2)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "#f5b845", animation: "lokai-pulse 1.8s ease-in-out infinite" }}
              />
              <span
                className="font-mono text-[11px] uppercase"
                style={{ color: "#f5b845", letterSpacing: "0.12em" }}
              >
                Nowa era · kwiecień 2026
              </span>
            </div>

            {/* H1 */}
            <h1
              className="font-heading font-extrabold text-text mb-7"
              style={{
                fontSize: "clamp(48px,7vw,84px)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
              }}
            >
              Twoja firma.
              <br />
              <span
                className="font-display font-medium italic"
                style={{ color: "#f5b845", letterSpacing: "-0.01em" }}
              >
                Mądrzejsza
              </span>{" "}
              <span className="relative inline-block">
                o&nbsp;AI.
                <svg
                  className="absolute"
                  style={{ left: "-4%", bottom: "-14%", width: "108%", height: 22 }}
                  viewBox="0 0 200 22"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 12 Q 40 2, 100 10 T 198 8"
                    stroke="#ef7955"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="400"
                    strokeDashoffset="400"
                    style={{
                      animation: "lokai-draw 1.8s ease-out 0.4s forwards",
                    }}
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-text-dim leading-relaxed mb-9"
              style={{ fontSize: 19, maxWidth: 560 }}
            >
              Wdrażamy chatboty, agentów głosowych i&nbsp;integracje procesów dla małych
              i&nbsp;średnich firm z&nbsp;regionu kujawsko-pomorskiego. Bez kodu, bez&nbsp;teorii
              —&nbsp;w&nbsp;48&nbsp;godzin.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3.5 mb-11">
              <Link
                href="/kontakt"
                className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl text-[15px]"
                style={{ padding: "14px 22px" }}
              >
                Przetestuj chatbota AI
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/wdrozenia"
                className="inline-flex items-center justify-center gap-2 rounded-xl text-[15px] font-medium text-text transition-colors"
                style={{
                  padding: "14px 22px",
                  background: "rgba(255,255,255,0.04)",
                  outline: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                Zobacz realizacje
              </Link>
            </div>

            {/* Stats row */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 border-t border-b"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="py-5"
                  style={{
                    paddingLeft: i === 0 ? 0 : 20,
                    paddingRight: i === STATS.length - 1 ? 0 : 16,
                    borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  }}
                >
                  <div
                    className="num font-bold"
                    style={{ fontSize: 36, color: s.color }}
                  >
                    <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <div className="text-[12px] text-text-dim mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — chat demo */}
          <div className="relative hidden lg:block">
            {/* Blur orbs */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: -40,
                right: -40,
                width: 180,
                height: 180,
                background: "radial-gradient(circle, rgba(184,84,47,0.33), transparent 70%)",
                filter: "blur(40px)",
                animation: "lokai-orb-float 8s ease-in-out infinite",
              }}
            />
            <div
              className="absolute pointer-events-none"
              style={{
                bottom: -30,
                left: -30,
                width: 140,
                height: 140,
                background: "radial-gradient(circle, rgba(245,184,69,0.25), transparent 70%)",
                filter: "blur(40px)",
                animation: "lokai-orb-float 10s ease-in-out -3s infinite reverse",
              }}
            />

            <ChatDemo />

            {/* Floating tag */}
            <div
              className="absolute font-mono text-[11px]"
              style={{
                top: 32,
                left: -28,
                background: "#0b0c0e",
                outline: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                padding: "6px 10px",
                color: "#f5b845",
                transform: "rotate(-4deg)",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.8)",
                letterSpacing: "0.04em",
              }}
            >
              ★ Realizuje się teraz
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <Ticker items={TICKER_ITEMS} />
    </section>
  );
}
