import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regulamin — LAB",
  description: "Regulamin serwisu LAB - Lokalna Automatyzacja Biznesu.",
  robots: { index: false },
};

export default function RegulaminPage() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-[clamp(28px,4vw,42px)] font-bold tracking-[-1px] text-on-surface mb-8">
          Regulamin
        </h1>

        <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:font-heading prose-headings:tracking-tight">
          <h2>1. Postanowienia ogólne</h2>
          <p>
            Niniejszy regulamin określa zasady korzystania z serwisu
            internetowego lab-ai.pl prowadzonego przez LAB — Lokalna
            Automatyzacja Biznesu z siedzibą w Grudziądzu.
          </p>

          <h2>2. Usługi</h2>
          <p>
            Serwis prezentuje ofertę usług automatyzacji procesów biznesowych
            i rozwiązań AI. Szczegółowe warunki realizacji usług określa
            indywidualna umowa z klientem.
          </p>

          <h2>3. Formularz kontaktowy</h2>
          <p>
            Przesłanie formularza kontaktowego stanowi zapytanie ofertowe i nie
            zobowiązuje do zawarcia umowy. Odpowiedź na zapytanie następuje
            w ciągu 24 godzin roboczych.
          </p>

          <h2>4. Odpowiedzialność</h2>
          <p>
            Treści publikowane w serwisie mają charakter informacyjny. LAB
            dokłada starań, aby informacje były aktualne i rzetelne.
          </p>

          <h2>5. Postanowienia końcowe</h2>
          <p>
            Regulamin wchodzi w życie z dniem publikacji. W sprawach
            nieuregulowanych stosuje się przepisy prawa polskiego.
          </p>
        </div>
      </div>
    </section>
  );
}
