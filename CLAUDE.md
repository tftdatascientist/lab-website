# CLAUDE.md — Drogowskaz dla Claude Code
## lok-ai.pl · Lokalna Automatyzacja Biznesu

---

## PROJEKT W SKRÓCIE

Strona usługowa dla lokalnej firmy AI/automatyzacja w regionie kujawsko-pomorskim.
Stack: **Next.js 14 + TypeScript + Tailwind CSS** · Deploy: **Vercel** · Repo: GitHub

Live: https://lok-aipl.vercel.app/ · Docelowa domena: https://lok-ai.pl

---

## ZASADY BEZWZGLĘDNE

### 1. Design — tylko ze Stitch
- **Wszystkie** kolory, fonty, spacing, border-radius → wyciągasz ze Stitch (eksport / design tokens)
- Zero hardkodowanych wartości z głowy — najpierw wyciągnij tokeny, zaproponuj do zatwierdzenia, dopiero koduj


### 2. SEO/LLM artifacts — nie nadpisuj
Następujące pliki są chronione — edytuj ostrożnie, nigdy nie usuwaj:
```
app/sitemap.ts
app/robots.ts
public/llms.txt
lib/schema.ts          ← Schema.org JSON-LD
```
Każda nowa podstrona musi mieć: `export metadata` + wywołanie `lib/schema.ts`.

### 3. Środowisko
- Windows + VS Code terminal
- NPX-based MCP: `"command": "cmd"`, `"args": ["/c", "npx", ...]`
- Zmienne środowiskowe: `.env.local` lokalnie + Vercel Dashboard (nigdy nie commituj do repo)

### 4. Nowa strona — checklist
```
1. app/[nazwa]/page.tsx z export metadata
2. Schema.org z lib/schema.ts
3. Link w Navbar.tsx i Footer.tsx
4. Ścieżka w app/sitemap.ts
```

---

## Kontrakt wizualny (CCUD)

```
DESIGN:        locked
WERSJA:        1  (2026-09-09)
KIERUNEK:      B — „Ściana tabliczek”
ESTETYKA:      tabliczkowa, dwubiegunowa, strzałkowa, monospace'owa, sygnałowa, płaska, odczytowa
KROJE:         Chakra Petch (display, ZOSTAJE) + Archivo (proza; Inter WYPADA) + JetBrains Mono (dane)
PODŁOŻA:       papier #e8e5de (lokalnie) na płycie #26282b (świat) · jeden sygnał #ec3d0a
POKRĘTŁA:      VARIANCE 7 · MOTION 5 · DENSITY 7
ARTEFAKTY:     design/DESIGN-BRIEF.md · design/REFERENCE.md · design/DESIGN.md
PROOF:         design/proof/B-sciana-tabliczek.html  (trzy kierunki: design/proof/index.html)
KORPUS GUSTU:  ../../../../korpus-gustu.md  (korzeń SER, wspólny dla projektów)
TRYB:          autonomiczny (CCUD zamknięty bramką 3 · 2026-09-09)
```

⛔ `design/DESIGN.md` jest read-only dla ETAP1–ETAP6. Zmiana wymaga ponownego CCUD ETAP C
i podniesienia wersji. Rozbieżności oznaczaj `⚠️`, nie poprawiaj kontraktu.

**Produkcja zostaje na obecnym designie** (decyzja właściciela 2026-09-09): redesign powstaje
wyłącznie na gałęzi `redesign-ccud`; `main` (auto-deploy Vercel) nie dostaje go, dopóki właściciel
nie uzna nowej szaty za lepszą. Gałąź rebase'uje się na `main` (dzienny blog), nie odwrotnie.

Zasada 1 („Design — tylko ze Stitch”) od tej wersji brzmi: **tokeny z `design/DESIGN.md`**,
Stitch i Claude Design generują układy i assety w jego granicach. `DESIGN-SYSTEM.md` (grafit +
bursztyn) jest nieaktualny i zostaje jako historia.

