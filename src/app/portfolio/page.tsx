import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lok-ai.pl";

export const metadata: Metadata = {
  title: "Portfolio — lok-ai | Realizacje i wdrożenia AI",
  description:
    "Nasze realizacje — automatyzacje n8n, chatboty AI i agenci głosowi wdrożeni dla firm z kujawsko-pomorskiego. Strona w przygotowaniu.",
  alternates: {
    canonical: `${SITE_URL}/portfolio`,
  },
};

export default function PortfolioPage() {
  return (
    <section className="py-[100px] px-8 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="max-w-[680px] mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-px" style={{ background: "#b8542f" }} />
          <span
            className="font-mono text-[11px] uppercase"
            style={{ color: "#b8542f", letterSpacing: "0.15em" }}
          >
            Portfolio
          </span>
        </div>
        <h1
          className="font-heading font-bold text-text mb-6"
          style={{
            fontSize: "clamp(32px,4.5vw,56px)",
            letterSpacing: "-0.035em",
            lineHeight: 1,
          }}
        >
          Realizacje{" "}
          <span
            className="font-display font-medium italic"
            style={{ color: "#b8542f" }}
          >
            w przygotowaniu
          </span>
        </h1>
        <p className="text-[16px] text-text-dim leading-relaxed">
          Dokumentujemy wdrożone projekty i&nbsp;przygotowujemy case studies.
          Wróć wkrótce lub napisz do nas — opowiemy o&nbsp;zrealizowanych
          automatyzacjach.
        </p>
      </div>

      {/* Placeholder cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[18px] mb-14">
        {[
          { tag: "AUTOMATYZACJA", color: "#d9b88a" },
          { tag: "CHATBOT AI", color: "#f5b845" },
          { tag: "AGENT GŁOSOWY", color: "#b8542f" },
        ].map((item) => (
          <div
            key={item.tag}
            className="relative rounded-[16px] overflow-hidden"
            style={{
              background: "#17181b",
              outline: "1px solid rgba(255,255,255,0.08)",
              minHeight: 220,
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                opacity: 0.4,
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span
                className="font-mono text-[10px] uppercase"
                style={{ color: item.color, letterSpacing: "0.15em" }}
              >
                {item.tag}
              </span>
              <span className="text-[12px] text-text-mute">Wkrótce</span>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/kontakt"
        className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl text-[15px]"
        style={{ padding: "14px 22px" }}
      >
        Porozmawiaj o projekcie →
      </Link>
    </section>
  );
}
