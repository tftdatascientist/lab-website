# CHANGELOG.md
## lok-ai.pl · Historia zmian

Format: `## [data] — tytuł`

---

## [2026-06-16] — Sprint: baza procesów PCF + ujednolicenie słownika + domknięcie scalenia

**Procesy (APQC PCF 7.4) — z wizytówki do realnej bazy wiedzy:**
- Import pełnej taksonomii z Notion: **1908 węzłów** (nie 9k — tyle liczy PCF 7.4), 100% pokrycia PL+EN (nazwy i opisy) + hierarchia `parentCode`. Skrypt `scripts/sync-pcf.mjs` + `npm run sync-pcf`.
- Deep research (workflow, 6 sub-agentów) → rekomendacja architektury (hybryda strony L1–L3 + anchory L4/L5).
- **Faza 1:** strony SSG `/procesy/[kategoria]/[grupa]` (72) i `/procesy/proces/[kod]` (330) z sekcjami Działań + tabelami Zadań, breadcrumby, JSON-LD (DefinedTerm/Breadcrumb/ItemList/HowTo).
- **Faza 2:** wyszukiwarka **Cmd+K** (cmdk + MiniSearch, indeks lazy ~750 KB, normalizacja PL) + crawlowalne drzewo kategorii (`CategoryTree`, zero-JS `<details>`).
- **Faza 3:** ochrona thin content (31 procesów-liści → `noindex,follow` + poza sitemap), mobilne drzewo, statystyki na hubie.

**Słownik IT — ujednolicony ze schematem procesów:**
- Uruchomiona pełna hierarchia 4-poziomowa (dotąd UI używał tylko L1/L2): **8 kat. → 11 poddziedzin → 71 grup → 595 podgrup → 1201 haseł**.
- Nowe trasy: `/slownik/kategoria/[l1]/[l2]` (L2) i `/slownik/grupa/[l3]` (pillar — sekcje L4 + karty haseł). Strona kategorii przebudowana (sekcje L2 → karty L3). Strona hasła: breadcrumb z pełnym trailem.
- Bliźniacze komponenty: `SlownikSearch` (Cmd+K, indeks ~300 KB) + `SlownikTree`. L4 jako anchory (slug nie jest globalnie unikalny → klucz `L3|L4`).

**Domknięcie scalenia Usługi/Technologia:**
- Menu: kolejność Blog · Procesy · Słownik · Portfolio · Wdrożenia · FAQ.
- Usunięto martwe `src/app/uslugi/*`; naprawiono żywe linki `/uslugi/*` → `/wdrozenia/*` (Hero, MobileBottomNav, ServiceCard, Services — w tym nieaktualne slugi).
- Artykuły `/technologia/[slug]` (3) **zmigrowane do `/blog`** (git mv, slug zachowany); 301: `/technologia/:slug`→`/blog/:slug`, `/technologia`→`/blog`, `/uslugi(/:slug)`→`/wdrozenia(/:slug)`.

**SEO/GEO (audit zaliczony):** Schema.org `@graph` na każdej stronie, canonical + OG, robots dopuszcza boty AI, sitemap (~2300 URL) + llms.txt zaktualizowane. Indeksy search regenerowane w `prebuild`.

Weryfikacja: `npx tsc --noEmit` → 0 błędów · `next build` → 1821 stron, exit 0 · push → Vercel. Commity: e062513, 6df73e6, b8acda8, e48e245, 850b6f2, b124686, 2859383, 3accb24, ed4f1b8.

---

## [2026-04-28] — Auto-blog pipeline aktywny + fixes

- Blog: automatyczna publikacja artykułów z LinkedIn przez n8n (pipeline aktywny)
- SEO fix: poprawiony URL w `robots.ts` (lab-ai → lok-ai), uzupełniony `llms.txt`
- Fix kontakt: zmiana adresu odbiorcy formularza
- Fix blog: złagodzenie tytułów (font-bold → font-semibold)

---

