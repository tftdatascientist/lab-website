"use client";

/**
 * Mapa Grudziądza — animacja ze starej strony głównej (pakiet Logo/) przeniesiona na ścianę
 * (decyzja właściciela 2026-09-10, ⚠️ w CLAUDE.md: kontrakt trzyma animowane logo poza hero).
 * Zostały tylko dwa rysunki: mapa Polski z najazdem na Grudziądz i koło zębate z panoramą miasta.
 * Wypadły: poświata i gwiazdy (NIE CHCĘ warstwa 2), wordmark / adres / tagline (powtarzają szynę
 * i H1), paski statusu z procentami i odczyty w rogach (liczniki bez źródła), ramki narożne
 * (tabliczka ma własną ramkę). Kreska = `currentColor` tabliczki (kość na płycie), sygnał tylko
 * na celowniku i punkcie Grudziądza. Pętla z wygaszeniem; `prefers-reduced-motion` = jedna klatka.
 */
import { useEffect, useRef, useState } from "react";
import { Easing, clamp } from "./animations";
import PolandMap from "./PolandMap";
import GearLogo from "./GearLogo";

const STAGE_W = 1920;
const STAGE_H = 1080;
const MAP_W = 1700;
const MAP_H = 1004;
const MAP_X0 = (STAGE_W - MAP_W) / 2;
const MAP_Y0 = (STAGE_H - MAP_H) / 2;
/** punkt Grudziądza w układzie mapy (1100×650) przeniesiony na scenę — celownik i najazd idą na miasto, nie na środek regionu */
const TARGET_X = (525 / 1100) * MAP_W + MAP_X0;
const TARGET_Y = (151 / 650) * MAP_H + MAP_Y0;
const GEAR_SIZE_0 = 30;
const GEAR_SIZE_1 = 760;

/** długość pętli [s]; ostatnie FADE s to wygaszenie przed powtórką */
const DURATION = 9.5;
const FADE = 0.6;
/** klatka pokazywana przy `prefers-reduced-motion` (mapa zeszła, koło i miasto gotowe) */
const STILL_T = 6.5;

function Celownik({ x, y, progress, size }: { x: number; y: number; progress: number; size: number }) {
  const e = Easing.easeOutCubic(progress);
  if (e < 0.01) return null;
  return (
    <svg
      viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", color: "var(--accent)" }}
    >
      <g style={{ transformOrigin: `${x}px ${y}px`, transform: `scale(${0.6 + 0.4 * e})`, opacity: e }}>
        <circle cx={x} cy={y} r={size} fill="none" stroke="currentColor" strokeWidth={1.5} strokeDasharray="4 6" />
        <circle cx={x} cy={y} r={size * 0.55} fill="none" stroke="currentColor" strokeWidth={1} strokeOpacity={0.5} />
        <line x1={x - size - 12} y1={y} x2={x - size + 6} y2={y} stroke="currentColor" strokeWidth={1.5} />
        <line x1={x + size - 6} y1={y} x2={x + size + 12} y2={y} stroke="currentColor" strokeWidth={1.5} />
        <line x1={x} y1={y - size - 12} x2={x} y2={y - size + 6} stroke="currentColor" strokeWidth={1.5} />
        <line x1={x} y1={y + size - 6} x2={x} y2={y + size + 12} stroke="currentColor" strokeWidth={1.5} />
      </g>
    </svg>
  );
}

