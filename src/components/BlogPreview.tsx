import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

const COLOR_CYCLE = ["#f5b845", "#ef7955", "#d9b88a", "#b8542f"];

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 4);
  if (posts.length === 0) return null;

  const featured = posts[0];
  const rest = posts.slice(1, 4);

  const featuredColor = COLOR_CYCLE[0];

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("pl-PL", { day: "numeric", month: "short", year: "numeric" }).toUpperCase();
    } catch {
      return dateStr;
    }
  };

  const fm = featured.frontmatter;

  return (
    <section className="py-[100px] px-8 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between gap-8 mb-12 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-7 h-px" style={{ background: "#ef7955" }} />
            <span
              className="font-mono text-[11px] uppercase"
              style={{ color: "#ef7955", letterSpacing: "0.15em" }}
            >
              Blog · codzienny przegląd AI
            </span>
          </div>
          <h2
            className="font-heading font-bold text-text"
            style={{
              fontSize: "clamp(28px,4vw,48px)",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            Co się{" "}
            <span
              className="font-display font-medium italic"
              style={{ color: "#ef7955", letterSpacing: "-0.01em" }}
            >
              naprawdę
            </span>{" "}
            dzieje w&nbsp;AI w&nbsp;Polsce
          </h2>
        </div>
        <div className="flex items-center gap-2.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "#f5b845", animation: "lokai-pulse 2s ease-in-out infinite" }}
          />
          <span
            className="font-mono text-[11px] text-text-dim uppercase"
            style={{ letterSpacing: "0.1em" }}
          >
            Aktualizowane 4× dziennie
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-[1.3fr_1fr] gap-6">
        {/* Featured */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group relative block rounded-[16px] overflow-hidden no-underline text-text min-h-[420px] flex flex-col p-10 transition-all duration-200 hover:-translate-y-[3px]"
          style={{
            background: "#17181b",
            outline: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Blur orb */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: -60,
              right: -60,
              width: 280,
              height: 280,
              background: `radial-gradient(circle, ${featuredColor}40, transparent 70%)`,
              filter: "blur(50px)",
            }}
          />

          {/* Meta */}
          <div className="relative flex items-center gap-2.5 mb-6">
            <span
              className="font-mono text-[10px] uppercase"
              style={{ color: featuredColor, letterSpacing: "0.15em" }}
            >
              {fm.tags?.[0] ?? "BLOG"}
            </span>
            <span className="w-1 h-1 rounded-full" style={{ background: "#78716c" }} />
            <span className="font-mono text-[10px] text-text-mute" style={{ letterSpacing: "0.1em" }}>
              {formatDate(fm.date)}
            </span>
          </div>

          {/* Title */}
          <div className="relative flex-1 flex items-center">
            <h3
              className="font-heading font-bold text-text"
              style={{ fontSize: "clamp(22px,2.5vw,36px)", letterSpacing: "-0.025em", lineHeight: 1.1 }}
            >
              {fm.title}
            </h3>
          </div>

          {fm.excerpt && (
            <p
              className="relative text-[15px] text-text-dim leading-[1.55] my-5"
              style={{ maxWidth: 560 }}
            >
              {fm.excerpt}
            </p>
          )}

          <div
            className="relative flex items-center gap-2 text-[13px] font-semibold"
            style={{ color: featuredColor }}
          >
            Czytaj dalej <span aria-hidden="true">→</span>
          </div>
        </Link>

        {/* Rest */}
        <div className="flex flex-col gap-3">
          {rest.map((post, i) => {
            const color = COLOR_CYCLE[(i + 1) % COLOR_CYCLE.length];
            const pfm = post.frontmatter;
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative block rounded-[16px] overflow-hidden no-underline text-text flex-1 flex flex-col gap-2.5 p-6 transition-all duration-200 hover:-translate-y-[3px]"
                style={{
                  background: "#17181b",
                  outline: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="font-mono text-[10px] uppercase"
                    style={{ color, letterSpacing: "0.15em" }}
                  >
                    {pfm.tags?.[0] ?? "BLOG"}
                  </span>
                  <span className="w-1 h-1 rounded-full" style={{ background: "#78716c" }} />
                  <span className="font-mono text-[10px] text-text-mute">
                    {formatDate(pfm.date)}
                  </span>
                </div>
                <h4
                  className="font-heading font-semibold text-text"
                  style={{ fontSize: 17, letterSpacing: "-0.015em", lineHeight: 1.3 }}
                >
                  {pfm.title}
                </h4>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-8 sm:hidden">
        <Link href="/blog" className="text-sm text-text-dim hover:text-text transition-colors">
          Wszystkie artykuły →
        </Link>
      </div>
    </section>
  );
}
