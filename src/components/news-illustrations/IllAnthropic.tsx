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

export function IllAnthropic() {
  return (
    <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <GlowDefs id="g8" />
      <rect width="320" height="220" fill="url(#dots-g8)" />
      <g filter="url(#g8)" fill="none" strokeWidth="1.8" strokeLinecap="round">
        <path d="M160 50 L160 175" stroke={NEON.amber} />
        <path d="M100 80 L220 80" stroke={NEON.amber} />
        <path d="M160 175 L130 175" stroke={NEON.amber} />
        <path d="M160 175 L190 175" stroke={NEON.amber} />
        <path d="M100 80 L80 130 L120 130 Z" stroke={NEON.coral} />
        <path d="M220 80 L200 130 L240 130 Z" stroke={NEON.coral} />
        <path d="M100 80 L100 90" />
        <path d="M220 80 L220 90" />
        <circle cx="160" cy="80" r="5" fill={NEON.amberHi} />
      </g>
    </svg>
  );
}
