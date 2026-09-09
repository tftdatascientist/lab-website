---
status: locked
wersja: 1
zablokowano: 2026-09-09
kierunek: B — „Ściana tabliczek”
narzędzia: [Stitch MCP (dostępny, nieużyty w ETAP C), design-taste-frontend (dostępny), Impeccable (BRAK), detektor = scripts/slop_scan.py, pomiar = design/proof/measure.mjs (puppeteer-core + Chrome)]
proof: design/proof/B-sciana-tabliczek.html
---

# DESIGN — lok-ai.pl

> Artefakt ETAP C (CCUD). Kontrakt wizualny.
> **Przy `status: locked` ten plik jest read-only dla ETAP1–ETAP6 WCS2.**
> Zmiana wymaga ponownego wejścia w CCUD ETAP C i podniesienia wersji.
>
> Ograniczenie procesowe (decyzja użytkownika, bramka 2): redesign powstaje na gałęzi
> `redesign-ccud`, **produkcja zostaje na obecnym designie** do jawnej decyzji użytkownika.

---

## Kierunek

**Nazwa:** B — „Ściana tabliczek”

**Teza:** grafitowa ściana, na niej papierowe tabliczki znamionowe w nierównej siatce
12 kolumn; hierarchię niesie **wielkość pola**, nie krój; nawigacja to pionowa szyna z lewej
(pasek dolny na telefonie); jedyny obraz to rysunek techniczny komputera lokalnego.

**Poświęca:** łatwość dodawania sekcji przez kogokolwiek — każda nowa tabliczka wymaga decyzji
o rozmiarze pola i miejscu na ścianie. Nagłówek H1 jest mniejszy niż w kategorii (40 px, nie
72–84), więc „pięć sekund” robi ściana, nie hasło.

**Estetyka:** tabliczkowa, dwubiegunowa, strzałkowa, monospace'owa, sygnałowa, płaska, odczytowa

**Pokrętła:** VARIANCE 7 · MOTION 5 · DENSITY 7

**Przekaz niesiony formą (reguła nadrzędna z briefu):** „lokalne × światowe” = papierowe
tabliczki (miejsce, tradycja) na grafitowej płycie (świat, technologia); „konwerter” = wiersze
`A > B`; „technologia to środek” = zero nazw narzędzi i zero logotypów w warstwie brandowej;
„energia” = ściana, na której coś wisi i pracuje: odczyty z liczb, które istnieją.

---

## Tokeny

### Kolor

```css
:root {
  /* podłoża — dwa bieguny, oba tintowane, nigdy #000 / #fff */
  --paper:      #e8e5de;   /* tabliczka: lokalnie / tradycja */
  --paper-2:    #dcd8cf;   /* hover wiersza, drugi plan na papierze */
  --paper-3:    #cfcabf;   /* cienkie reguły na papierze */
  --plate:      #26282b;   /* ściana: świat / technologia */
  --plate-2:    #323538;   /* tabliczka grafitowa (Miejsce, Przegląd dnia) */
  --plate-3:    #3e4246;   /* pole wartości na płycie */

  /* atrament na papierze */
  --ink:        #171614;
  --ink-2:      #4f4c47;   /* proza drugorzędna */
  --ink-3:      #66625b;   /* metadane */

  /* kość na płycie */
  --bone:       #e8e5de;
  --bone-2:     #a8a49c;

  /* jeden sygnał — rodowód: obecny coral #ef7955 podgrzany */
  --accent:     #ec3d0a;
  --accent-ink: #1a0c07;

  /* reguły */
  --rule-paper: #171614;
  --rule-plate: rgba(232,229,222,.18);
}
```

| Rola | Wartość | Kontrast | Gdzie wolno użyć |
|------|---------|----------|------------------|
| proza na papierze | `--ink` / `--paper` | 14,4:1 | tekst, nagłówki tabliczek |
| proza drugorzędna | `--ink-2` / `--paper` | 6,8:1 | opisy pod tytułem, lead |
| metadane | `--ink-3` / `--paper` | 4,8:1 | metadane mono ≥ 13 px w paskach nagłówka i stopkach tabliczek (nie proza) |
| tekst na płycie | `--bone` / `--plate` | 11,7:1 | tabliczki grafitowe, szyna |
| tekst drugorzędny na płycie | `--bone-2` / `--plate` | 6,0:1 | metadane na płycie |
| sygnał | `--accent` | 3,2:1 na papierze · 3,7:1 na płycie (próg 3:1 dla elementów UI; jako tekst wyłącznie znak `>` i pojedyncza wartość w mono 700) | **tylko**: pole CTA, znak `>` w wierszach, kropka stanu, jedna wartość w wierszu; ≤ 10 % ekranu (zmierzone: 8,7 % na 1440, 0 % na 375 w pierwszym ekranie) |
| tekst na sygnale | `--accent-ink` / `--accent` | 4,8:1 | CTA |

