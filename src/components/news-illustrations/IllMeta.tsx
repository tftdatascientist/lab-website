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

export function IllMeta() {
  return (
    <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <GlowDefs id="g7" />
      <rect width="320" height="220" fill="url(#dots-g7)" />
      <g filter="url(#g7)" fill="none" strokeWidth="2.4" strokeLinecap="round">
        <path d="M85 110 C 85 70, 135 70, 160 110 C 185 150, 235 150, 235 110 C 235 70, 185 70, 160 110 C 135 150, 85 150, 85 110 Z" stroke={NEON.amber} />
        <path d="M85 110 C 85 70, 135 70, 160 110 C 185 150, 235 150, 235 110" stroke={NEON.coral} strokeOpacity="0.55" />
        <circle cx="85" cy="110" r="5" fill={NEON.amberHi} />
        <circle cx="235" cy="110" r="5" fill={NEON.amberHi} />
      </g>
    </svg>
  );
}
