# CHANGELOG.md
## lok-ai.pl · Historia zmian

Format: `## [data] — tytuł`

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
