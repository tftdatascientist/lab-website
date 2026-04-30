# ARCHITECTURE.md — Architektura projektu
## lok-ai.pl · Lokalna Automatyzacja Biznesu

---

## STACK

| Warstwa | Technologia | Wersja / Uwagi |
|---|---|---|
| Framework | Next.js (App Router) | 14.2.35, TypeScript 5 |
| Stylowanie | Tailwind CSS | 3.4.1, tokeny wyłącznie ze Stitch |
| Design source | Google Stitch | Jedyne źródło prawdy dla UI — zero hardkodowanych wartości |
| Treści | next-mdx-remote | 6.0.0, MDX + gray-matter 4.0.3 |
| Email | Resend | 6.12.2, formularz kontaktu przez /api/contact |
| Deploy | Vercel | Auto-deploy z GitHub, edge routing |
| Domena | lok-ai.pl (OVH) | .pl — kluczowe dla lokalnego B2B |
| Automatyzacja | n8n | Auto-publikacja bloga (działa) |
| Chatbot | Typebot | Embed planowany ~maj 2026 |
| Agent głosowy | ElevenLabs Conversational AI | Planowany czerwiec 2026 |
| Analityka | Plausible / Umami | Do konfiguracji |
| CMS (przyszłość) | WordPress headless | CyberFolks, odroczone |

---

## STRUKTURA KATALOGÓW

```
lab-website/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Strona główna
│   │   ├── layout.tsx                # Root layout (fonty, meta, chatbot embed placeholder)
│   │   ├── globals.css               # Globalne style + animacje (aurora, ticker, fadeup)
│   │   ├── sitemap.ts                # Auto sitemap — CHRONIONY
│   │   ├── robots.ts                 # Robots directives — CHRONIONY
│   │   ├── feed.xml/route.ts         # RSS feed
│   │   │
│   │   ├── uslugi/
│   │   │   ├── page.tsx              # Listing usług
│   │   │   └── [slug]/page.tsx       # Pojedyncza usługa (longDesc, benefits, useCases)
│   │   │
│   │   ├── technologia/
│   │   │   ├── page.tsx              # Listing przewodników
│   │   │   └── [slug]/page.tsx       # Pojedynczy artykuł z breadcrumb i Schema.org
│   │   │
│   │   ├── blog/
│   │   │   ├── page.tsx              # Listing blogów (featured + magazynowy grid)
│   │   │   ├── BlogListClient.tsx
│   │   │   └── [slug]/page.tsx
│   │   │
│   │   ├── portfolio/page.tsx        # Siatka 16 projektów WWW z miniaturkami Microlink
│   │   ├── faq/page.tsx + FaqPageClient.tsx
│   │   ├── kontakt/page.tsx          # Formularz Resend (dwukolumnowy layout)
│   │   ├── o-nas/page.tsx
│   │   ├── cennik/page.tsx
│   │   ├── demo/page.tsx             # Placeholder Typebot (poza nawigacją)
│   │   ├── dziennik/[slug]/page.tsx  # Deep linki (poza nawigacją)
│   │   ├── polityka-prywatnosci/
│   │   ├── regulamin/
│   │   └── api/contact/route.ts      # Email API (Resend)
│   │
│   ├── components/                   # Komponenty React
│   │   ├── Navbar.tsx                # Nawigacja górna
│   │   ├── MobileBottomNav.tsx       # Nawigacja mobilna (dolna)
│   │   ├── Footer.tsx                # Stopka + NAP
│   │   ├── Hero.tsx                  # Aurora, chatbot demo, stats, ticker
│   │   ├── Logo.tsx
│   │   ├── AuroraBg.tsx
│   │   ├── Ticker.tsx
│   │   ├── Counter.tsx               # Animowane liczniki
│   │   ├── ServiceCard.tsx           # Karta usługi (orb, metryka, hover outline)
│   │   ├── BlogCard.tsx              # Karta wpisu (top-line, tag+date)
│   │   ├── BlogTagFilter.tsx         # Pill-style filtr tagów
│   │   ├── FaqAccordion.tsx
│   │   ├── ContactForm.tsx           # Formularz z walidacją
│   │   └── ChatDemo.tsx              # Placeholder chatbota
│   │
│   ├── content/                      # Treści edytorialne
│   │   ├── blog/                     # 68 artykułów MDX
│   │   ├── technologia/              # 3 przewodniki MDX
│   │   ├── dziennik/                 # 6 archiwalnych wpisów MDX (deep link, poza nav)
│   │   └── services.ts               # Dane usług (longDesc, benefits, useCases, ctaText)
│   │
│   └── lib/
│       ├── mdx.ts                    # createMdxReader — parser MDX, getBySlug, getAll, getTags
│       └── schema.ts                 # Schema.org JSON-LD — CHRONIONY
│
├── public/
│   ├── llms.txt                      # LLM discovery — CHRONIONY
│   └── images/og-default.png
│
├── tailwind.config.ts                # Design tokens (amber, coral, sand, rust)
├── next.config.mjs                   # MDX plugin, image domains (api.microlink.io)
├── package.json
└── tsconfig.json
```

