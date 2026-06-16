"use client";

import { useState } from "react";
import Link from "next/link";
import { faqData } from "./faq-data";

interface FaqItem {
  protocol: string;
  title: string;
  content: React.ReactNode;
}

const faqContent: { protocol: string; content: React.ReactNode }[] = [
  {
    protocol: "Protokół 01",
    content: (
      <>
        <p className="text-text-dim leading-relaxed max-w-4xl text-[15px]">
          Standardowe wdrożenia lok-ai trwają 7–14 dni. Każdy projekt przechodzi
          przez trzy precyzyjnie zaplanowane fazy.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Faza 01", title: "Analiza procesów", time: "48–72 godziny" },
            { label: "Faza 02", title: "Konfiguracja automatyzacji", time: "96 godzin" },
            { label: "Faza 03", title: "Testy i uruchomienie", time: "24 godziny" },
          ].map((f) => (
            <div
              key={f.label}
              className="p-4 rounded-[10px]"
              style={{
                background: "#1f2125",
                outline: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p
                className="font-mono text-[10px] uppercase mb-2"
                style={{ color: "#f5b845", letterSpacing: "0.12em" }}
              >
                {f.label}
              </p>
              <p className="text-[13px] font-bold text-text">{f.title}</p>
              <p className="text-[12px] text-text-mute mt-1">{f.time}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    protocol: "Protokół 02",
    content: (
      <p className="text-text-dim leading-relaxed max-w-4xl text-[15px]">
        lok-ai oferuje elastyczny model cenowy. Darmowa konsultacja na start.
        Wdrożenia od{" "}
        <span className="font-mono" style={{ color: "#f5b845" }}>
          0 zł
        </span>{" "}
        (w ramach grantów) do indywidualnej wyceny. Każdy projekt wyceniamy osobno,
        uwzględniając złożoność procesów i zakres integracji.
        <br />
        <br />
        Nie stosujemy ryczałtowych opłat licencyjnych. Płacisz za realne wdrożenie
        i utrzymanie — bez ukrytych kosztów.
      </p>
    ),
  },
  {
    protocol: "Protokół 03",
    content: (
      <p className="text-text-dim leading-relaxed max-w-4xl text-[15px]">
        Stosujemy szyfrowanie end-to-end, lokalne instancje modeli AI oraz pełną
        zgodność z RODO. Twoje dane nigdy nie opuszczają Twojej infrastruktury
        bez jawnej autoryzacji.
        <br />
        <br />
        Każde wdrożenie przechodzi audyt bezpieczeństwa. Monitorujemy modele pod
        kątem halucynacji i wycieków danych wrażliwych.
      </p>
    ),
  },
  {
    protocol: "Protokół 04",
    content: (
      <p className="text-text-dim leading-relaxed max-w-4xl text-[15px]">
        Integrujemy się z popularnymi narzędziami:{" "}
        <span className="font-mono" style={{ color: "#f5b845" }}>
          CRM
        </span>
        ,{" "}
        <span className="font-mono" style={{ color: "#f5b845" }}>
          ERP
        </span>
        , Google Workspace, Microsoft 365, systemy księgowe i wiele innych. Ponad{" "}
        <span className="font-mono" style={{ color: "#f5b845" }}>
          400
        </span>{" "}
        gotowych integracji API dzięki platformie n8n.
        <br />
        <br />
        Wspieramy również dedykowane systemy legacy — jeśli system ma API lub bazę
        danych, możemy się z nim połączyć.
      </p>
    ),
  },
  {
    protocol: "Protokół 05",
    content: (
      <p className="text-text-dim leading-relaxed max-w-4xl text-[15px]">
        Zapewniamy pełne wsparcie techniczne po wdrożeniu. Monitoring 24/7, szybkie
        reagowanie na problemy, regularne aktualizacje.
        <br />
        <br />
        Otrzymujesz dokumentację, szkolenie zespołu i dedykowany kanał kontaktu. Nie
        zostawiamy klientów po zakończeniu projektu.
      </p>
    ),
  },
  {
    protocol: "Protokół 06",
    content: (
      <p className="text-text-dim leading-relaxed max-w-4xl text-[15px]">
        Specjalizujemy się w małych i średnich firmach z województwa
        kujawsko-pomorskiego — Grudziądz, Toruń, Bydgoszcz, Świecie, Chełmno,
        Wąbrzeźno i okolice.
        <br />
        <br />
        Obsługujemy firmy z każdej branży: handel, usługi, gabinety medyczne
        i kosmetyczne, biura rachunkowe, sklepy e-commerce, warsztaty, agencje
        nieruchomości. Jeśli masz powtarzalne procesy — możemy je zautomatyzować.
      </p>
    ),
  },
  {
    protocol: "Protokół 07",
    content: (
      <p className="text-text-dim leading-relaxed max-w-4xl text-[15px]">
        Nie. Nasze wdrożenia są &ldquo;done-for-you&rdquo; — zajmujemy się całą
        stroną techniczną. Jedyne czego potrzebujesz to dostęp do używanych
        narzędzi (email, CRM, kalendarz, system rezerwacji).
        <br />
        <br />
        Po zakończeniu wdrożenia przeprowadzamy szkolenie (zazwyczaj 2 godziny),
        żebyś mógł samodzielnie monitorować automatyzacje. Codzienne korzystanie
        nie wymaga wiedzy technicznej.
      </p>
    ),
  },
  {
    protocol: "Protokół 08",
    content: (
      <p className="text-text-dim leading-relaxed max-w-4xl text-[15px]">
        Po wdrożeniu otrzymujesz kompletną dokumentację projektu i szkolenie dla
        Twojego zespołu. Przez pierwsze 30 dni zapewniamy bezpłatne wsparcie
        techniczne.
        <br />
        <br />
        Opcjonalnie oferujemy stały monitoring i utrzymanie automatyzacji w ramach
        umowy serwisowej. Monitorujemy workflow, aktualizujemy integracje po
        zmianach API dostawców i reagujemy na incydenty.
      </p>
    ),
  },
];

// Tytuły pochodzą z faq-data.ts (jedno źródło prawdy dla schematu JSON-LD i UI).
const faqItems: FaqItem[] = faqContent.map((c, i) => ({
  protocol: c.protocol,
  title: faqData[i].question,
  content: c.content,
}));

export default function FaqPageClient() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="py-[100px] px-8 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="max-w-[720px] mb-14">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-px" style={{ background: "#f5b845" }} />
          <span
            className="font-mono text-[11px] uppercase"
            style={{ color: "#f5b845", letterSpacing: "0.15em" }}
          >
            Pytania i odpowiedzi
          </span>
        </div>
        <h1
          className="font-heading font-bold text-text mb-4"
          style={{
            fontSize: "clamp(32px,4.5vw,56px)",
            letterSpacing: "-0.035em",
            lineHeight: 1,
          }}
        >
          Najczęściej{" "}
          <span
            className="font-display font-medium italic"
            style={{ color: "#f5b845" }}
          >
            zadawane
          </span>{" "}
          pytania
        </h1>
        <p className="text-[16px] text-text-dim leading-relaxed">
          Odpowiedzi na pytania o automatyzację procesów, chatboty AI,
          bezpieczeństwo i&nbsp;integracje.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-3 mb-14">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-[14px] overflow-hidden transition-all duration-200"
              style={{
                background: "#17181b",
                outline: isOpen
                  ? "1px solid rgba(245,184,69,0.25)"
                  : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="w-full p-7 flex items-start justify-between text-left"
                aria-expanded={isOpen}
              >
                <div>
                  <span
                    className="font-mono text-[10px] uppercase block mb-1"
                    style={{ color: "#f5b845", letterSpacing: "0.12em" }}
                  >
                    {item.protocol}
                  </span>
                  <h2
                    className="font-heading font-semibold text-text"
                    style={{ fontSize: 20, letterSpacing: "-0.02em" }}
                  >
                    {item.title}
                  </h2>
                </div>
                <span
                  className="text-text-dim text-2xl shrink-0 ml-6 transition-transform duration-200"
                  style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                >
                  +
                </span>
              </button>

              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: isOpen ? 600 : 0, opacity: isOpen ? 1 : 0 }}
              >
                <div
                  className="px-7 pb-7 pt-0"
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: 16,
                  }}
                >
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div
        className="rounded-[16px] p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        style={{
          background: "#17181b",
          outline: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div>
          <h3
            className="font-heading font-bold text-text mb-1"
            style={{ fontSize: 18 }}
          >
            Masz więcej pytań?
          </h3>
          <p className="text-[14px] text-text-dim">
            Nasz zespół chętnie odpowie na szczegółowe pytania.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link
            href="/blog"
            className="font-mono text-[12px] uppercase text-text-dim hover:text-text transition-colors rounded-[10px] px-5 py-3"
            style={{
              letterSpacing: "0.1em",
              background: "#1f2125",
              outline: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            Blog
          </Link>
          <Link
            href="/kontakt"
            className="btn-primary inline-flex items-center gap-2 rounded-[10px] text-[14px]"
            style={{ padding: "12px 20px" }}
          >
            Skontaktuj się →
          </Link>
        </div>
      </div>
    </div>
  );
}