## [2026-04-21] — Sprint: Faza 7 redesign podstron + Portfolio WWW

**Redesign podstron w nowym systemie amber/coral:**
- `/uslugi` — nowy header, ServiceCard z orb, metryką i hover outline
- `/kontakt` — dwukolumnowy layout z formularzem Resend
- `/blog` — header coral + live indicator, magazynowy BlogListClient (featured + 3 mniejsze)
- `/faq` — accordion w nowym stylu, CTA bar
- `/o-nas` — value cards, tech stack pills
- `/portfolio` — siatka 16 projektów WWW z miniaturkami Microlink API, ukryte URL-e

**Favicon:** dodana ikonka karty przeglądarki (logo LOK amber/coral)

Weryfikacja: `npx tsc --noEmit` → 0 błędów · `next build` → 83 strony, exit code 0 · push → Vercel

---

## [2026-04-21] — Sprint: Rebrand LAB → lok-ai + nowa architektura

**Rebrand:**
- Logo w Navbar i Footer: LAB → lok-ai
- `lib/schema.ts` — nazwa organizacji, email kontakt@lok-ai.pl
- `app/layout.tsx` — meta title/template/siteName
- `public/llms.txt` — nagłówek i email
- Wszystkie podstrony — meta titles, opisy, treści

**Nawigacja:**
- Nowa: Usługi | Technologia | Blog | Portfolio | FAQ
- Usunięto z nav: Demo AI, Dziennik (pozostają jako deep linki)

**Sekcja Technologia:**
- Katalog `/technologia/` + listing + `[slug]/page.tsx`
- `src/lib/mdx.ts` — refaktoryzacja na `createMdxReader(contentDir)`
- 3 artykuły MDX: co-to-jest-n8n, chatboty-ai-dla-firm, agenci-glosowi-elevenlabs-twilio

**Strony usług:**
- `services.ts` rozszerzony o longDesc, benefits, useCases, ctaText
- Bogaty layout `/uslugi/[slug]/page.tsx`

**Blog:**
- 3 wpisy z Dziennika zmigrowane do Bloga
- `sitemap.ts` zaktualizowany (dodano /technologia, /portfolio; usunięto /dziennik)

**FAQ:**
- 3 nowe pytania (Protokół 06–08)

**Strona główna:**
- Sekcja "Bezpłatna konsultacja" między FeatureSpotlight a CtaSection

---

## [2026-04-21] — Sprint: Redesign — ciepła paleta amber/coral

**Design system:**
- Nowa paleta: amber (primary), coral (akcent), sand (tło), rust
- Fonty: Chakra Petch (display italic) + IBM Plex Mono (labels) dodane do Inter
- Tokeny zaktualizowane w `tailwind.config.ts` i `globals.css`

**Nowe komponenty:** Logo, AuroraBg, Ticker, Counter (animowane liczniki), ChatDemo

**Hero A:** aurora background, chatbot demo, stats row z licznikami, ticker

**Formularz kontaktu:** migracja do `/api/contact` z Resend

---

## [2026-04-10 — 2026-04-20] — Redesign: Obsidian Monolith + Dziennik

- Redesign motyw "Obsidian Monolith" ze Stitch (ciemny, geometryczny)
- Dodanie sekcji Dziennik z pierwszymi wpisami
- Refaktoryzacja bloga: lista zamiast grid, ujednolicony font
- Kategorie tagów w artykułach bloga
- Korekty fontów zgodnie ze Stitch (Space Grotesk → Inter)

---

## [2026-03-30 — 2026-04-09] — MVP: pierwsze artykuły bloga

- Uruchomienie projektu (Next.js 14, Tailwind, MDX)
- Pierwsze artykuły bloga (automatyzacja, n8n, AI news)
- Infrastruktura: Vercel live preview, domena lok-ai.pl (OVH), SSL
- SEO artifacts: sitemap.ts, robots.ts, llms.txt, Schema.org (lib/schema.ts)
