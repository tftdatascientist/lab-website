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
    const gapStart = mid + half;
    const gapEnd   = mid + step - half;

    // ── Ząb prostokątny (4 narożniki pod 90°) ──────────────────
    // dolny-lewy narożnik zęba (na promieniu rIn)
    const a0 = mid - half;
    const tx0 = cx + rIn  * Math.cos(a0);
    const ty0 = cy + rIn  * Math.sin(a0);
    // górny-lewy (rOut, ten sam kąt)
    const tx1 = cx + rOut * Math.cos(a0);
    const ty1 = cy + rOut * Math.sin(a0);
    // górny-prawy (rOut)
    const a1 = mid + half;
    const tx2 = cx + rOut * Math.cos(a1);
    const ty2 = cy + rOut * Math.sin(a1);
    // dolny-prawy (rIn)
    const tx3 = cx + rIn  * Math.cos(a1);
    const ty3 = cy + rIn  * Math.sin(a1);

    // dolina między zębami (łuk na rIn)
    const gapMid = (gapStart + gapEnd) / 2;
    const gx = cx + rIn * Math.cos(gapMid);
    const gy = cy + rIn * Math.sin(gapMid);

    pts.push(
      `L ${tx0},${ty0}`,
      `L ${tx1},${ty1}`,
      `L ${tx2},${ty2}`,
      `L ${tx3},${ty3}`,
      `L ${gx},${gy}`,
    );
  }
  return "M " + pts.join(" ").replace(/^L /, "") + " Z";
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
          {/* Maska — wnętrze zębatki (przycinamy tekst do środka) */}
          <clipPath id="lg-clip">
            <path d={gearPath} />
          </clipPath>
        </defs>

        {/* Zębatka — tylko kontur, na wierzchu */}
        <path d={gearPath} fill="none" stroke="#f5c842" strokeWidth="1.8" strokeLinejoin="round" />

        {/* LOK — duży, przycięty do wnętrza zębatki, konturowy (stroke only) */}
        <text
          x="20"
          y="25"
          textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="900"
          fontSize="14"
          letterSpacing="-1"
          fill="none"
          stroke="#f5c842"
          strokeWidth="0.8"
          clipPath="url(#lg-clip)"
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
