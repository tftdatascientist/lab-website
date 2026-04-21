import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lok-ai.pl";

export const metadata: Metadata = {
  title: "Portfolio — lok-ai | Realizacje stron WWW",
  description:
    "Przykładowe realizacje stron internetowych — od serwisów lokalnych po portale biznesowe i landing page'e.",
  alternates: {
    canonical: `${SITE_URL}/portfolio`,
  },
};

const ACCENT_CYCLE = ["#d9b88a", "#f5b845", "#ef7955", "#b8542f"];

const PROJECTS = [
  {
    name: "Micro-Serwis",
    desc: "Serwis komputerów i elektroniki — Grudziądz",
    url: "https://tftdatascientist.github.io/micro-serwis/",
  },
  {
    name: "Pro Athlete Grudziądz",
    desc: "Klub lekkoatletyczny — strona zawodnicza",
    url: "https://pro-athlete-grudziadz.razd.workers.dev/",
  },
  {
    name: "lok-ai",
    desc: "Automatyzacja i AI dla firm — Grudziądz, Toruń, Bydgoszcz",
    url: "https://lok-aipl.vercel.app/",
  },
  {
    name: "Szym znad Wisły",
    desc: "Portfolio snycerza artystycznego",
    url: "https://guileless-phoenix-f8e896.netlify.app/",
  },
  {
    name: "Roof Unicorns",
    desc: "Landing page — startup z humorem",
    url: "https://tftdatascientist.github.io/roof-unicorns/",
  },
  {
    name: "Europump Polska",
    desc: "Dostawca wyposażenia stacji paliw — LPG, LNG, CNG",
    url: "https://src-lovat-tau.vercel.app/",
  },
  {
    name: "PCF Polska",
    desc: "Strona korporacyjna organizacji",
    url: "https://wwwpcfpl.vercel.app/",
  },
  {
    name: "AUTOmatyczni — Baza Wiedzy",
    desc: "Baza wiedzy o automatycznych skrzyniach biegów",
    url: "https://wwwiedza.vercel.app/",
  },
  {
    name: "Grudziądz — Historia w Obiektywie",
    desc: "Archiwalne fotografie miasta odrestaurowane przez AI",
    url: "https://grudziadz-historia.vercel.app/",
  },
  {
    name: "Biuro Rachunkowe WEGA",
    desc: "Profesjonalna księgowość — Włocławek",
    url: "https://biurowega.vercel.app/",
  },
  {
    name: "Lokalna Automatyzacja Biznesu",
    desc: "Landing page — AI i automatyzacja dla firm",
    url: "https://lokalna-automatyzacja-biznesu.vercel.app/",
  },
  {
    name: "RSG Clean",
    desc: "Profesjonalne mycie elewacji i dachów — Gloucester",
    url: "https://clean-it-up-exterior.netlify.app/",
  },
  {
    name: "Strona za 500 zł",
    desc: "Landing page — strony internetowe dla małych firm",
    url: "https://www500pln.netlify.app/",
  },
  {
    name: "Claude Code /buddy",
    desc: "Kompletny przewodnik po funkcji wirtualnego zwierzaka Claude Code",
    url: "https://claude-code-buddy.netlify.app/",
  },
  {
    name: "Portal Grudziądz",
    desc: "Portal miejski — historia, ludzie, biznes",
    url: "https://portal-grudziadz-mvp.netlify.app/",
  },
  {
    name: "Claude Code Best Practices",
    desc: "Baza wiedzy — ponad 164 wskazówki do pracy z Claude Code",
    url: "https://site-five-pearl-11.vercel.app/",
  },
];

function screenshotUrl(url: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
}

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

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[18px] mb-14">
        {PROJECTS.map((project, i) => {
          const c = ACCENT_CYCLE[i % ACCENT_CYCLE.length];
          return (
            <a
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-[16px] overflow-hidden transition-all duration-200 hover:-translate-y-[3px]"
              style={{
                background: "#17181b",
                outline: "1px solid rgba(255,255,255,0.08)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.outlineColor = c + "66";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.outlineColor =
                  "rgba(255,255,255,0.08)";
              }}
            >
              {/* Screenshot */}
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "16/9", background: "#1f2125" }}
              >
                <Image
                  src={screenshotUrl(project.url)}
                  alt={project.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  unoptimized
                />
                {/* Overlay gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ background: "rgba(11,12,14,0.55)" }}
                >
                  <span
                    className="font-mono text-[11px] uppercase"
                    style={{ color: c, letterSpacing: "0.15em" }}
                  >
                    Otwórz →
                  </span>
                </div>
              </div>

              {/* Top accent line */}
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${c}, transparent)`,
                  opacity: 0.5,
                }}
              />

              {/* Info */}
              <div className="p-5">
                <h2
                  className="font-heading font-semibold text-text mb-1"
                  style={{ fontSize: 15, letterSpacing: "-0.01em" }}
                >
                  {project.name}
                </h2>
                <p className="text-[12px] text-text-mute leading-relaxed">
                  {project.desc}
                </p>
              </div>
            </a>
          );
        })}
      </div>

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
