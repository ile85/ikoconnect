// src/app/layout.tsx

import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import ClientOnly from "@/components/ClientOnly";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JSONLD from "@/components/JSONLD";
import TimeBasedThemeProvider from "@/components/TimeBasedThemeProvider";
import CookieConsent from "@/components/CookieConsent";
import {
  generateOrganizationJsonLD,
  generateWebPageJsonLD,
} from "@/lib/jsonldGenerator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ikoconnect.com";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "IkoConnect", template: "%s | IkoConnect" },
  description:
    "IkoConnect – your ultimate portal for remote work: tools, guides, and freelance jobs.",
  keywords: ["remote work", "freelance jobs", "tools for freelancers", "blog"],
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "IkoConnect",
    description:
      "IkoConnect – your ultimate portal for remote work: tools, guides, and freelance jobs.",
    url: siteUrl,
    siteName: "IkoConnect",
    images: [
      {
        url: `${siteUrl}/images/og/og-default.png`, // ← fixed path
        width: 1200,
        height: 630,
        alt: "IkoConnect – Remote Work Portal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IkoConnect",
    description:
      "IkoConnect – your ultimate portal for remote work: tools, guides, and freelance jobs.",
    creator: "@ikoconnect",
    images: [`${siteUrl}/images/og/og-default.png`], // ← fixed path
  },
  icons: {
    icon: ["/favicon.ico", "/favicon-32x32.png"],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const orgJson = generateOrganizationJsonLD({
    name: "IkoConnect",
    url: siteUrl,
    logoUrl: `${siteUrl}/android-chrome-512x512.png`,
    sameAs: [
      "https://x.com/ikoconnect",
      "https://linkedin.com/company/ikoconnect",
      "https://instagram.com/ikoconnect",
      "https://facebook.com/ikoconnect",
    ],
  });

  const webJson = generateWebPageJsonLD({
    name: "IkoConnect",
    url: siteUrl,
    description: metadata.description!,
  });

  // Optional: WebSite schema with SearchAction (ако имаш /search?q=)
  const webSiteJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteUrl,
    name: "IkoConnect",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Performance hints */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.google.com" />

        {/* JSON-LD structured data */}
        <JSONLD data={[orgJson, webJson, webSiteJson]} id="root-jsonld" />

        {/* reCAPTCHA (load global only if навистина ти треба на сите страници) */}
        <script
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          async
          defer
        />
      </head>
      <body className="scroll-smooth bg-white dark:bg-gray-900 flex flex-col min-h-screen antialiased text-gray-800 dark:text-gray-200">
        <ClientOnly>
          <TimeBasedThemeProvider />
          <Providers>
            <Navbar />
            <main id="main-content" className="flex-1 pt-20">
              {children}
              <CookieConsent />
            </main>
          </Providers>
          <Footer />
        </ClientOnly>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
