/**
 * Motyw "mechanizm" — kit graficzny z Claude Design (Charakter lokalny dla lok-ai.pl).
 * Proceduralne zębatki line-art (currentColor), subtelnie animowane. Server components —
 * animacja w CSS (klasy mech-cw/mech-ccw, @keyframes mech-spin w globals.css).
 * Respektuje prefers-reduced-motion. Kolory = tokeny amber/sand/rust/coral.
 */
import * as React from "react";

const A = "#f5b845"; // amber
const S = "#d9b88a"; // sand
const R = "#b8542f"; // rust
const C = "#ef7955"; // coral

type Dir = "cw" | "ccw" | "static";

function spinClass(dir: Dir): string {
  if (dir === "static") return "mech-spin";
  return dir === "cw" ? "mech-cw" : "mech-ccw";
}

// ── Proceduralny obrys koła zębatego (port cogPath z makiety) ───────────────
function cogPath(cx: number, cy: number, teeth: number, rp: number, hub?: number) {
  const m = rp / (teeth / 2);
  const rOut = rp + m * 0.62;
  const rRoot = rp - m * 0.8;
  const P = (r: number, a: number) => [(cx + r * Math.cos(a)).toFixed(2), (cy + r * Math.sin(a)).toFixed(2)];
  const step = (Math.PI * 2) / teeth;
  let d = "";
  for (let i = 0; i < teeth; i++) {
    const b = i * step;
    const a0 = P(rRoot, b);
    const a1 = P(rOut, b + step * 0.22);
    const a2 = P(rOut, b + step * 0.4);
    const a3 = P(rRoot, b + step * 0.6);
    d += (i === 0 ? "M" : "L") + a0[0] + " " + a0[1] + " ";
    d += "L" + a1[0] + " " + a1[1] + " L" + a2[0] + " " + a2[1] + " L" + a3[0] + " " + a3[1] + " ";
  }
  d += "Z";
  return { d, rOut, rRoot, hub: hub != null ? hub : Math.max(4, rp * 0.32) };
}

interface GearProps {
  cx: number;
  cy: number;
  teeth: number;
  rp: number;
  color?: string;
  sw?: number;
  dir?: Dir;
  dur?: number;
  hub?: number;
  dot?: boolean;
  gkey?: string;
}

/** Pojedyncze koło zębate jako <g> (do umieszczenia w <svg>). */
export function Gear({ cx, cy, teeth, rp, color = "currentColor", sw = 1.6, dir = "cw", dur = 40, hub, dot = true, gkey }: GearProps) {
  const g = cogPath(cx, cy, teeth, rp, hub);
  const spokes: string[] = [];
  for (let k = 0; k < 4; k++) {
    const a = (k * Math.PI) / 2 + 0.32;
    spokes.push(
      "M" + (cx + g.hub * Math.cos(a)).toFixed(2) + " " + (cy + g.hub * Math.sin(a)).toFixed(2) +
        "L" + (cx + (g.rRoot - 1.5) * Math.cos(a)).toFixed(2) + " " + (cy + (g.rRoot - 1.5) * Math.sin(a)).toFixed(2),
    );
  }
  return (
    <g key={gkey} className={spinClass(dir)} style={{ ["--mech-d" as string]: dur + "s" }}>
      <path d={g.d} fill="none" stroke={color} strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={g.hub} fill="none" stroke={color} strokeWidth={sw} />
      <path d={spokes.join(" ")} fill="none" stroke={color} strokeWidth={sw * 0.8} strokeOpacity={0.65} strokeLinecap="round" />
      {dot && <circle cx={cx} cy={cy} r={Math.max(1.8, g.hub * 0.3)} fill={color} />}
    </g>
  );
}

/** Kamień młyński (port millstoneG) — motyw "tradycja". */
export function Millstone({ cx, cy, r, color = "currentColor", sw = 1.6, dir = "cw", dur = 90, gkey }: { cx: number; cy: number; r: number; color?: string; sw?: number; dir?: Dir; dur?: number; gkey?: string }) {
  const P = (rr: number, a: number) => [(cx + rr * Math.cos(a)).toFixed(2), (cy + rr * Math.sin(a)).toFixed(2)];
  const grooves: string[] = [];
  const n = 12;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const s = P(r * 0.2, a);
    const e = P(r * 0.96, a + 0.26);
    grooves.push("M" + s[0] + " " + s[1] + "L" + e[0] + " " + e[1]);
  }
  return (
    <g key={gkey} className={spinClass(dir)} style={{ ["--mech-d" as string]: dur + "s" }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={r * 0.62} fill="none" stroke={color} strokeWidth={sw * 0.85} strokeOpacity={0.7} />
      <circle cx={cx} cy={cy} r={r * 0.16} fill="none" stroke={color} strokeWidth={sw} />
      <path d={grooves.join(" ")} fill="none" stroke={color} strokeWidth={sw * 0.7} strokeOpacity={0.55} strokeLinecap="round" />
    </g>
  );
}

