import type { Metadata } from "next";
import Link from "next/link";
import PortfolioGrid from "./PortfolioGrid";
import SchemaOrg from "@/components/SchemaOrg";
import { SubpageHeader } from "@/components/mechanism";
import {
  generateWebPageSchema,
  generateItemListSchema,
  generateBreadcrumbSchema,
  graph,
} from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

// Lista realizacji (zsynchronizowana z PortfolioGrid) — dla ItemList schema.
const PORTFOLIO_ITEMS = [
  { name: "Micro-Serwis", url: "https://tftdatascientist.github.io/micro-serwis/" },
  { name: "Pro Athlete Grudziądz", url: "https://pro-athlete-grudziadz.razd.workers.dev/" },
  { name: "lok-ai", url: "https://lok-aipl.vercel.app/" },
  { name: "Szym znad Wisły", url: "https://guileless-phoenix-f8e896.netlify.app/" },
  { name: "Roof Unicorns", url: "https://tftdatascientist.github.io/roof-unicorns/" },
  { name: "Europump Polska", url: "https://src-lovat-tau.vercel.app/" },
  { name: "PCF Polska", url: "https://wwwpcfpl.vercel.app/" },
  { name: "AUTOmatyczni — Baza Wiedzy", url: "https://wwwiedza.vercel.app/" },
  { name: "Grudziądz — Historia w Obiektywie", url: "https://grudziadz-historia.vercel.app/" },
  { name: "Biuro Rachunkowe WEGA", url: "https://biurowega.vercel.app/" },
  { name: "Lokalna Automatyzacja Biznesu", url: "https://lokalna-automatyzacja-biznesu.vercel.app/" },
  { name: "RSG Clean", url: "https://clean-it-up-exterior.netlify.app/" },
  { name: "Strona za 500 zł", url: "https://www500pln.netlify.app/" },
  { name: "Claude Code /buddy", url: "https://claude-code-buddy.netlify.app/" },
  { name: "Portal Grudziądz", url: "https://portal-grudziadz-mvp.netlify.app/" },
  { name: "Claude Code Best Practices", url: "https://site-five-pearl-11.vercel.app/" },
];

const schema = graph(
  generateWebPageSchema({
    type: "CollectionPage",
    name: "Portfolio",
    path: "/portfolio",
    description:
      "Przykładowe realizacje stron internetowych — od serwisów lokalnych po portale biznesowe i landing page'e.",
  }),
  generateItemListSchema(
    "Portfolio realizacji lok-ai",
    PORTFOLIO_ITEMS,
    "Wybrane strony internetowe zaprojektowane i wdrożone przez lok-ai.",
  ),
  generateBreadcrumbSchema([
    { name: "Strona główna", url: "/" },
    { name: "Portfolio", url: "/portfolio" },
  ]),
);

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
    <>
      <SchemaOrg schema={schema} />
      <SubpageHeader
        eyebrow="Portfolio · Strony WWW"
        title="Zrealizowane"
        accent="projekty"
        cluster="portfolio"
        description="Wybrane strony internetowe zaprojektowane i wdrożone dla klientów z różnych branż."
      />

      <section className="py-12 px-8 max-w-[1280px] mx-auto">
        <PortfolioGrid />

      <Link
        href="/kontakt"
        className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl text-[15px]"
        style={{ padding: "14px 22px" }}
      >
        Zamów swoją stronę →
      </Link>
      </section>
    </>
  );
}