Zasada: **jeden token akcentu w całym CSS**. Obecne `amber`, `sand`, `rust` z `tailwind.config.ts`
przestają istnieć jako akcenty — ciepło przechodzi do podłoża (`--paper` jest tintowany
w stronę hue akcentu). Zielony/czerwony statusu nie istnieją; stan mówi słowo w mono.

### Typografia

```css
:root {
  --font-display: "Chakra Petch", sans-serif;      /* ZOSTAJE — to jest zachowany charakter */
  --font-text:    "Archivo", sans-serif;           /* Inter WYLATUJE z roli tekstu */
  --font-mono:    "JetBrains Mono", monospace;     /* dane, metadane, nawigacja, wiersze A > B */

  --scale-ratio: 1.333;
  --step--1: 13px;
  --step-0:  17px;        /* tekst podstawowy */
  --step-1:  22px;
  --step-2:  30px;
  --step-3:  40px;        /* H1 w kierunku B */
  --step-4:  54px;        /* zarezerwowane: tylko liczby-odczyty, nigdy nagłówek */

  --measure: 66ch;
  --leading-text: 1.5;
  --leading-display: 1;
}
```

| Poziom | Krój | Rozmiar | Waga | Interlinia | Użycie |
|--------|------|---------|------|------------|--------|
| H1 | Chakra Petch | 40 px (32 px ≤ 760) | 700 | 1 | jeden na stronę, w tabliczce hero |
| H2 | Chakra Petch | 22–30 px | 500 | 1,1 | tytuły tabliczek dużych |
| odczyt | JetBrains Mono | 30–54 px | 700 | 1,1 | liczby i współrzędne, nigdy słowa |
| proza | Archivo | 17 px, min 15 px w wierszach | 400 / 600 | 1,5 | opisy, wpisy, hasła; 55–75 znaków w linii |
| mono UI | JetBrains Mono | 13 px, 11 px w `th` | 400 / 700 | 1,4 | paski nagłówka, stopki tabliczek, nawigacja, wiersze `A > B`, tabele |

Wersaliki i `letter-spacing .04–.06em` **tylko** w mono. Proza nigdy w wersalikach.
Chakra Petch nigdy w prozie i nigdy poniżej 22 px.

### Przestrzeń i rytm

```css
:root {
  --space-1: 8px;
  --space-2: 16px;     /* odstęp między tabliczkami na ścianie; padding tabliczki */
  --space-3: 32px;     /* odstęp między blokami wewnątrz tabliczki */
  --space-4: 64px;     /* tylko na podstronach treści między tabliczką a tabliczką innego tematu */

  --section-tight: var(--space-2);
  --section-loose: var(--space-4);
}
```

**Zasada rytmu:** ściana jest **równa** — 16 px między tabliczkami wszędzie, bez „oddechów”
między sekcjami (oddech to pusta płyta, a pusta płyta czyta się jako niedokończona ściana).
Gęstość różnicuje się **wewnątrz** tabliczek: hero i Miejsce rzadkie, Co wdrażamy / PCF / Przegląd
dnia gęste (wiersz ~40–48 px). Na podstronach treści (wpis, hasło, proces) jedna szeroka
tabliczka czytania (`--measure`) + wąskie tabliczki metadanych obok.

### Siatka i szerokości

| Kontekst | Szerokość | Kolumny | Uwagi |
|----------|-----------|---------|-------|
| ściana (desktop ≥ 1024) | pełna, minus szyna 56 px | 12, gap 16 px, padding 16 px | brak kontenera 1200 px; ściana idzie do krawędzi okna |
| tabliczka hero | kol. 1–8 | | H1 + lead + stopka „Audyt > Projekt > Wdrożenie > Wsparcie” |
| Miejsce (grafitowa) | kol. 9–12 | | współrzędne 53°29′N 18°45′E, odległości do Torunia i Bydgoszczy |
| Skąd > dokąd | kol. 1–5 | | wiersze `A > B` |
| Komputer lokalny | kol. 6–9 | | rys. techniczny, docelowo zdjęcie własne na `--paper` bez cienia |
| CTA | kol. 10–12 | | pełne pole w `--accent`, jedno na ekran |
| Co wdrażamy | kol. 1–7 | | 6 wierszy |
| Baza procesów | kol. 8–12, 2 rzędy | | tabela 13 kategorii |
| Przegląd dnia (grafitowa) | kol. 1–7 | | 6 ostatnich |
| tablet 760–1023 | pełna | 12 → pola łączą się parami | szyna zostaje |
| telefon ≤ 760 | pełna | 1 kolumna, kolejność jak w DOM | szyna → pasek dolny 52 px, `padding-bottom: 72px` |

