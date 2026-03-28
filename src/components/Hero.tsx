"use client";

import { useState, useEffect } from "react";

const HEADLINE = "Automatyzacja i AI dla biznesu";
const TYPE_SPEED = 55;

const stats = [
  { value: "400+", label: "integracji API" },
  { value: "24/7", label: "chatbot AI" },
  { value: "<48h", label: "wdrożenie" },
  { value: "0 zł", label: "konsultacja" },
];

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (displayText.length < HEADLINE.length) {
      const timeout = setTimeout(() => {
        setDisplayText(HEADLINE.slice(0, displayText.length + 1));
      }, TYPE_SPEED);
      return () => clearTimeout(timeout);
    }
  }, [displayText]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan/20 bg-cyan/10 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-cyan">
                Pomorze &amp; Kujawy
              </span>
            </div>

            {/* H1 */}
            <h1 className="font-heading text-[clamp(36px,5vw,56px)] font-extrabold leading-[1.1] tracking-[-1.5px] text-text-primary mb-6">
              {displayText}
              <span
                className={`inline-block w-[3px] h-[0.85em] bg-cyan ml-1 align-middle transition-opacity ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              />
            </h1>

            {/* Paragraph */}
            <p className="text-lg text-text-secondary leading-relaxed max-w-xl mb-8">
              Wdrażamy{" "}
              <span className="text-amber font-medium">
                inteligentne automatyzacje
              </span>{" "}
              i&nbsp;rozwiązania AI dla małych i&nbsp;średnich firm z&nbsp;regionu
              kujawsko-pomorskiego. Chatboty, agenci głosowi, integracje
              systemów&nbsp;—{" "}
              <span className="text-amber font-medium">
                bez kodu, z&nbsp;pełnym wsparciem
              </span>
              .
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#demo"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan to-blue-500 rounded-full hover:shadow-[0_0_24px_rgba(0,212,255,0.35)] transition-shadow"
              >
                Przetestuj chatbota AI →
              </a>
              <a
                href="#uslugi"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-text-secondary border border-white/[0.12] rounded-full hover:text-text-primary hover:border-white/[0.24] transition-colors"
              >
                Zobacz realizacje
              </a>
            </div>
          </div>

          {/* Right — stat cards */}
          <div className="hidden lg:block relative">
            {/* Glow */}
            <div className="absolute inset-0 -m-12 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.12)_0%,transparent_70%)] animate-pulse" />

            <div className="relative grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/[0.06] bg-bg-card p-6 hover:bg-bg-card-hover hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,212,255,0.08)] transition-all duration-300"
                >
                  <span className="block font-heading text-3xl font-bold bg-gradient-to-r from-cyan to-amber bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                  <span className="block mt-1 text-sm text-text-secondary">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