### ETAP2 (2026-09-09, gałąź `redesign-ccud`, worktree `../lab-website-redesign`)

```
ZROBIONE:   tokeny (tailwind.config.ts = jedyne źródło heksów → :root przez plugin addBase;
            globals.css: .rail/.wall/.tag/.rows/.routes/.readout/.cta/.prose-paper),
            kroje Chakra Petch + Archivo + JetBrains Mono (Inter/Orbitron/IBM Plex WYPADŁY),
            powłoka: Szyna (56 px z lewej, ≤760 px pasek dolny) + <main class="wall"> + StopkaSciany,
            komponenty src/components/sciana/: Tabliczka (header/body/footer obowiązkowe),
            Miejsce, WierszeAB, Odczyt, KomputerLokalny (SVG), CtaPole, Szyna, StopkaSciany;
            STRONA GŁÓWNA = 7 tabliczek jak proof B, każda liczba liczona z treści przy buildzie
            (1908 węzłów PCF, 1201 haseł, 123 wpisy, 13 kategorii z liczbą węzłów);
            WZORZEC PODSTRONY TREŚCI = /blog/[slug]: kol. 1–8 tabliczka czytania (prose-paper),
            kol. 9–12 <aside class="s-side"> Miejsce (skrócona) + Skąd > dokąd + CTA;
            TldrBox / KeyTakeaways / ArticleFaq / RelatedLinks przepisane na reguły i wiersze
            (bez kart, chipów, zębatek). USUNIĘTE: AuroraBg, Counter, Ticker, ScrollReveal,
            StatsGrid, Hero, Navbar, Footer, MobileBottomNav, GeoStripe, Services, BlogPreview,
            ContactSection.
POMIAR:     scripts/shots-live.mjs (ten sam algorytm co design/proof/measure.mjs, na żywym 3301):
            / 1440×900 papier 66,0 · płyta 21,8 · sygnał 8,6 (kontrakt: 66,0 / 21,8 / 8,7);
            / 375×812 50,0 / 43,2 / 0; wpis 1440: 62,0 / 29,5 / 3,2. slop_scan: 0 twardych, 0 miękkich
            (skrypt leży w CREAITO/.claude/skills/ccud/scripts/, NIE w tym repo).
LEGACY:     strony nieprzeniesione (/procesy, /slownik, /wdrozenia, /kontakt, /blog lista, /o-nas,
            /portfolio, /faq, /cennik, hasła, procesy) renderują się wewnątrz ściany na całą
            szerokość (`.wall > * { grid-column: 1/-1 }`) z aliasami kolorów przemapowanymi na
            płytę/kość (dawne amber/sand/rust/coral → bone-2, NIE sygnał), rounded-* → 0,
            dawne zmienne --font-inter/--font-ibm-plex-mono/--font-orbitron → nowe kroje.
            Aliasy do usunięcia po migracji ostatniej podstrony.
DŁUG:       (1) meta description „automatyzacje n8n" w layout.tsx — chronione SEO, nie ruszane;
            (2) lista /blog, /procesy, /slownik i reszta podstron — stary układ (kafle, SubpageHeader
            z zębatkami mechanism.tsx w starej palecie hex); (3) 123 ilustracje wpisów w starej
            palecie (widoczne tylko w OG); (4) kropka stanu w szynie STOI — migotanie dopiero,
            gdy stoi za nią realny stan; (5) ContactForm woła --font-ibm-plex-mono (alias działa); (6) pływający przycisk
            „Szukaj procesu" (ProcessSearch, position: fixed prawy dół) na ≤760 px siada na pasku
            dolnym szyny — do przeniesienia przy migracji /procesy; (7) znak logo w szynie =
            MechanismLogoMark z mechanism.tsx (kolor przez prop, kość) — obraca się 16 s, kontrakt
            dopuszcza animowane logo „jako mały znak w szynie".
URUCHOMIENIE: skrót LOKAI.lnk (oba serwery) · `scripts\lokai-dual.ps1 -TylkoNowy` (tylko 3301, do
            kodowania) · `-BezPrzegladarki` (bez otwierania kart). Dev 3301 i `next build` dzielą
            `.next` — build tylko po zabiciu 3301 (po porcie, `taskkill //PID`), potem restart.
            Przy 7,5 GB RAM i dwóch devach jest ~400 MB wolnych: wtedy /blog/[slug] w dev daje 500
            „Jest worker encountered 2 child process exceptions" (OOM, nie kod) — zamknij 3300.
