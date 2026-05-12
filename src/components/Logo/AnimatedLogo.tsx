'use client';
import React, {
  useState, useEffect, useRef, createContext, useContext, useCallback,
} from 'react';
import { Easing, clamp } from './animations';
import PolandMap from './PolandMap';
import GearLogo from './GearLogo';
import {
  lerpColor, Wordmark, UrlLine, Tagline, StatusBar,
  CornerReadout, Crosshair, AmbientBackdrop, Starfield, CornerFrames,
} from './Scenes';

const COLOR_GOLD     = '#f5b820';
const COLOR_LAVENDER = '#ef7955';
const COLOR_MINT     = '#8b1a2f';
const COLOR_BURGUNDY = '#8b1a2f';
const COLOR_CORAL    = '#ef7955';
const DURATION       = 14.5;

const MAP_W = 1700;
const MAP_H = 1004;
const MAP_X0 = (1920 - MAP_W) / 2;
const MAP_Y0 = (1080 - MAP_H) / 2;
const TARGET_MAP_X = (495 / 1100) * MAP_W + MAP_X0;
const TARGET_MAP_Y = (195 / 650)  * MAP_H + MAP_Y0;
const GEAR_FINAL_SIZE   = 760;
const GEAR_INITIAL_SIZE = 30;

// ── Subscription-based timeline — avoids setState per frame at root level ─────
type Subscriber = (t: number) => void;

interface TimelineHandle {
  subscribe: (fn: Subscriber) => () => void;
  getTime: () => number;
  duration: number;
}

const TimelineContext = createContext<TimelineHandle | null>(null);

function useTime(): number {
  const handle = useContext(TimelineContext);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!handle) return;
    return handle.subscribe(setTime);
  }, [handle]);

  return time;
}

function useTimeline(
  duration: number,
  speed: number,
): TimelineHandle {
  const subsRef = useRef<Set<Subscriber>>(new Set());
  const timeRef = useRef(0);
  const adjustedDuration = duration / speed;

  const subscribe = useCallback((fn: Subscriber) => {
    subsRef.current.add(fn);
    return () => { subsRef.current.delete(fn); };
  }, []);

  const getTime = useCallback(() => timeRef.current, []);

  useEffect(() => {
    let raf: number;
    let last: number | null = null;
    // Throttle to ~30fps to reduce main-thread pressure
    const FRAME_MS = 1000 / 30;
    let acc = 0;

    const step = (ts: number) => {
      if (last == null) last = ts;
      const dt = ts - last;
      last = ts;
      acc += dt;
      if (acc >= FRAME_MS) {
        const dtSec = acc / 1000;
        acc = 0;
        let n = timeRef.current + dtSec;
        if (n >= adjustedDuration) n = n % adjustedDuration;
        timeRef.current = n;
        subsRef.current.forEach(fn => fn(n));
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [adjustedDuration]);

  return { subscribe, getTime, duration: adjustedDuration };
}

// ── Props ─────────────────────────────────────────────────────────────────────
export type AccentColor = 'gold' | 'lavender' | 'mint';

export interface LogoProps {
  accentStart?: AccentColor;
  accentEnd?:   AccentColor;
  speed?:       number;
  glow?:        number;
  tagline?:     boolean;
  bg?:          'surface' | 'surface-low' | 'surface-lowest';
  className?:   string;
}

// ── Static fallback ───────────────────────────────────────────────────────────
export function StaticLogoFallback() {
  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: '16/9', background: '#1b1c1d' }}
      role="img"
      aria-label="lok-ai — Lokalna Automatyzacja Biznesu"
    >
      <svg viewBox="0 0 1920 1080"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <text x="960" y="560" textAnchor="middle" fill="#f5b820"
          fontSize="200" fontWeight="900"
          fontFamily="Inter, system-ui, sans-serif" letterSpacing="-8"
          style={{ filter: 'drop-shadow(0 0 32px #f5b82055)' }}>
          lok-ai
        </text>
        <text x="960" y="660" textAnchor="middle" fill="#4edea3"
          fontSize="36" fontFamily="JetBrains Mono, ui-monospace, monospace" letterSpacing="8">
          LOK-AI.PL
        </text>
        <text x="960" y="730" textAnchor="middle" fill="#cbc3d7"
          fontSize="32" fontFamily="Inter, system-ui, sans-serif">
          Lokalna Automatyzacja Biznesu
        </text>
      </svg>
    </div>
  );
}