**Breakpointy:** 375 · 760 · 1024 · 1440

**Podstrony treści** (wpis / hasło / proces — strony wejściowe z LLM): ta sama ściana, układ
kol. 1–8 tabliczka czytania, kol. 9–12 tabliczki: Miejsce (skrócona), „Skąd > dokąd” dla tego
tematu, CTA. Każda podstrona niesie markę bez hero.

### Powierzchnia

```css
:root {
  --radius: 0;                                   /* tabliczka ma kanty */
  --rule: 1px solid var(--rule-paper);           /* na papierze */
  --rule-on-plate: 1px solid var(--rule-plate);  /* na płycie */
  --elevation-1: none;                           /* nie ma cieni */
  --elevation-2: none;
}
```

**Rozdzielanie treści przez:** `blok koloru` (papier na płycie = tabliczka) + `reguły` 1 px
wewnątrz tabliczki. Nigdy cień, nigdy zagnieżdżona tabliczka w tabliczce. Ramka tabliczki
papierowej: `1px solid var(--paper-3)`; grafitowej: `1px solid var(--plate-3)`.

Anatomia tabliczki (obowiązkowa, sprawdzalna): `header` (pasek mono: `Nr NN · tytuł` | pole
prawe: liczba / miejsce / data) → `.body` → `footer` (pasek mono: źródło lub kolejność | numer).
Pasek ostrzegawczy w ukośne pasy `--accent`/`--paper` 8 px: **maks. jeden na stronę**, tylko
jako separator przed stopką. Logo AniLogo: w szynie jako znak ≤ 40 px, w hero nieobecne
(dziś 75 % szerokości i 80 vh — koszt LCP).

### Ruch

```css
:root {
  --dur-state:   140ms;     /* hover, focus, zmiana stanu */
  --dur-context: 220ms;     /* rozwinięcie tabliczki, zmiana filtra */
  --ease-out:    cubic-bezier(.2,.7,.2,1);
}
```

**Co animujemy:** zmianę koloru CTA na hover (`--accent` → `--ink`), kolor linku w szynie,
tło wiersza tabeli na hover, migotanie kropki stanu w szynie (`steps(2)`, 2 s) **tylko gdy stoi
za nią realny stan** (np. data ostatniego wpisu = dziś), przesuw listy odczytów, gdy dane
faktycznie się zmieniają.
**Czego nie animujemy:** wejść sekcji przy scrollu, liczników od zera, `AuroraBg` (usunięty),
logo w hero (animowane logo zostaje tylko na `/o-nas` albo jako mały znak w szynie), parallaxu,
podkreślenia rysowanego pod H1 (obecny `lokai-draw`).
`prefers-reduced-motion: reduce` — wszystko wyłączone, kropka stanu stoi.

---

## Budżet dewiacji

Minimum 3. Każda odwracalna pojedynczo.

