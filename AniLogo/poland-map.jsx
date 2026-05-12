// poland-map.jsx — Simplified Poland outline + Grudziądz pin + lat/lon grid
// viewBox: 0 0 1100 650. Coordinates derived from lon/lat (13.5°E–24.5°E, 48.5°N–55°N).
// Grudziądz: 18.75°E, 53.49°N → ~525, 151.

const POLAND_PATH =
  "M 70 110 L 90 100 L 270 60 L 500 60 L 610 50 L 620 60 L 750 65 L 930 60 L 1000 70 " +
  "L 1010 220 L 1015 380 L 1000 470 L 900 540 L 920 590 L 800 580 L 650 565 L 600 560 " +
  "L 550 570 L 450 530 L 310 480 L 200 450 L 130 420 L 110 350 L 60 300 L 90 240 " +
  "L 110 200 L 70 150 Z";

// Stylized lat/lon grid lines (just for futuristic flavor; not geographically true)
const GRID_LINES = [
  // Horizontal (latitudes)
  { x1: 30, y1: 100, x2: 1040, y2: 100 },
  { x1: 30, y1: 200, x2: 1040, y2: 200 },
  { x1: 30, y1: 300, x2: 1040, y2: 300 },
  { x1: 30, y1: 400, x2: 1040, y2: 400 },
  { x1: 30, y1: 500, x2: 1040, y2: 500 },
  // Vertical (longitudes)
  { x1: 100, y1: 30, x2: 100, y2: 620 },
  { x1: 250, y1: 30, x2: 250, y2: 620 },
  { x1: 400, y1: 30, x2: 400, y2: 620 },
  { x1: 550, y1: 30, x2: 550, y2: 620 },
  { x1: 700, y1: 30, x2: 700, y2: 620 },
  { x1: 850, y1: 30, x2: 850, y2: 620 },
  { x1: 1000, y1: 30, x2: 1000, y2: 620 },
];

// City dots — major cities of north-central Poland for context
const CITIES = [
  { x: 470, y: 200, name: "BYDGOSZCZ", primary: true, labelDx: -150, labelAlign: 'end' },
  { x: 525, y: 151, name: "GRUDZIĄDZ", primary: true, labelDx: 66 },
  { x: 540, y: 200, name: "TORUŃ", primary: true, labelDx: 66 },
  { x: 510, y: 110, name: "Gdańsk" },
  { x: 600, y: 280, name: "Warszawa" },
  { x: 360, y: 200, name: "Szczecin" },
];

// Kujawsko-Pomorskie voivodeship — rough polygon outline
const KUJAWSKO_PATH =
  "M 390 130 L 500 115 L 600 130 L 615 175 L 610 230 L 580 270 L 530 280 " +
  "L 470 275 L 420 255 L 380 230 L 375 180 L 380 145 Z";
const KUJAWSKO_CENTER = { x: 495, y: 195 };

function PolandMap({
  drawProgress = 1,    // 0..1, outline reveal
  gridProgress = 1,    // 0..1, grid reveal
  cityProgress = 1,    // 0..1, city dot reveal
  regionProgress = 0,  // 0..1, kujawsko-pomorskie region reveal
  fadeOpacity = 1,     // overall opacity
  color = '#f5c542',
  glow = 1,
}) {
  const inv = 100 - 100 * drawProgress;
  const gridInv = 100 - 100 * gridProgress;
  const glowFilter =
    glow > 0
      ? `drop-shadow(0 0 ${4 * glow}px ${color}) drop-shadow(0 0 ${10 * glow}px ${color}80)`
      : 'none';

  return (
    <svg
      viewBox="0 0 1100 650"
      preserveAspectRatio="xMidYMid meet"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: fadeOpacity,
      }}
    >
      {/* Grid */}
      <g style={{ filter: glow > 0 ? `drop-shadow(0 0 2px ${color}40)` : 'none' }}>
        {GRID_LINES.map((l, i) => {
          // stagger grid draw
          const stagger = (i % 5) / 5;
          const localP = clamp((gridProgress - stagger * 0.2) / 0.8, 0, 1);
          const len = Math.hypot(l.x2 - l.x1, l.y2 - l.y1);
          return (
            <line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke={color}
              strokeOpacity={0.18}
              strokeWidth={1}
              strokeDasharray={len}
              strokeDashoffset={len * (1 - localP)}
            />
          );
        })}
      </g>

      {/* Poland outline */}
      <path
        d={POLAND_PATH}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={100}
        strokeDashoffset={inv}
        style={{ filter: glowFilter }}
      />

      {/* Poland fill — soft gradient inside, only visible after outline is mostly drawn */}
      <path
        d={POLAND_PATH}
        fill={color}
        fillOpacity={drawProgress > 0.7 ? 0.04 * (drawProgress - 0.7) / 0.3 : 0}
      />

      {/* Kujawsko-Pomorskie region — fades in once outline is mostly drawn */}
      <g style={{ opacity: regionProgress }}>
        <path
          d={KUJAWSKO_PATH}
          fill={color}
          fillOpacity={0.08 * regionProgress}
          stroke={color}
          strokeWidth={2}
          strokeOpacity={0.85}
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={100 - 100 * regionProgress}
          style={{ filter: glow > 0 ? `drop-shadow(0 0 6px ${color})` : 'none' }}
        />
        {regionProgress > 0.6 && (
          <text
            x={KUJAWSKO_CENTER.x}
            y={KUJAWSKO_CENTER.y + 55}
            fill={color}
            fillOpacity={(regionProgress - 0.6) / 0.4 * 0.8}
            fontSize={9}
            textAnchor="middle"
            fontFamily="JetBrains Mono, ui-monospace, monospace"
            letterSpacing={2}
          >
            KUJAWSKO-POMORSKIE
          </text>
        )}
      </g>

      {/* City dots */}
      {CITIES.map((c, i) => {
        const stagger = i * 0.08;
        const p = clamp((cityProgress - stagger) / (1 - stagger || 0.001), 0, 1);
        if (p <= 0) return null;
        const isP = c.primary;
        const dx = c.labelDx ?? 66;
        const anchor = c.labelAlign || 'start';
        return (
          <g key={i} style={{ opacity: p }}>
            <circle
              cx={c.x}
              cy={c.y}
              r={isP ? 4 : 2.5}
              fill={color}
              style={{ filter: glow > 0 ? `drop-shadow(0 0 ${isP ? 6 : 3}px ${color})` : 'none' }}
            />
            {isP && p > 0.5 && (
              <g style={{ opacity: (p - 0.5) / 0.5 }}>
                <line
                  x1={c.x + (dx > 0 ? 8 : -8)}
                  y1={c.y}
                  x2={c.x + dx - (dx > 0 ? 6 : -6)}
                  y2={c.y}
                  stroke={color}
                  strokeWidth={1}
                  strokeOpacity={0.5}
                />
                <text
                  x={c.x + dx}
                  y={c.y + 4}
                  fill={color}
                  fontSize={11}
                  textAnchor={anchor}
                  fontFamily="JetBrains Mono, ui-monospace, monospace"
                  letterSpacing={1.5}
                  style={{ filter: `drop-shadow(0 0 3px ${color})` }}
                >
                  {c.name}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

Object.assign(window, { PolandMap });
