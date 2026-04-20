export interface Service {
  slug: string;
  icon: string;
  title: string;
  desc: string;
  tags: string[];
  longDesc?: string;
  benefits?: string[];
  useCases?: string[];
  ctaText?: string;
}

export const services: Service[] = [
  {
    slug: "automatyzacja-n8n",
    icon: "⚙️",
    title: "Automatyzacja procesów",
    tags: ["n8n", "API", "Webhook"],
    desc: "Workflow i integracje API eliminujące powtarzalną pracę.",
    longDesc:
      "Automatyzujemy powtarzalne procesy biznesowe używając n8n — open-source'owej platformy workflow z ponad 400 integracjami. Łączymy CRM, email, faktury, formularze i dowolne API w jeden spójny ekosystem.",
    benefits: [
      "Eliminacja ręcznego przepisywania danych między systemami",
      "Automatyczne powiadomienia i eskalacje",
      "Integracja z Google Workspace, Microsoft 365, systemami ERP",
      "Wizualne dashboardy statusu procesów",
    ],
    useCases: [
      "Automatyzacja wystawiania faktur po przyjęciu zamówienia",
      "Powiadomienia SMS do klientów po zmianie statusu dostawy",
      "Synchronizacja leadów z formularza www do CRM",
    ],
    ctaText: "Porozmawiaj o automatyzacji",
  },
  {
    slug: "chatboty-ai",
    icon: "💬",
    title: "Chatboty AI",
    tags: ["Flowise", "Typebot", "OpenAI"],
    desc: "Inteligentni asystenci na www obsługujący klientów 24/7.",
    longDesc:
      "Wdrażamy inteligentnych asystentów AI na stronach firmowych i w komunikatorach. Chatbot odpowiada na pytania klientów 24/7, kwalifikuje leady i przesyła zgłoszenia do właściwych osób.",
    benefits: [
      "Obsługa klientów poza godzinami pracy",
      "Baza wiedzy RAG na dokumentach firmy",
      "Integracja z Messenger, WhatsApp, widget www",
      "Statystyki rozmów i pytań klientów",
    ],
    useCases: [
      "Asystent rezerwacji dla gabinetu stomatologicznego",
      "Bot FAQ dla sklepu e-commerce",
      "Kwalifikator leadów dla biura nieruchomości",
    ],
    ctaText: "Zaprojektuj chatbota dla swojej firmy",
  },
  {
    slug: "agenci-glosowi",
    icon: "📞",
    title: "Agenci głosowi",
    tags: ["ElevenLabs", "Twilio", "STT/TTS"],
    desc: "Voiceboty obsługujące połączenia telefoniczne.",
    longDesc:
      "Tworzymy voiceboty obsługujące połączenia telefoniczne — od prostych odpowiedzi na FAQ po kompleksowe systemy umawiania wizyt i kwalifikacji klientów. Naturalny głos dzięki ElevenLabs.",
    benefits: [
      "Odbieranie połączeń 24/7 bez angażowania pracownika",
      "Naturalny, ludzki głos (ElevenLabs TTS)",
      "Integracja z kalendarzem i CRM",
      "Transkrypcja rozmów i raporty",
    ],
    useCases: [
      "Agent umawiający wizyty dla kliniki",
      "Potwierdzenia i przypomnienia o zamówieniach",
      "Automatyczna obsługa często zadawanych pytań przez telefon",
    ],
    ctaText: "Uruchom agenta głosowego",
  },
  {
    slug: "bazy-wiedzy-rag",
    icon: "🧠",
    title: "Bazy wiedzy RAG",
    tags: ["Pinecone", "Redis", "RAG"],
    desc: "Systemy odpowiedzi oparte na dokumentach firmy.",
  },
  {
    slug: "dashboardy-raporty",
    icon: "📊",
    title: "Dashboardy i raporty",
    tags: ["Notion API", "Sheets", "n8n"],
    desc: "Automatyczne raporty i KPI z rozproszonych danych.",
  },
  {
    slug: "integracje-systemow",
    icon: "🔗",
    title: "Integracje systemów",
    tags: ["REST API", "Webhook", "OAuth"],
    desc: "Łączymy CRM, ERP, e-commerce w jeden ekosystem.",
  },
];
