# Brief dla Claude Code — Integracja Animowanego Logo lok-ai

## Cel
Zaimplementować animowane intro logo na stronie głównej **lok-ai.pl** (Next.js + Tailwind, dark theme, Material You tokens).

Animacja (~14.5s, 1920×1080, 16:9, loopowana):
mapa Polski → zoom na woj. kujawsko-pomorskie → koło zębate z panoramą Grudziądza (spichrze + bazylika + wiatrak) → transformacja kolorów (mięta → złoto, konfigurowalne) → wordmark **lok-ai** + URL **lok-ai.pl** + tagline **Lokalna Automatyzacja Biznesu** (Orbitron na słowie "Automatyzacja").

---

## Pliki źródłowe (do zaimportowania z tego projektu)

```
index.html          ← entry + import map + tweak defaults
animations.jsx      ← Stage / Sprite / Easing / interpolate (timeline engine)
poland-map.jsx      ← PolandMap (SVG, viewBox 1100×650) + obszar kuj-pom
gear-logo.jsx       ← GearLogo (SVG, viewBox 800×800) + panorama + traces
scenes.jsx          ← Wordmark / UrlLine / Tagline / StatusBar / CornerReadout / Crosshair / AmbientBackdrop / Starfield + lerpColor
app.jsx             ← Scene composer (timeline, kamera, lockup, tweaks)
tweaks-panel.jsx    ← w produkcji NIE używamy (tylko do designu)
```

Cały kod jest w czystym JSX + React, bez TypeScripta. W projekcie Next.js trzeba go przekonwertować na komponenty `.tsx` lub `.jsx` w `app/components/Logo/`.

---

## Krok po kroku — Brief dla Claude Code

### 1. Skopiuj 5 plików animacji do repo

```
app/components/Logo/
  ├─ animations.jsx     (Stage usuń — patrz krok 3, weź tylko Easing/Sprite/interpolate/clamp/animate)
  ├─ PolandMap.jsx
  ├─ GearLogo.jsx
  ├─ Scenes.jsx         (Wordmark/UrlLine/Tagline/StatusBar/CornerReadout/Crosshair/AmbientBackdrop/Starfield + lerpColor)
  └─ AnimatedLogo.jsx   ← główny komponent (zaadaptowane app.jsx)
```

### 2. Usuń zależność od `window.__tweaks`

W `app.jsx` zastąp:
```js
const tw = window.__tweaks || { ... };
```
na propsy komponentu:
```tsx
type LogoProps = {
  accentStart?: 'gold' | 'lavender' | 'mint';
  accentEnd?:   'gold' | 'lavender' | 'mint';
  speed?:       number;  // 0.5–2
  glow?:        number;  // 0–2
  tagline?:     boolean;
  bg?:          'surface' | 'surface-low' | 'surface-lowest';
  className?:   string;
};
```

Defaulty dla produkcji:
```ts
{ accentStart: 'mint', accentEnd: 'gold', speed: 1.1, glow: 0.9, tagline: true, bg: 'surface-low' }
```

Usuń też cały komponent `TweaksUI` i import `tweaks-panel.jsx`.

### 3. Wymień `<Stage>` na własny lekki driver

Stage z animations.jsx ma scrubber/playbar — w produkcji nie chcemy. Zastąp prostym RAF-em:

```tsx
function useAnimationTime(duration: number, autoplay = true, loop = true) {
  const [time, setTime] = useState(0);
  useEffect(() => {
    if (!autoplay) return;
    let raf: number, last: number | null = null;
    const step = (ts: number) => {
      if (last == null) last = ts;
      const dt = (ts - last) / 1000;
      last = ts;
      setTime(t => {
        let n = t + dt;
        if (n >= duration) n = loop ? n % duration : duration;
        return n;
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [duration, autoplay, loop]);
  return time;
}
```

Plus auto-skalowanie kontenera 1920×1080 do dostępnej szerokości:

```tsx
<div ref={wrapRef} className="relative w-full aspect-[16/9] overflow-hidden">
  <div
    className="absolute inset-0"
    style={{
      width: 1920,
      height: 1080,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
    }}
  >
    {/* cała Scene tutaj */}
  </div>
</div>
```

Skalę liczy ResizeObserver: `scale = wrap.clientWidth / 1920`.

### 4. TimelineContext

