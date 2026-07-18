import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Chakra_Petch, JetBrains_Mono, Orbitron } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import SchemaOrg from "@/components/SchemaOrg";
import { generateLocalBusinessSchema, generateWebSiteSchema, graph } from "@/lib/schema";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-chakra-petch",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: "S-rDHe6vhS9dWdnhwsugkrTTa3o6rmPSoI8OfyYANWM",
  },
  title: {
    default: "lok-ai — Automatyzacja i AI dla firm | Grudziądz, Toruń, Bydgoszcz",
    template: "%s | lok-ai",
  },
  description:
    "Wdrażamy chatboty AI, agentów głosowych i automatyzacje n8n dla MŚP z Pomorza i Kujaw. Bezpłatna konsultacja.",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE_URL,
    siteName: "lok-ai — Lokalna Automatyzacja Biznesu",
    title: "lok-ai — Automatyzacja i AI dla firm | Grudziądz, Toruń, Bydgoszcz",
    description:
      "Wdrażamy chatboty AI, agentów głosowych i automatyzacje n8n dla MŚP z Pomorza i Kujaw. Bezpłatna konsultacja.",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} ${chakraPetch.variable} ${jetbrainsMono.variable} ${orbitron.variable} font-body antialiased bg-background text-on-surface`}
      >
        <SchemaOrg schema={graph(generateLocalBusinessSchema(), generateWebSiteSchema())} />
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <MobileBottomNav />

        {/* CHATBOT EMBED — podłącz Typebot widget gdy gotowy */}
        {/* <Script src="https://cdn.typebot.io/js/web.js" strategy="lazyOnload" /> */}
        {/* <typebot-bubble typebot="TWOJ-TYPEBOT-ID" theme='{"button":{"backgroundColor":"#00d4ff"}}' /> */}
        <div id="chatbot-embed" />
      </body>
    </html>
  );
}