```

### ETAP3 (2026-09-09, gałąź `redesign-ccud`) — migracja WSZYSTKICH podstron poza /demo

```
WZORZEC:    każda podstrona = tabliczka czytania (kol. 1–8, `.s-read`) + `KolumnaBoczna`
            (kol. 9–12: Miejsce skrócona + Skąd > dokąd + sloty + CTA) — warunek odróżnialności
            z DESIGN.md (Miejsce + Skąd > dokąd na KAŻDEJ podstronie) siedzi w komponencie,
            nie w dyscyplinie per strona. Jedyny sygnał na podstronie = pole CTA (hub nie dokłada).
ZROBIONE:   /blog = gęsta tabela 123 wierszy (data | tytuł | tagi | czas), bez miniatur; tagi jako
            STRONY STATYCZNE /blog/tag/[tag] (generateStaticParams, noindex/follow, poza sitemap) —
            NIE ?tag=, bo searchParams zrobiłoby z /blog trasę dynamiczną i czytanie MDX z dysku
            poszłoby na request na Vercelu. /procesy hub = tabela 13 kategorii z opisem; kategoria,
            grupa, proces = wiersze `.rows` + tabele zadań z zachowanymi kotwicami `#a-…`;
            drzewo CategoryTree w tabliczce grafitowej w kolumnie bocznej (`.tree`, <details> bez JS),
            spis „Na tej stronie" jako tabliczka wierszy. /slownik hub = JEDNA tabela 1201 haseł
            z wierszami-literami i indeksem liter, filtr kategorii = linki na istniejące
            /slownik/kategoria/[l1] (bez stanu klienta); hasło = podstrona treści (karta hasła,
            Zobacz też jako A > B, powiązane jako wiersze); kategoria / poddziedzina / grupa z drzewem.
            /wdrozenia + [slug], /kontakt (formularz na papierze, bez CTA — formularz JEST celem),
            /o-nas, /faq (serwerowe, faq-data.ts = jedno źródło UI i JSON-LD, „Protokół NN" wypadł),
            /cennik (jedna tabela), /portfolio (tabela 16 linków), /polityka, /regulamin (prose-paper).
            PALETA Ctrl+K: wspólna `sciana/Paleta` (tabliczka na płycie, zasłona rgba płyty .88,
            BEZ backdrop-blur), otwierana skrótem albo zdarzeniem `lokai:search` z `SzukajPrzycisk`
            w polu prawym nagłówka tabliczki — pływający przycisk zniknął ze ściany. Znak logo
            = `sciana/Znak` (mechanism.tsx USUNIĘTY). scripts/e2e-paleta.mjs: 12/12.
USUNIĘTE:   BlogListClient, SlownikListClient, FaqPageClient, PortfolioGrid, NewsCard, BlogCard,
            BlogTagFilter, ChatDemo, ChatWindow, ChatbotDemo, CtaSection, FaqAccordion,
            FeatureSpotlight, GeoGrid, LinkedInCopyButton, ProcessSteps, ServiceCard, TechStack,
            blog-illustrations.ts, news-illustrations/ (123 SVG), mechanism.tsx, Logo.tsx.
            Zostaje: Logo/ (animowane logo, złoto hardkodowane — nieużywane, dług).
POMIAR:     shots-live 1440/375 na 20 trasach: sygnał 0–3,8 % (CTA w kolumnie), 0 błędów JS,
            0 overlay; slop_scan na 30 nowych plikach: 0 twardych / 0 miękkich.
ZOSTAJE:    /demo — stary układ (lucide, makieta agenta), aliasy legacy w tailwind.config.ts zostają
            dopóki /demo żyje. Sitemap, robots, schema.ts, metadata — NIE ruszane.
```

⚠️ ETAP3 — TREŚĆ, decyzje właściciela (układ zmieniony, twierdzenia nie):
- **/cennik**: trzy plany z wyróżnionym środkiem i odznaką „Najpopularniejszy" to nazwana
  anty-referencja (warstwa 2) — teraz jedna tabela bez wyróżnienia. Blok „Analiza porównawcza"
  (99.9 % uptime, <20 ms, 24/7 + zdjęcie stockowe) WYPADŁ jako liczniki bez źródła (warstwa 1).
  Same ceny (0 / 199 zł / indywidualnie) i „SLA 99.99%" w Enterprise przeniesione 1:1 —
  do potwierdzenia albo skasowania przez właściciela.
- **Nazwy narzędzi**: z tabliczek usług wypadły `tags` (n8n, Flowise, ElevenLabs…), z /wdrozenia
  TECH_PILLS, z /o-nas pasek „Nasz stack". `longDesc` i `benefits` w services.ts nadal nazywają
  narzędzia w prozie („używając n8n…", „ElevenLabs TTS") — copy do przepisania.
- **/portfolio**: 16 zrzutów ekranu zeszło ze strony (dewiacja #3: jedyny obraz to rysunek
  urządzenia); WebP zostają w public/portfolio/. Odwracalne: Fig w tabliczce grafitowej.
- **/faq**: etykiety „Protokół 01–08" (rejestr militarny, warstwa 1) → numeracja tabliczki;
  treść z faq-data.ts bez zmian.
- **/demo**: makieta z ikonami lucide i fikcyjnym agentem, w sitemap — rekomendacja: usunąć.
- **Blog H1** „Polska w dobie cyfrowej rewolucji" i lead przeniesione ze starej strony bez zmian.

Rozbieżności ETAP2 wobec `design/DESIGN.md` (kontrakt read-only, nie poprawiamy go):
- ⚠️ Strona wpisu ma **H1 40 px** jak hero (kontrakt: „jeden na stronę, w tabliczce hero”);
  tytuły wpisów są długie, więc H1 łamie się na 2–3 linie przy `max-width: 20ch`.
- ⚠️ Kolumna metadanych podstrony to jeden element siatki (`<aside class="s-side">`, własna
  siatka 1 kolumny) — inaczej `grid-row: span` rozciągałby Miejsce i CTA do wysokości artykułu.
  Tabliczki NIE są zagnieżdżone w tabliczce (aside to nie tabliczka).
- ⚠️ `.s-cta` na tablecie (761–1023 px) idzie na pełną szerokość (kontrakt: „pola łączą się
  parami”, bez wskazania, z czym łączy się CTA).

---

## MAPA PLIKÓW

| Co zmieniasz | Plik |
|---|---|
| Nawigacja / menu | `components/Navbar.tsx` |
| Stopka | `components/Footer.tsx` |
| Treści usług | `content/services.ts` |
| Nowy artykuł blog | `content/blog/slug.mdx` |
| Artykuły technologia | `content/technologia/slug.mdx` |
| FAQ | `components/FaqAccordion.tsx` |
| Schema.org | `lib/schema.ts` |
| Design tokens | `tailwind.config.ts` |
| Globalne style | `app/globals.css` |
| Chatbot embed | `app/layout.tsx` + `components/ChatbotDemo.tsx` |

---

## DOKUMENTY PROJEKTU

| Plik | Cel |
|---|---|
| `ARCHITECTURE.md` | Stack, struktura katalogów, integracje |
| `PLAN.md` | Aktualny sprint i blokery |
| `CHANGELOG.md` | Historia zakończonych sprintów i zmian |