| # | Dewiacja | Słowo estetyki | Domyślnik kategorii | Ryzyko | Dlaczego bierzemy |
|---|----------|----------------|---------------------|--------|-------------------|
| 1 | nawigacja jako pionowa szyna 56 px z lewej (pasek dolny na telefonie) | tabliczkowa | sticky top bar z logo i CTA | menu trudniej znaleźć przy pierwszym wejściu | 5 pozycji, zawsze widoczne, ściana zaczyna się od krawędzi; odwracalne: szyna → pasek górny bez ruszania siatki |
| 2 | H1 40 px, hierarchię niesie wielkość pola | dwubiegunowa | hero 72–84 px z podkreśleniem i badge | słabsze „pięć sekund” w samym nagłówku | przekaz ma nieść forma, nie hasło (brief §0a); odwracalne: `--step-3` → `--step-4` w hero |
| 3 | zero fotografii; jedyny obraz to rysunek techniczny (docelowo zdjęcie własne) urządzenia | płaska, strzałkowa | stock „zespół przy laptopie”, mockup dashboardu | mniej „ludzko” | ciepło z podłoża, nie z twarzy; przedmiot = jedyna rzecz, której agencja chmurowa nie pokaże |
| 4 | liczby wyłącznie z treści serwisu (1908 / 1201 / 123 / data) z podanym źródłem | odczytowa | liczniki „400+ integracji”, „<48h” | mniej „wow” w hero | liczba bez źródła to obietnica, liczba ze źródłem to dowód; odwracalne: usunąć tabliczkę odczytów |
| 5 | CTA jako pełne pole siatki w sygnale, jedno na ekran | sygnałowa | dwa przyciski (pełny + ghost) pod nagłówkiem | pole czyta się jak baner | jedyna plama sygnału na ekranie = oko ląduje tam pierwsze; odwracalne: pole → przycisk w tabliczce hero |
| 6 | zero nazw narzędzi i logotypów w warstwie brandowej | strzałkowa | pasek logo n8n / Make / OpenAI | mniej „wiarygodności technicznej” dla technicznego czytelnika | brief: technologia to środek; narzędzia zostają w słowniku, procesach i wpisach |

---

## Ograniczenia twarde (NIE CHCĘ)

Przenoszone dosłownie z `REFERENCE.md`. Złamanie któregokolwiek unieważnia ekran.

```
WARSTWA 1 — anty-emocja, anty-efekt:
- nic, co onieśmiela: żadnego rejestru militarnego (INTERNAL USE ONLY, AUTHORIZED PERSONNEL,
  CLASSIFIED); etykieta cywilna — tabliczka znamionowa, list przewozowy, bilet, nie rozkaz
- żadnego języka inwestorów („skaluj”, „disruptuj”, „ekosystem”) ani straszenia stratą
- żadnych liczników bez źródła („400+ integracji”, „<48h”)
- żadnych nazw narzędzi (n8n, OpenAI, Flowise, ElevenLabs, Make) w hero, nawigacji,
  tabliczkach usług, stopce
- nic, co czyta się jako „trzech chłopaków z laptopami”: zdjęcia zespołu przy laptopie,
  mockupy laptopa w perspektywie

WARSTWA 2 — anty-referencje kategorii (agisona, tantor, dataone, lok-ai dziś):
- AuroraBg i każda gradientowa poświata w tle
- kafle usług z emoji jako ikonami — emoji wylatują całkowicie
- badge nad nagłówkiem („Nowa era · kwiecień 2026”)
- rząd liczników w hero
- ticker z newsami bez źródła i godziny (ticker wolno TYLKO z realnych danych)
- trzy plany cenowe ze środkowym „popularnym”
- pasek logotypów integracji / „zaufali nam”
- dwaj founderzy w dwóch kolumnach, neonowe logo, „oblicz swoją stratę”
- kafle sprzętu Starter / Business / Enterprise ze specyfikacją jako lista parametrów
- kontur mapy Polski jako ozdoba w tle (mapa TYLKO jako instrument: współrzędne, punkt, trasa)

WARSTWA 3 — blokada AI-slopu:
Inter/Roboto/Open Sans/DM Sans/Poppins jako font domyślny · gradient fiolet→niebieski ·
gradientowy tekst w nagłówku · karta w karcie · szary tekst na kolorowym tle ·
czysty #000 i nietintowane szarości · zaokrąglony kwadracik z ikoną nad nagłówkiem ·
trzy kolumny cech z ikonami · wycentrowany hero z dwoma przyciskami · pill/badge nad
nagłówkiem · shadow-lg na wszystkim · easing bounce/elastic · emoji jako ikony ·
szary pasek „zaufali nam” · glassmorphism i rozmyte plamy w tle · fale i skosy między
sekcjami · stock: zespół przy laptopie · corporate memphis · mockup laptopa w perspektywie
```

---

## Uniqueness check

