"use client";

interface AuroraBgProps {
  intensity?: number;
}

export default function AuroraBg({ intensity = 1 }: AuroraBgProps) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Grid */}
      <div
        className="lokai-grid-bg absolute inset-0"
        style={{
          opacity: 0.4 * intensity,
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      {/* Orb rust */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "10%",
          width: 700,
          height: 700,
          background: "radial-gradient(circle, rgba(184,84,47,0.33), transparent 60%)",
          filter: "blur(60px)",
          animation: "lokai-aurora 28s ease-in-out infinite",
          opacity: 0.7 * intensity,
        }}
      />
      {/* Orb amberDeep */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "5%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(196,138,28,0.25), transparent 60%)",
          filter: "blur(60px)",
          animation: "lokai-aurora-b 34s ease-in-out infinite",
          opacity: 0.55 * intensity,
        }}
      />
      {/* Orb coralDeep */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "30%",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(184,74,42,0.25), transparent 60%)",
          filter: "blur(80px)",
          animation: "lokai-aurora-c 40s ease-in-out infinite",
          opacity: 0.5 * intensity,
        }}
      />
    </div>
  );
}
