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
