const NEON = {
  amber: "#f5b845",
  amberHi: "#fcd34d",
  coral: "#ef7955",
  sand: "#d9b88a",
};

function GlowDefs({ id, strength = 2.4 }: { id: string; strength?: number }) {
  return (
    <defs>
      <filter id={id} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation={strength} result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <pattern id={`dots-${id}`} x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.6" fill={NEON.sand} opacity="0.18" />
      </pattern>
    </defs>
  );
}

export function IllChinaAI() {
  return (
    <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <GlowDefs id="g1" />
      <rect width="320" height="220" fill="url(#dots-g1)" />
      <g filter="url(#g1)" stroke={NEON.amber} strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M50 90 L160 50 L270 90" />
        <path d="M70 110 L160 78 L250 110" />
        <path d="M90 130 L160 106 L230 130" />
        <path d="M70 130 L70 180 L250 180 L250 130" />
        <path d="M155 130 L155 180" />
        <path d="M165 130 L165 180" />
        <path d="M260 60 L290 60 L290 90 L300 90" stroke={NEON.coral} />
        <circle cx="290" cy="60" r="2.5" fill={NEON.coral} stroke="none" />
        <circle cx="300" cy="90" r="2.5" fill={NEON.coral} stroke="none" />
        <path d="M40 40 L46 56 L62 56 L49 66 L54 82 L40 73 L26 82 L31 66 L18 56 L34 56 Z" fill={NEON.amberHi} fillOpacity="0.25" stroke={NEON.amberHi} />
      </g>
    </svg>
  );
}
