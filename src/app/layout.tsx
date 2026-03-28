import type { Metadata } from "next";
import { Sora, DM_Sans, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SchemaOrg from "@/components/SchemaOrg";
import { generateLocalBusinessSchema } from "@/lib/schema";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lab-ai.pl";

const sora = Sora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LAB — Automatyzacja i AI dla firm | Grudziądz, Toruń, Bydgoszcz",
    template: "%s | LAB",
  },
  description:
    "Wdrażamy chatboty AI, agentów głosowych i automatyzacje n8n dla MŚP z Pomorza i Kujaw. Bezpłatna konsultacja.",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE_URL,
    siteName: "LAB — Lokalna Automatyzacja Biznesu",
    title: "LAB — Automatyzacja i AI dla firm | Grudziądz, Toruń, Bydgoszcz",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${sora.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-body antialiased bg-bg-deep text-text-primary`}
      >
        <SchemaOrg schema={generateLocalBusinessSchema()} />
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />

        {/* CHATBOT EMBED — podłącz Typebot widget gdy gotowy */}
        {/* <Script src="https://cdn.typebot.io/js/web.js" strategy="lazyOnload" /> */}
        {/* <typebot-bubble typebot="TWOJ-TYPEBOT-ID" theme='{"button":{"backgroundColor":"#00d4ff"}}' /> */}
        <div id="chatbot-embed" />
      </body>
    </html>
  );
}