Animations.jsx eksportuje `TimelineContext` i `useTime()`. Zostaw bez zmian — `<TimelineContext.Provider value={{ time, duration }}>` opakuj `<Scene />` w `AnimatedLogo.jsx`.

### 5. Performance / motion preferences

```tsx
const prefersReducedMotion = useReducedMotion();
if (prefersReducedMotion) {
  return <StaticLogoFallback />; // statyczny SVG z gear + wordmark w finalnym kolorze
}
```

Wygeneruj fallback jako pojedynczy SVG (export ze stanu t=14s) i wrzuć jako komponent `StaticLogoFallback`.

### 6. Lazy load + intersection observer

Komponent ważny tylko gdy widoczny:

```tsx
'use client';
import dynamic from 'next/dynamic';

const AnimatedLogo = dynamic(() => import('./AnimatedLogo'), {
  ssr: false,
  loading: () => <StaticLogoFallback />,
});
```

W stronie głównej:
```tsx
<section className="relative w-full">
  <Suspense fallback={<StaticLogoFallback />}>
    <AnimatedLogo accentStart="mint" accentEnd="gold" />
  </Suspense>
</section>
```

### 7. Fonty

W `app/layout.tsx` dodaj Orbitron (Inter i JetBrains Mono już są w lok-ai):

```ts
import { Orbitron } from 'next/font/google';
const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['500','600','700','800'],
  display: 'swap',
});
```

W tagline z `Scenes.jsx` użyj zmiennej:
```tsx
fontFamily: 'var(--font-orbitron), "JetBrains Mono", ui-monospace, monospace'
```

### 8. Kolory — design tokens

Plik `colors_and_type.css` z tego projektu zawiera identyczne tokeny co `tailwind.config.ts` lok-ai. Stałe w `AnimatedLogo`:

```ts
const COLOR_GOLD     = '#f5b820';   // dorzuć do tailwind.config jako gold
const COLOR_LAVENDER = '#d0bcff';   // primary
const COLOR_MINT     = '#4edea3';   // secondary
```

### 9. Akcesibilność

```tsx
<div
  role="img"
  aria-label="lok-ai — Lokalna Automatyzacja Biznesu"
  aria-describedby="logo-desc"
>
  <span id="logo-desc" className="sr-only">
    Animowane logo: mapa Polski z wycentrowanym województwem kujawsko-pomorskim, koło zębate z panoramą Grudziądza, wordmark lok-ai.
  </span>
  {/* Scene */}
</div>
```

### 10. Gdzie wstawić na lok-ai.pl

**Opcja A — hero replacement (zalecane)**
Zastąp obecny hero animowanym logo (pełna szerokość, aspect 16:9, max-height 80vh). CTA i eyebrow pod spodem.

**Opcja B — sekcja "O nas"**
Jako mniejszy element (max-width ~640px) obok tekstu opisującego firmę.

**Opcja C — favicon / OG image**
Wygeneruj klatkę t=14s jako PNG 1200×630 dla `og:image` i 512×512 jako PWA icon.

---

## Akceptacja (DoD)

- [ ] Komponent renderuje się client-side, bez hydration mismatch
- [ ] Lighthouse Performance ≥ 90 (logo nie ładuje się na crawlerach / przy reduced-motion)
- [ ] Działa na Safari / Chrome / Firefox (sprawdź `drop-shadow` w Safari)
- [ ] Defaultowe kolory: **mint → gold**
- [ ] Wordmark zawsze pełny ("lok-ai", bez ucięcia na "a")
- [ ] Slowo "AUTOMATYZACJA" w Orbitron, reszta tagline w Inter
- [ ] Loopuje płynnie (brak skoku przy t=14.5→0)
- [ ] Static fallback dla `prefers-reduced-motion: reduce`
- [ ] Brak `window.__tweaks` / panelu Tweaks w produkcji

---

## Komenda startowa dla Claude Code

```
Zaimplementuj animowany komponent logo z plików w `external/anilogo/` (skopiuj
z tego projektu) jako `app/components/Logo/AnimatedLogo.tsx`. Postępuj według
sekcji 1–10 w `BRIEF.md`. Po implementacji uruchom `pnpm typecheck && pnpm lint`
i napraw błędy. Hero strony głównej (`app/page.tsx`) zastąp tym komponentem
z propsami `accentStart="mint" accentEnd="gold"`.
```
