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

export function IllStartup() {
  return (
    <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <GlowDefs id="g13" />
      <rect width="320" height="220" fill="url(#dots-g13)" />
      <g filter="url(#g13)" fill="none" strokeWidth="1.8" strokeLinecap="round">
        <path d="M160 30 L185 80 L185 150 L160 170 L135 150 L135 80 Z" stroke={NEON.amber} />
        <circle cx="160" cy="100" r="10" stroke={NEON.coral} />
        <path d="M135 130 L110 160 L135 150 Z" stroke={NEON.amber} />
        <path d="M185 130 L210 160 L185 150 Z" stroke={NEON.amber} />
        <path d="M150 170 L150 195" stroke={NEON.amberHi} strokeWidth="2" />
        <path d="M160 170 L160 200" stroke={NEON.coral} strokeWidth="2.4" />
        <path d="M170 170 L170 195" stroke={NEON.amberHi} strokeWidth="2" />
        <circle cx="60" cy="60" r="2" fill={NEON.amberHi} />
        <circle cx="280" cy="80" r="1.6" fill={NEON.amberHi} />
        <circle cx="40" cy="140" r="1.6" fill={NEON.amberHi} />
        <circle cx="290" cy="170" r="2" fill={NEON.coral} />
      </g>
    </svg>
  );
}
