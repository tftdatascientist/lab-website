// app.jsx — Root composition: orchestrates Poland map → zoom → gear → wordmark
// Story timeline (12s):
//  0.0 – 2.2 : Map of Poland draws on with eyebrow "POLSKA · KUJAWSKO-POMORSKIE"
//  2.2 – 4.0 : Camera zooms toward Grudziądz (crosshair locks on)
//  3.6 – 6.0 : Gear gold-circuit logo materialises in place of the pin
//  6.0 – 7.4 : Sparkle / particle hold beat
//  7.0 – 8.2 : Color transformation GOLD → LAVENDER
//  8.0 – 10.4: Wordmark "lok-ai" types in + tagline rises
// 10.0 – 12.0: OPERATIONAL pulse + corner readouts

const COLOR_GOLD = '#f5b820';
const COLOR_LAVENDER = '#d0bcff';
const COLOR_MINT = '#4edea3';
const COLOR_MUTED = '#958ea0';

const DURATION = 14.5;

// --- Mapping from map-viewBox (1100x650) to scene-viewBox (1920x1080) ---
// Map svg is laid out within a centered 1700x1004 area
const MAP_W = 1700;
const MAP_H = 1004;
const MAP_X0 = (1920 - MAP_W) / 2;   // 110
const MAP_Y0 = (1080 - MAP_H) / 2;   // 38
// Kujawsko-Pomorskie region center at (495, 195) in the 1100x650 map viewBox
const TARGET_MAP_X = (495 / 1100) * MAP_W + MAP_X0;
const TARGET_MAP_Y = (195 / 650)  * MAP_H + MAP_Y0;

// --- Gear positioning ---
// Gear initial position (small, at the Grudziądz pin)
const GEAR_FINAL_SIZE = 760; // px, final gear size onscreen
const GEAR_INITIAL_SIZE = 30;

