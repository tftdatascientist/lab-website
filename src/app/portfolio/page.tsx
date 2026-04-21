import type { Metadata } from "next";
import Link from "next/link";
import PortfolioGrid from "./PortfolioGrid";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lok-ai.pl";

export const metadata: Metadata = {
  title: "Portfolio — lok-ai | Realizacje stron WWW",
  description:
    "Przykładowe realizacje stron internetowych — od serwisów lokalnych po portale biznesowe i landing page'e.",
  alternates: {
    canonical: `${SITE_URL}/portfolio`,
  },
};

export default function PortfolioPage() {
  return (
    <section className="py-[100px] px-8 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="max-w-[720px] mb-14">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-px" style={{ background: "#b8542f" }} />
          <span
            className="font-mono text-[11px] uppercase"
            style={{ color: "#b8542f", letterSpacing: "0.15em" }}
          >
            Portfolio · Strony WWW
          </span>
        </div>
        <h1
          className="font-heading font-bold text-text mb-4"
          style={{
            fontSize: "clamp(32px,4.5vw,56px)",
            letterSpacing: "-0.035em",
            lineHeight: 1,
          }}
        >
          Zrealizowane{" "}
          <span
            className="font-display font-medium italic"
            style={{ color: "#b8542f" }}
          >
            projekty
          </span>
        </h1>
        <p className="text-[16px] text-text-dim leading-relaxed">
          Wybrane strony internetowe zaprojektowane i&nbsp;wdrożone dla klientów
          z&nbsp;różnych branż.
        </p>
      </div>

      <PortfolioGrid />

      <Link
        href="/kontakt"
        className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl text-[15px]"
        style={{ padding: "14px 22px" }}
      >
        Zamów swoją stronę →
      </Link>
    </section>
  );
}
