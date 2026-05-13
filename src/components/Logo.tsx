function gear(
  cx: number, cy: number,
  rOut: number, rIn: number,
  teeth: number, toothFrac: number,
): string {
  const step = (Math.PI * 2) / teeth;
  const half = (step * toothFrac) / 2;
  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const mid = (Math.PI * 2 * i) / teeth - Math.PI / 2;
    // valley before tooth
    pts.push(`${cx + rIn * Math.cos(mid - half - step * (1 - toothFrac) / 2)},${cy + rIn * Math.sin(mid - half - step * (1 - toothFrac) / 2)}`);
    // tooth left flank top
    pts.push(`${cx + rOut * Math.cos(mid - half)},${cy + rOut * Math.sin(mid - half)}`);
    // tooth right flank top
    pts.push(`${cx + rOut * Math.cos(mid + half)},${cy + rOut * Math.sin(mid + half)}`);
    // valley after tooth
    pts.push(`${cx + rIn * Math.cos(mid + half + step * (1 - toothFrac) / 2)},${cy + rIn * Math.sin(mid + half + step * (1 - toothFrac) / 2)}`);
  }
  return "M " + pts.join(" L ") + " Z";
}

interface LogoProps {
  size?: number;
  showTagline?: boolean;
}

export default function Logo({ size = 34, showTagline = true }: LogoProps) {
  const scale = size / 40;
  // 12 zębów, ząb zajmuje 45% kroku, rOut=19, rIn=14.5, otwór=8
  const gearPath = gear(20, 20, 19, 14.5, 12, 0.45);

  return (
    <div className="flex items-center gap-[11px]">
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        style={{ display: "block", filter: "drop-shadow(0 2px 8px rgba(232,160,32,0.30))" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lg-gear" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5c842" />
            <stop offset="100%" stopColor="#e8821a" />
          </linearGradient>
        </defs>

        {/* Zębatka */}
        <path d={gearPath} fill="url(#lg-gear)" />
        <path d={gearPath} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />

        {/* Otwór centralny */}
        <circle cx="20" cy="20" r="8" fill="#0b0c0e" />

        {/* Napis LOK — duży, biały, czytelny */}
        <text
          x="20"
          y="23.5"
          textAnchor="middle"
          dominantBaseline="auto"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="800"
          fontSize="8.2"
          letterSpacing="-0.5"
          fill="#f5c842"
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
