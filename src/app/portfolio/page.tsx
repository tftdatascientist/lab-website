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
    <section className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary block mb-6">
          Portfolio
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tighter text-on-surface mb-6">
          Realizacje w przygotowaniu
        </h1>
        <p className="text-on-surface-variant leading-relaxed text-lg mb-10 max-w-xl mx-auto">
          Dokumentujemy wdrożone projekty i przygotowujemy case studies.
          Wróć wkrótce lub napisz do nas — opowiemy o&nbsp;zrealizowanych
          automatyzacjach.
        </p>
        <Link
          href="/kontakt"
          className="inline-flex items-center px-8 py-3 text-sm font-bold text-on-primary obsidian-gradient rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all"
        >
          Porozmawiaj o projekcie →
        </Link>
      </div>
    </section>
  );
}
