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

export function IllCyber() {
  return (
    <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <GlowDefs id="g3" />
      <rect width="320" height="220" fill="url(#dots-g3)" />
      <g filter="url(#g3)" stroke={NEON.coral} strokeWidth="1.8" fill="none" strokeLinecap="round">
        <path d="M160 30 L230 60 L230 130 Q230 175 160 195 Q90 175 90 130 L90 60 Z" />
        <path d="M160 50 L210 72 L210 128 Q210 162 160 178 Q110 162 110 128 L110 72 Z" stroke={NEON.amber} strokeOpacity="0.6" />
        <rect x="142" y="110" width="36" height="34" rx="3" stroke={NEON.amber} />
        <path d="M148 110 L148 96 Q148 82 160 82 Q172 82 172 96 L172 110" stroke={NEON.amber} />
        <circle cx="160" cy="124" r="3" fill={NEON.amberHi} stroke="none" />
        <path d="M40 80 L70 80" stroke={NEON.amberHi} />
        <path d="M40 110 L60 110" stroke={NEON.amberHi} />
        <path d="M40 140 L75 140" stroke={NEON.amberHi} />
      </g>
    </svg>
  );
}
