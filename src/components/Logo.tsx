'use client';
import { useEffect, useState } from 'react';
import { MechanismLogoMark } from './mechanism';

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

// Sylwetka miasta w viewBox 48x48, wewnątrz okręgu r=17 (środek 24,24)
// Budynki zajmują x: 9–39, linia horyzontu y=31, szczyt najwyższy ~y=10
const CITY = [
  // linia horyzontu
  'M 9,31 L 39,31',
  // blok L — 3 niskie budynki (spichlerze)
  'M 9,31 L 9,24 L 11,24 L 11,21 L 13,21 L 13,24 L 15,24 L 15,22 L 17,22 L 17,31',
  // środek — wieża katedry ze szpilą
  'M 18,31 L 18,20 L 20,20 L 20,17 L 21,17 L 21,14 L 21.5,12 L 22,10.5 L 22.5,12 L 23,14 L 23,17 L 24,17 L 24,20 L 26,20 L 26,31',
  // prawa — wiatrak
  'M 27,31 L 27,22 L 30,22 L 30,31',
  // wiatrak — krzyż śmigieł
  'M 28.5,22 L 28.5,18',  // maszt
  'M 26.5,20 L 30.5,20',  // poziome ramię
  'M 27.2,18.7 L 29.8,21.3', // skos
  'M 29.8,18.7 L 27.2,21.3', // skos
  // drobny budynek prawy
  'M 31,31 L 31,24 L 33,24 L 33,21 L 36,21 L 36,24 L 39,24 L 39,31',
].join(' ');

interface LogoProps {
  size?: number;
  showTagline?: boolean;
}

type Variant = 'city' | 'lok-filled' | 'lok-outline' | 'city-lok' | 'gear';

const VARIANTS: Variant[] = ['city', 'lok-filled', 'lok-outline', 'city-lok', 'gear'];
const KEY = 'lokai-logo-variant';

function GearIcon({ variant, size }: { variant: Variant; size: number }) {
  const vb = 48;
  const cx = 24, cy = 24;
  const rOut = 22, rIn = 17.5;
  const g = gearPath(cx, cy, rOut, rIn, 22, 1.5, 3);
  const clipId = `lgc-${variant}`;

  // CITY rysowany w 48x48, już wyśrodkowany względem cx=24,cy=24
  const cityTransform = `translate(0, 0)`;

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

      {/* Zębatka — wolno obraca się (motyw mechanizmu) */}
      <g className="logo-gear-spin">
        <path d={g} fill="none" stroke={GOLD} strokeWidth="0.75" strokeLinejoin="miter" />
      </g>
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
      {variant === 'gear' ? (
        <MechanismLogoMark size={size} color={GOLD} />
      ) : (
        <GearIcon variant={variant} size={size} />
      )}
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
