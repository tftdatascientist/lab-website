"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Lock,
  Code,
  History,
  Plus,
  Minus,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface FaqItem {
  protocol: string;
  title: string;
  content: React.ReactNode;
}

const categories = [
  { label: "System", icon: ChevronRight, active: true },
  { label: "Bezpieczeństwo", icon: Lock, active: false },
  { label: "API i Integracje", icon: Code, active: false },
  { label: "Wsparcie", icon: History, active: false },
];

const faqItems: FaqItem[] = [
  {
    protocol: "Protokół 01",
    title: "Czas wdrożenia",
    content: (
      <>
        <p className="text-on-surface-variant leading-relaxed max-w-4xl">
          Standardowe wdrożenia LAB trwają 7-14 dni. Każdy projekt przechodzi
          przez trzy precyzyjnie zaplanowane fazy.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-surface-container rounded-lg">
            <p className="font-mono text-secondary text-xs mb-2">Faza 01</p>
            <p className="text-sm font-bold text-on-surface">
              Analiza procesów
            </p>
            <p className="text-xs text-on-surface-variant mt-1">
              48-72 godziny
            </p>
          </div>
          <div className="p-4 bg-surface-container rounded-lg">
            <p className="font-mono text-secondary text-xs mb-2">Faza 02</p>
            <p className="text-sm font-bold text-on-surface">
              Konfiguracja automatyzacji
            </p>
            <p className="text-xs text-on-surface-variant mt-1">96 godzin</p>
          </div>
          <div className="p-4 bg-surface-container rounded-lg">
            <p className="font-mono text-secondary text-xs mb-2">Faza 03</p>
            <p className="text-sm font-bold text-on-surface">
              Testy i uruchomienie
            </p>
            <p className="text-xs text-on-surface-variant mt-1">24 godziny</p>
          </div>
        </div>
      </>
    ),
  },
  {
    protocol: "Protokół 02",
    title: "Model cenowy",
    content: (
      <p className="text-on-surface-variant leading-relaxed max-w-4xl">
        LAB oferuje elastyczny model cenowy. Darmowa konsultacja na start.
        Wdrożenia od{" "}
        <span className="text-secondary font-mono">0 zł</span> (w ramach
        grantów) do indywidualnej wyceny. Każdy projekt wyceniamy osobno,
        uwzględniając złożoność procesów i zakres integracji.
        <br />
        <br />
        Nie stosujemy ryczałtowych opłat licencyjnych. Płacisz za realne
        wdrożenie i utrzymanie — bez ukrytych kosztów.
      </p>
    ),
  },
  {
    protocol: "Protokół 03",
    title: "Bezpieczeństwo danych i AI",
    content: (
      <p className="text-on-surface-variant leading-relaxed max-w-4xl">
        Stosujemy szyfrowanie end-to-end, lokalne instancje modeli AI oraz
        pełną zgodność z RODO. Twoje dane nigdy nie opuszczają Twojej
        infrastruktury bez jawnej autoryzacji.
        <br />
        <br />
        Każde wdrożenie przechodzi audyt bezpieczeństwa. Monitorujemy modele
        pod kątem halucynacji i wycieków danych wrażliwych.
      </p>
    ),
  },
  {
    protocol: "Protokół 04",
    title: "Integracja z istniejącymi systemami",
    content: (
      <p className="text-on-surface-variant leading-relaxed max-w-4xl">
        Integrujemy się z popularnymi narzędziami:{" "}
        <span className="text-secondary font-mono">CRM</span>,{" "}
        <span className="text-secondary font-mono">ERP</span>, Google
        Workspace, Microsoft 365, systemy księgowe i wiele innych. Ponad{" "}
        <span className="text-secondary font-mono">400</span> gotowych
        integracji API dzięki platformie n8n.
        <br />
        <br />
        Wspieramy również dedykowane systemy legacy — jeśli system ma API lub
        bazę danych, możemy się z nim połączyć.
      </p>
    ),
  },
  {
    protocol: "Protokół 05",
    title: "Wsparcie po wdrożeniu",
    content: (
      <p className="text-on-surface-variant leading-relaxed max-w-4xl">
        Zapewniamy pełne wsparcie techniczne po wdrożeniu. Monitoring 24/7,
        szybkie reagowanie na problemy, regularne aktualizacje.
        <br />
        <br />
        Otrzymujesz dokumentację, szkolenie zespołu i dedykowany kanał
        kontaktu. Nie zostawiamy klientów po zakończeniu projektu.
      </p>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FaqPageClient() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* ---- Header ---- */}
      <header className="pt-16 md:pt-20 mb-20 text-center md:text-left">
        <div className="inline-block mb-4 px-3 py-1 bg-surface-container-highest rounded-full">
          <span className="font-mono text-secondary text-[10px] uppercase tracking-[0.2em]">
            Dokumentacja / Baza Wiedzy
          </span>
        </div>
        <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-on-surface mb-6">
          Najczęściej Zadawane
          <br />
          Pytania
        </h1>
        <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed font-body">
          Odpowiedzi na pytania o automatyzację procesów, chatboty AI,
          bezpieczeństwo i&nbsp;integracje. Przygotowane z myślą
          o&nbsp;przejrzystości.
        </p>
      </header>

      {/* ---- Bento 12-col grid ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left sidebar -- categories */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="p-6 bg-surface-low rounded-xl ghost-border">
            <h3 className="font-heading text-lg font-bold mb-6 text-on-surface">
              Kategorie
            </h3>
            <nav className="space-y-2" aria-label="Kategorie FAQ">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.label}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center justify-between transition-all ${
                      cat.active
                        ? "bg-surface-container text-primary"
                        : "hover:bg-surface-container-high text-on-surface-variant"
                    }`}
                  >
                    {cat.label}
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Status image card */}
          <div className="relative overflow-hidden rounded-xl h-64 bg-surface-low group ghost-border">
            <Image
              src="/images/stitch/faq-crystal.jpg"
              alt="Abstrakcyjna krystaliczna struktura 3D w fioletowo-szmaragdowym świetle"
              fill
              className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="font-mono text-[10px] text-secondary uppercase tracking-widest mb-1">
                Status systemu
              </p>
              <p className="font-heading font-bold text-on-surface">
                Wszystkie systemy operacyjne
              </p>
            </div>
          </div>
        </aside>

        {/* Right content -- accordion */}
        <section className="lg:col-span-9 space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            /* Protocol 02 (Model cenowy) gets accent left border */
            const isAccented = index === 1;

            return (
              <div
                key={index}
                className={`rounded-xl overflow-hidden transition-all duration-300 ghost-border ${
                  isAccented
                    ? "bg-surface-container border-l-4 border-primary/20"
                    : "bg-surface-low group"
                }`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className={`w-full p-8 flex items-start justify-between text-left transition-colors ${
                    !isAccented ? "hover:bg-surface-container" : ""
                  }`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-primary-container uppercase tracking-widest">
                      {item.protocol}
                    </span>
                    <h2
                      className={`font-heading text-2xl font-medium text-on-surface transition-colors ${
                        !isAccented ? "group-hover:text-primary" : ""
                      }`}
                    >
                      {item.title}
                    </h2>
                  </div>
                  {isOpen ? (
                    <Minus className="w-7 h-7 text-on-surface-variant shrink-0" />
                  ) : (
                    <Plus className="w-7 h-7 text-primary shrink-0" />
                  )}
                </button>

                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-heading-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "max-h-[600px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div
                    className={`px-8 pb-8 ${
                      isOpen ? "border-t border-outline-variant/10 pt-4" : ""
                    }`}
                  >
                    {item.content}
                  </div>
                </div>
              </div>
            );
          })}

          {/* ---- CTA Bar ---- */}
          <div className="mt-12 p-8 bg-surface-container-highest rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 ghost-border">
            <div>
              <h3 className="font-heading text-xl font-bold text-on-surface flex items-center gap-2">
                <Zap className="w-5 h-5 text-secondary" />
                Masz więcej pytań technicznych?
              </h3>
              <p className="text-on-surface-variant text-sm mt-1">
                Nasi inżynierowie są dostępni na szczegółowe konsultacje.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/blog"
                className="px-6 py-3 bg-surface-low text-on-surface font-mono text-xs uppercase tracking-widest hover:bg-surface-bright transition-colors rounded-lg ghost-border"
              >
                Dokumentacja
              </Link>
              <Link
                href="/kontakt"
                className="px-6 py-3 obsidian-gradient text-on-primary font-bold text-sm rounded-lg hover:opacity-90 transition-opacity"
              >
                Skontaktuj się
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
