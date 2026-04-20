import type { Metadata } from "next";
import FaqPageClient from "./FaqPageClient";

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
  return <FaqPageClient />;
}
