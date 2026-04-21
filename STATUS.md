# STATUS.md — Aktualny stan projektu
## lok-ai.pl · Aktualizacja: 21.04.2026 (redesign 21.04)

---

## FAZA BIEŻĄCA

**Sprint 21–25.04.2026** — w toku

### Redesign (21.04) ✅
- [x] Paleta amber/coral/sand/rust (zamiana violet/mint) — `tailwind.config.ts`, `globals.css`
- [x] Fonty: Chakra Petch (display italic) + IBM Plex Mono (labels) dodane w `layout.tsx`
- [x] Nowe komponenty: `Logo`, `AuroraBg`, `Ticker`, `Counter`, `ChatDemo`
- [x] Hero A — aurora, chatbot demo, stats row z animowanymi licznikami, ticker
- [x] Services — grid 3×2 z kartami i metrykami
- [x] BlogPreview — layout magazynowy (featured + 3 mniejsze)
- [x] ContactSection — 2-kolumnowy formularz zintegrowany z /api/contact
- [x] Navbar + Footer — nowe logo SVG, warm palette
- [x] Merge do `main`, push na Vercel
- [ ] **Faza 7 — podstrony** w nowym stylu: /uslugi, /kontakt, /blog, /faq, /o-nas, /portfolio

---

## CO ZOSTAŁO WYKONANE (sprint 21.04)

### Blok 1 — Rebrand LAB → lok-ai ✅
- [x] Logo w Navbar i Footer: "LAB" → "lok-ai"
- [x] Copyright stopki: "LAB Automation Inc." → "lok-ai — Lokalna Automatyzacja Biznesu"
- [x] `lib/schema.ts` — nazwa organizacji, email kontakt@lok-ai.pl
- [x] `lib/schema.ts` — parametryzacja `generateArticleSchema(post, basePath)` (obsługa /technologia/)
- [x] `app/layout.tsx` — meta title/template/siteName
- [x] `public/llms.txt` — nagłówek i email
- [x] `app/feed.xml/route.ts` — tytuł RSS
- [x] Wszystkie strony (blog, cennik, demo, faq, kontakt, o-nas, polityka, regulamin, usługi, dziennik) — meta titles i treści

### Blok 2 — Restrukturyzacja nawigacji ✅
- [x] `Navbar.tsx` — nowa lista: Usługi | Technologia | Blog | Portfolio | FAQ (usunięto Demo AI i Dziennik)
- [x] `MobileBottomNav.tsx` — zakładka "Portfolio" z ikoną Briefcase (zamiast "Realizacje" → /demo)
- [x] `Footer.tsx` — zaktualizowane linki (Usługi, Portfolio, FAQ | Blog, Technologia, Kontakt)

### Blok 3 — Strona Portfolio ✅
- [x] Nowy plik `src/app/portfolio/page.tsx` — placeholder "realizacje w przygotowaniu", metadata, canonical, CTA → /kontakt

### Blok 4 — Sekcja /technologia ✅
- [x] Katalog `src/app/technologie/` przemianowany → `src/app/technologia/`
- [x] Canonical URL w page.tsx zaktualizowany
- [x] `src/lib/mdx.ts` — refaktoryzacja na `createMdxReader(contentDir)`, nowe eksporty: getTechPostBySlug, getAllTechPosts, getAllTechTags
- [x] `src/content/technologia/` — 3 artykuły MDX:
  - `co-to-jest-n8n.mdx` — przewodnik po n8n (~5 min)
  - `chatboty-ai-dla-firm.mdx` — Flowise vs Typebot vs własne (~7 min)
  - `agenci-glosowi-elevenlabs-twilio.mdx` — jak działają voiceboty (~6 min)
- [x] `src/app/technologia/[slug]/page.tsx` — strona artykułu z breadcrumb, Schema.org, MDX render
- [x] `src/app/technologia/page.tsx` — dodano listing artykułów na dole strony (import getAllTechPosts)

