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

export function IllProblems() {
  return (
    <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <GlowDefs id="g14" />
      <rect width="320" height="220" fill="url(#dots-g14)" />
      <g filter="url(#g14)" fill="none" strokeWidth="1.8" strokeLinecap="round">
        <path d="M110 80 Q90 90 90 120 Q90 150 110 160 Q110 175 130 175 Q140 175 150 165 L150 70 Q140 60 130 60 Q110 60 110 80 Z" stroke={NEON.amber} />
        <path d="M210 80 Q230 90 230 120 Q230 150 210 160 Q210 175 190 175 Q180 175 170 165 L170 70 Q180 60 190 60 Q210 60 210 80 Z" stroke={NEON.amber} />
        <path d="M115 100 Q125 105 120 115 Q115 125 125 130" stroke={NEON.coral} />
        <path d="M205 100 Q195 105 200 115 Q205 125 195 130" stroke={NEON.coral} />
        <path d="M160 50 L155 80 L165 100 L155 130 L165 155 L160 180" stroke={NEON.coral} strokeWidth="2.4" strokeDasharray="5 3" />
        <path d="M260 60 L280 100 L240 100 Z" stroke={NEON.amberHi} />
        <text x="260" y="92" fontFamily="monospace" fontSize="14" fill={NEON.amberHi} textAnchor="middle">!</text>
      </g>
    </svg>
  );
}
