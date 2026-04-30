const NEON = { amber: "#f5b845", amberHi: "#fcd34d", coral: "#ef7955", sand: "#d9b88a" };

const AGENTS: [number, number][] = [
  [80, 60], [130, 90], [200, 70], [260, 100],
  [90, 140], [160, 130], [220, 160], [280, 50],
];

function GlowDefs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={id} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="2.4" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <pattern id={`dots-${id}`} x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.6" fill={NEON.sand} opacity="0.18" />
      </pattern>
    </defs>
  );
}

export function IllAgentic() {
  return (
    <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <GlowDefs id="g10" />
      <rect width="320" height="220" fill="url(#dots-g10)" />
      <g filter="url(#g10)" fill="none" strokeWidth="1.4" strokeLinecap="round">
        {AGENTS.map(([x, y], i) =>
          AGENTS.slice(i + 1).map(([x2, y2], j) => (
            <path key={`${i}-${j}`} d={`M${x} ${y} L${x2} ${y2}`} stroke={NEON.amber} strokeOpacity={0.18} strokeWidth="0.7" />
          ))
        )}
        {AGENTS.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="6" stroke={i % 3 === 0 ? NEON.coral : NEON.amber} strokeWidth="1.6" />
            <circle cx={x} cy={y} r="2" fill={i % 3 === 0 ? NEON.coral : NEON.amber} />
          </g>
        ))}
        <circle cx="160" cy="130" r="14" stroke={NEON.amberHi} strokeWidth="1.8" strokeDasharray="3 3" />
      </g>
    </svg>
  );
}
