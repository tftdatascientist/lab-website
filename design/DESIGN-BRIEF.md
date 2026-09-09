# DESIGN-BRIEF — lok-ai.pl

> Artefakt ETAP A (CCUD). Intencja, nie wygląd.
> Status: `confirmed` (bramka 1: 2026-09-09)
> Data: 2026-09-09
> Tryb: **redesign istniejącej strony** (Next.js 14, live na https://www.lok-ai.pl), nie budowa od zera.

Tagi proweniencji: `[UŻYTKOWNIK]` `[PRZETWORZONY]` `[WYGENEROWANY]` `[DO POTWIERDZENIA]`

---

## 0. Co zostaje, co się zmienia

`[UŻYTKOWNIK]` „chciałbym zachować charakter strony, ale podkreślić jej nowoczesność i poprawić
obecny design, paletę kolorów oraz funkcjonalność".

| Zostaje (charakter) | Idzie do zmiany |
|---|---|
| logo lok-ai (AniLogo, koło zębate + mapa Polski) | paleta kolorów (obecnie grafit + bursztyn/koral/piasek/rdza) |
| napięcie „tradycja × futuryzm", „żyj lokalnie, myśl globalnie" | układ stron i komponentów |
| cztery strumienie treści: wdrożenia · procesy (PCF, 1908 węzłów) · słownik · blog dzienny (123 wpisy) | funkcjonalność (co dokładnie — do ustalenia w ETAP C, patrz §7) |
| stack i SEO/LLM artefakty (`llms.txt`, Schema.org, sitemap ~2300 URL) | 123 ilustracje do wpisów (`news-illustrations`) — `[DO POTWIERDZENIA]` czy zostają w starej palecie |

## 0a. Przekaz marketingowy (oś całego designu)

`[UŻYTKOWNIK]` dosłownie:
> Połączenie lokalnego biznesu i sprawdzonych na świecie rozwiązań IT. **Lokalne problemy,
> globalne rozwiązania. Działamy lokalnie, myślimy globalnie.** Konwertujemy sprawdzone
> technologie informatyczne w proste rozwiązania oszczędzające czas i pieniądze. Technologia
> się zmienia i jaka by nie była, zawsze będzie tylko środkiem do celu.

Cztery twierdzenia, z których każde ma konsekwencję projektową `[PRZETWORZONY]`:

| Twierdzenie | Konsekwencja dla designu |
|---|---|
| lokalny biznes × sprawdzone na świecie IT | dwa bieguny w jednym kadrze: **miejsce** (Grudziądz, warsztat, biuro, region) i **świat** (technologia z dorobkiem). To ta sama oś, co „tradycja × futuryzm" z obecnego systemu, tylko nazwana przez problem, nie przez estetykę. |
| konwertujemy technologie w proste rozwiązania | lok-ai jest **konwerterem**: wejście = złożona technologia, wyjście = prosta rzecz oszczędzająca czas i pieniądze. Strona pokazuje wejście i wyjście, a nie narzędzia. |
| technologia jest tylko środkiem do celu | **żadnych pasków logotypów n8n / OpenAI / Make**, żadnych nazw modeli w nagłówkach. Narzędzie może się zmienić; strona mówi o problemie i wyniku. Nazwy narzędzi tylko w treści technicznej (słownik, procesy). |
| proste, oszczędzające czas i pieniądze | efekt policzalny i konkretny (godziny, złote, kroki procesu), ale **liczony z czegoś**, nie z licznika „400+". |

### Reguła nadrzędna: przekaz niesie FORMA, nie hasła

`[UŻYTKOWNIK]` „treść na razie jest drugorzędna; chcę, żeby strona emanowała swoją energią,
najlepiej żeby hasła były niepotrzebne do przekazania odbiorcy tego, co chcemy".

Konsekwencje `[PRZETWORZONY]`:
- **Test bez słów.** Proof screen w ETAP C musi przejść próbę z zamazanym tekstem: po zamianie
  całej prozy na lorem ipsum odbiorca nadal ma odczytać „lokalne × światowe" i „prosta rzecz
  z trudnej technologii". Jeśli wymaga hasła, kierunek przegrywa.
- Każde z czterech twierdzeń wyżej dostaje w ETAP B **mechanizm wizualny**, nie tekst: dwa
  bieguny = dwa materiały / dwa kroje / dwie skale w jednym kadrze; konwerter = widoczne
  wejście→wyjście w układzie; „środek do celu" = narzędzia nieobecne w warstwie brandowej.
- **Energia** jako cecha powierzchni: strona ma się ruszać albo wyglądać, jakby mogła — ale
  ruch to informacja (stan, przepływ, postęp), nie dekoracja. Godzi się to z emocją zakazaną
  (onieśmielenie) tylko wtedy, gdy energia jest **warsztatowa** (coś się dzieje, coś pracuje),
  nie **korporacyjna** (efekty dla efektów).
- Kolizja z treścią (§6, stack w tagach usług) **spada z blokera na dług**: design ma nieść
  przekaz sam, treść dojdzie później.

**Wcześniejsza wypowiedź** `[UŻYTKOWNIK]` „proste automatyzacje na lokalnych komputerach
i modelach lokalnych, kupowane razem ze sprzętem" jest **przykładem** tej konwersji (sprawdzony
model językowy → komputer w biurze klienta), nie całym pozycjonowaniem. §6 poprawiony pod to.