| Test | Wynik | Notatka |
|------|-------|---------|
| **Swap test** — czy da się przenieść na anty-referencję bez straty? | **PASS z zastrzeżeniem** | Podmiana na agisona.pl / tantor.pl: **sama ściana jest przenaszalna** (nierówna siatka tabliczek przyjmie dowolną treść). Nieprzenaszalne są tabliczki, które robią przekaz: **Miejsce** (współrzędne Grudziądza, 60 km do Torunia — agencja ogólnopolska nie ma miejsca), **Komputer lokalny** (przedmiot u klienta — chmura nie ma czego narysować), **Baza procesów 1908** i **Przegląd dnia 123** (trzeba je mieć), **Skąd > dokąd** (wymaga pary lokalne → światowe). Po podmianie na agisona zostałaby pusta ściana z hasłem i licznikami — czyli ich obecna strona w nowym kostiumie. Odróżnialność stoi na treści, którą tylko lok-ai ma, nie na formie; to ta sama zależność, co przy LAB247. **Warunek utrzymania:** wymienione cztery tabliczki muszą być na stronie głównej ZAWSZE i na każdej podstronie treści przynajmniej Miejsce + Skąd > dokąd. |
| **Test bez słów** (brief §0a) | PASS | Przy zamianie prozy na placeholder zostają: papier na grafitcie (dwa bieguny), wiersze z `>` (konwerter), współrzędne i rysunek urządzenia (miejsce, przedmiot), tabela z kodami (dowód). Hasło „Twoja firma. Mądrzejsza o AI.” nie jest potrzebne do odczytania kierunku. |
| **Budżet dewiacji** — ≥3, każda z ryzykiem i odwracalna | PASS (6) | tabela wyżej |
| **Detektor** — `scripts/slop_scan.py design/proof/` | 0 twardych · 0 miękkich | 2026-09-09 |
| **Pomiar podłoży** — `design/proof/measure.mjs` | PASS | pierwszy ekran 1440×900: papier 66,0 % · płyta 21,8 % · sygnał 8,7 %; 375×812: papier 50,0 % · płyta 43,4 % · sygnał 0 % (CTA poniżej zgięcia) |

Zrzuty: `design/proof/shots/B-1440.png`, `design/proof/shots/B-375.png`.

---

## Odrzucone kierunki

Użytkownik wybrał „opcja B” bez uzasadnienia. Powody odrzucenia to domysł z delty.

| Kierunek | Teza | Powód odrzucenia |
|----------|------|------------------|
| A — „List przewozowy” | jedna kolumna tabliczek, hierarchia ze skali kroju, grafit jako pieczęć, zero obrazów | `[domysł]` za spokojny: czyta się jak dokument, a użytkownik chciał, żeby strona „emanowała energią”; pusty margines na desktopie |
| C — „Dwa bieguny” | ekran przecięty na pół papier | grafit, wiersze przez szew, hierarchia z przestrzeni, pasek dolny | `[domysł]` za dosłowny: dwa bieguny jako dwie połówki to ilustracja hasła, nie ściana; połowa szerokości na tabelę; pusta płyta czyta się jako niedokończona |

Materiał do korpusu gustu: `../../korpus-gustu.md` (SER, wspólny) — wpis „automatyzacja lokalna / brand”.

---

## Wdrożenie (dla ETAP2, poza tym plikiem)

Nie jest częścią kontraktu, ale ETAP2 to przeczyta jako pierwsze:

- `tailwind.config.ts`: `colors` → tokeny wyżej (paper/plate/ink/bone/accent), reszta aliasów
  legacy do usunięcia po migracji; `fontFamily.body/heading` → Archivo; `borderRadius` → 0.
- `layout.tsx`: `Inter`, `Orbitron` wypadają; `Archivo` wchodzi; Chakra Petch i JetBrains Mono zostają.
- Komponenty do usunięcia: `AuroraBg`, `Counter` (liczniki od zera), `Ticker` (bez źródła),
  `StatsGrid` w obecnej formie, `ScrollReveal`.
- Komponent nowy: `Tabliczka` (header / body / footer), `Sciana` (siatka 12), `Szyna` (nav),
  `WierszeAB` (`A > B`), `Odczyt` (liczba + źródło, liczona z treści przy buildzie).
- `news-illustrations` (123 ilustracje do wpisów): **dług** — zostają w starej palecie do
  osobnej decyzji; na liście /blog nie są pokazywane (gęsta tabela), więc konflikt palety
  widać tylko na stronie wpisu i w OG.

---

## Powiązania

- `design/DESIGN-BRIEF.md` — intencja (confirmed 2026-09-09)
- `design/REFERENCE.md` — referencje, estetyka, guardraile (confirmed 2026-09-09)
- `design/proof/B-sciana-tabliczek.html` — dowód; `design/proof/index.html` — trzy kierunki obok siebie
- `DESIGN-SYSTEM.md` (stary) — **nieaktualny** od tej wersji; zostaje jako historia
- `CLAUDE.md` — blok „Kontrakt wizualny (CCUD)”
