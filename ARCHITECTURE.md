# ARCHITECTURE.md — Architektura projektu
## lok-ai.pl · Lokalna Automatyzacja Biznesu

---

## STACK

| Warstwa | Technologia | Uwagi |
|---|---|---|
| Framework | Next.js 14 (App Router) | TypeScript |
| Stylowanie | Tailwind CSS | Tokeny z Stitch |
| Design source | Google Stitch | Jedyne źródło prawdy dla UI |
| Deploy | Vercel | Auto-deploy z GitHub, edge routing |
| Domena | lok-ai.pl (OVH) | .pl — kluczowe dla lokalnego B2B |
| CMS (przyszłość) | WordPress headless | CyberFolks, odroczone na później |
| Automatyzacja | n8n | Własne workflowy, w tym auto-publikacja bloga |
| Chatbot | Typebot | Embed na /demo-ai (integracja ~maj 2026) |
| Agent głosowy | ElevenLabs Conversational AI | Planowany czerwiec 2026 |
| Analityka | Plausible / Umami | Do konfiguracji |

---

## STRUKTURA KATALOGÓW

```
lok-ai.pl/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Strona główna
│   ├── layout.tsx                # Root layout (fonty, chatbot embed)
│   ├── sitemap.ts                # Auto sitemap — chroniony
│   ├── robots.ts                 # Robots — chroniony
│   │
│   ├── uslugi/                   # Podstrony usług
│   │   ├── page.tsx              # Listing usług + ogólna prezentacja
│   │   ├── automatyzacja-procesow/
│   │   ├── chatbot-ai/
│   │   └── agent-glosowy/
│   │
│   ├── technologia/              # [NOWE] Przewodniki i poradniki
│   │   └── page.tsx              # Listing artykułów Technologia
│   │   └── [slug]/page.tsx       # Pojedynczy artykuł
│   │
│   ├── blog/
│   │   └── page.tsx              # Listing bloga
│   │   └── [slug]/page.tsx       # Pojedynczy wpis
│   │
│   ├── portfolio/                # [NOWE] Realizacje stron
│   │   └── page.tsx
│   │
│   ├── faq/                      # lub sekcja na /
│   ├── kontakt/
│   ├── o-nas/
│   ├── polityka-prywatnosci/
│   └── regulamin/
│
├── components/                   # Komponenty UI
│   ├── Navbar.tsx                # Nawigacja
│   ├── Footer.tsx                # Stopka + NAP
│   ├── Hero.tsx
│   ├── FaqAccordion.tsx
│   ├── TechStack.tsx
│   ├── ProcessSteps.tsx
│   ├── GeoGrid.tsx
│   └── ChatbotDemo.tsx           # Placeholder Typebot
│
├── content/                      # Treści (MDX)
│   ├── blog/                     # Krótkie regularne wpisy
│   │   └── *.mdx
│   └── technologia/              # [NOWE] Długie przewodniki
│       └── *.mdx
│
├── lib/
│   └── schema.ts                 # Schema.org JSON-LD — chroniony
│
├── public/
│   ├── llms.txt                  # LLM discovery — chroniony
│   └── images/
│       └── og-default.png
│
└── tailwind.config.ts            # Design tokens (ze Stitch)
```

---

## NAWIGACJA (po sprincie 21–25.04)

```
Strona główna
├── Usługi
│   ├── Automatyzacja procesów
│   ├── Chatbot AI
│   └── Agent głosowy
├── Technologia          ← nowa
├── Blog
├── FAQ
├── Portfolio            ← nowa
└── Kontakt
```

Ukryte (tymczasowo):
- `Demo-AI` — wróci po integracji Typebot (~maj 2026)

Usunięte:
- `AI Dziennik` — wpisy zmigrowane do Bloga

---

## TREŚCI — FORMAT MDX

### Blog (`content/blog/slug.mdx`)
```yaml
---
title: "Tytuł wpisu"
date: "2026-04-21"
tags: ["automatyzacja", "n8n"]
excerpt: "Opis 150–200 znaków"
readTime: "4 min"
---
```
Charakter: krótkie (400–800 słów), regularne, 1–2× tygodniowo.

### Technologia (`content/technologia/slug.mdx`)
```yaml
---
title: "Tytuł przewodnika"
date: "2026-04-21"
tags: ["poradnik", "ai"]
excerpt: "Opis 150–200 znaków"
readTime: "10 min"
type: "guide"
---
```
Charakter: długie (1000–2000 słów), poradniki i przewodniki dla właścicieli firm.

---

## SEO / LLM — ARTEFAKTY CHRONIONE

| Plik | Cel | Zasada |
|---|---|---|
| `app/sitemap.ts` | Mapa strony dla crawlerów | Każda nowa ścieżka musi być tu dodana |
| `app/robots.ts` | Dyrektywy dla botów | Nie blokuj ważnych sekcji |
| `public/llms.txt` | Discovery dla LLM crawlerów | Aktualizować przy zmianach struktury |
| `lib/schema.ts` | Schema.org JSON-LD | Każda strona wywołuje odpowiednią funkcję |

Każda nowa podstrona: `export metadata` (title, description, canonical) + Schema.org.

---

## INTEGRACJE (mapa)

```
lok-ai.pl (Next.js / Vercel)
    │
    ├── n8n ──────────────── automatyzacja workflows
    │       └── blog auto-publish pipeline (działa)
    │
    ├── Typebot ──────────── chatbot embed [PENDING ~maj 2026]
    │       └── app/demo-ai/page.tsx (placeholder)
    │
    ├── ElevenLabs ────────── agent głosowy [PLANNED czerwiec 2026]
    │
    └── Notion ────────────── CRM leads + zarządzanie projektem
```

---

## ŚRODOWISKO LOKALNE

- OS: Windows
- IDE: VS Code
- Claude Code: terminal w VS Code
- MCP NPX config: `"command": "cmd"`, `"args": ["/c", "npx", ...]`
- Env: `.env.local` (lokalnie) — nigdy nie commitować
- Vercel env: Dashboard → Settings → Environment Variables
