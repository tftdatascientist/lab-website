export interface Service {
  slug: string;
  icon: string;
  title: string;
  desc: string;
  tags: string[];
}

export const services: Service[] = [
  {
    slug: "automatyzacja-n8n",
    icon: "⚙️",
    title: "Automatyzacja procesów",
    tags: ["n8n", "API", "Webhook"],
    desc: "Workflow i integracje API eliminujące powtarzalną pracę.",
  },
  {
    slug: "chatboty-ai",
    icon: "💬",
    title: "Chatboty AI",
    tags: ["Flowise", "Typebot", "OpenAI"],
    desc: "Inteligentni asystenci na www obsługujący klientów 24/7.",
  },
  {
    slug: "agenci-glosowi",
    icon: "📞",
    title: "Agenci głosowi",
    tags: ["ElevenLabs", "Twilio", "STT/TTS"],
    desc: "Voiceboty obsługujące połączenia telefoniczne.",
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
