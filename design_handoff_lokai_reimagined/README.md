# Handoff: lok-ai — strona główna + podstrony (reimagined)

## Overview

Kompletna przebudowa strony lok-ai.pl (studio automatyzacji AI dla MŚP z regionu kujawsko-pomorskiego). Dark-first, editorial feel, ciepła paleta amber/coral/sand/rust (bez cyan/magenta), żywe akcenty: animowana aurora w tle, live chatbot w Hero, ticker z aktualnościami, animowane liczniki, Chakra Petch Italic jako display accent.

Zakres:
- **Home (2 warianty):** A — Hero z live chatbotem i statami; B — editorial minimal z procesem 4-kroków.
- **Podstrony:** Usługi (grid 6 kart), Blog (featured + 3 posty), Kontakt (dwukolumnowy layout z formularzem).
- Nav + Footer wspólne.

## About the Design Files

Pliki w tej paczce (`lok-ai-reimagined.html` + `components/*.jsx` + `design-canvas.jsx`) to **referencje designowe stworzone w HTML/React-inline-Babel** — prototypy pokazujące docelowy wygląd i zachowanie, nie kod produkcyjny do bezpośredniego skopiowania.

Zadaniem jest **odtworzenie tych designów w istniejącym środowisku `lab-website`** (Next.js + Tailwind, zgodnie z `colors_and_type.css` i README design systemu w projekcie), używając ustalonych tam wzorców (komponenty, tokeny, fonty via `next/font/google`, i18n).

## Fidelity

**High-fidelity (hifi).** Wszystkie kolory, typografia, spacing, promienie, animacje i teksty copy są finalne. Developer powinien odwzorować UI pixel-perfect używając bibliotek i wzorców już obecnych w `lab-website`.

## Design Tokens

### Kolory (dark-first)

```ts
// tło + powierzchnie
bg:            '#0b0c0e'          // główny bg
bgSoft:        '#121315'
surface:       '#17181b'          // karty
surfaceHi:     '#1f2125'          // hover / inner card
surfaceHiHi:   '#2a2d32'
border:        'rgba(255,255,255,0.08)'
borderStrong:  'rgba(255,255,255,0.14)'

// tekst
text:    '#ede7dc'   // główny (ciepła biel, nie czysta!)
textDim: '#a8a29e'
textMute:'#78716c'

// akcenty — CIEPŁA paleta, bez cyan/magenta
amber:     '#f5b845'   // primary — żółto-złoty
amberDeep: '#c48a1c'
coral:     '#ef7955'   // secondary — terakota
coralDeep: '#b84a2a'
sand:      '#d9b88a'   // neutral ciepły (był mint)
rust:      '#b8542f'   // głęboki (był violet)
```

Stare klucze `violet`/`mint` z poprzedniej wersji design-systemu są zaaliasowane: `violet → sand`, `violetDeep → rust`, `mint → sand`, `mintDeep: '#8a6a3c'`. Docelowo w produkcji **usuń te aliasy** i uaktualnij wszystkie odwołania.

### Typografia

Trzy rodziny (via `next/font/google`):

| Rola | Font | Uwagi |
|---|---|---|
| Body + heading (base) | **Inter** | wagi 400/500/600/700/800/900 + italic. `font-feature-settings: 'zero' 0, 'ss01' 0` — wyłączone slashed-zero |
| Display accent (italic w nagłówkach, np. "*Mądrzejsza*") | **Chakra Petch Italic 500** | lekki letter-spacing `-0.01em`, bez text-transform. Ma pełne wsparcie PL. |
| Mono (eyebrow labels, dat, tagów) | **IBM Plex Mono** 400/500/600 | `font-feature-settings: 'zero' 0` — okrągłe zero, bez slasha. `tabular-nums`. |

**Liczby display** (stats w Hero, metryki w kartach usług, wartości w tickerze) są w Inter z `font-variant-numeric: tabular-nums` + `font-feature-settings: 'zero' 0, 'ss01' 0, 'cv11' 1` + `letter-spacing: -0.025em`. Klasa `.num`. **Nie używamy mono dla liczb.**

