import Link from "next/link";
import Image from "next/image";
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
        <div className="flex items-center gap-4">
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
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] uppercase transition-colors hover:text-text"
            style={{ color: "#f5b845", letterSpacing: "0.1em" }}
          >
            Wszystkie artykuły <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-[1.3fr_1fr] gap-6">
        {/* Featured */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group relative block rounded-[16px] overflow-hidden no-underline text-text flex flex-col transition-all duration-200 hover:-translate-y-[3px]"
          style={{
            background: "#17181b",
            outline: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Cover image */}
          {fm.image ? (
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <Image
                src={fm.image}
                alt={fm.title}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, transparent 50%, #17181b 100%)" }}
              />
            </div>
          ) : (
            /* Placeholder gradient when no image */
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "16/9", background: `linear-gradient(135deg, ${featuredColor}18, #17181b)` }}
            >
              <div
                className="absolute"
                style={{
                  top: -40, right: -40, width: 220, height: 220,
                  background: `radial-gradient(circle, ${featuredColor}30, transparent 70%)`,
                  filter: "blur(40px)",
                }}
              />
            </div>
          )}

          {/* Content */}
          <div className="relative flex flex-col flex-1 p-8">
            {/* Meta */}
            <div className="flex items-center gap-2.5 mb-4">
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
              {fm.readTime && (
                <>
                  <span className="w-1 h-1 rounded-full" style={{ background: "#78716c" }} />
                  <span className="font-mono text-[10px] text-text-mute">{fm.readTime}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h3
              className="font-heading font-bold text-text mb-3"
              style={{ fontSize: "clamp(20px,2.2vw,30px)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
            >
              {fm.title}
            </h3>

            {fm.excerpt && (
              <p className="text-[14px] text-text-dim leading-[1.55] mb-5 flex-1" style={{ maxWidth: 520 }}>
                {fm.excerpt}
              </p>
            )}

            <div
              className="flex items-center gap-2 text-[13px] font-semibold mt-auto"
              style={{ color: featuredColor }}
            >
              Czytaj dalej <span aria-hidden="true">→</span>
            </div>
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
                className="group relative flex gap-4 rounded-[16px] overflow-hidden no-underline text-text flex-1 p-5 transition-all duration-200 hover:-translate-y-[3px]"
                style={{
                  background: "#17181b",
                  outline: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Thumbnail */}
                {pfm.image ? (
                  <div
                    className="relative shrink-0 rounded-[10px] overflow-hidden"
                    style={{ width: 88, height: 66 }}
                  >
                    <Image
                      src={pfm.image}
                      alt={pfm.title}
                      fill
                      sizes="88px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                  </div>
                ) : (
                  <div
                    className="shrink-0 rounded-[10px]"
                    style={{
                      width: 88, height: 66,
                      background: `linear-gradient(135deg, ${color}20, #1f2125)`,
                    }}
                  />
                )}

                {/* Text */}
                <div className="flex flex-col justify-between min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="font-mono text-[10px] uppercase"
                      style={{ color, letterSpacing: "0.15em" }}
                    >
                      {pfm.tags?.[0] ?? "BLOG"}
                    </span>
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "#78716c" }} />
                    <span className="font-mono text-[10px] text-text-mute whitespace-nowrap">
                      {formatDate(pfm.date)}
                    </span>
                  </div>
                  <h4
                    className="font-heading font-semibold text-text line-clamp-3"
                    style={{ fontSize: 14, letterSpacing: "-0.01em", lineHeight: 1.35 }}
                  >
                    {pfm.title}
                  </h4>
                </div>
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
