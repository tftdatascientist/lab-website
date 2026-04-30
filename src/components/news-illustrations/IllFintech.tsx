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

export function IllFintech() {
  return (
    <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <GlowDefs id="g9" />
      <rect width="320" height="220" fill="url(#dots-g9)" />
      <g filter="url(#g9)" fill="none" strokeWidth="1.6" strokeLinecap="round">
        <path d="M50 170 L100 130 L130 145 L180 90 L230 110 L290 60" stroke={NEON.amber} strokeWidth="2.2" />
        <path d="M50 170 L290 170" stroke={NEON.sand} strokeOpacity="0.5" />
        <path d="M50 170 L50 50" stroke={NEON.sand} strokeOpacity="0.5" />
        <circle cx="100" cy="130" r="4" fill={NEON.coral} />
        <circle cx="180" cy="90" r="4" fill={NEON.coral} />
        <circle cx="290" cy="60" r="6" fill={NEON.amberHi} />
        <circle cx="70" cy="50" r="14" stroke={NEON.amberHi} />
        <text x="70" y="55" fontFamily="monospace" fontSize="14" fill={NEON.amberHi} textAnchor="middle">$</text>
        <circle cx="260" cy="170" r="10" stroke={NEON.coral} />
        <text x="260" y="174" fontFamily="monospace" fontSize="11" fill={NEON.coral} textAnchor="middle">€</text>
      </g>
    </svg>
  );
}
