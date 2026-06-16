import type { Metadata } from "next";
import SchemaOrg from "@/components/SchemaOrg";
import { generateFaqSchema, generateBreadcrumbSchema, graph } from "@/lib/schema";
import FaqPageClient from "./FaqPageClient";
import { faqData } from "./faq-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lok-ai.pl";

export const metadata: Metadata = {
  title: "FAQ — lok-ai | Najczęściej Zadawane Pytania",
  description:
    "Odpowiedzi na najczęściej zadawane pytania o automatyzację procesów, chatboty AI i wdrożenia lok-ai.",
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
};

export default function FaqPage() {
  return (
    <>
      <SchemaOrg
        schema={graph(
          generateFaqSchema(faqData),
          generateBreadcrumbSchema([
            { name: "Strona główna", url: "/" },
            { name: "FAQ", url: "/faq" },
          ]),
        )}
      />
      <FaqPageClient />
    </>
  );
}