/** Mała zębatka inline (dzielniki, tagi, ikona wyszukiwarki, toggle FAQ). */
export function TinyGear({ dir = "cw", dur = 22, size = 14, color = "currentColor", className }: { dir?: Dir; dur?: number; size?: number; color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }} className={className} aria-hidden="true">
      <Gear cx={12} cy={12} teeth={8} rp={7} color={color} sw={1.5} dir={dir} dur={dur} hub={2.6} />
    </svg>
  );
}

/** Znak logo — wolno obracające się koło zębate z rdzeniem (motyw mechanizmu). */
export function MechanismLogoMark({ size = 30, color = A }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 36 36" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }} aria-hidden="true">
      <Gear cx={18} cy={18} teeth={9} rp={12} color={color} sw={2} dir="cw" dur={16} hub={4.5} dot={false} />
      <circle cx={18} cy={18} r={4.5} fill="none" stroke={color} strokeWidth={2} />
      <circle cx={18} cy={18} r={2} fill={color} />
    </svg>
  );
}

// ── Klastry zębatek tła nagłówków (port hdr* z makiety) ─────────────────────
type ClusterKind = "slownik" | "faq" | "procesy" | "blog" | "portfolio" | "tech";

interface ClusterDef {
  vb: string;
  w: number | string;
  h: number | string;
  preserve?: string;
  render: () => React.ReactNode;
}

const CLUSTERS: Record<ClusterKind, ClusterDef> = {
  slownik: {
    vb: "0 0 600 320", w: 600, h: 320,
    render: () => (
      <>
        <Gear gkey="h0" cx={150} cy={150} teeth={20} rp={92} color={A} sw={1.4} dir="cw" dur={110} />
        <Gear gkey="h1" cx={288} cy={92} teeth={13} rp={58.5} color={S} sw={1.4} dir="ccw" dur={70} />
        <Millstone gkey="h2" cx={440} cy={200} r={80} color={S} sw={1.4} dir="cw" dur={130} />
      </>
    ),
  },
  faq: {
    vb: "0 0 420 360", w: 420, h: 360,
    render: () => (
      <>
        <Gear gkey="f0" cx={300} cy={120} teeth={18} rp={100} color={S} sw={1.5} dir="cw" dur={120} />
        <Gear gkey="f1" cx={170} cy={250} teeth={11} rp={60} color={S} sw={1.5} dir="ccw" dur={70} />
      </>
    ),
  },
  procesy: {
    vb: "0 0 600 320", w: 600, h: 320,
    render: () => (
      <>
        <Gear gkey="p0" cx={130} cy={150} teeth={20} rp={90} color={A} sw={1.4} dir="cw" dur={100} />
        <Gear gkey="p1" cx={268} cy={206} teeth={13} rp={58.5} color={A} sw={1.4} dir="ccw" dur={65} />
        <Gear gkey="p2" cx={354} cy={150} teeth={9} rp={40.5} color={S} sw={1.4} dir="cw" dur={45} />
      </>
    ),
  },
  blog: {
    vb: "0 0 1000 160", w: "100%", h: "100%", preserve: "xMidYMax meet",
    render: () => (
      <>
        {[110, 218, 320, 428, 530, 638, 740, 848].map((x, i) =>
          i % 2 === 0 ? (
            <Gear key={x} gkey={"b" + i} cx={x} cy={100} teeth={12} rp={56} color={A} sw={1.4} dir="cw" dur={50} />
          ) : (
            <Gear key={x} gkey={"b" + i} cx={x} cy={100} teeth={8} rp={37} color={S} sw={1.4} dir="ccw" dur={33} />
          ),
        )}
      </>
    ),
  },
  portfolio: {
    vb: "0 0 360 360", w: 360, h: 360,
    render: () => (
      <>
        <Gear gkey="q0" cx={220} cy={150} teeth={18} rp={96} color={R} sw={1.5} dir="cw" dur={110} />
        <Gear gkey="q1" cx={90} cy={240} teeth={11} rp={58} color={R} sw={1.5} dir="ccw" dur={64} />
        <Gear gkey="q2" cx={120} cy={110} teeth={8} rp={40} color={S} sw={1.5} dir="cw" dur={44} />
      </>
    ),
  },
  tech: {
    vb: "0 0 600 340", w: 600, h: 340,
    render: () => (
      <>
        <Gear gkey="t0" cx={140} cy={130} teeth={22} rp={92} color={A} sw={1.4} dir="cw" dur={120} />
        <Gear gkey="t1" cx={290} cy={250} teeth={14} rp={60} color={A} sw={1.4} dir="ccw" dur={75} />
        <Gear gkey="t2" cx={420} cy={150} teeth={9} rp={40.5} color={S} sw={1.4} dir="cw" dur={48} />
      </>
    ),
  },
};