function Scene() {
  const t = useTime();

  // Update screen label for comments
  React.useEffect(() => {
    const root = document.querySelector('[data-screen-label]');
    if (root) root.setAttribute('data-screen-label', `t=${t.toFixed(1)}s`);
  }, [Math.floor(t)]);

  // Read tweaks
  const tw = window.__tweaks || { speed: 1, accentEnd: 'lavender', tagline: true, glow: 1, bg: 'surface' };

  // The actual playhead is governed by Stage; tweaks.speed remaps the duration,
  // implemented by altering the stage `duration` prop. Here we just need to read
  // tweak-time-independent values.

  // ── Stage 1: Poland map (0–4s) ─────────────────────────────────────────────
  const mapDrawP = clamp(t / 2.0, 0, 1);            // outline
  const mapGridP = clamp((t - 0.3) / 2.0, 0, 1);     // grid
  const mapCityP = clamp((t - 1.6) / 1.6, 0, 1);     // city dots

  // Map fades out as we zoom past it
  const mapFade = 1 - clamp((t - 3.6) / 1.0, 0, 1);

  // ── Camera zoom (2.2–4.6s) ────────────────────────────────────────────────
  // Zoom toward Grudziądz pin location in viewport.
  // Start at scale=1 with pivot at center; end at scale=4.5 with pivot at Grudziądz
  const zoomP = clamp((t - 2.0) / 2.0, 0, 1);
  const zoomEase = Easing.easeInOutCubic(zoomP);
  const zoomScale = 1 + (3.2 - 1) * zoomEase;
  // We want the kujawsko-pomorskie region center to end at screen center (960, 540).
  // With transformOrigin '0 0': screen_pos = TARGET * scale + translate.
  // Solve: 960 = TARGET_X * scale + tx_final  → tx_final = 960 - TARGET_X * scale
  const tx = (960 - TARGET_MAP_X * zoomScale) * zoomEase;
  const ty = (540 - TARGET_MAP_Y * zoomScale) * zoomEase;

  // Crosshair: appears late in zoom, locks on pin
  const crosshairP = clamp((t - 2.4) / 1.0, 0, 1) * (1 - clamp((t - 4.5) / 0.6, 0, 1));

  // ── Stage 2: Gear (3.6–6.0s) ──────────────────────────────────────────────
  const gearP = clamp((t - 3.6) / 1.6, 0, 1);
  const cityInsideP = clamp((t - 4.2) / 1.8, 0, 1);
  const circuitP = clamp((t - 4.0) / 1.6, 0, 1);
  const particleP = clamp((t - 5.4) / 0.8, 0, 1);

  // Gear scale: from "small dot at Grudziądz position" → "centered & big"
  // From t=3.6 onwards, it grows from initial → final size and translates to center.
  const gearGrowthP = clamp((t - 3.6) / 1.4, 0, 1);
  const gearGrowthEase = Easing.easeOutCubic(gearGrowthP);
  const growSize = GEAR_INITIAL_SIZE + (GEAR_FINAL_SIZE - GEAR_INITIAL_SIZE) * gearGrowthEase;

  // Lockup tween (7.4 → 8.2s): gear shrinks from hero size to logo-mark size,
  // moving up to make room for the wordmark below.
  const lockupP = clamp((t - 7.4) / 0.9, 0, 1);
  const lockupEase = Easing.easeInOutCubic(lockupP);
  const GEAR_LOCKUP_SIZE = 340;   // final mark size sitting above wordmark
  const GEAR_LOCKUP_Y    = 310;   // y-center in lockup
  const gearSize = growSize + (GEAR_LOCKUP_SIZE - growSize) * lockupEase;
  const gearCenterX = 960;
  const gearCenterY = 540 + (GEAR_LOCKUP_Y - 540) * lockupEase;

  // ── Color transformation (7.0–8.4s) ───────────────────────────────────────
  // Color transformation: start (accentStart) → end (accentEnd) over 7.0–8.4s
  const colorNameToHex = (n) =>
    n === 'gold' ? COLOR_GOLD :
    n === 'lavender' ? COLOR_LAVENDER :
    n === 'mint' ? COLOR_MINT : COLOR_LAVENDER;
  const startColor = colorNameToHex(tw.accentStart || 'lavender');
  const endColor   = colorNameToHex(tw.accentEnd   || 'gold');
  const colorP = clamp((t - 7.0) / 1.4, 0, 1);
  const liveColor = lerpColor(startColor, endColor, Easing.easeInOutCubic(colorP));

  // ── Wordmark + tagline (typing done by ~9.4s, holds through end) ─────────
  const wordmarkP = clamp((t - 7.6) / 1.6, 0, 1);
  const urlP      = clamp((t - 9.3) / 0.8, 0, 1);
  const taglineP  = clamp((t - 9.8) / 1.0, 0, 1);

  // ── Status bar (top) ──────────────────────────────────────────────────────
  const statusFadeIn = clamp((t - 0.6) / 0.8, 0, 1);
  const statusFadeOut = 1 - clamp((t - 5.8) / 0.6, 0, 1);
  const earlyStatus = statusFadeIn * statusFadeOut;
  const operationalP = clamp((t - 10.6) / 0.6, 0, 1) * (1 - clamp((t - 14.2) / 0.3, 0, 1));

  const showStarfield = clamp((t - 5.6) / 0.8, 0, 1);

  // Background color choice via tweaks
  const bgColor =
    tw.bg === 'surface-low' ? '#1b1c1d' :
    tw.bg === 'surface-lowest' ? '#0d0e0f' :
    '#121315';

  return (
    <div
      data-screen-label={`t=${t.toFixed(1)}s`}
      style={{
        position: 'absolute',
        inset: 0,
        background: bgColor,
        overflow: 'hidden',
      }}
    >
      {/* Subtle vignette + ambient glow */}
      <AmbientBackdrop color={liveColor} intensity={tw.glow} />

      {/* Starfield appears once we've left the map */}
      {showStarfield > 0 && (
        <Starfield pulseT={t} color={liveColor} opacity={0.5 * showStarfield} />
      )}

      {/* Poland map — sits inside a zoomable container */}
      {mapFade > 0.01 && (
        <div
          style={{
            position: 'absolute',
            left: 0, top: 0,
            width: 1920, height: 1080,
            transform: `translate(${tx}px, ${ty}px) scale(${zoomScale})`,
            transformOrigin: '0 0',
            opacity: mapFade,
            willChange: 'transform, opacity',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: MAP_X0,
              top: MAP_Y0,
              width: MAP_W,
              height: MAP_H,
            }}
          >
            <PolandMap
              drawProgress={mapDrawP}
              gridProgress={mapGridP}
              cityProgress={mapCityP}
              regionProgress={clamp((t - 2.0) / 1.4, 0, 1)}
              fadeOpacity={1}
              color={liveColor}
              glow={tw.glow}
            />
          </div>
        </div>
      )}

      {/* Crosshair, anchored to Grudziądz pin in scene space, but transformed with camera */}
      {crosshairP > 0.01 && (
        <div
          style={{
            position: 'absolute',
            left: 0, top: 0,
            width: 1920, height: 1080,
            transform: `translate(${tx}px, ${ty}px) scale(${zoomScale})`,
            transformOrigin: '0 0',
            pointerEvents: 'none',
          }}
        >
          <Crosshair x={TARGET_MAP_X} y={TARGET_MAP_Y} progress={crosshairP} color={liveColor} size={60 / zoomScale * 1.5} />
        </div>
      )}

      {/* Gear logo container — renders once we've zoomed in */}
      {gearGrowthP > 0.001 && (
        <div
          style={{
            position: 'absolute',
            left: gearCenterX - gearSize / 2,
            top: gearCenterY - gearSize / 2,
            width: gearSize,
            height: gearSize,
            transformOrigin: 'center',
            willChange: 'transform, left, top, width, height',
          }}
        >
          <GearLogo
            gearProgress={gearP}
            cityProgress={cityInsideP}
            circuitProgress={circuitP}
            particleProgress={particleP}
            pulseT={t}
            color={liveColor}
            glow={tw.glow}
            opacity={1}
          />
        </div>
      )}

      {/* Top status bar */}
      {earlyStatus > 0.01 && (
        <StatusBar
          progress={earlyStatus}
          pulseT={t}
          color={liveColor}
          secondary={COLOR_MINT}
          label="POLSKA · KUJAWSKO-POMORSKIE"
          operational={false}
        />
      )}
      {operationalP > 0.01 && (
        <StatusBar
          progress={operationalP}
          pulseT={t}
          color={liveColor}
          secondary={COLOR_MINT}
          label="SYSTEM STATUS: OPERATIONAL"
          operational={true}
        />
      )}

      {/* Wordmark */}
      {wordmarkP > 0.001 && (
        <Wordmark progress={wordmarkP} color={liveColor} scale={1} />
      )}

      {/* URL — lok-ai.pl, sits between wordmark & tagline */}
      {urlP > 0.001 && (
        <UrlLine progress={urlP} color={liveColor} />
      )}

      {/* Tagline */}
      {tw.tagline && taglineP > 0.001 && (
        <Tagline progress={taglineP} color={liveColor} secondary={COLOR_MINT} />
      )}

      {/* Corner readouts (appear during gear stage and onwards) */}
      {gearP > 0.4 && (
        <>
          <CornerReadout
            position="bl"
            progress={clamp((t - 4.4) / 1.0, 0, 1)}
            color={liveColor}
            lines={[
              '> Initializing lok-ai.pl',
              '> Lokalna Automatyzacja Biznesu',
              '> AI · n8n · RAG · ElevenLabs',
            ]}
          />
          <CornerReadout
            position="br"
            progress={clamp((t - 4.8) / 1.0, 0, 1)}
            color={liveColor}
            lines={[
              '53.49°N · 18.75°E',
              'GRUDZIĄDZ · TORUŃ · BYDGOSZCZ',
              '© 2026 LAB · v1.0',
            ]}
          />
        </>
      )}

      {/* Edge frames — corner brackets, decoration */}
      <CornerFrames color={liveColor} glow={tw.glow} />
    </div>
  );
}