### Spacing, radii, shadows

- Kontenery: `max-width: 1280px` (1180 dla Hero B minimal), `padding: 0 32px`
- Padding sekcji: `100px 32px` (duże), `80px 32px` (średnie)
- Border radius: kafelki/karty 14–18px, guziki 10–12px, chipy/pigułki 999px, główne kontenery 24px
- Karty: `outline: 1px solid rgba(255,255,255,0.08)` + `background: #17181b`. Hover: `transform: translateY(-3px)`, `outline-color: rgba(196,167,255,0.4)` → zmień na warm accent w prod
- Guziki primary: `linear-gradient(135deg, #f5b845 0%, #ef7955 100%)`, tekst `#1a0f00`, font-weight 700
- Shadow dropdownów/kart elevated: `0 30px 80px -20px rgba(0,0,0,0.6)`
- Grid bg: linie `rgba(255,255,255,0.08)` co `80px`, animowane `lokai-grid-drift 60s linear infinite` (przesuw 0 → 80/80px), zamaskowane radialnie

### Animacje (keyframes)

```css
@keyframes lokai-pulse     { 0%,100%{opacity:1} 50%{opacity:.35} }   /* kropki "live" */
@keyframes lokai-aurora    { ... rotacja + translate + scale 28–40s } /* 3 orbs w tle */
@keyframes lokai-grid-drift{ background-position: 0 → 80 80, 60s linear }
@keyframes lokai-blink     { step(1), caret chatbota */
@keyframes lokai-ticker    { translateX 0 → -50%, 40s linear }         /* poziomy scroll */
@keyframes lokai-fadeup    { y:14 → 0 + opacity */
@keyframes lokai-orb-float { 8–10s ease-in-out */
@keyframes lokai-draw      { stroke-dashoffset 400 → 0 */               /* podkreślenie "AI" */
@keyframes lokai-shimmer   { gradient shift 3.5s */                     /* "robienia" */
```

Wszystkie prefiksowane `lokai-*`.

## Screens / Views

### Nav (`LokaiNav`)
- **Sticky top** z `backdrop-filter: blur(20px)`, `background: rgba(11,12,14,0.7)`, bottom border `rgba(255,255,255,0.08)`
- Wysokość 64px, `max-width: 1280px`, `padding: 0 32px`
- Lewa strona: **Logo SVG** (`LokaiLogo`) + tagline "Automatyzacja biznesu" (font-size 12, textDim) — tagline ukryty w `compact` variant
- Środek: linki "Usługi · Technologia · Blog · Portfolio · FAQ" (font-size 14, weight 500, color `textDim`, hover `text`)
- Prawa: CTA primary "Bezpłatna konsultacja" (radius 10, padding 9/16, fontSize 13)

### Logo (`LokaiLogo`)
SVG 34×34 + lockup tekstowy obok. **Dokładna specyfikacja:**
- Tile: `rect 1,1,38,38 rx="10"` z `linear-gradient(135deg, amber → coral)` + obrys `rgba(255,255,255,0.25)` 1px
- Monogram **LOK** w środku: `<text x=20 y=26 text-anchor=middle font-family=Inter font-weight=900 font-size=15 letter-spacing=-0.04em fill=#1a0f00>LOK</text>`
- Satelita AI (prawy górny róg): zewnętrzny `circle cx=30 cy=10 r=4` obrys `#1a0f00` opacity 0.45; wypełniony `circle cx=30 cy=10 r=2.4 fill=#1a0f00`; w środku `circle r=1.1 fill=amber`
- Drop-shadow: `drop-shadow(0 2px 6px rgba(245,184,69,0.28))`
- Lockup obok: linia 1 — "lok·ai" (17px, weight 700, ls -0.035em, kropka w amber); linia 2 — "AI LOKALNIE" (9px, IBM Plex Mono, uppercase, ls 0.22em, textMute)

