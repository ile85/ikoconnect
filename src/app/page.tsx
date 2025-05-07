// src/app/page.tsx
import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "ikoConnect – Freelance Resources",
    description: "Boost your remote productivity with curated tools.",
    openGraph: {
      title: "ikoConnect Home",
      description: "Your go-to hub for freelance resources",
      url: "https://www.ikoconnect.com",
      images: [{ url: "/images/og-home.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "ikoConnect Home",
      description: "Your go-to hub for freelance resources",
      images: ["/images/og-home.png"],
    },
  };
}

export default function HomePage() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white overflow-hidden">
      {/* ...Hero content... */}
    </main>
  );
}
