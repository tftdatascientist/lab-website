import type { Service } from "@/content/services";
import type { Post } from "@/lib/mdx";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";
const LOGO_URL = `${SITE_URL}/favicon.svg`;
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// ── Wspólne encje (z @id do grafu encji — kluczowe dla LLM/Google) ──────────
const localBusiness = {
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "@id": ORG_ID,
  name: "lok-ai — Lokalna Automatyzacja Biznesu",
  description:
    "Automatyzacja procesów biznesowych i rozwiązania AI dla małych i średnich firm z regionu kujawsko-pomorskiego",
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: LOGO_URL },
  image: LOGO_URL,
  telephone: "+48-534-541-454",
  email: "kontakt@lok-ai.pl",
  priceRange: "$$",
  knowsLanguage: ["pl", "en"],
  slogan: "Żyj lokalnie, myśl globalnie — polskie wartości + AI",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Grudziądz",
    addressRegion: "kujawsko-pomorskie",
    addressCountry: "PL",
  },
  knowsAbout: [
    "automatyzacja procesów biznesowych",
    "chatboty AI",
    "agenci głosowi AI",
    "n8n",
    "integracje API",
    "sztuczna inteligencja dla MŚP",
    "RAG",
    "Process Classification Framework",
  ],
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

const orgRef = { "@type": "Organization", "@id": ORG_ID, name: localBusiness.name };

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

/** WebSite + SearchAction — sitelinks searchbox i jasna tożsamość serwisu dla LLM. */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "lok-ai — Lokalna Automatyzacja Biznesu",
    inLanguage: "pl-PL",
    publisher: orgRef,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/slownik?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
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
    provider: orgRef,
    areaServed: { "@type": "State", name: "kujawsko-pomorskie" },
  };
}

/** Wzbogacony Article — dateModified, autor, obraz, sekcja, język, wordCount. */
export function generateArticleSchema(post: Post, basePath: string = "blog") {
  const fm = post.frontmatter as unknown as Record<string, unknown>;
  const url = `${SITE_URL}/${basePath}/${post.slug}`;
  const image = (fm.image as string) || (fm.cover as string) || undefined;
  const section = (fm.section as string) || (Array.isArray(fm.tags) ? (fm.tags as string[])[0] : undefined);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: (fm.excerpt as string) || (fm.description as string),
    datePublished: post.frontmatter.date,
    dateModified: (fm.dateModified as string) || post.frontmatter.date,
    inLanguage: "pl-PL",
    author: orgRef,
    publisher: { ...orgRef, logo: { "@type": "ImageObject", url: LOGO_URL } },
    image: image ? `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image}` : LOGO_URL,
    articleSection: section,
    isAccessibleForFree: true,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
}

/** BreadcrumbList — ścieżka nawigacji; element bazowy każdej podstrony. */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  const last = items[items.length - 1];
  const idBase = last ? (last.url.startsWith("http") ? last.url : `${SITE_URL}${last.url}`) : SITE_URL;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${idBase}#breadcrumb`,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${SITE_URL}${it.url}`,
    })),
  };
}

/** ItemList — listy/kolekcje (kategorie procesów, indeksy). */
export function generateItemListSchema(
  name: string,
  items: { name: string; url: string }[],
  description?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: it.url.startsWith("http") ? it.url : `${SITE_URL}${it.url}`,
    })),
  };
}

/** DefinedTermSet — słownik, taksonomia procesów. */
export function generateDefinedTermSetSchema(opts: {
  name: string;
  description: string;
  url: string;
  terms: { name: string; url: string; description?: string }[];
}) {
  const setUrl = opts.url.startsWith("http") ? opts.url : `${SITE_URL}${opts.url}`;
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${setUrl}#termset`,
    name: opts.name,
    description: opts.description,
    url: setUrl,
    inLanguage: "pl-PL",
    hasDefinedTerm: opts.terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.name,
      description: t.description,
      url: t.url.startsWith("http") ? t.url : `${SITE_URL}${t.url}`,
    })),
  };
}

/** DefinedTerm — pojedyncze hasło/element taksonomii. */
export function generateDefinedTermSchema(opts: {
  name: string;
  description: string;
  url: string;
  inSetUrl: string;
  termCode?: string;
  alternateName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: opts.name,
    description: opts.description,
    alternateName: opts.alternateName,
    termCode: opts.termCode,
    inLanguage: "pl-PL",
    url: opts.url.startsWith("http") ? opts.url : `${SITE_URL}${opts.url}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      "@id": `${opts.inSetUrl.startsWith("http") ? opts.inSetUrl : `${SITE_URL}${opts.inSetUrl}`}#termset`,
    },
  };
}

/** WebPage/ContactPage/AboutPage — bazowy typ dla stron bez bogatej encji. */
export function generateWebPageSchema(opts: { type?: string; name: string; path: string; description?: string }) {
  const url = opts.path.startsWith("http") ? opts.path : `${SITE_URL}${opts.path}`;
  return {
    "@context": "https://schema.org",
    "@type": opts.type || "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: "pl-PL",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
  };
}

/** HowTo — procesy krok-po-kroku (poziom Proces/Działanie w PCF). */
export function generateHowToSchema(opts: {
  name: string;
  description: string;
  steps: { name: string; text?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    inLanguage: "pl-PL",
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text || s.name,
    })),
  };
}

/** Łączy wiele węzłów schema w jeden @graph (mniej skryptów, spójny graf encji). */
export function graph(...nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.map((n) => {
      const rest = { ...(n as Record<string, unknown>) };
      delete rest["@context"];
      return rest;
    }),
  };
}