---

## NAWIGACJA

```
Usługi | Technologia | Blog | Portfolio | FAQ | Kontakt
```

Poza nawigacją (deep linki):
- `/demo` — placeholder Typebot (wróci po integracji ~maj 2026)
- `/dziennik/[slug]` — archiwalne wpisy (zmigrowane do bloga)

---

## TREŚCI — FORMAT MDX

### Blog (`src/content/blog/slug.mdx`)
```yaml
---
title: "Tytuł wpisu"
date: "2026-04-21"
tags: ["automatyzacja", "n8n"]
excerpt: "Opis 150–200 znaków"
readTime: "4 min"
---
```
Charakter: krótkie (400–800 słów), regularne, news-driven. Aktualnie: 68 artykułów.

### Technologia (`src/content/technologia/slug.mdx`)
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
Charakter: długie (1000–2000 słów), poradniki dla właścicieli firm. Aktualnie: 3 artykuły.

---

## SEO / LLM — ARTEFAKTY CHRONIONE

Poniższe pliki są **chronione** — edytuj ostrożnie, nigdy nie usuwaj:

| Plik | Cel |
|---|---|
| `src/app/sitemap.ts` | Mapa strony dla crawlerów — każda nowa ścieżka musi być tu dodana |
| `src/app/robots.ts` | Dyrektywy dla botów — nie blokuj ważnych sekcji |
| `public/llms.txt` | Discovery dla LLM crawlerów — aktualizować przy zmianach struktury |
| `src/lib/schema.ts` | Schema.org JSON-LD — każda strona wywołuje odpowiednią funkcję |

Każda nowa podstrona musi mieć: `export metadata` (title, description, canonical) + wywołanie `lib/schema.ts`.

---

## DESIGN SYSTEM

- **Źródło prawdy:** Google Stitch — wszystkie tokeny, komponenty, layouty
- **Kolory:** amber (primary), coral (akcent), sand (tło), rust (ciemny akcent)
- **Fonty:** Inter (body) + Chakra Petch (display italic) + IBM Plex Mono (labels)
- **Tokeny w kodzie:** `tailwind.config.ts`
- **Globalne style + animacje:** `src/app/globals.css` (aurora, ticker, fadeup, shimmer, pulse)

---

## INTEGRACJE

```
lok-ai.pl (Next.js / Vercel)
    │
    ├── Resend ───────────── email z formularza kontaktu (/api/contact)
    │
    ├── n8n ──────────────── auto-publikacja bloga [AKTYWNE]
    │
    ├── Typebot ──────────── chatbot embed [PENDING ~maj 2026]
    │       └── /demo/page.tsx (placeholder)
    │
    ├── ElevenLabs ────────── agent głosowy [PLANNED czerwiec 2026]
    │
    └── Microlink API ─────── miniaturki stron w /portfolio
```

---

## ŚRODOWISKO I DEPLOY

- **OS:** Windows 11, IDE: VS Code, terminal: Git Bash
- **MCP NPX:** `"command": "cmd"`, `"args": ["/c", "npx", ...]`
- **Env lokalnie:** `.env.local` — nigdy nie commitować
- **Env produkcja:** Vercel Dashboard → Settings → Environment Variables
- **Pipeline:** `git push origin main` → Vercel auto-build → deploy

### Zmienne środowiskowe

```
RESEND_API_KEY=     # formularz kontaktu
```