## 1. Dla kogo

**Jedna osoba, jedna sytuacja:** `[PRZETWORZONY]` `[DO POTWIERDZENIA]`
Właściciel lub menedżer firmy z regionu kujawsko-pomorskiego (10–50 osób). **Nie wchodzi przez
stronę główną.** Zadał pytanie ChatGPT / Perplexity / Google AI („jak zautomatyzować
wystawianie faktur", „co to jest RAG", „czy AI może działać bez chmury") i trafił z cytowania na
głęboką podstronę: wpis, proces, hasło słownika. Ma 2 minuty i jedno konkretne pytanie.
Urządzenie: 50/50 telefon i laptop — obie ścieżki równorzędne.

**Powód takiej persony:** `[UŻYTKOWNIK]` „Customers. Na razie pozycjonujemy pod LLMs" — strona
jest dziś budowana pod cytowanie przez modele językowe (dzienny blog, baza procesów, słownik,
`llms.txt`), a człowiek przychodzi w ślad za maszyną.

**Kto na pewno nie:** `[WYGENEROWANY]`
koledzy z branży no-code i freelancerzy szukający szablonów workflow · studenci piszący pracę
o AI · korporacje z Warszawy z działem IT i przetargiem · rekruterzy.

**Konsekwencje projektowe:**
- Każda podstrona jest **stroną wejściową**: musi sama nieść tożsamość (kto, skąd, co robi)
  i drogę do kontaktu, bez zakładania, że ktoś widział hero.
- Treść wyciągalna maszynowo = skanowalna ludzko: tabele, definicje, TL;DR, FAQ — to już jest
  (`TldrBox`, `KeyTakeaways`, `ArticleFaq`), redesign ma to wzmocnić, nie zamienić na kafle.
- Gęstość wysoka na stronach danych (procesy, słownik, lista wpisów), niska tylko tam, gdzie
  strona sprzedaje (wdrożenia, kontakt).
- Szybkość na telefonie ważniejsza niż efekty: `AuroraBg` i animowane logo w hero to koszt LCP
  (audyt SEO/perf z sierpnia: LCP bazowy ~3 s).

## 2. Po co powstaje

**Akcja docelowa:** `[PRZETWORZONY]` zapytanie przez formularz kontaktowy albo telefon po
przeczytaniu jednej głębokiej podstrony.

**Po czym poznamy sukces za pół roku:** `[PRZETWORZONY]`
lok-ai cytowane w odpowiedziach LLM na polskie pytania o automatyzację i lokalne AI dla firm
**oraz** zapytania kontaktowe od firm z regionu, nie od freelancerów.

**Co byłoby porażką mimo dobrych liczb:** `[UŻYTKOWNIK]` „unikatowa strona" — czyli porażką jest
strona, którą dałoby się podmienić na dowolną inną agencję AI bez straty. Ruch i leady nie
usprawiedliwiają wyglądu z szablonu.

## 3. Efekt pięciu sekund

**Ma pomyśleć:** `[UŻYTKOWNIK]` (potwierdzone „ok")
> „Oni to robią u siebie, na miejscu, i wiedzą więcej, niż ja zdążę spytać."

Uzupełnienie z przekazu (§0a) `[PRZETWORZONY]`: „…i nie próbują mi sprzedać technologii, tylko
rozwiązać mój problem".

**Nie ma pomyśleć:** `[UŻYTKOWNIK]` (potwierdzone „ok")
> „Kolejna agencja AI z szablonu, pewnie trzech chłopaków z laptopami."

## 4. Emocje

`[UŻYTKOWNIK]` podał: zaufanie, profesjonalizm, nowoczesność. To oceny, nie emocje — przekład
na odczucia `[PRZETWORZONY]` `[DO POTWIERDZENIA]`:

| # | Ocena | Odczucie | Skąd ma wynikać na stronie |
|---|---|---|---|
| 1 | zaufanie | **spokój z energią pod spodem**: „tu coś pracuje i wiedzą, co robią" | konkret zamiast obietnic: 1908 procesów, słownik, wpis każdego dnia, nazwiska, Grudziądz, fizyczny sprzęt |
| 2 | profesjonalizm | **pewność siebie bez tłumaczenia się** | precyzja siatki, dane pokazane, nie opisane; brak liczników „400+ integracji" |
| 3 | nowoczesność | **lekkie podekscytowanie**: „to już działa, nie za 5 lat" | żywe demo, ruch wyłącznie jako informacja (stan, postęp), nigdy jako ozdoba |

**Wariant zaufania:** `[WYGENEROWANY]` **chirurg z Grudziądza** (najlepszy w okolicy, pewny siebie,
nie tłumaczy się), nie notariusz (wszystko na miejscu, nic nie wystaje). Użytkownik nie
rozstrzygnął — `[DO POTWIERDZENIA]`.

**Emocja zakazana:** `[WYGENEROWANY]` **onieśmielenie** („to za mądre / za drogie dla mojej
firmy"). W tej kategorii to główny powód, dla którego właściciel MŚP zamyka kartę: strony
agencji AI mówią językiem inwestorów, nie warsztatu.

## 5. Rejestr

**Główny:** `brand / editorial` `[PRZETWORZONY]` — strona firmowa z treścią redakcyjną.

**Per sekcja** (mieszany):

| Sekcja | Rejestr | Powód |
|---|---|---|
| strona główna, `/wdrozenia`, `/o-nas`, `/kontakt` | brand / editorial | ma zostać w pamięci, sprzedaje |
| wpis blogowy, hasło słownika, strona procesu | editorial (czytanie) | to są strony wejściowe z LLM, muszą nieść markę |
| `/procesy` (drzewo + wyszukiwarka), `/slownik` (lista), `/blog` (indeks) | produkt / UI | narzędzia do przeszukiwania 1908 + 1201 + 123 pozycji, mają zniknąć w użyciu |
| `/demo` (chatbot) | produkt / UI | działa, nie opowiada |

**Domyślne pokrętła dla rejestru:** `[WYGENEROWANY]` `[DO POTWIERDZENIA]` VARIANCE 8 / MOTION 6 / DENSITY 6
(„strona ma emanować energią" i „hasła niepotrzebne" podnoszą wariancję i ruch; sufit ruchu
wyznacza LCP na telefonie, więc ruch po pierwszym renderze, nigdy w krytycznej ścieżce).

**„Nowoczesność" jako mechanizm:** `[WYGENEROWANY]` `[DO POTWIERDZENIA]` rejestr Linear/Vercel
(ciemne lub bardzo ciemne tło, ostra siatka, jeden precyzyjny akcent, zero gradientowych
poświat), nie Stripe/Notion (jasno, powietrze, miękkie ilustracje). Wybrane dlatego, że jest
spójne z zachowanym grafitem i logo. Użytkownik nie odpowiedział na to pytanie.

## 6. Od czego się odróżniamy

**Pozycjonowanie, które ma nieść odróżnialność:** `[UŻYTKOWNIK]` (§0a)
**Konwerter między światem a miejscem.** Sprawdzona na świecie technologia wchodzi, prosta
lokalna rzecz oszczędzająca czas i pieniądze wychodzi. Technologia jest wymienna i drugorzędna;
stałe są problem klienta i miejsce, w którym działa. Przykład tej konwersji
`[UŻYTKOWNIK]`: proste automatyzacje na lokalnych komputerach i modelach lokalnych, sprzedawane
razem ze sprzętem — AI, które fizycznie stoi w firmie klienta.

Konkurencja robi odwrotnie: sprzedaje **technologię** (pasek logo n8n/Make/OpenAI, nazwy modeli
w hero) i **abstrakcyjną oszczędność** („skaluj bez zatrudniania"). Nikt nie sprzedaje
**miejsca** ani nie traktuje narzędzia jako wymiennego.

⚠️ **Dług, nie bloker** (decyzja `[UŻYTKOWNIK]`: „treść na razie drugorzędna"). **Obecna strona mówi językiem narzędzi.** `services.ts` ma w tagach
n8n, Flowise, Typebot, OpenAI, ElevenLabs, a stack jest wypisany na `/o-nas`. To wprost kłóci
się z „technologia to tylko środek". Treść oferty przepisze się od problemu
i wyniku później (zakres WCS2 `BRIEF.md`); do tego czasu design ma nieść przekaz sam, a paski
narzędzi i tagi stacku po prostu **znikają z warstwy brandowej** w ETAP2.

**Anty-referencje — nazwane** (research 2026-09-09, 3 strony z kategorii + strona własna):

| Strona | Co u nich jest domyślnikiem | Czego nie powtarzamy |
|---|---|---|
| `agisona.pl` | ciemne tło + neonowe logo, kafle usług, liczniki „85%", „3x", „0+ h", dwaj founderzy w dwóch kolumnach, miniatury YouTube | liczników bez źródła, neonu, „skaluj sprzedaż bez zatrudniania" |
| `tantor.pl` | ciemny motyw z pomarańczowym CTA, 6 kafli usług z **emoji** jako ikonami, paski logotypów integracji, tabela 3 planów (środkowy „popularny"), „oblicz swoją stratę" | emoji jako ikon, pasków logo, trzech planów cenowych, straszenia stratą |
| `dataone.pl` (serwery AI on-prem) | jasne tło, 3 kafle sprzętu Starter/Business/Enterprise ze specyfikacją, tabela chmura vs on-prem z ✓/✗, zdjęcie racka jako placeholder | kafli „tierów", sprzętu jako listy parametrów zamiast przedmiotu |
| **`lok-ai.pl` dziś** | ciemny grafit + bursztyn/koral, `AuroraBg` (gradientowa poświata), 4 liczniki w hero („400+ integracji", „<48h wdrożenie", „0 zł konsultacja"), pasek tickera z newsami, kafle usług z emoji ⚙️💬📞🧠, badge „Nowa era · kwiecień 2026" | **wszystkiego z tej listy** — obecna strona jest medianą kategorii |

**Wspólny mianownik wizualny kategorii:**
Ciemne tło z jednym ciepłym lub neonowym akcentem, hero z obietnicą („skaluj", „przestań
tracić czas") i dwoma przyciskami, pod nim rząd liczników bez źródła, kafle usług z ikoną
w kółku albo emoji, pasek logotypów narzędzi (n8n, Make, OpenAI), founder na zdjęciu, trzy
plany cenowe. Wszystko sprzedaje **abstrakcyjną oszczędność czasu** i **chmurę**, której nie
widać. Nikt nie pokazuje **miejsca** ani **przedmiotu**.

**Wymiary, w których lok-ai ma być odróżnialne** (to sprawdzi swap test w ETAP C):
1. **Dwa bieguny w jednym kadrze** — miejsce (region, biuro, sprzęt na stole) i świat (dorobek
   technologii) obok siebie; agencja chmurowa ma tylko drugi biegun.
2. **Wejście → wyjście zamiast narzędzi** — strona pokazuje problem i wynik, nie logotypy;
   zdjęcie paska logo z każdej strony w kategorii to test, czy przekaz jest wykonany.
3. **Dowód zamiast licznika** — 1908 procesów, 1201 haseł, wpis dziennie, fizyczny sprzęt: rzeczy,
   które istnieją i można kliknąć albo dotknąć, zamiast „400+ integracji".
4. **Lokalność jako precyzja, nie folklor** — Grudziądz/Toruń/Bydgoszcz jako współrzędne, mapa
   jako instrument, nie ozdoba z konturem Polski w tle.

## 7. Ograniczenia twarde

- **Logo i motyw** (koło zębate + mapa Polski, AniLogo) zostają — `[UŻYTKOWNIK]`.
- **Stack**: Next.js 14 + Tailwind, tokeny w `tailwind.config.ts`; deploy Vercel z `main`.
- **Chronione artefakty SEO/LLM**: `app/sitemap.ts`, `app/robots.ts`, `public/llms.txt`,
  `lib/schema.ts` — redesign ich nie rusza.
- **Treść**: 123 wpisy MDX, 1908 procesów, 1201 haseł — układ musi je udźwignąć bez przepisywania.
- **Wydajność**: LCP na telefonie poniżej 2,5 s; audyt sierpniowy zdjął LCP `/portfolio`
  z 22 s do 3,3 s, redesign nie może tego cofnąć.
- **Dostępność**: kontrast tekstu ≥ 4,5:1, akcent na CTA ≥ 3:1.
- `[DO POTWIERDZENIA]` **„funkcjonalność do poprawy"** — użytkownik nie sprecyzował. Domysł:
  wyszukiwarka procesów i słownika, nawigacja mobilna, formularz kontaktowy, demo chatbota.
  Lista konkretów należy do `BRIEF.md` WCS2, nie do tego pliku.

---

## Do potwierdzenia w bramce

- [ ] §0: 123 ilustracje do wpisów — zostają w starej palecie czy idą do przeróbki?
- [ ] §1: persona — właściciel/menedżer MŚP wchodzący z LLM na głęboką podstronę, 2 minuty, 50/50 telefon/laptop
- [ ] §4: zaufanie „chirurga" (pewny siebie), nie „notariusza" (bezpieczny); emocja zakazana = onieśmielenie
- [ ] §5: „nowoczesność" = rejestr Linear/Vercel (ciemno, ostro), nie Stripe/Notion (jasno, miękko)
- [ ] §0a: reguła nadrzędna — przekaz niesie forma, test bez słów w ETAP C; treść oferty = dług, nie bloker
- [ ] §5: pokrętła VARIANCE 8 / MOTION 6 / DENSITY 6
- [ ] §7: co konkretnie znaczy „poprawić funkcjonalność"

## Powiązania

- `BRIEF.md` (WCS2) — nie istnieje; treść i strukturę serwisu niesie dziś `ARCHITECTURE.md` + `content/`
- `DESIGN-SYSTEM.md` — obecny system (grafit + ciepła paleta), kandydat do zastąpienia przez `design/DESIGN.md`
- `PRODUCT.md` (Impeccable) — nie wygenerowany, Impeccable niezainstalowany
- Następny artefakt: `design/REFERENCE.md`