### Hero A — z chatbotem (`LokaiHeroA`)
- Aurora w tle (`LokaiAurora`) — 3 radial-gradient orbs (rust, amberDeep, coralDeep), blur 60-80px, animowane `lokai-aurora`, plus grid-bg z maską radialną
- Grid 2-kolumnowy (1.15fr / 1fr), gap 80px, padding `80px 32px 40px`
- Lewa kolumna:
  - Pigułka status "Nowa era · kwiecień 2026" (tło `rgba(252,211,77,0.08)`, obrys `rgba(252,211,77,0.2)`, pulse dot 6×6 amber)
  - H1: "Twoja firma." / `<span className="serif" color=amber>Mądrzejsza</span>` / "o AI." — font-size 84, weight 800, line-height 0.95, ls -0.04em. Pod "o AI" animowane podkreślenie SVG w `coral`
  - Paragraf opisowy 19px, textDim, max-width 560
  - 2 CTA: primary + ghost, padding 14/22, radius 12
  - **Stats row** — 4 kolumny, border top/bottom: wartości klasa `.num`, 36px, weight 700. Kolory per-stat: sand, amber, coral, rust
- Prawa kolumna: `LokaiChatDemo` (mock chatbota, 4 wiadomości z animacją typing), dwa blur orby (rust + amber), floating tag "★ Realizuje się teraz" obrócony -4deg
- Pod fold: `LokaiTicker` z 6 pozycjami

### Hero B — editorial minimal (`LokaiHeroB`)
- Aurora `intensity=0.6`, max-width 1180
- Eyebrow "Studio automatyzacji AI · Bydgoszcz · Toruń" (mono 11px, amber, ls 0.15em uppercase, z poziomą kreską 28×1)
- H1 gigantyczny: "Mniej klikania." / "Więcej **robienia**." — 112px, weight 700, ls -0.045em. "Więcej" + kursywa (`.serif`); "robienia" z efektem shimmer (gradient + animacja 3.5s)
- Paragraf 20px, max-width 620
- 2 CTA
- **Process strip** — grid 4 kolumn, gap 16: karty "01 Audyt · 02 Mapa · 03 Wdrożenie · 04 Opieka". Każda karta: padding 20, surface bg, outline border, top-accent line 2px (sand/amber/coral/rust per-step), eyebrow `.mono`, tytuł 15 weight 600, hint 12 textMute
- Ticker pod foldem (4 pozycje)

### Services (`LokaiServices`)
- Padding `100px 32px`, max-width 1280
- Nagłówek sekcji: eyebrow "Co automatyzujemy" (mono + line, amber) + H2 "Sześć kierunków, *jeden cel*: odzyskać czas." (56px, weight 700). Link po prawej "Pełna oferta →"
- **Grid 3×2, gap 18px.** 6 kart, każda min-height 260, padding 28:
  1. Automatyzacja / Workflow n8n — sand, "47 aktywnych workflow"
  2. Chatboty / Asystenci AI na www — amber, "12ms średni czas"
  3. Agenci głosowi / Voiceboty — coral, "24/7 pełna obsługa"
  4. RAG / Bazy wiedzy — rust, "98% trafność"
  5. Dashboardy — amber, "5min odświeżanie"
  6. Integracje CRM/ERP — sand, "400+ konektorów"
- Każda karta: tło surface, top-line gradient w kolorze akcentu (linear `transparent → color → transparent`), blur orb w rogu, eyebrow mono tag + ikona Unicode (⚙ ◎ ◐ ▲ ▦ ⬡), tytuł 22px weight 700, desc 14 textDim, metric na dole: `.num` 22px + label 11 textMute. Hover: lift 3px, outline w kolorze akcentu.

