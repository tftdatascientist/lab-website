# PLAN.md — Sprint 21–25.04.2026
## lok-ai.pl · Status: WYKONANY 21.04.2026

---

## CEL SPRINTU ✅

Przekształcenie strony z wersji MVP (szkielet LAB) w kompletną, gotową do promocji stronę usługową działającą pod marką **lok-ai / Lokalna Automatyzacja Biznesu**.

---

## 1. REBRAND: LAB → lok-ai ✅

- [x] Logo Navbar i Footer: "LAB" → "lok-ai"
- [x] Meta title/template/siteName w layout.tsx
- [x] Schema.org `name`: lok-ai — Lokalna Automatyzacja Biznesu
- [x] Email: kontakt@lok-ai.pl (schema.ts, kontakt/page.tsx, polityka, llms.txt)
- [x] llms.txt zaktualizowany
- [x] Copyright stopki zaktualizowany
- [x] Wszystkie strony — meta titles, opisy, treści body

---

## 2. RESTRUKTURYZACJA NAWIGACJI ✅

**Nawigacja:**
```
Usługi | Technologia | Blog | Portfolio | FAQ
```
(usunięto: Demo AI, Dziennik — strony pozostają jako deep linki)

- [x] Navbar.tsx — zaktualizowane navLinks
- [x] MobileBottomNav.tsx — Portfolio z ikoną Briefcase
- [x] Footer.tsx — zaktualizowane linki

---

## 3. PODSTRONY USŁUG ✅

- [x] `src/content/services.ts` — nowe pola: longDesc, benefits[], useCases[], ctaText
- [x] Wypełnione dla: automatyzacja-n8n, chatboty-ai, agenci-glosowi
- [x] `src/app/uslugi/[slug]/page.tsx` — bogaty layout (Opis + Korzyści + Use cases + CTA)

---

## 4. SEKCJA TECHNOLOGIA ✅

- [x] Katalog `/technologie/` → `/technologia/`
- [x] `src/lib/mdx.ts` — refaktoryzacja createMdxReader, nowe eksporty dla technologia
- [x] 3 artykuły MDX w `src/content/technologia/`:
  - co-to-jest-n8n.mdx
  - chatboty-ai-dla-firm.mdx
  - agenci-glosowi-elevenlabs-twilio.mdx
- [x] `src/app/technologia/[slug]/page.tsx` — pełna strona artykułu
- [x] Listing artykułów na `src/app/technologia/page.tsx`

---

## 5. MIGRACJA DZIENNIKA → BLOG ✅

- [x] 3 wpisy przeniesione do `src/content/blog/` (frontmatter dostosowany)
- [x] Sitemap zaktualizowany (usunięto /dziennik, dodano /technologia, /portfolio)

---

## 6. FAQ ✅

- [x] 3 nowe pytania (Protokół 06, 07, 08): dla jakich firm, czy potrzebuję IT, co po projekcie

---

## 7. PORTFOLIO ✅

- [x] `src/app/portfolio/page.tsx` — placeholder z metadata i CTA

---

## 8. SEKCJA KONSULTACJI ✅

- [x] Sekcja "Bezpłatna konsultacja" na stronie głównej (między FeatureSpotlight a CtaSection)

---

## NASTĘPNY SPRINT (sugerowane)

- [ ] Commit + push → deploy Vercel
- [ ] Weryfikacja DNS lok-ai.pl
- [ ] SEO/LLM audit (llms.txt, Schema.org, sitemap)
- [ ] Wypełnienie Portfolio (po ustaleniach z Tomkiem)
- [ ] Integracja chatbota Typebot (~07.05)
