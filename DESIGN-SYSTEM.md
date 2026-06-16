# DESIGN-SYSTEM.md — lok-ai.pl
## Pakiet startowy systemu designu

**Motyw przewodni:** *Tradycja i nowoczesność · klasyka i futuryzm · lokalna automatyzacja biznesu.*
**Hasło:** „Żyj lokalnie, myśl globalnie — polskie wartości + AI i technologia przyszłości."

> Źródło prawdy o tokenach = `tailwind.config.ts`. Ten dokument formalizuje istniejące tokeny i opisuje warstwę „charakteru" (motywy, ilustracje, typografia). Narzędzia projektowe (Stitch / Figma / Claude Design) generują **assety i warianty**, ale NIE nadpisują tokenów w kodzie.

---

## 1. Koncept wizualny (dwa bieguny, jedna całość)

| Biegun TRADYCJA / KLASYKA | Biegun NOWOCZESNOŚĆ / FUTURYZM |
|---|---|
| Ciepłe złoto, bursztyn, piasek, rdza (polskie barwy ziemi, rzemiosło) | Głęboka grafitowa czerń, precyzyjna siatka, świetlne akcenty |
| Krój klasyczny, czytelność, spokój | Chakra Petch (techniczny, „maszynowy" display) |
| Motyw: mapa Polski, koło zębate, detal rzemieślniczy | Motyw: obwody, węzły grafu, przepływ danych |

Napięcie między biegunami = tożsamość marki. Każda sekcja powinna mieć **jeden** element z każdego bieguna (np. ciepły bursztynowy akcent na chłodnym grafitowym tle z subtelną siatką).

---

## 2. Kolory (token foundation — z `tailwind.config.ts`)

### Tła
- `background` `#0b0c0e` · `bg-soft` `#121315`
- `surface` `#17181b` · `surface.warm` `#1E1B18` (ciepły wariant — używaj w sekcjach „tradycja")
- `surface.hi` `#1f2125` · `surface.hi-hi` `#2a2d32`

### Akcenty ciepłe (rdzeń marki)
- **amber** `#f5b845` / deep `#c48a1c` — główny akcent, CTA, złoto
- **coral** `#ef7955` / deep `#b84a2a` — energia, highlight
- **sand** `#d9b88a` / deep `#8a6a3c` — tło sekcji „tradycja", ciepłe neutrale
- **rust** `#b8542f` / deep `#7a3018` — głębia, ziemia

### Tekst i kontur
- `on-surface` `#ede7dc` (główny) · `text.dim` `#a8a29e` · `text.mute` `#78716c`
- `border` `rgba(255,255,255,0.08)` · `border.strong` `rgba(255,255,255,0.14)`

### Zasady użycia (semantyka)
- **CTA / akcja:** `amber` na `on-primary` `#1a0f00` (ciemny tekst na złocie).
- **Sekcje „tradycja":** baza `surface.warm`, akcent `sand`/`rust`.
- **Sekcje „futuryzm":** baza `background`, akcent `amber`/`coral`, subtelna siatka 8px.
- **Nigdy** więcej niż 1 ciepły akcent dominujący na ekran — reszta jako 5–10% powierzchni.

---

## 3. Typografia

| Rola | Krój | Token | Użycie |
|---|---|---|---|
| Display / hero | **Chakra Petch** | `font-display` | H1, liczby, hasła — biegun futuryzm |
| Nagłówki | Inter | `font-heading` | H2–H4 |
| Tekst | Inter | `font-body` | akapity, UI |
| Mono | IBM Plex Mono / JetBrains | `font-mono` | kod, dane techniczne, terminy słownika |

**Skala (clamp, responsywna):**
- H1 `clamp(32px, 5vw, 56px)` · H2 `clamp(26px, 4vw, 40px)` · H3 `clamp(20px, 3vw, 28px)`
- Body `16–18px`, line-height `1.6` · Mała `14px`
- Tracking: display `-1px`, body `0`.

---

## 4. Przestrzeń, promień, cień

- **Spacing:** skala 4px (4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96). Sekcje: padding pionowy `clamp(64px, 10vw, 128px)`.
- **Radius:** `DEFAULT 4px` (UI) · `lg 8px` · `xl 12px` (karty) · `2xl 16px` · `3xl 24px` (hero/sekcje).
- **Cień:** unikać ciężkich cieni; zamiast tego `border.DEFAULT` + delikatna poświata akcentu (`amber` glow 8–16px, opacity 15–25%) na elementach interaktywnych.
- **Siatka motywu:** opcjonalne tło `linear/grid` 8px, opacity 3–5%, kolor `rgba(255,255,255,0.04)` — warstwa „futuryzm".

---

## 5. Warstwa charakteru (do zlecenia narzędziu)

To jest obszar, który warto **oddelegować** (Stitch / Figma / Claude Design). Spójny styl dla:

1. **Logo / motyw główny** — koło zębate + mapa Polski (masz już w `AniLogo/`). Złoto na grafitcie.
2. **Ilustracje do wpisów** — wspólny styl: ciepłe akcenty (amber/coral) na ciemnym tle, motyw „lokalne × globalne" (mapa, węzły, przepływy). Stały rozmiar (np. 1200×630, OG-ready).
3. **Ikonografia** — linia 1.5–2px, zaokrąglone końce, jeden akcent. Spójna rodzina dla usług/procesów.
4. **Tła sekcji** — subtelne motywy: siatka, obwód, kontur mapy — nigdy nie konkurujące z treścią.

---

## 6. Inwentarz komponentów (istniejące → docelowe)

Masz już: `Hero`, `Navbar`, `Footer`, `ServiceCard`, `BlogCard`, `FaqAccordion`, `ProcessSteps`, `StatsGrid`, `Counter`, `Ticker`, `GeoGrid/GeoStripe`, `CtaSection`, `ContactForm`, `SchemaOrg`, `ChatbotDemo`.

Do dodania pod przebudowę: `OfferHubHero` (dla `/wdrozenia`), `ProcessTaxonomyTree` (APQC PCF), `TermCard` (słownik), `BreadcrumbBar`, `RelatedLinks` (mesh linkowania).

---

## 7. Brief gotowy do wklejenia do narzędzia projektowego

> Zaprojektuj system wizualny dla lok-ai.pl — lokalnej firmy automatyzacji biznesu (region kujawsko-pomorski). Motyw: tradycja i nowoczesność, klasyka i futuryzm. Paleta: ciepłe złoto `#f5b845`, koral `#ef7955`, piasek `#d9b88a`, rdza `#b8542f` na głębokiej grafitowej czerni `#0b0c0e`/`#17181b`. Typografia: Chakra Petch (display/futuryzm) + Inter (treść). Motywy graficzne: koło zębate, kontur mapy Polski, węzły grafu/przepływy danych. Nastrój: profesjonalny, ciepły, technologiczny, zakorzeniony lokalnie. Zachowaj kontrast i dostępność (WCAG AA). Nie zmieniaj wartości tokenów — pracuj w ich obrębie.

---

## 8. Reguły żelazne

- Tokeny żyją w `tailwind.config.ts` — to jedyne źródło prawdy. Narzędzia generują assety/warianty, nie nadpisują tokenów.
- Zero hardkodowanych wartości kolorów/spacingu w komponentach — tylko klasy z tokenów.
- Każdy ekran: max 1 dominujący akcent ciepły, jeden element „tradycja" + jeden „futuryzm".
- Dostępność: kontrast tekstu ≥ 4.5:1, akcent na CTA ≥ 3:1.
