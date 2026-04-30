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

export function IllOpenAI() {
  return (
    <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <GlowDefs id="g6" />
      <rect width="320" height="220" fill="url(#dots-g6)" />
      <g filter="url(#g6)" fill="none" strokeWidth="1.6" strokeLinecap="round">
        <path d="M160 110 m -10 0 a 10 10 0 1 1 20 0 a 10 10 0 1 1 -20 0" stroke={NEON.amberHi} />
        {Array.from({ length: 6 }).map((_, i) => {
          const r = 18 + i * 12;
          return (
            <circle
              key={i}
              cx="160"
              cy="110"
              r={r}
              stroke={i % 2 ? NEON.amber : NEON.coral}
              strokeWidth="1.4"
              strokeDasharray={`${30 + i * 8} ${100 + i * 20}`}
              transform={`rotate(${i * 22} 160 110)`}
            />
          );
        })}
      </g>
    </svg>
  );
}
