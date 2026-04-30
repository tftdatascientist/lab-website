const NEON = { amber: "#f5b845", amberHi: "#fcd34d", coral: "#ef7955", sand: "#d9b88a" };

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

export function IllCollab() {
  return (
    <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <GlowDefs id="g11" />
      <rect width="320" height="220" fill="url(#dots-g11)" />
      <g filter="url(#g11)" fill="none" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="105" cy="110" r="40" stroke={NEON.amber} />
        <circle cx="215" cy="110" r="40" stroke={NEON.coral} />
        {Array.from({ length: 4 }).map((_, i) => (
          <circle key={`a${i}`} cx={85 + (i % 2) * 40} cy={90 + Math.floor(i / 2) * 40} r="2" fill={NEON.amber} />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <circle key={`b${i}`} cx={195 + (i % 2) * 40} cy={90 + Math.floor(i / 2) * 40} r="2" fill={NEON.coral} />
        ))}
        <path d="M145 110 L175 110" strokeWidth="2.4" stroke={NEON.amberHi} />
        <circle cx="160" cy="110" r="6" fill={NEON.amberHi} />
      </g>
    </svg>
  );
}