/** Surowy klaster zębatek (dekoracyjne tło nagłówka). */
export function GearCluster({ kind }: { kind: ClusterKind }) {
  const c = CLUSTERS[kind];
  return (
    <svg viewBox={c.vb} width={c.w} height={c.h} preserveAspectRatio={c.preserve} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }} aria-hidden="true">
      {c.render()}
    </svg>
  );
}

// ── Ikony usług (port icon1..6, line-art currentColor) ──────────────────────
type ServiceIconName = "automatyzacja" | "chatbot" | "agent-glosowy" | "rag" | "dashboard" | "integracje";

function IconBase({ children, size = 72 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {children}
    </svg>
  );
}

const SERVICE_ICONS: Record<ServiceIconName, React.ReactNode> = {
  automatyzacja: (
    <>
      <Gear gkey="g1" cx={30} cy={42} teeth={11} rp={16} sw={1.7} dir="cw" dur={24} hub={5} />
      <Gear gkey="g2" cx={55} cy={26} teeth={8} rp={10} sw={1.7} dir="ccw" dur={17} hub={3.5} />
      <path d="M14 64 L60 64" strokeWidth={1.6} strokeDasharray="2 4" strokeOpacity={0.7} />
      <path d="M55 60 L61 64 L55 68" strokeWidth={1.7} />
    </>
  ),
  chatbot: (
    <>
      <path d="M18 16 Q12 16 12 22 L12 42 Q12 48 18 48 L28 48 L24 58 L40 48 L58 48 Q64 48 64 42 L64 22 Q64 16 58 16 Z" strokeWidth={1.7} />
      <Gear gkey="g" cx={38} cy={32} teeth={9} rp={11} sw={1.6} dir="cw" dur={20} hub={3.6} />
    </>
  ),
  "agent-glosowy": (
    <>
      <Gear gkey="g" cx={30} cy={40} teeth={9} rp={13} sw={1.7} dir="cw" dur={20} hub={4.5} />
      <path d="M50 30 Q57 40 50 50" strokeWidth={1.7} strokeOpacity={0.85} />
      <path d="M57 24 Q68 40 57 56" strokeWidth={1.7} strokeOpacity={0.55} />
      <path d="M64 18 Q78 40 64 62" strokeWidth={1.7} strokeOpacity={0.3} />
    </>
  ),
  rag: (
    <>
      <Gear gkey="g" cx={40} cy={24} teeth={8} rp={11} sw={1.7} dir="cw" dur={22} hub={3.6} />
      <ellipse cx={40} cy={44} rx={22} ry={6} strokeWidth={1.7} />
      <ellipse cx={40} cy={53} rx={22} ry={6} strokeWidth={1.7} strokeOpacity={0.7} />
      <ellipse cx={40} cy={62} rx={22} ry={6} strokeWidth={1.7} strokeOpacity={0.45} />
    </>
  ),
  dashboard: (
    <>
      <path d="M14 52 A26 26 0 0 1 66 52" strokeWidth={1.7} />
      <path d="M14 52 L18 52" strokeWidth={1.5} strokeOpacity={0.6} />
      <path d="M40 26 L40 30" strokeWidth={1.5} strokeOpacity={0.6} />
      <path d="M66 52 L62 52" strokeWidth={1.5} strokeOpacity={0.6} />
      <path d="M40 52 L55 36" strokeWidth={2} />
      <Gear gkey="g" cx={40} cy={52} teeth={8} rp={7} sw={1.6} dir="cw" dur={14} hub={2.6} />
      <path d="M22 66 L58 66" strokeWidth={1.6} strokeOpacity={0.5} />
    </>
  ),
  integracje: (
    <>
      <Gear gkey="g" cx={40} cy={40} teeth={10} rp={14} sw={1.7} dir="cw" dur={22} hub={5} />
      <path d="M40 22 L40 12 M58 40 L68 40 M40 58 L40 68 M22 40 L12 40" strokeWidth={1.6} strokeOpacity={0.7} />
      <rect x={35} y={6} width={10} height={7} rx={1.5} strokeWidth={1.6} />
      <rect x={67} y={35} width={7} height={10} rx={1.5} strokeWidth={1.6} />
      <rect x={35} y={67} width={10} height={7} rx={1.5} strokeWidth={1.6} />
      <rect x={6} y={35} width={7} height={10} rx={1.5} strokeWidth={1.6} />
    </>
  ),
};

