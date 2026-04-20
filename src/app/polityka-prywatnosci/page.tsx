import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka prywatności — lok-ai",
  description: "Polityka prywatności serwisu lok-ai — Lokalna Automatyzacja Biznesu.",
  robots: { index: false },
};

export default function PolitykaPrywatnosciPage() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-bold tracking-[-1px] text-on-surface mb-8">
          Polityka prywatności
        </h1>

        <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:font-heading prose-headings:tracking-tight">
          <h2>1. Administrator danych</h2>
          <p>
            Administratorem danych osobowych jest lok-ai — Lokalna Automatyzacja
            Biznesu z siedzibą w Grudziądzu, woj. kujawsko-pomorskie.
          </p>

          <h2>2. Zakres zbieranych danych</h2>
          <p>
            Zbieramy dane osobowe podane dobrowolnie w formularzu kontaktowym:
            imię, nazwa firmy, adres e-mail, numer telefonu oraz treść
            wiadomości.
          </p>

          <h2>3. Cel przetwarzania</h2>
          <p>
            Dane przetwarzane są w celu odpowiedzi na zapytanie, przygotowania
            oferty oraz realizacji usługi — na podstawie art. 6 ust. 1 lit. b
            i f RODO.
          </p>

          <h2>4. Okres przechowywania</h2>
          <p>
            Dane przechowujemy przez okres niezbędny do realizacji celu, nie
            dłużej niż 3 lata od ostatniego kontaktu.
          </p>

          <h2>5. Prawa użytkownika</h2>
          <p>
            Przysługuje Ci prawo dostępu do danych, ich sprostowania, usunięcia,
            ograniczenia przetwarzania oraz przenoszenia. Kontakt:
            kontakt@lok-ai.pl.
          </p>

          <h2>6. Pliki cookies</h2>
          <p>
            Strona wykorzystuje wyłącznie niezbędne pliki cookies techniczne.
            Nie stosujemy cookies marketingowych ani analitycznych firm trzecich.
          </p>
        </div>
      </div>
    </section>
  );
}
