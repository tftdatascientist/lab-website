import type { Metadata } from "next";
import Tabliczka from "@/components/sciana/Tabliczka";
import KolumnaBoczna from "@/components/sciana/KolumnaBoczna";

export const metadata: Metadata = {
  title: "Regulamin — lok-ai",
  description: "Regulamin serwisu lok-ai — Lokalna Automatyzacja Biznesu.",
  robots: { index: false },
};

export default function RegulaminPage() {
  return (
    <>
      <Tabliczka nr="01" title="Regulamin serwisu" right="lok-ai.pl" footer="Obowiązuje od dnia publikacji" className="s-read">
        <h1 className="display" style={{ fontSize: "var(--step-3)", marginBottom: "var(--space-3)" }}>
          Regulamin
        </h1>
        <div className="prose prose-paper">
          <h2>1. Postanowienia ogólne</h2>
          <p>
            Niniejszy regulamin określa zasady korzystania z serwisu internetowego lok-ai.pl prowadzonego przez lok-ai —
            Lokalna Automatyzacja Biznesu z siedzibą w Grudziądzu.
          </p>

          <h2>2. Usługi</h2>
          <p>
            Serwis prezentuje ofertę usług automatyzacji procesów biznesowych i rozwiązań AI. Szczegółowe warunki
            realizacji usług określa indywidualna umowa z klientem.
          </p>

          <h2>3. Formularz kontaktowy</h2>
          <p>
            Przesłanie formularza kontaktowego stanowi zapytanie ofertowe i nie zobowiązuje do zawarcia umowy. Odpowiedź
            na zapytanie następuje w ciągu 24 godzin roboczych.
          </p>

          <h2>4. Odpowiedzialność</h2>
          <p>
            Treści publikowane w serwisie mają charakter informacyjny. lok-ai dokłada starań, aby informacje były
            aktualne i rzetelne.
          </p>

          <h2>5. Postanowienia końcowe</h2>
          <p>Regulamin wchodzi w życie z dniem publikacji. W sprawach nieuregulowanych stosuje się przepisy prawa polskiego.</p>
        </div>
      </Tabliczka>

      <KolumnaBoczna
        routes={[
          { from: "Zapytanie", to: "Bez zobowiązań", href: "/kontakt" },
          { from: "Twoje dane", to: "Polityka prywatności", href: "/polityka-prywatnosci" },
        ]}
        routesFooter="/kontakt · /polityka-prywatnosci"
      />
    </>
  );
}
