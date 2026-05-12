'use client';
import React from 'react';
import { clamp } from './animations';

function makeGearPath(
  cx: number, cy: number, N: number,
  rOuter: number, rInner: number, toothRatio = 0.55
) {
  const step = (Math.PI * 2) / N;
  const tooth = step * toothRatio;
  let d = '';
  for (let i = 0; i < N; i++) {
    const a0 = i * step;
    const a1 = a0 + tooth;
    const aNext = (i + 1) * step;
    const p1 = [cx + Math.cos(a0) * rInner, cy + Math.sin(a0) * rInner];
    const p2 = [cx + Math.cos(a0) * rOuter, cy + Math.sin(a0) * rOuter];
    const p3 = [cx + Math.cos(a1) * rOuter, cy + Math.sin(a1) * rOuter];
    const p4 = [cx + Math.cos(a1) * rInner, cy + Math.sin(a1) * rInner];
    const p5 = [cx + Math.cos(aNext) * rInner, cy + Math.sin(aNext) * rInner];
    if (i === 0) d += `M ${p1[0].toFixed(1)} ${p1[1].toFixed(1)}`;
    d += ` L ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    d += ` L ${p3[0].toFixed(1)} ${p3[1].toFixed(1)}`;
    d += ` L ${p4[0].toFixed(1)} ${p4[1].toFixed(1)}`;
    d += ` L ${p5[0].toFixed(1)} ${p5[1].toFixed(1)}`;
  }
  return d + ' Z';
}

const GEAR_N = 22;
const GEAR_CX = 400, GEAR_CY = 400;
const GEAR_R_OUTER = 320;
const GEAR_R_INNER = 285;
const GEAR_R_BODY = 255;
const GEAR_PATH = makeGearPath(GEAR_CX, GEAR_CY, GEAR_N, GEAR_R_OUTER, GEAR_R_INNER);

const GRANARIES_PATH = [
  'M 210 520 L 210 410 L 218 410 L 218 398 L 226 398 L 226 386 L 234 386 L 234 398 L 242 398 L 242 410 L 250 410 L 250 520 Z',
  'M 260 520 L 260 430 L 268 430 L 268 418 L 276 418 L 276 406 L 284 406 L 284 418 L 292 418 L 292 430 L 300 430 L 300 520 Z',
  'M 308 520 L 308 442 L 320 432 L 332 442 L 332 520 Z',
  'M 340 520 L 340 458 L 348 458 L 348 448 L 356 448 L 356 458 L 364 458 L 364 520 Z',
].join(' ');

const CATHEDRAL_PATH = [
  'M 380 520 L 380 462 L 388 462 L 388 470 L 396 470 L 396 462 L 396 520 Z',
  'M 400 520 L 400 380 L 410 380 L 410 368 L 410 380 L 425 380 L 425 368 L 425 380 L 440 380 L 440 520 Z',
  'M 400 380 L 420 340 L 440 380 Z',
  'M 444 520 L 444 462 L 452 462 L 452 470 L 460 470 L 460 462 L 460 520 Z',
].join(' ');

const CROSS_PATH = 'M 420 340 L 420 320 M 411 327 L 429 327';
const CATHEDRAL_WINDOWS = 'M 414 430 L 414 415 A 4 4 0 0 1 422 415 L 422 430 M 426 430 L 426 415 A 4 4 0 0 1 434 415 L 434 430';
const WINDMILL_BASE_PATH = 'M 510 520 L 522 440 L 562 440 L 574 520 Z';
const WINDMILL_CAP_PATH = 'M 520 440 L 530 425 L 554 425 L 564 440 Z';
const GROUND_PATH = 'M 165 522 L 635 522';
const RIVER_PATH = 'M 165 545 Q 230 540 280 548 T 400 545 T 520 548 T 635 545';
const WINDMILL_HUB = { cx: 542, cy: 432 };

function buildSails(cx: number, cy: number, len: number, w: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  let d = '';
  for (let i = 0; i < 4; i++) {
    const a = rad + (i * Math.PI) / 2;
    const dx = Math.cos(a), dy = Math.sin(a);
    const px = -Math.sin(a), py = Math.cos(a);
    const x1 = cx + dx * 8 + px * w, y1 = cy + dy * 8 + py * w;
    const x2 = cx + dx * len + px * w, y2 = cy + dy * len + py * w;
    const x3 = cx + dx * len - px * w, y3 = cy + dy * len - py * w;
    const x4 = cx + dx * 8 - px * w, y4 = cy + dy * 8 - py * w;
    d += `M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)} L ${x3.toFixed(1)} ${y3.toFixed(1)} L ${x4.toFixed(1)} ${y4.toFixed(1)} Z `;
  }
  return d;
}

function makeCircuitTraces() {
  const traces: { d: string; end: [number, number] }[] = [];
  const tipIndices = [0, 2, 5, 7, 9, 11, 13, 15, 17, 20];
  for (const i of tipIndices) {
    const step = (Math.PI * 2) / GEAR_N;
    const a = i * step + step * 0.275;
    const cosA = Math.cos(a), sinA = Math.sin(a);
    const sx = GEAR_CX + cosA * GEAR_R_OUTER;
    const sy = GEAR_CY + sinA * GEAR_R_OUTER;
    const r1 = GEAR_R_OUTER + 30 + (i % 3) * 12;
    const x1 = GEAR_CX + cosA * r1, y1 = GEAR_CY + sinA * r1;
    const tangent = i % 2 === 0 ? 1 : -1;
    const tx = -sinA * tangent, ty = cosA * tangent;
    const r2 = 28 + (i % 4) * 10;
    const x2 = x1 + tx * r2, y2 = y1 + ty * r2;
    const r3 = r1 + 20 + (i % 3) * 8;
    const x3 = GEAR_CX + (cosA * r3 + tx * r2);
    const y3 = GEAR_CY + (sinA * r3 + ty * r2);
    traces.push({ d: `M ${sx.toFixed(1)} ${sy.toFixed(1)} L ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)} L ${x3.toFixed(1)} ${y3.toFixed(1)}`, end: [x3, y3] });
  }
  return traces;
}

const CIRCUIT_TRACES = makeCircuitTraces();

const PARTICLES = Array.from({ length: 28 }, (_, i) => {
  const a = (i / 28) * Math.PI * 2 + (i % 3) * 0.3;
  const r = GEAR_R_OUTER + 50 + (i % 5) * 20;
  return {
    x: GEAR_CX + Math.cos(a) * r,
    y: GEAR_CY + Math.sin(a) * r,
    size: 1 + (i % 4) * 0.6,
    delay: (i % 7) * 0.08,
    speed: 0.6 + (i % 3) * 0.3,
  };
});

interface GearLogoProps {
  gearProgress?: number;
  cityProgress?: number;
  circuitProgress?: number;
  particleProgress?: number;
  pulseT?: number;
  color?: string;
  glow?: number;
  opacity?: number;
}

export default function GearLogo({
  gearProgress = 1,
  cityProgress = 1,
  circuitProgress = 1,
  particleProgress = 1,
  pulseT = 0,
  color = '#f5c542',
  glow = 1,
  opacity = 1,
}: GearLogoProps) {
  const gearInv = 100 - 100 * gearProgress;

  const glowF = glow > 0
    ? `drop-shadow(0 0 ${3 * glow}px ${color}) drop-shadow(0 0 ${10 * glow}px ${color}AA) drop-shadow(0 0 ${22 * glow}px ${color}66)`
    : 'none';
  const softGlow = glow > 0
    ? `drop-shadow(0 0 ${2 * glow}px ${color}) drop-shadow(0 0 ${6 * glow}px ${color}88)`
    : 'none';

  const pulseScale = 1 + 0.012 * Math.sin(pulseT * 1.8);

  return (
    <svg
      viewBox="0 0 800 800"
      preserveAspectRatio="xMidYMid meet"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity }}
    >
      <g style={{ transformOrigin: '400px 400px', transform: `scale(${pulseScale})` }}>
        <g style={{ filter: softGlow }}>
          {CIRCUIT_TRACES.map((t, i) => {
            const stagger = i * 0.06;
            const p = clamp((circuitProgress - stagger) / (1 - stagger || 0.001), 0, 1);
            if (p <= 0) return null;
            return (
              <g key={i}>
                <path
                  d={t.d} fill="none" stroke={color}
                  strokeWidth={1.2} strokeOpacity={0.65}
                  pathLength={100} strokeDasharray={100}
                  strokeDashoffset={100 - 100 * p}
                />
                {p > 0.85 && (
                  <circle cx={t.end[0]} cy={t.end[1]} r={2.5} fill={color}
                    style={{ opacity: (p - 0.85) / 0.15 }} />
                )}
              </g>
            );
          })}
        </g>

        <g style={{ filter: glowF }}>
          <path
            d={GEAR_PATH} fill="none" stroke={color}
            strokeWidth={2.5} strokeLinejoin="miter"
            pathLength={100} strokeDasharray={100}
            strokeDashoffset={gearInv}
          />
          <circle
            cx={GEAR_CX} cy={GEAR_CY} r={GEAR_R_BODY}
            fill="none" stroke={color} strokeWidth={1.5} strokeOpacity={0.7}
            pathLength={100} strokeDasharray={100} strokeDashoffset={gearInv}
          />
          {Array.from({ length: GEAR_N }).map((_, i) => {
            const step = (Math.PI * 2) / GEAR_N;
            const a = i * step + step * 0.275;
            const x = GEAR_CX + Math.cos(a) * GEAR_R_OUTER;
            const y = GEAR_CY + Math.sin(a) * GEAR_R_OUTER;
            const dotP = clamp((gearProgress - 0.6) / 0.4, 0, 1);
            return <circle key={i} cx={x} cy={y} r={1.8} fill={color} opacity={dotP} />;
          })}
        </g>

        <g style={{ filter: softGlow, opacity: cityProgress }}>
          <defs>
            <clipPath id="gear-body-clip">
              <circle cx={GEAR_CX} cy={GEAR_CY} r={GEAR_R_BODY - 3} />
            </clipPath>
          </defs>
          <g clipPath="url(#gear-body-clip)">
            <path d={GROUND_PATH} stroke={color} strokeWidth={1.2} strokeOpacity={0.7}
              pathLength={100} strokeDasharray={100}
              strokeDashoffset={100 - 100 * clamp(cityProgress * 1.5, 0, 1)} fill="none" />
            <path d={GRANARIES_PATH} fill="none" stroke={color} strokeWidth={1.5}
              pathLength={100} strokeDasharray={100}
              strokeDashoffset={100 - 100 * clamp((cityProgress - 0.05) / 0.45, 0, 1)} />
            <path d={CATHEDRAL_PATH} fill="none" stroke={color} strokeWidth={1.6}
              pathLength={100} strokeDasharray={100}
              strokeDashoffset={100 - 100 * clamp((cityProgress - 0.25) / 0.45, 0, 1)} />
            <path d={CATHEDRAL_WINDOWS} fill="none" stroke={color} strokeWidth={1} strokeOpacity={0.7}
              opacity={clamp((cityProgress - 0.55) / 0.3, 0, 1)} />
            <path d={CROSS_PATH} stroke={color} strokeWidth={1.4} fill="none" strokeLinecap="round"
              opacity={clamp((cityProgress - 0.6) / 0.3, 0, 1)} />
            <path d={WINDMILL_BASE_PATH} fill="none" stroke={color} strokeWidth={1.5}
              pathLength={100} strokeDasharray={100}
              strokeDashoffset={100 - 100 * clamp((cityProgress - 0.35) / 0.4, 0, 1)} />
            <path d={WINDMILL_CAP_PATH} fill="none" stroke={color} strokeWidth={1.4}
              pathLength={100} strokeDasharray={100}
              strokeDashoffset={100 - 100 * clamp((cityProgress - 0.45) / 0.35, 0, 1)} />
            <g style={{
              transformOrigin: `${WINDMILL_HUB.cx}px ${WINDMILL_HUB.cy}px`,
              transform: `rotate(${pulseT * 28}deg)`,
              opacity: clamp((cityProgress - 0.55) / 0.4, 0, 1),
            }}>
              <path d={buildSails(WINDMILL_HUB.cx, WINDMILL_HUB.cy, 28, 2.5, 15)}
                fill="none" stroke={color} strokeWidth={1.2} />
              <circle cx={WINDMILL_HUB.cx} cy={WINDMILL_HUB.cy} r={2.5} fill={color} />
            </g>
            <path d={RIVER_PATH} fill="none" stroke={color} strokeWidth={1.2} strokeOpacity={0.45}
              opacity={clamp((cityProgress - 0.7) / 0.3, 0, 1)} />
          </g>
        </g>

        {gearProgress >= 1 && (
          <g style={{ filter: softGlow }}>
            {[
              { x: 700, y: 200, s: 1 }, { x: 120, y: 290, s: 0.7 },
              { x: 650, y: 600, s: 0.8 }, { x: 200, y: 650, s: 0.9 },
              { x: 730, y: 430, s: 0.6 },
            ].map((sp, i) => {
              const phase = (pulseT * 1.2 + i * 0.7) % 2;
              const tw = phase < 1 ? phase : 2 - phase;
              return (
                <g key={i} style={{ opacity: 0.4 + 0.6 * tw, transformOrigin: `${sp.x}px ${sp.y}px`, transform: `scale(${0.6 + 0.4 * tw})` }}>
                  <path
                    d={`M ${sp.x - 8 * sp.s} ${sp.y} L ${sp.x + 8 * sp.s} ${sp.y} M ${sp.x} ${sp.y - 8 * sp.s} L ${sp.x} ${sp.y + 8 * sp.s}`}
                    stroke={color} strokeWidth={1} strokeLinecap="round"
                  />
                  <circle cx={sp.x} cy={sp.y} r={1.5 * sp.s} fill={color} />
                </g>
              );
            })}
          </g>
        )}

        <g style={{ filter: softGlow, opacity: particleProgress }}>
          {PARTICLES.map((p, i) => {
            const a = Math.atan2(p.y - GEAR_CY, p.x - GEAR_CX) + pulseT * p.speed * 0.15;
            const r = Math.hypot(p.x - GEAR_CX, p.y - GEAR_CY);
            const x = GEAR_CX + Math.cos(a) * r;
            const y = GEAR_CY + Math.sin(a) * r;
            const tw = (Math.sin(pulseT * 2.5 + i) + 1) / 2;
            return (
              <circle key={i} cx={x} cy={y} r={p.size} fill={color} opacity={0.3 + 0.7 * tw} />
            );
          })}
        </g>
      </g>
    </svg>
  );
}
