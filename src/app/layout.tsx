import type { Metadata } from "next";
import { Archivo, Chakra_Petch, JetBrains_Mono } from "next/font/google";
import Szyna from "@/components/sciana/Szyna";
import StopkaSciany from "@/components/sciana/StopkaSciany";
import SchemaOrg from "@/components/SchemaOrg";
import { generateLocalBusinessSchema, generateWebSiteSchema, graph } from "@/lib/schema";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lok-ai.pl";

// Kroje z DESIGN.md: Chakra Petch (display, zostaje) + Archivo (proza) + JetBrains Mono (dane).
// Inter, Orbitron i IBM Plex Mono wypadły w ETAP2.
const chakraPetch = Chakra_Petch({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "700"],
  variable: "--font-chakra-petch",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
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
      <body className={`${chakraPetch.variable} ${archivo.variable} ${jetbrainsMono.variable} antialiased`}>
        <SchemaOrg schema={graph(generateLocalBusinessSchema(), generateWebSiteSchema())} />
        <Szyna />
        <main className="wall">
          {children}
          <StopkaSciany />
        </main>

        {/* CHATBOT EMBED — podłącz Typebot widget gdy gotowy */}
        <div id="chatbot-embed" />
      </body>
    </html>
  );
}
