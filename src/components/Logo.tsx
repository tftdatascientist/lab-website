'use client';
import { useEffect, useState } from 'react';

const GOLD = '#f5c842';
const SW   = 0.55;

function gearPath(cx: number, cy: number, rOut: number, rIn: number, teeth: number, toothW: number, toothH: number): string {
  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = (Math.PI * 2 * i) / teeth - Math.PI / 2;
    const cos = Math.cos(a), sin = Math.sin(a);
    const px = -sin, py = cos;
    const baseR = rOut - toothH;
    const x0 = cx + baseR * cos - toothW * px, y0 = cy + baseR * sin - toothW * py;
    const x1 = cx + rOut  * cos - toothW * px, y1 = cy + rOut  * sin - toothW * py;
    const x2 = cx + rOut  * cos + toothW * px, y2 = cy + rOut  * sin + toothW * py;
    const x3 = cx + baseR * cos + toothW * px, y3 = cy + baseR * sin + toothW * py;
    const na = (Math.PI * 2 * (i + 0.5)) / teeth - Math.PI / 2;
    const gx = cx + rIn * Math.cos(na), gy = cy + rIn * Math.sin(na);
    const f = (n: number) => n.toFixed(2);
    pts.push(`${f(x0)},${f(y0)} ${f(x1)},${f(y1)} ${f(x2)},${f(y2)} ${f(x3)},${f(y3)} ${f(gx)},${f(gy)}`);
  }
  return 'M ' + pts.join(' L ') + ' Z';
}

// Sylwetka Grudziądza — spichlerze, katedra ze szpilą, wiatrak
const CITY = `M 8,17 L 8,13 L 9.5,13 L 9.5,11 L 11,11 L 11,9.5 L 12,9.5 L 12,8.5 L 13,8.5 L 13,9.5 L 14,9.5 L 14,11 L 15,11 L 15,13 L 16,13 L 16,10.5 L 17,10.5 L 17,9 L 18,9 L 18,10.5 L 19,10.5 L 19,17
M 20.5,17 L 20.5,7 L 21.2,7 L 21.2,4.5 L 22,3.5 L 22,2 L 22.5,1 L 23,2 L 23,3.5 L 23.8,4.5 L 23.8,7 L 24.5,7 L 24.5,17
M 26,17 L 26,11 L 27,11 L 27,9.5 L 28.5,9.5 L 28.5,9 L 29.5,9 L 29.5,9.5 L 29.5,11 L 30,11
M 30,11 L 30,13 L 31,13 L 31,11 L 32.5,11 L 32.5,9 L 33,8 L 35,8 L 35,17
M 8,17 L 35,17`;

interface LogoProps {
  size?: number;
  showTagline?: boolean;
}

type Variant = 'city' | 'lok-filled' | 'lok-outline' | 'city-lok';

const VARIANTS: Variant[] = ['city', 'lok-filled', 'lok-outline', 'city-lok'];
const KEY = 'lokai-logo-variant';

function GearIcon({ variant, size }: { variant: Variant; size: number }) {
  const vb = 48;
  const cx = 24, cy = 24;
  const rOut = 22, rIn = 17.5;
  const g = gearPath(cx, cy, rOut, rIn, 22, 1.5, 3);
  const clipId = `lgc-${variant}`;

  // центруємо силует міста — він намальований у координатах 8–35 x, 1–17 y
  // переміщуємо до середини кола rIn~17: translate(0, 5) scale(1) center
  const cityTransform = `translate(${cx - 21.5}, ${cy - 8}) scale(0.97)`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${vb} ${vb}`} fill="none"
      style={{ display: 'block', filter: `drop-shadow(0 1px 6px ${GOLD}44)` }}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx={cx} cy={cy} r={rIn - 0.5} />
        </clipPath>
      </defs>

      {/* Zębatka */}
      <path d={g} fill="none" stroke={GOLD} strokeWidth="0.75" strokeLinejoin="miter" />
      {/* Pierścień wewnętrzny */}
      <circle cx={cx} cy={cy} r={rIn} fill="none" stroke={GOLD} strokeWidth={SW} />

      {/* Wariant: miasto */}
      {(variant === 'city' || variant === 'city-lok') && (
        <g transform={cityTransform} clipPath={`url(#${clipId})`}>
          <path d={CITY} fill="none" stroke={GOLD} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}

      {/* Wariant: LOK wypełniony */}
      {variant === 'lok-filled' && (
        <text x={cx} y={cy + 5} textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif" fontWeight="900"
          fontSize="14" letterSpacing="-1"
          fill={GOLD} clipPath={`url(#${clipId})`}
        >LOK</text>
      )}

      {/* Wariant: LOK konturowy */}
      {variant === 'lok-outline' && (
        <text x={cx} y={cy + 5} textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif" fontWeight="900"
          fontSize="14" letterSpacing="-1"
          fill="none" stroke={GOLD} strokeWidth="0.6" clipPath={`url(#${clipId})`}
        >LOK</text>
      )}

      {/* Wariant: miasto + LOK */}
      {variant === 'city-lok' && (
        <text x={cx} y={cy - 5} textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif" fontWeight="900"
          fontSize="7" letterSpacing="-0.5"
          fill={GOLD} clipPath={`url(#${clipId})`}
        >LOK</text>
      )}
    </svg>
  );
}

export default function Logo({ size = 42, showTagline = true }: LogoProps) {
  const scale = size / 40;
  const [variant, setVariant] = useState<Variant>('city');

  useEffect(() => {
    const idx = parseInt(localStorage.getItem(KEY) ?? '0', 10);
    setVariant(VARIANTS[idx % VARIANTS.length]);
    localStorage.setItem(KEY, String((idx + 1) % VARIANTS.length));
  }, []);

  return (
    <div className="flex items-center gap-[11px]">
      <GearIcon variant={variant} size={size} />
      <div className="flex flex-col leading-none">
        <span
          className="font-heading font-bold whitespace-nowrap text-text"
          style={{ fontSize: 17 * scale + 'px', letterSpacing: '-0.035em' }}
        >
          lok<span className="text-amber">·</span>ai
        </span>
        {showTagline && (
          <span
            className="font-mono uppercase text-text-mute"
            style={{ fontSize: 9 * scale + 'px', letterSpacing: '0.22em', marginTop: 4 }}
          >
            AI lokalnie
          </span>
        )}
      </div>
    </div>
  );
}
