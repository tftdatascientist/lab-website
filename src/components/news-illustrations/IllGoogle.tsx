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

export function IllGoogle() {
  return (
    <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <GlowDefs id="g4" />
      <rect width="320" height="220" fill="url(#dots-g4)" />
      <g filter="url(#g4)" fill="none" strokeLinecap="round">
        <path d="M90 70 L230 70" stroke={NEON.amber} strokeWidth="1.4" />
        <path d="M90 150 L230 150" stroke={NEON.coral} strokeWidth="1.4" />
        <path d="M90 70 L90 150" stroke={NEON.sand} strokeWidth="1.4" />
        <path d="M230 70 L230 150" stroke={NEON.rust} strokeWidth="1.4" />
        <path d="M90 70 L230 150" stroke={NEON.amber} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
        <path d="M230 70 L90 150" stroke={NEON.coral} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
        <circle cx="90" cy="70" r="14" stroke={NEON.amber} strokeWidth="2" />
        <circle cx="90" cy="70" r="5" fill={NEON.amber} />
        <circle cx="230" cy="70" r="14" stroke={NEON.coral} strokeWidth="2" />
        <circle cx="230" cy="70" r="5" fill={NEON.coral} />
        <circle cx="90" cy="150" r="14" stroke={NEON.sand} strokeWidth="2" />
        <circle cx="90" cy="150" r="5" fill={NEON.sand} />
        <circle cx="230" cy="150" r="14" stroke={NEON.rust} strokeWidth="2" />
        <circle cx="230" cy="150" r="5" fill={NEON.rust} />
        <circle cx="160" cy="110" r="22" stroke={NEON.amberHi} strokeWidth="1.2" strokeDasharray="2 4" />
      </g>
    </svg>
  );
}