### Blok 5 — Rozbudowa stron usług ✅
- [x] `src/content/services.ts` — rozszerzono interfejs o longDesc, benefits, useCases, ctaText
- [x] Dane wypełnione dla 3 głównych usług: automatyzacja-n8n, chatboty-ai, agenci-glosowi
- [x] `src/app/uslugi/[slug]/page.tsx` — bogaty layout (Opis + Korzyści + Przykłady + CTA z ctaText)
- [x] Pozostałe 3 usługi (bazy-wiedzy-rag, dashboardy, integracje) nadal działają z placeholderem

### Blok 6 — Migracja Dziennik → Blog + sitemap ✅
- [x] 3 wpisy z `src/content/dziennik/` skopiowane do `src/content/blog/` (frontmatter: usunięto linkedinPost, zachowano tagi)
- [x] `src/app/sitemap.ts` — usunięto getAllDziennikPosts i blok dziennikPages; dodano technologia (0.8), portfolio (0.5); dodano techPages; zachowano /demo (0.3)

### Blok 7 — FAQ + sekcja konsultacji ✅
- [x] `src/app/faq/FaqPageClient.tsx` — 3 nowe wpisy: Protokół 06 (dla jakich firm), 07 (czy potrzebuję IT), 08 (co po projekcie)
- [x] `src/app/page.tsx` — nowa sekcja "Bezpłatna konsultacja" między FeatureSpotlight a CtaSection

### Weryfikacja ✅
- [x] `grep -rn "\bLAB\b" src/ public/` → zero wyników
- [x] `npx tsc --noEmit` → zero błędów TypeScript
- [x] `next build` → exit code 0

---

## CO ZOSTAŁO WYKONANE WCZEŚNIEJ (do 20.04)

### Infrastruktura ✓
- [x] Domena lok-ai.pl zarejestrowana (OVH, ~20 PLN)
- [x] Projekt na Vercel, auto-deploy z GitHub
- [x] SSL aktywny
- [x] Live preview: https://lok-aipl.vercel.app/

### Stack techniczny ✓
- [x] Next.js 14 + TypeScript + Tailwind CSS
- [x] Struktura plików projektu
- [x] SEO artifacts: sitemap.ts, robots.ts, llms.txt, Schema.org (lib/schema.ts)

### Design ✓
- [x] Wszystkie strony zaprojektowane w Google Stitch (source of truth)

---

## CO DALEJ (po 25.04)

- [ ] Commit i push na GitHub → auto-deploy Vercel
- [ ] Sprawdzić propagację DNS lok-ai.pl → Vercel
- [ ] Optymalizacja pod LLM i SEO (audyt + narzędzia oceniające)
- [ ] Integracja chatbota Typebot w Demo-AI (~2 tygodnie)
- [ ] Headless WordPress CMS na CyberFolks (blog — faza odroczona)
- [ ] Agent głosowy ElevenLabs (czerwiec wg roadmapy)
- [ ] Portfolio — wypełnienie po zakończeniu negocjacji z Tomkiem (Creato)

---

## BLOKERY / OTWARTE KWESTIE

| Problem | Status | Akcja |
|---|---|---|
| Stitch MCP NPX proxy — ghost config | 🔴 Nierozwiązany | Sprawdzić `.claude/settings.json` i `.mcp.json` w katalogu projektu |
| Partnerstwo z Tomkiem (Creato) | 🟡 W toku | Wpływa na zakres sekcji Portfolio |
| DNS lok-ai.pl → Vercel | 🟡 Status? | Sprawdzić czy propagacja DNS zakończona |

---

## KAMIENIE MILOWE

| Data | Kamień | Status |
|---|---|---|
| 20.04 | Strona live (Vercel preview) | ✅ |
| 21.04 | Rebrand + nowa struktura + 3 artykuły Technologia | ✅ |
| ~07.05 | Chatbot Typebot live w Demo-AI | 🔲 |
| 31.05 | 8+ artykułów blog | 🔲 |
| Czerwiec | Agent głosowy ElevenLabs | 🔲 |
