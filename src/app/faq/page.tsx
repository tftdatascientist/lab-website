import type { Metadata } from "next";
import FaqPageClient from "./FaqPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lab-ai.pl";

export const metadata: Metadata = {
  title: "FAQ — LAB | Najczęściej Zadawane Pytania",
  description:
    "Odpowiedzi na najczęściej zadawane pytania o automatyzację procesów, chatboty AI i wdrożenia LAB.",
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
};

export default function FaqPage() {
  return <FaqPageClient />;
}
