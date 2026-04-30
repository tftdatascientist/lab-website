# lok-ai.pl — Studio Automatyzacji AI

Strona usługowa dla lokalnego studio automatyzacji AI w regionie kujawsko-pomorskim. Oferujemy automatyzację procesów (n8n), chatboty AI i agentów głosowych dla małych i średnich firm w Polsce.

**Live:** https://lok-aipl.vercel.app · **Docelowa domena:** https://lok-ai.pl

---

## Stack

| Warstwa | Technologia |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Stylowanie | Tailwind CSS (tokeny ze Stitch) |
| Treści | MDX (next-mdx-remote) |
| Email | Resend |
| Deploy | Vercel (auto-deploy z GitHub) |
| Domena | lok-ai.pl (OVH) |

---

## Quickstart

```bash
npm install
cp .env.example .env.local   # uzupełnij zmienne
npm run dev                  # http://localhost:3000
```

## Zmienne środowiskowe

```
RESEND_API_KEY=        # klucz Resend do formularza kontaktu
```

Zmienne produkcyjne: Vercel Dashboard → Settings → Environment Variables.

---

## Dokumentacja

- [ARCHITECTURE.md](./ARCHITECTURE.md) — stack, struktura katalogów, integracje, SEO artifacts
- [CLAUDE.md](./CLAUDE.md) — zasady projektu dla Claude Code (design, SEO, checklist)
- [PLAN.md](./PLAN.md) — aktualny sprint
- [CHANGELOG.md](./CHANGELOG.md) — historia zmian

---

## Deploy

Push na `main` → Vercel buduje automatycznie. Zmienne środowiskowe ustawiane w Vercel Dashboard.
