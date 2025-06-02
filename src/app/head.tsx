// src/app/head.tsx
import { buildBasicMetadata } from "../lib/metadata";

export const metadata = buildBasicMetadata({
  title: "IkoConnect – Empowering Freelancers",
  description: "Discover tools, jobs & guides to boost your remote workflow.",
  ogImage: "/images/og-home.png",
});

export default function Head() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* PWA theme color */}
      <meta name="theme-color" content="#00957F" />

      {/* RSS feed for blog */}
      <link
        rel="alternate"
        type="application/rss+xml"
        title="IkoConnect Blog RSS"
        href="/rss.xml"
      />

      {/* PWA manifest & icons */}
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* Tailwind CSS */}
      <link rel="stylesheet" href="/tailwind.css" />
    </>
  );
}
