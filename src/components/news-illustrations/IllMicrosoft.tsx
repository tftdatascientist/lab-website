const NEON = { amber: "#f5b845", amberHi: "#fcd34d", coral: "#ef7955", sand: "#d9b88a", rust: "#b8542f" };

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

export function IllMicrosoft() {
  return (
    <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <GlowDefs id="g5" />
      <rect width="320" height="220" fill="url(#dots-g5)" />
      <g filter="url(#g5)" fill="none" strokeWidth="1.8" strokeLinecap="round">
        <rect x="80" y="40" width="70" height="70" stroke={NEON.amber} />
        <rect x="170" y="40" width="70" height="70" stroke={NEON.coral} />
        <rect x="80" y="130" width="70" height="70" stroke={NEON.sand} />
        <rect x="170" y="130" width="70" height="70" stroke={NEON.rust} />
        <circle cx="115" cy="75" r="3" fill={NEON.amber} />
        <circle cx="205" cy="75" r="3" fill={NEON.coral} />
        <circle cx="115" cy="165" r="3" fill={NEON.sand} />
        <circle cx="205" cy="165" r="3" fill={NEON.rust} />
        <path d="M150 75 L170 75" stroke={NEON.amberHi} strokeDasharray="2 2" />
        <path d="M115 110 L115 130" stroke={NEON.amberHi} strokeDasharray="2 2" />
        <path d="M150 165 L170 165" stroke={NEON.amberHi} strokeDasharray="2 2" />
        <path d="M205 110 L205 130" stroke={NEON.amberHi} strokeDasharray="2 2" />
      </g>
    </svg>
  );
}
