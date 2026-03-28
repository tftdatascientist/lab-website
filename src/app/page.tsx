import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ProcessSteps from "@/components/ProcessSteps";
import TechStack from "@/components/TechStack";
import ChatbotDemo from "@/components/ChatbotDemo";
import BlogPreview from "@/components/BlogPreview";
import GeoGrid from "@/components/GeoGrid";
import FaqAccordion from "@/components/FaqAccordion";
import CtaSection from "@/components/CtaSection";
import ScrollReveal from "@/components/ScrollReveal";
import SchemaOrg from "@/components/SchemaOrg";
import { generateFaqSchema } from "@/lib/schema";

const faqItems = [
  {
    question: "Czy automatyzacja sprawdzi się w mojej małej firmie?",
    answer:
      "Tak! Automatyzacja najlepiej działa właśnie w małych firmach, gdzie każda zaoszczędzona godzina ma realne znaczenie. Zaczynamy od prostych workflow i rozwijamy w miarę potrzeb.",
  },
  {
    question: "Ile trwa wdrożenie chatbota AI?",
    answer:
      "Prosty chatbot FAQ wdrażamy w 2–3 dni. Chatbot z bazą wiedzy RAG to 5–7 dni roboczych. Złożone rozwiązania z integracjami CRM/ERP — do 2 tygodni.",
  },
  {
    question: "Czy muszę mieć wiedzę techniczną?",
    answer:
      "Nie. Nasze rozwiązania są low-code/no-code — konfigurujemy wszystko za Ciebie. Po wdrożeniu otrzymujesz przeszkolenie i dokumentację.",
  },
  {
    question: "Dlaczego lokalna firma, a nie agencja z Warszawy?",
    answer:
      "Znamy lokalny rynek i specyfikę firm z regionu kujawsko-pomorskiego. Jesteśmy dostępni na spotkania na żywo, reagujemy szybciej i oferujemy ceny dopasowane do budżetów MŚP.",
  },
];

export default function Home() {
  return (
    <>
      <SchemaOrg schema={generateFaqSchema(faqItems)} />
      <Hero />
      <ScrollReveal>
        <Services />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <ProcessSteps />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <TechStack />
      </ScrollReveal>
      <ScrollReveal>
        <ChatbotDemo />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <BlogPreview />
      </ScrollReveal>
      <ScrollReveal>
        <GeoGrid />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <FaqAccordion />
      </ScrollReveal>
      <ScrollReveal>
        <CtaSection />
      </ScrollReveal>
    </>
  );
}
