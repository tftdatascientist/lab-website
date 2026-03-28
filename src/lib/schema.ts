import type { Service } from "@/content/services";
import type { Post } from "@/lib/mdx";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lab-ai.pl";

const localBusiness = {
  "@type": "LocalBusiness",
  name: "LAB - Lokalna Automatyzacja Biznesu",
  description:
    "Automatyzacja procesów biznesowych i rozwiązania AI dla małych i średnich firm z regionu kujawsko-pomorskiego",
  url: SITE_URL,
  telephone: "+48-000-000-000",
  email: "kontakt@lab-ai.pl",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Grudziądz",
    addressRegion: "kujawsko-pomorskie",
    addressCountry: "PL",
  },
  areaServed: [
    { "@type": "City", name: "Grudziądz" },
    { "@type": "City", name: "Toruń" },
    { "@type": "City", name: "Bydgoszcz" },
    { "@type": "City", name: "Świecie" },
    { "@type": "City", name: "Chełmno" },
    { "@type": "City", name: "Wąbrzeźno" },
    { "@type": "City", name: "Inowrocław" },
    { "@type": "City", name: "Brodnica" },
  ],
};

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    ...localBusiness,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Usługi automatyzacji i AI",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automatyzacja procesów n8n" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Chatboty AI" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Agenci głosowi AI" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bazy wiedzy RAG" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dashboardy i raporty" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Integracje systemów API" } },
      ],
    },
  };
}

export function generateFaqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function generateServiceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.desc,
    provider: localBusiness,
    areaServed: {
      "@type": "State",
      name: "kujawsko-pomorskie",
    },
  };
}

export function generateArticleSchema(post: Post) {
  const org = {
    "@type": "Organization",
    name: "LAB - Lokalna Automatyzacja Biznesu",
  };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    datePublished: post.frontmatter.date,
    author: org,
    publisher: org,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };
}
