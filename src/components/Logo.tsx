// Generates a gear path centred at (cx,cy) with given radii and tooth count.
function gearPath(
  cx: number, cy: number,
  rOuter: number, rInner: number, rRoot: number,
  teeth: number,
): string {
  const pts: string[] = [];
  const step = (Math.PI * 2) / teeth;
  const toothHalf = step * 0.18;
  const toothWidth = step * 0.28;
  for (let i = 0; i < teeth; i++) {
    const base = step * i - Math.PI / 2;
    const a0 = base - toothHalf - toothWidth;
    const a1 = base - toothHalf;
    const a2 = base + toothHalf;
    const a3 = base + toothHalf + toothWidth;
    pts.push(
      `${cx + rRoot * Math.cos(a0)},${cy + rRoot * Math.sin(a0)}`,
      `${cx + rOuter * Math.cos(a1)},${cy + rOuter * Math.sin(a1)}`,
      `${cx + rOuter * Math.cos(a2)},${cy + rOuter * Math.sin(a2)}`,
      `${cx + rRoot * Math.cos(a3)},${cy + rRoot * Math.sin(a3)}`,
      `${cx + rInner * Math.cos((a3 + step - toothHalf - toothWidth) / 2 + (a3) / 2)},${cy + rInner * Math.sin((a3 + step - toothHalf - toothWidth) / 2 + (a3) / 2)}`,
    );
  }
  return "M " + pts.join(" L ") + " Z";
}

interface LogoProps {
  size?: number;
  showTagline?: boolean;
}

export default function Logo({ size = 34, showTagline = true }: LogoProps) {
  const scale = size / 40;
  const gear = gearPath(20, 20, 19.5, 15.5, 17.5, 14);
  return (
    <div className="flex items-center gap-[11px]">
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        style={{ display: "block", filter: "drop-shadow(0 2px 8px rgba(232,160,32,0.35))" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lokai-logo-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f5b845" />
            <stop offset="1" stopColor="#ef7955" />
          </linearGradient>
          <clipPath id="lokai-gear-clip">
            <path d={gear} />
          </clipPath>
        </defs>

        {/* Gear shape — filled with gradient */}
        <path d={gear} fill="url(#lokai-logo-fill)" />
        {/* Subtle highlight rim */}
        <path d={gear} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.6" />

        {/* Centre hole */}
        <circle cx="20" cy="20" r="7.2" fill="#1a0f00" />

        {/* LOK text inside centre */}
        <text
          x="20"
          y="23.2"
          textAnchor="middle"
          fontFamily="'Inter', system-ui, sans-serif"
          fontWeight="900"
          fontSize="7.5"
          letterSpacing="-0.04em"
          fill="#f5b845"
        >
          LOK
        </text>
      </svg>
      <div className="flex flex-col leading-none">
        <span
          className="font-heading font-bold whitespace-nowrap text-text"
          style={{ fontSize: 17 * scale + "px", letterSpacing: "-0.035em" }}
        >
          lok<span className="text-amber">·</span>ai
        </span>
        {showTagline && (
          <span
            className="font-mono uppercase text-text-mute"
            style={{ fontSize: 9 * scale + "px", letterSpacing: "0.22em", marginTop: 4 }}
          >
            AI lokalnie
          </span>
        )}
      </div>
    </div>
  );
}
