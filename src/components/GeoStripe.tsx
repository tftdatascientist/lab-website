import Image from "next/image";

const TILES = [
  {
    eyebrow: "Lokalnie",
    title: "Polska. Twój region. Twój język.",
    body: "Bielik, polskie LLM-y, lokalne integracje (KSeF, ZUS, GUS, Allegro, IFirma). Pracujemy stacjonarnie w Bydgoszczy, Toruniu i Grudziądzu — i zdalnie w całej Polsce.",
    stat: { v: "23", l: "firm w regionie" },
    img: "/images/geo/polska-gold.jpg",
    accent: "#f5b845" as const,
  },
  {
    eyebrow: "Globalnie",
    title: "Wszędzie tam, gdzie są Twoi klienci.",
    body: "Łączymy z 400+ API: Stripe, Shopify, HubSpot, Salesforce, Slack, WhatsApp, Twilio. AI nie ma granic — Twój biznes też nie musi.",
    stat: { v: "400+", l: "integracji API" },
    img: "/images/geo/world-coral.jpg",
    accent: "#ef7955" as const,
  },
];

export default function GeoStripe() {
  return (
    <section className="relative px-8 py-16 max-w-[1280px] mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-7 h-px" style={{ background: "#f5b845" }} />
        <span
          className="font-mono text-[11px] uppercase"
          style={{ color: "#f5b845", letterSpacing: "0.15em" }}
        >
          Skala działania
        </span>
      </div>

      <h2
        className="font-heading font-bold text-text mb-14"
        style={{
          fontSize: "clamp(32px,4vw,56px)",
          letterSpacing: "-0.035em",
          lineHeight: 1,
          maxWidth: 900,
        }}
      >
        Lokalnie zakorzenieni,{" "}
        <span className="font-display font-medium italic" style={{ color: "#f5b845" }}>
          globalnie
        </span>{" "}
        spięci.
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {TILES.map((tile) => (
          <article
            key={tile.eyebrow}
            className="relative overflow-hidden"
            style={{
              minHeight: 420,
              borderRadius: 20,
              background: "#17181b",
              outline: "1px solid rgba(255,255,255,0.08)",
              isolation: "isolate",
            }}
          >
            {/* Radial tint background */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 85% 60%, ${tile.accent}22, transparent 65%), #17181b`,
                zIndex: 0,
              }}
            />

            {/* Artwork — right 60%, blend+mask */}
            <div
              className="absolute top-0 bottom-0 right-0 pointer-events-none"
              style={{
                width: "60%",
                mixBlendMode: "screen",
                filter: "saturate(0.95) brightness(1.05)",
                maskImage: "linear-gradient(90deg, transparent 0%, #000 35%, #000 100%)",
                WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 35%, #000 100%)",
                opacity: 0.92,
                zIndex: 1,
              }}
            >
              <Image
                src={tile.img}
                alt=""
                fill
                sizes="(max-width: 768px) 60vw, 30vw"
                className="object-cover object-right"
                aria-hidden="true"
              />
            </div>

            {/* Vignette — text zone stays clean */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(90deg, #17181b 0%, transparent 55%)`,
                zIndex: 2,
              }}
            />

            {/* Top hairline accent */}
            <div
              className="absolute top-0 left-0 right-0 pointer-events-none"
              style={{
                height: 1,
                background: `linear-gradient(90deg, transparent, ${tile.accent}, transparent)`,
                opacity: 0.7,
                zIndex: 3,
              }}
            />

            {/* Text block */}
            <div
              className="relative h-full flex flex-col"
              style={{
                zIndex: 4,
                padding: "36px 36px 32px",
                maxWidth: "60%",
                gap: 14,
              }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5">
                <span
                  className="rounded-full"
                  style={{
                    width: 6,
                    height: 6,
                    background: tile.accent,
                    animation: "lokai-pulse 2s ease-in-out infinite",
                    flexShrink: 0,
                  }}
                />
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: 11, letterSpacing: "0.18em", color: tile.accent }}
                >
                  {tile.eyebrow}
                </span>
              </div>

              <h3
                className="font-heading font-bold text-text"
                style={{
                  fontSize: 30,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                {tile.title}
              </h3>

              <p
                className="text-text-dim"
                style={{ fontSize: 14, lineHeight: 1.6, margin: 0, maxWidth: 360 }}
              >
                {tile.body}
              </p>

              {/* Stat */}
              <div
                className="flex items-baseline gap-3 mt-auto pt-6"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span
                  className="num font-heading font-bold"
                  style={{ fontSize: 28, color: tile.accent }}
                >
                  {tile.stat.v}
                </span>
                <span className="font-mono text-text-mute" style={{ fontSize: 12 }}>
                  {tile.stat.l}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