### Blog (`LokaiBlog`)
- Nagłówek: eyebrow coral "Blog · codzienny przegląd AI" + H2 "Co się *naprawdę* dzieje w AI w Polsce" (48px, weight 700). Po prawej pulse dot amber + "AKTUALIZOWANE 4× DZIENNIE" (mono 11px, textDim)
- Grid `1.3fr / 1fr`, gap 24:
  - **Featured** (lewa): min-height 420, padding 40. Meta: tag 10px mono + dot + data. Tytuł H3 36px weight 700, lh 1.1. Excerpt 15px. CTA "Czytaj dalej →" w kolorze posta. Blur orb w rogu z akcentem.
  - **Rest** (prawa): 3 karty pionowo, gap 12. Każda: tag + data, tytuł H4 17px
- Kolory per-post: amber (featured), coral, sand, rust
- 4 posty (tytuły w `LOKAI_POSTS` — zachowaj copy dokładnie)

### Contact (`LokaiContact`)
- Padding `100px 32px`, max-width 1280
- Kontener: `grid 1fr/1fr`, radius 24, overflow hidden, outline border
- **Lewa** — tło `radial-gradient at 20% 0%, amberDeep30, transparent 60%` na surface. Pigułka amber "Bezpłatna konsultacja". H3 42px "30 minut, które mogą *zmienić* sposób pracy Twojej firmy". Lista 4 benefity z ✓ amber. Kontakt: email + telefon mono.
- **Prawa** — tło bgSoft. Formularz: 3 pola (Imię, Email, Co chcesz zautomatyzować?) + submit primary. Labele mono 11px uppercase, inputy surface bg, outline border, radius 10, padding 12/14.

### Footer (`LokaiFooter`)
- Grid 4 kolumn (2fr/1fr/1fr/1fr), gap 48, padding `64px 32px 32px`
- Lewa: logo + opis 14px textDim, max-width 300
- 3 kolumny linków: Produkt / Zasoby / Firma (tytuły mono 11px amber ls 0.12em uppercase, linki 13 textDim)
- Bottom bar: copyright mono 11 textMute + chip "Wszystkie systemy działają" (mint/sand + pulse dot)

## Interactions & Behavior

- **Live chatbot demo (Hero A):** 4 wiadomości ładują się sekwencyjnie (400ms start, 1400ms między) z `fadeup`. Przed każdą kolejną wiadomością od bota pojawia się "typing" (3 kropki z pulse). Wiadomości user: gradient amber→coral, tekst `#1a0f00`, weight 600. Wiadomości bot: surface hi, textColor text.
- **Counters:** animowane od 0 do `to` w 1800ms z easingiem `1 - (1 - p)^3`, `tabular-nums` + lokalizowane spacjami co 3 cyfry.
- **Typing h1 (opcjonalny):** caret z `lokai-blink` 1s.
- **Ticker:** dublowanie items, `width: max-content`, `animation: lokai-ticker 40s linear infinite`. Na hover: PAUZA (dodaj w prod: `&:hover { animation-play-state: paused }`).
- **Aurora:** 3 radialne blur-orby poruszają się 28/34/40s, grid tło drift 60s.
- **Karty hover:** `transform: translateY(-3px)`, zmiana outline na akcent.
- **SVG underline pod "AI" w Hero A:** `stroke-dasharray: 400`, animacja `lokai-draw 1.8s ease-out 0.4s forwards`.
- **Shimmer text ("robienia" w Hero B):** gradient animowany na tekście przez `-webkit-background-clip`.

## State Management

Statyczna strona marketingowa — brak złożonego stanu. Co potrzebne:
- Stan animacji chatbota (licznik `visible` wiadomości, useEffect z setTimeout)
- Stan counterów (useEffect z requestAnimationFrame)
- Stan typing (licznik znaków, setInterval)
- Formularz kontaktowy → w `lab-website` podłącz do istniejącej Server Action / API route (sprawdź `app/api/contact` lub `actions/` w codebase)

Wszystkie dane (posty blogowe, ticker items, services) są hardcoded w komponentach — w produkcji przenieś do CMS/headless (sprawdź obecną konfigurację `lab-website`) lub do lokalnych plików `.ts` w `content/`.

## Responsive Behavior

