// scenes.jsx — Scene composition + wordmark + tagline + status badge

// ── Color helpers ───────────────────────────────────────────────────────────
function lerpColor(a, b, t) {
  const pa = a.startsWith('#') ? a.slice(1) : a;
  const pb = b.startsWith('#') ? b.slice(1) : b;
  const ar = parseInt(pa.slice(0, 2), 16),
        ag = parseInt(pa.slice(2, 4), 16),
        ab = parseInt(pa.slice(4, 6), 16);
  const br = parseInt(pb.slice(0, 2), 16),
        bg = parseInt(pb.slice(2, 4), 16),
        bb = parseInt(pb.slice(4, 6), 16);
  const tt = clamp(t, 0, 1);
  const r = Math.round(ar + (br - ar) * tt);
  const g = Math.round(ag + (bg - ag) * tt);
  const b2 = Math.round(ab + (bb - ab) * tt);
  return `#${[r, g, b2].map(v => v.toString(16).padStart(2, '0')).join('')}`;
}

// ── Wordmark "lok-ai" — terminal-style typing reveal ────────────────────────
function Wordmark({ progress, color, scale = 1 }) {
  // progress 0..1: 0..0.75 types in chars, 0.75..1 holds with cursor fading out
  const full = 'lok-ai';
  const typeP = clamp(progress / 0.75, 0, 1);
  const charsShown = Math.min(full.length, Math.ceil(typeP * full.length));
  const text = full.slice(0, charsShown);
  // Cursor: blinks during typing, fades out after progress > 0.85
  const blinkOn = Math.floor(progress * 14) % 2 === 0;
  const cursorOpacity = progress < 0.85 ? (blinkOn ? 0.85 : 0) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 250,
        transform: `translate(-50%, 0) scale(${scale})`,
        transformOrigin: '50% 50%',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontWeight: 900,
        fontSize: 144,
        letterSpacing: '-0.05em',
        color,
        filter: `drop-shadow(0 0 12px ${color}AA) drop-shadow(0 0 32px ${color}55)`,
        display: 'flex',
        alignItems: 'baseline',
        gap: 0,
        lineHeight: 1,
      }}
    >
      <span>{text}</span>
      <span
        style={{
          display: 'inline-block',
          width: 14,
          height: 108,
          marginLeft: 8,
          marginBottom: 4,
          background: color,
          opacity: cursorOpacity,
          transform: 'translateY(8px)',
        }}
      />
    </div>
  );
}

// ── URL line ────────────────────────────────────────────────────────────────
function UrlLine({ progress, color }) {
  const ease = Easing.easeOutCubic(progress);
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 178,
        transform: `translate(-50%, ${(1 - ease) * 10}px)`,
        opacity: ease,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        fontFamily: 'JetBrains Mono, ui-monospace, monospace',
        fontSize: 18,
        fontWeight: 500,
        letterSpacing: '0.3em',
        color,
        textTransform: 'uppercase',
        filter: `drop-shadow(0 0 8px ${color}77)`,
      }}
    >
      <span style={{ width: 36, height: 1, background: color, opacity: 0.55 }} />
      <span>lok-ai.pl</span>
      <span style={{ width: 36, height: 1, background: color, opacity: 0.55 }} />
    </div>
  );
}

// ── Tagline ─────────────────────────────────────────────────────────────────
function Tagline({ progress, color, secondary }) {
  // Slides up + fades
  const ease = Easing.easeOutCubic(progress);
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 110,
        transform: `translate(-50%, ${(1 - ease) * 16}px)`,
        opacity: ease,
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: 32,
        fontWeight: 400,
        color: '#cbc3d7',
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
      }}
    >
      <span>Lokalna </span>
      <span style={{
        color,
        fontFamily: "'Orbitron', 'JetBrains Mono', ui-monospace, monospace",
        fontWeight: 700,
        fontStyle: 'normal',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        fontSize: '0.86em',
        filter: `drop-shadow(0 0 8px ${color}88)`,
      }}>Automatyzacja</span>
      <span> Biznesu</span>
    </div>
  );
}