// ── Scene — subscribes to timeline independently ──────────────────────────────
type SceneProps = Required<Omit<LogoProps, 'speed' | 'className'>>;

function Scene({ accentStart, accentEnd, glow, tagline, bg }: SceneProps) {
  const t = useTime();

  // Stage 1: Poland map (0–4s)
  const mapDrawP  = clamp(t / 2.0, 0, 1);
  const mapGridP  = clamp((t - 0.3) / 2.0, 0, 1);
  const mapCityP  = clamp((t - 1.6) / 1.6, 0, 1);
  const mapFade   = 1 - clamp((t - 3.6) / 1.0, 0, 1);

  // Camera zoom (2.0–4.0s)
  const zoomP    = clamp((t - 2.0) / 2.0, 0, 1);
  const zoomEase = Easing.easeInOutCubic(zoomP);
  const zoomScale = 1 + (3.2 - 1) * zoomEase;
  const tx = (960 - TARGET_MAP_X * zoomScale) * zoomEase;
  const ty = (540 - TARGET_MAP_Y * zoomScale) * zoomEase;

  const crosshairP = clamp((t - 2.4) / 1.0, 0, 1) * (1 - clamp((t - 4.5) / 0.6, 0, 1));

  // Stage 2: Gear (3.6–6.0s)
  const gearP       = clamp((t - 3.6) / 1.6, 0, 1);
  const cityInsideP = clamp((t - 4.2) / 1.8, 0, 1);
  const circuitP    = clamp((t - 4.0) / 1.6, 0, 1);
  const particleP   = clamp((t - 5.4) / 0.8, 0, 1);

  const gearGrowthP    = clamp((t - 3.6) / 1.4, 0, 1);
  const gearGrowthEase = Easing.easeOutCubic(gearGrowthP);
  const growSize       = GEAR_INITIAL_SIZE + (GEAR_FINAL_SIZE - GEAR_INITIAL_SIZE) * gearGrowthEase;

  const lockupP    = clamp((t - 7.4) / 0.9, 0, 1);
  const lockupEase = Easing.easeInOutCubic(lockupP);
  const GEAR_LOCKUP_SIZE = 340;
  const GEAR_LOCKUP_Y   = 310;
  const gearSize    = growSize + (GEAR_LOCKUP_SIZE - growSize) * lockupEase;
  const gearCenterX = 960;
  const gearCenterY = 540 + (GEAR_LOCKUP_Y - 540) * lockupEase;

  // Color transformation: burgund (0–7s) → coral (7–9s) → gold (9–14.5s)
  const phase1P = clamp((t - 7.0) / 2.0, 0, 1); // burgund → coral
  const phase2P = clamp((t - 9.0) / 2.0, 0, 1); // coral → gold
  const midColor = lerpColor(COLOR_BURGUNDY, COLOR_CORAL, Easing.easeInOutCubic(phase1P));
  const liveColor = lerpColor(midColor, COLOR_GOLD, Easing.easeInOutCubic(phase2P));

  // Wordmark + tagline
  const wordmarkP = clamp((t - 7.6) / 1.6, 0, 1);
  const urlP      = clamp((t - 9.3) / 0.8, 0, 1);
  const taglineP  = clamp((t - 9.8) / 1.0, 0, 1);

  // Status bar
  const earlyStatus  = clamp((t - 0.6) / 0.8, 0, 1) * (1 - clamp((t - 5.8) / 0.6, 0, 1));
  const operationalP = clamp((t - 10.6) / 0.6, 0, 1) * (1 - clamp((t - 14.2) / 0.3, 0, 1));
  const showStarfield = clamp((t - 5.6) / 0.8, 0, 1);

  const bgColor = bg === 'surface-low' ? '#1b1c1d' : bg === 'surface-lowest' ? '#0d0e0f' : '#121315';

  return (
    <div style={{ position: 'absolute', inset: 0, background: bgColor, overflow: 'hidden' }}>
      <AmbientBackdrop color={liveColor} intensity={glow} />

      {showStarfield > 0 && (
        <Starfield pulseT={t} color={liveColor} opacity={0.5 * showStarfield} />
      )}

      {mapFade > 0.01 && (
        <div style={{
          position: 'absolute', left: 0, top: 0, width: 1920, height: 1080,
          transform: `translate(${tx}px,${ty}px) scale(${zoomScale})`,
          transformOrigin: '0 0', opacity: mapFade, willChange: 'transform,opacity',
        }}>
          <div style={{ position: 'absolute', left: MAP_X0, top: MAP_Y0, width: MAP_W, height: MAP_H }}>
            <PolandMap
              drawProgress={mapDrawP} gridProgress={mapGridP} cityProgress={mapCityP}
              regionProgress={clamp((t - 2.0) / 1.4, 0, 1)}
              fadeOpacity={1} color={liveColor} glow={glow}
            />
          </div>
        </div>
      )}

      {crosshairP > 0.01 && (
        <div style={{
          position: 'absolute', left: 0, top: 0, width: 1920, height: 1080,
          transform: `translate(${tx}px,${ty}px) scale(${zoomScale})`,
          transformOrigin: '0 0', pointerEvents: 'none',
        }}>
          <Crosshair x={TARGET_MAP_X} y={TARGET_MAP_Y} progress={crosshairP}
            color={liveColor} size={60 / zoomScale * 1.5} />
        </div>
      )}

      {gearGrowthP > 0.001 && (
        <div style={{
          position: 'absolute',
          left: gearCenterX - gearSize / 2, top: gearCenterY - gearSize / 2,
          width: gearSize, height: gearSize,
          transformOrigin: 'center', willChange: 'left,top,width,height',
        }}>
          <GearLogo
            gearProgress={gearP} cityProgress={cityInsideP}
            circuitProgress={circuitP} particleProgress={particleP}
            pulseT={t} color={liveColor} glow={glow} opacity={1}
          />
        </div>
      )}

      {earlyStatus > 0.01 && (
        <StatusBar progress={earlyStatus} pulseT={t} color={liveColor}
          secondary={COLOR_MINT} label="POLSKA · KUJAWSKO-POMORSKIE" operational={false} />
      )}
      {operationalP > 0.01 && (
        <StatusBar progress={operationalP} pulseT={t} color={liveColor}
          secondary={COLOR_MINT} label="SYSTEM STATUS: OPERATIONAL" operational={true} />
      )}

      {wordmarkP > 0.001 && <Wordmark progress={wordmarkP} color={liveColor} scale={1} />}
      {urlP > 0.001 && <UrlLine progress={urlP} color={liveColor} />}
      {tagline && taglineP > 0.001 && <Tagline progress={taglineP} color={liveColor} />}

      {gearP > 0.4 && (
        <>
          <CornerReadout position="bl" progress={clamp((t - 4.4) / 1.0, 0, 1)}
            color={liveColor} lines={[
              '> Initializing lok-ai.pl',
              '> Lokalna Automatyzacja Biznesu',
              '> AI · n8n · RAG · ElevenLabs',
            ]} />
          <CornerReadout position="br" progress={clamp((t - 4.8) / 1.0, 0, 1)}
            color={liveColor} lines={[
              '53.49°N · 18.75°E',
              'GRUDZIĄDZ · TORUŃ · BYDGOSZCZ',
              '© 2026 LAB · v1.0',
            ]} />
        </>
      )}

      <CornerFrames color={liveColor} glow={glow} />
    </div>
  );
}

// ── Root component ────────────────────────────────────────────────────────────
export default function AnimatedLogo({
  accentStart = 'mint',
  accentEnd   = 'gold',
  speed       = 1.1,
  glow        = 0.9,
  tagline     = true,
  bg          = 'surface-low',
  className,
}: LogoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / 1920);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handle = useTimeline(DURATION, prefersReducedMotion ? 0.0001 : speed);

  if (prefersReducedMotion) return <StaticLogoFallback />;

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}
      role="img"
      aria-label="lok-ai — Lokalna Automatyzacja Biznesu"
      aria-describedby="animated-logo-desc"
    >
      <span id="animated-logo-desc" className="sr-only">
        Animowane logo: mapa Polski z wycentrowanym województwem kujawsko-pomorskim,
        koło zębate z panoramą Grudziądza, wordmark lok-ai.
      </span>
      <div style={{
        position: 'absolute', top: 0, left: 0, width: 1920, height: 1080,
        transform: `scale(${scale})`, transformOrigin: 'top left',
      }}>
        <TimelineContext.Provider value={handle}>
          <Scene accentStart={accentStart} accentEnd={accentEnd}
            glow={glow} tagline={tagline} bg={bg} />
        </TimelineContext.Provider>
      </div>
    </div>
  );
}