Prototypy są zrobione na **1440px design width**. Do implementacji responsive:
- Hero 2-col → 1-col od `lg` (1024px)
- Services 3-col → 2-col (md) → 1-col (sm)
- Blog 1.3fr/1fr → 1-col od md
- Contact 1fr/1fr → 1-col od md
- Stats row 4-col → 2×2 od sm
- H1 hero 84/112px → skaluj do 48/56 na mobile
- Nav: hide linki pod md, pokaż hamburger (wykorzystaj istniejący Drawer w `lab-website`)

Potwierdź breakpointy z zespołem — użyj tych, które są już w `tailwind.config.ts`.

## Assets

- **Logo:** SVG inline — specyfikacja w sekcji "Logo" wyżej. Wyeksportuj jako standalone SVG do `public/logo.svg` oraz PNG 512×512 do `public/logo.png`, zbuduj favicon.
- **Ikony w kartach services:** Unicode glyphs (⚙ ◎ ◐ ▲ ▦ ⬡). W produkcji **zastąp prawdziwymi ikonami** z lucide-react (już prawdopodobnie w projekcie) — proponowane mapping: Cog, MessagesSquare, Phone, BookOpen, LayoutDashboard, Network.
- **Chatbot mock:** wiadomości tekstowe — copy w `LokaiShared.jsx` / `LokaiChatDemo`.
- **Brak obrazów raster** — cała strona jest czysto typograficzna + kolor + SVG.

## Files

W tej paczce:
- `lok-ai-reimagined.html` — główny plik z układem DesignCanvas (5 ekranów obok siebie)
- `components/LokaiShared.jsx` — tokeny `LOKAI`, fonty, animacje CSS, `LokaiAurora`, `LokaiNav`, `LokaiLogo`, `LokaiTicker`, `LokaiCounter`, `LokaiTyping`, `LokaiChatDemo`, `LokaiFooter`
- `components/LokaiHeroA.jsx` — Hero z chatbotem
- `components/LokaiHeroB.jsx` — Hero editorial
- `components/LokaiServices.jsx` — grid usług
- `components/LokaiBlogContact.jsx` — Blog + Contact
- `design-canvas.jsx` — tylko dla prototypu (pan/zoom canvas) — **nie implementuj w produkcji**

Do referencji (już w `lab-website` codebase):
- `colors_and_type.css` — stare tokeny; **nadpisz amberem/coralem/sandem/rustem z tego README**
- `README.md` (design system) — reszta wzorców

## Plan implementacji (proponowana kolejność)

1. **Tokens** — zaktualizuj `tailwind.config.ts` + `globals.css` o ciepłą paletę, dodaj `font-display` dla Chakra Petch, `font-mono` dla IBM Plex Mono
2. **Layout** — zbuduj `<Nav>` i `<Footer>` jako shared components
3. **Logo** — eksportuj SVG do komponentu `<Logo />` z propem `size`
4. **Hero A/B** — dwa warianty, niech będą przełączane feature flagiem lub A/B testem
5. **Services / Blog / Contact** — statyczne sekcje, copy z prototypu
6. **Animacje** — aurora jako reużywalny `<AuroraBg />`, ticker jako `<Ticker items={...} />`, counter jako `<Counter to={...} />`
7. **Mobile responsive** — po desktopie
8. **A11y pass** — kontrast (sprawdź amber na bg — może być granicznie słaby dla małych rozmiarów; użyj amberDeep dla text-on-bg), focus-visible, aria-label na CTA, prefers-reduced-motion dla aurora/ticker/counter

## Uwagi końcowe

- **Brand assets produkcyjne** (OG image, favicon, manifest, social preview) — nie ma ich w paczce, trzeba dorobić na bazie logo SVG
- **Teksty PL** — wszystkie copy polskie, zwróć uwagę na `&nbsp;` przed "i", "w", "z", "o" (mikrotypografia PL) — w kodzie używaj `\u00a0` lub `&nbsp;`
- **Dark mode only** — projekt nie zakłada light mode. Jeśli potrzebny, trzeba przeprojektować całą paletę
- Pytania → wróć do prototypu w `lok-ai-reimagined.html` jako źródło prawdy