function CornerFrames({ color, glow }) {
  const f = glow > 0 ? `drop-shadow(0 0 4px ${color}88)` : 'none';
  const stroke = { stroke: color, strokeWidth: 1.5, fill: 'none', strokeOpacity: 0.55 };
  return (
    <svg viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', filter: f }}>
      <path d="M 40 100 L 40 40 L 100 40" {...stroke} />
      <path d="M 1820 40 L 1880 40 L 1880 100" {...stroke} />
      <path d="M 40 980 L 40 1040 L 100 1040" {...stroke} />
      <path d="M 1820 1040 L 1880 1040 L 1880 980" {...stroke} />
    </svg>
  );
}

// ── Tweak panel ─────────────────────────────────────────────────────────────
function TweaksUI() {
  const [t, setTweak] = useTweaks(window.__tweak_defaults);
  window.__tweaks = t;

  return (
    <TweaksPanel>
      <TweakSection title="Tempo">
        <TweakSlider label="Prędkość" value={t.speed} min={0.5} max={2} step={0.1}
          onChange={v => setTweak('speed', v)} />
        <TweakSlider label="Glow" value={t.glow} min={0} max={2} step={0.1}
          onChange={v => setTweak('glow', v)} />
      </TweakSection>
      <TweakSection title="Kolor">
        <TweakSelect label="Początek" value={t.accentStart || 'lavender'}
          options={[
            { value: 'gold', label: 'Złoty' },
            { value: 'lavender', label: 'Lawenda' },
            { value: 'mint', label: 'Mięta' },
          ]}
          onChange={v => setTweak('accentStart', v)} />
        <TweakSelect label="Koniec" value={t.accentEnd}
          options={[
            { value: 'gold', label: 'Złoty' },
            { value: 'lavender', label: 'Lawenda' },
            { value: 'mint', label: 'Mięta' },
          ]}
          onChange={v => setTweak('accentEnd', v)} />
        <TweakRadio label="Tło" value={t.bg}
          options={[
            { value: 'surface-lowest', label: 'Off-black' },
            { value: 'surface', label: 'Surface' },
            { value: 'surface-low', label: 'Lifted' },
          ]}
          onChange={v => setTweak('bg', v)} />
      </TweakSection>
      <TweakSection title="Treść">
        <TweakToggle label="Pokaż tagline" value={t.tagline}
          onChange={v => setTweak('tagline', v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

// ── Root ────────────────────────────────────────────────────────────────────
function App() {
  const tw = React.useState(window.__tweak_defaults)[0];
  // Stage duration responds to speed tweak
  const liveTweaks = window.__tweaks || tw;
  const speed = liveTweaks.speed || 1;
  const duration = DURATION / speed;

  return (
    <>
      <Stage
        width={1920}
        height={1080}
        duration={duration}
        background="#121315"
        persistKey="anilogo:lok-ai"
      >
        <Scene />
      </Stage>
      <TweaksUI />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
