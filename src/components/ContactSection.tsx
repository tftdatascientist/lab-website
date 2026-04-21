"use client";

import { useState } from "react";

const BENEFITS = [
  "Audyt procesów — pokazujemy co można zautomatyzować",
  "Szybkie wygrane — gdzie zysk jest natychmiastowy",
  "Szacunek kosztów i oszczędności",
  "Konkretny plan na kolejny krok",
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      setStatus(res.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    }
  };

  return (
    <section className="py-[100px] px-8 max-w-[1280px] mx-auto">
      <div
        className="grid md:grid-cols-2 rounded-[24px] overflow-hidden"
        style={{ outline: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Left */}
        <div
          className="relative overflow-hidden p-14"
          style={{
            background:
              "radial-gradient(circle at 20% 0%, rgba(196,138,28,0.18), transparent 60%), #17181b",
          }}
        >
          {/* Blur orb */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: 20,
              right: 20,
              width: 240,
              height: 240,
              background: "radial-gradient(circle, rgba(245,184,69,0.12), transparent 70%)",
              filter: "blur(40px)",
              animation: "lokai-orb-float 10s ease-in-out infinite",
            }}
          />

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(245,184,69,0.08)",
              outline: "1px solid rgba(245,184,69,0.2)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#f5b845", animation: "lokai-pulse 1.8s ease-in-out infinite" }}
            />
            <span
              className="font-mono text-[10px] uppercase"
              style={{ color: "#f5b845", letterSpacing: "0.12em" }}
            >
              Bezpłatna konsultacja
            </span>
          </div>

          <h3
            className="relative font-heading font-bold text-text mb-5"
            style={{
              fontSize: "clamp(28px,3.5vw,42px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              maxWidth: 440,
            }}
          >
            30 minut, które mogą{" "}
            <span
              className="font-display font-medium italic"
              style={{ color: "#f5b845", letterSpacing: "-0.01em" }}
            >
              zmienić
            </span>{" "}
            sposób pracy Twojej firmy
          </h3>

          <ul className="space-y-3 mb-8">
            {BENEFITS.map((t) => (
              <li key={t} className="flex gap-3 text-[14px] text-text-dim leading-relaxed">
                <span className="font-bold shrink-0" style={{ color: "#f5b845" }}>✓</span>
                {t}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 font-mono text-[12px] text-text-mute">
            <span>kontakt@lok-ai.pl</span>
            <span>·</span>
            <span>+48 534 541 454</span>
          </div>
        </div>

        {/* Right — form */}
        <div
          className="flex flex-col gap-4 p-14"
          style={{ background: "#121315" }}
        >
          {status === "ok" ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-8">
              <span className="text-4xl">✓</span>
              <p className="font-heading font-bold text-text text-xl">Wysłano!</p>
              <p className="text-text-dim text-sm">Odezwiemy się w ciągu 24&nbsp;godzin.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { id: "name", label: "Imię i firma", placeholder: "Anna Kowalska, Kowalscy sp. z o.o.", type: "text" },
                { id: "email", label: "Email", placeholder: "anna@kowalscy.pl", type: "email" },
              ].map((f) => (
                <div key={f.id}>
                  <label
                    htmlFor={f.id}
                    className="block font-mono text-[11px] uppercase text-text-dim mb-2"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    value={form[f.id as keyof typeof form]}
                    onChange={(e) => setForm((p) => ({ ...p, [f.id]: e.target.value }))}
                    className="w-full rounded-[10px] text-[14px] text-text placeholder-text-mute bg-surface outline-none transition-all"
                    style={{
                      padding: "12px 14px",
                      outline: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.outlineColor = "rgba(245,184,69,0.4)")}
                    onBlur={(e) => (e.currentTarget.style.outlineColor = "rgba(255,255,255,0.08)")}
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="message"
                  className="block font-mono text-[11px] uppercase text-text-dim mb-2"
                  style={{ letterSpacing: "0.1em" }}
                >
                  Co chcesz zautomatyzować?
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  placeholder="Np. umawianie wizyt, obsługa reklamacji, wystawianie faktur…"
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className="w-full rounded-[10px] text-[14px] text-text placeholder-text-mute resize-y bg-surface"
                  style={{
                    padding: "12px 14px",
                    outline: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.outlineColor = "rgba(245,184,69,0.4)")}
                  onBlur={(e) => (e.currentTarget.style.outlineColor = "rgba(255,255,255,0.08)")}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary mt-2 rounded-xl text-[15px] font-bold disabled:opacity-60"
                style={{ padding: "14px 22px" }}
              >
                {status === "sending" ? "Wysyłanie…" : "Umów konsultację →"}
              </button>

              {status === "err" && (
                <p className="text-[12px]" style={{ color: "#ef7955" }}>
                  Coś poszło nie tak. Napisz na kontakt@lok-ai.pl
                </p>
              )}

              <p className="text-[11px] text-text-mute">
                Odpowiadamy w&nbsp;ciągu 24&nbsp;godzin. Bez&nbsp;zobowiązań, bez&nbsp;sprzedawania.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
