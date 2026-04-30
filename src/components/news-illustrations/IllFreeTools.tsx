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

export function IllFreeTools() {
  return (
    <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <GlowDefs id="g12" />
      <rect width="320" height="220" fill="url(#dots-g12)" />
      <g filter="url(#g12)" fill="none" strokeWidth="1.8" strokeLinecap="round">
        <rect x="80" y="90" width="160" height="90" rx="6" stroke={NEON.amber} />
        <rect x="80" y="60" width="160" height="40" rx="6" stroke={NEON.amber} />
        <path d="M120 60 L120 40 Q120 30 130 30 L190 30 Q200 30 200 40 L200 60" />
        <circle cx="115" cy="135" r="14" stroke={NEON.coral} />
        <path d="M105 125 L125 145 M125 125 L105 145" stroke={NEON.coral} />
        <path d="M155 120 L155 165" stroke={NEON.amberHi} strokeWidth="2.2" />
        <path d="M150 120 L160 120" stroke={NEON.amberHi} strokeWidth="2.2" />
        <path d="M195 130 L210 130 L210 170 L195 170 Z" stroke={NEON.sand} />
        <path d="M195 145 L210 145" stroke={NEON.sand} />
      </g>
    </svg>
  );
}
