"use client";

import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import JSONLD from "./JSONLD";
import NavbarClient from "./NavbarClient";

export default function Providers({ children }: { children: ReactNode }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "IkoConnect",
    url: "https://ikoconnect.com",
    logo: "https://ikoconnect.com/og-default.png",
  };
  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://ikoconnect.com",
    name: "IkoConnect",
    description:
      "Discover tools, guides, and jobs for freelancers on IkoConnect.",
  };

  return (
    <>
      {/* Skip link for keyboard & screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-[#00957F] focus:px-4 focus:py-2 focus:rounded-md"
      >
        Skip to content
      </a>

      {/* JSON-LD for SEO */}
      <JSONLD data={orgSchema} />
      <JSONLD data={siteSchema} />

      <ThemeProvider attribute="class">
        <NavbarClient />

        {/* Umami analytics */}
        {process.env.NODE_ENV === "production" && (
          <Script
            defer
            src="https://analytics.ikoconnect.com/umami.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
            strategy="afterInteractive"
          />
        )}

        {children}
      </ThemeProvider>
    </>
  );
}
