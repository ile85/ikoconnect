// src/app/layout.tsx
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import JSONLD from "@/components/JSONLD";
import {
  generateOrganizationJsonLD,
  generateWebPageJsonLD,
} from "@/lib/jsonldGenerator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ikoconnect.com";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "IkoConnect",
    template: "%s | IkoConnect",
  },
  description:
    "IkoConnect – your ultimate portal for remote work: tools, guides, and freelance jobs.",
  keywords: [
    "remote work",
    "freelance jobs",
    "tools for freelancers",
    "blog",
    "IkoConnect",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "IkoConnect",
    description:
      "IkoConnect – your ultimate portal for remote work: tools, guides, and freelance jobs.",
    url: siteUrl,
    siteName: "IkoConnect",
    images: [
      {
        url: `${siteUrl}/og-default.png`,
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
    images: [`${siteUrl}/og-default.png`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        url: "/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const orgJson = generateOrganizationJsonLD({
    name: "IkoConnect",
    url: siteUrl,
    logoUrl: `${siteUrl}/android-chrome-512x512.png`,
  });

  const webJson = generateWebPageJsonLD({
    name: "IkoConnect",
    url: siteUrl,
    description:
      "IkoConnect – your ultimate portal for remote work: tools, guides, and freelance jobs.",
  });

  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* SEO & performance meta */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Google Fonts handled via next/font */}

        {/* JSON-LD structured data */}
        <JSONLD data={orgJson} />
        <JSONLD data={webJson} />

        {/* Google reCAPTCHA */}
        <script
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          async
          defer
        ></script>
      </head>
      <body className="flex flex-col min-h-screen antialiased scroll-smooth bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <Providers>
          <Navbar />
          <main id="main-content" className="flex-1 pt-20">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
