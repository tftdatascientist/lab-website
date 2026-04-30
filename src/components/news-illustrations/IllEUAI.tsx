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

export function IllEUAI() {
  return (
    <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <GlowDefs id="g2" />
      <rect width="320" height="220" fill="url(#dots-g2)" />
      <g filter="url(#g2)" stroke={NEON.amber} strokeWidth="1.6" fill="none" strokeLinecap="round">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = ((-110 + i * 20) * Math.PI) / 180;
          const r = 70;
          const cx = 160 + r * Math.cos(a);
          const cy = 130 + r * Math.sin(a);
          return (
            <g key={i} transform={`translate(${cx}, ${cy})`}>
              <path d="M0 -6 L1.7 -1.8 L6 -1.8 L2.5 1 L4 5 L0 2.5 L-4 5 L-2.5 1 L-6 -1.8 L-1.7 -1.8 Z" fill={NEON.amberHi} fillOpacity="0.4" stroke={NEON.amberHi} strokeWidth="0.8" />
            </g>
          );
        })}
        <rect x="130" y="140" width="60" height="14" rx="2" />
        <rect x="118" y="156" width="84" height="6" rx="1" />
        <path d="M160 140 L160 110" strokeWidth="2.4" />
        <circle cx="160" cy="105" r="6" stroke={NEON.coral} />
      </g>
    </svg>
  );
}