function Scena({ t }: { t: number }) {
  // 1. Polska (0–4 s): siatka, kontur, miasta, region
  const mapDrawP = clamp(t / 2.0, 0, 1);
  const mapGridP = clamp((t - 0.3) / 2.0, 0, 1);
  const mapCityP = clamp((t - 1.6) / 1.6, 0, 1);
  const regionP = clamp((t - 2.0) / 1.4, 0, 1);
  const mapFade = 1 - clamp((t - 3.6) / 1.0, 0, 1);

  // najazd kamery (2–4 s)
  const zoomE = Easing.easeInOutCubic(clamp((t - 2.0) / 2.0, 0, 1));
  const zoom = 1 + (3.2 - 1) * zoomE;
  const tx = (STAGE_W / 2 - TARGET_X * zoom) * zoomE;
  const ty = (STAGE_H / 2 - TARGET_Y * zoom) * zoomE;
  const crosshairP = clamp((t - 2.4) / 1.0, 0, 1) * (1 - clamp((t - 4.5) / 0.6, 0, 1));

  // 2. Koło zębate z miastem (3.6–6.2 s), potem stoi w środku
  const gearP = clamp((t - 3.6) / 1.6, 0, 1);
  const cityP = clamp((t - 4.2) / 1.8, 0, 1);
  const circuitP = clamp((t - 4.0) / 1.6, 0, 1);
  const particleP = clamp((t - 5.4) / 0.8, 0, 1);
  const growE = Easing.easeOutCubic(clamp((t - 3.6) / 1.4, 0, 1));
  const gearSize = GEAR_SIZE_0 + (GEAR_SIZE_1 - GEAR_SIZE_0) * growE;

  // wygaszenie przed powtórką
  const sceneOpacity = 1 - clamp((t - (DURATION - FADE)) / FADE, 0, 1);

  return (
    <div style={{ position: "absolute", inset: 0, opacity: sceneOpacity }}>
      {mapFade > 0.01 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: STAGE_W,
            height: STAGE_H,
            transform: `translate(${tx}px,${ty}px) scale(${zoom})`,
            transformOrigin: "0 0",
            opacity: mapFade,
            willChange: "transform,opacity",
          }}
        >
          <div style={{ position: "absolute", left: MAP_X0, top: MAP_Y0, width: MAP_W, height: MAP_H }}>
            <PolandMap drawProgress={mapDrawP} gridProgress={mapGridP} cityProgress={mapCityP} regionProgress={regionP} glow={0} />
          </div>
        </div>
      )}

      {crosshairP > 0.01 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: STAGE_W,
            height: STAGE_H,
            transform: `translate(${tx}px,${ty}px) scale(${zoom})`,
            transformOrigin: "0 0",
            pointerEvents: "none",
          }}
        >
          <Celownik x={TARGET_X} y={TARGET_Y} progress={crosshairP} size={(60 / zoom) * 1.5} />
        </div>
      )}

      {growE > 0.001 && (
        <div
          style={{
            position: "absolute",
            left: STAGE_W / 2 - gearSize / 2,
            top: STAGE_H / 2 - gearSize / 2,
            width: gearSize,
            height: gearSize,
          }}
        >
          <GearLogo gearProgress={gearP} cityProgress={cityP} circuitProgress={circuitP} particleProgress={particleP} pulseT={t} glow={0} />
        </div>
      )}
    </div>
  );
}

export default function MapaGrudziadz() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const [t, setT] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / STAGE_W);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // poza ekranem pętla stoi — strona jest długa, nie ma po co liczyć klatek pod zwojem
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (reduced || !visible) return;
    let raf = 0;
    let last: number | null = null;
    let acc = 0;
    const FRAME_MS = 1000 / 30;
    let time = t;
    const step = (ts: number) => {
      if (last == null) last = ts;
      acc += ts - last;
      last = ts;
      if (acc >= FRAME_MS) {
        time = (time + acc / 1000) % DURATION;
        acc = 0;
        setT(time);
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // `t` celowo poza zależnościami: pętla startuje od ostatniej klatki, nie od zera
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, visible]);

  const frame = reduced ? STILL_T : t;

  return (
    <div
      ref={wrapRef}
      className="mapa"
      role="img"
      aria-label="Mapa Polski z najazdem na Grudziądz, potem koło zębate z panoramą miasta: spichrze, katedra, wiatrak, Wisła."
      data-t={frame.toFixed(2)}
      style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", overflow: "hidden" }}
    >
      {scale > 0 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: STAGE_W,
            height: STAGE_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <Scena t={frame} />
        </div>
      )}
    </div>
  );
}
