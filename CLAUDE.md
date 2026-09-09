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