/** Mapowanie slug usługi → ikona mechanizmu (do content/services.ts). */
export const SERVICE_ICON_BY_SLUG: Record<string, ServiceIconName> = {
  "automatyzacja-n8n": "automatyzacja",
  "chatboty-ai": "chatbot",
  "agenci-glosowi": "agent-glosowy",
  "bazy-wiedzy-rag": "rag",
  "dashboardy-raporty": "dashboard",
  "integracje-systemow": "integracje",
};

/** Ikona usługi w motywie mechanizmu (dziedziczy kolor z rodzica przez currentColor). */
export function ServiceIcon({ name, size = 72 }: { name: ServiceIconName; size?: number }) {
  return <IconBase size={size}>{SERVICE_ICONS[name]}</IconBase>;
}

/** Ikona usługi po slugu (wygodny wrapper); fallback null gdy brak mapowania. */
export function ServiceIconBySlug({ slug, size = 72 }: { slug: string; size?: number }) {
  const name = SERVICE_ICON_BY_SLUG[slug];
  return name ? <ServiceIcon name={name} size={size} /> : null;
}

// ── Dzielnik sekcji z mini-zębatką ("Podstrona · X") ───────────────────────
export function SectionDivider({ label, dir = "cw" }: { label: string; dir?: Dir }) {
  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 flex items-center gap-4">
      <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.12))" }} />
      <span className="inline-flex items-center gap-2.5 text-amber font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.22em" }}>
        <TinyGear dir={dir} dur={22} size={14} color={A} />
        {label}
      </span>
      <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg,rgba(255,255,255,0.12),transparent)" }} />
    </div>
  );
}

type Align = "left" | "right";

/**
 * Nagłówek podstrony z motywem mechanizmu: dekoracyjny klaster zębatek w tle
 * + eyebrow (mono) + tytuł z akcentowanym słowem (Chakra Petch italic).
 */
export function SubpageHeader({
  eyebrow,
  title,
  accent,
  titleAfter,
  description,
  cluster,
  clusterColor = A,
  align = "left",
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  titleAfter?: string;
  description?: React.ReactNode;
  cluster?: ClusterKind;
  clusterColor?: string;
  align?: Align;
  children?: React.ReactNode;
}) {
  const isRight = align === "right";
  const mask = isRight
    ? "linear-gradient(270deg,transparent 25%,#000 80%)"
    : "linear-gradient(90deg,transparent 20%,#000 75%)";
  return (
    <section className="relative overflow-hidden">
      {cluster && (
        <div
          className="absolute inset-0 flex items-center pointer-events-none"
          style={{
            justifyContent: isRight ? "flex-start" : "flex-end",
            color: clusterColor,
            opacity: 0.36,
            WebkitMaskImage: mask,
            maskImage: mask,
          }}
        >
          <GearCluster kind={cluster} />
        </div>
      )}
      <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10 pt-13" style={{ paddingTop: 52 }}>
        <div className={`flex items-center gap-3 mb-4 ${isRight ? "justify-end" : ""}`}>
          {isRight && <span className="font-mono uppercase text-amber" style={{ fontSize: 11, letterSpacing: "0.22em" }}>{eyebrow}</span>}
          <span className="w-[30px] h-px bg-amber" />
          {!isRight && <span className="font-mono uppercase text-amber" style={{ fontSize: 11, letterSpacing: "0.22em" }}>{eyebrow}</span>}
        </div>
        <h1
          className="font-heading font-extrabold text-on-surface"
          style={{ fontSize: "clamp(32px,5vw,46px)", letterSpacing: "-0.04em", lineHeight: 1.0, marginBottom: 16, textAlign: isRight ? "right" : "left" }}
        >
          {title}{" "}
          {accent && <span className="font-display italic font-semibold text-amber">{accent}</span>}
          {titleAfter ? " " + titleAfter : ""}
        </h1>
        {description && (
          <p className="text-text-dim" style={{ fontSize: 16, maxWidth: 560, lineHeight: 1.6, marginLeft: isRight ? "auto" : undefined, textAlign: isRight ? "right" : "left" }}>
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