// ── Status bar (top) ────────────────────────────────────────────────────────
function StatusBar({ progress, pulseT, secondary, color, label = 'POLSKA · KUJAWSKO-POMORSKIE', operational = false }) {
  const ease = Easing.easeOutCubic(progress);
  const pulseOn = (Math.sin(pulseT * 4) + 1) / 2;
  return (
    <div
      style={{
        position: 'absolute',
        top: 72,
        left: '50%',
        transform: `translate(-50%, ${(1 - ease) * -8}px)`,
        opacity: ease,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        fontFamily: 'JetBrains Mono, ui-monospace, monospace',
        fontSize: 13,
        letterSpacing: '0.25em',
        color: operational ? secondary : color,
        textTransform: 'uppercase',
      }}
    >
      <span
        style={{
          width: 8, height: 8,
          borderRadius: '50%',
          background: operational ? secondary : color,
          opacity: 0.4 + 0.6 * pulseOn,
          boxShadow: `0 0 10px ${operational ? secondary : color}`,
        }}
      />
      <span style={{ filter: `drop-shadow(0 0 4px ${operational ? secondary : color}88)` }}>{label}</span>
    </div>
  );
}

// ── Coordinates readout (bottom corners) ────────────────────────────────────
function CornerReadout({ progress, color, lines, position = 'bl' }) {
  const ease = Easing.easeOutCubic(progress);
  const pos = position === 'bl'
    ? { left: 72, bottom: 72 }
    : { right: 72, bottom: 72 };
  return (
    <div
      style={{
        position: 'absolute',
        ...pos,
        opacity: ease * 0.8,
        fontFamily: 'JetBrains Mono, ui-monospace, monospace',
        fontSize: 11,
        letterSpacing: '0.18em',
        color,
        textTransform: 'uppercase',
        lineHeight: 1.7,
        textAlign: position === 'bl' ? 'left' : 'right',
      }}
    >
      {lines.map((l, i) => (
        <div key={i} style={{ opacity: i === 0 ? 1 : 0.55 }}>{l}</div>
      ))}
    </div>
  );
}

// ── Crosshair (during camera zoom) ──────────────────────────────────────────
function Crosshair({ x, y, progress, color, size = 60 }) {
  const ease = Easing.easeOutCubic(progress);
  if (ease < 0.01) return null;
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox="0 0 1920 1080"
    >
      <g style={{ transformOrigin: `${x}px ${y}px`, transform: `scale(${0.6 + 0.4 * ease})`, opacity: ease }}>
        <circle cx={x} cy={y} r={size} fill="none" stroke={color} strokeWidth={1.5} strokeDasharray="4 6" />
        <circle cx={x} cy={y} r={size * 0.55} fill="none" stroke={color} strokeWidth={1} strokeOpacity={0.5} />
        <line x1={x - size - 12} y1={y} x2={x - size + 6} y2={y} stroke={color} strokeWidth={1.5} />
        <line x1={x + size - 6} y1={y} x2={x + size + 12} y2={y} stroke={color} strokeWidth={1.5} />
        <line x1={x} y1={y - size - 12} x2={x} y2={y - size + 6} stroke={color} strokeWidth={1.5} />
        <line x1={x} y1={y + size - 6} x2={x} y2={y + size + 12} stroke={color} strokeWidth={1.5} />
      </g>
    </svg>
  );
}

// ── Background ambient ──────────────────────────────────────────────────────
function AmbientBackdrop({ color, intensity = 1 }) {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 900,
          height: 900,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${color}22 0%, ${color}00 60%)`,
          filter: `blur(${80 * intensity}px)`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
          pointerEvents: 'none',
        }}
      />
    </>
  );
}

// ── Subtle starfield (random dots in BG) ────────────────────────────────────
const STARS = Array.from({ length: 80 }, (_, i) => ({
  x: (i * 137.5) % 1920,
  y: (i * 73.3) % 1080,
  size: ((i * 11) % 3) * 0.5 + 0.5,
  twinkleOff: (i * 0.27) % (Math.PI * 2),
}));
function Starfield({ pulseT, color, opacity = 1 }) {
  return (
    <svg viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity }}>
      {STARS.map((s, i) => {
        const tw = (Math.sin(pulseT * 1.5 + s.twinkleOff) + 1) / 2;
        return (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.size}
            fill={color}
            opacity={0.15 + 0.35 * tw}
          />
        );
      })}
    </svg>
  );
}

Object.assign(window, {
  lerpColor, Wordmark, UrlLine, Tagline, StatusBar, CornerReadout, Crosshair, AmbientBackdrop, Starfield,
});
