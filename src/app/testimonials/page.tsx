// src/app/testimonials/page.tsx
import React from "react";
import Testimonials from "@/components/Testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials – IkoConnect",
  description:
    "See what real freelancers and remote workers are saying about IkoConnect’s tool recommendations.",
  openGraph: {
    title: "Testimonials – IkoConnect",
    description:
      "Hear from our community how IkoConnect helped them elevate their freelancing game.",
    url: "https://ikoconnect.com/testimonials",
    siteName: "IkoConnect",
    images: [
      {
        url: "https://ikoconnect.com/images/social/testimonials-og.png",
        width: 1200,
        height: 630,
        alt: "Testimonials – IkoConnect",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Testimonials – IkoConnect",
    description:
      "Discover why freelancers and remote teams trust IkoConnect’s curated tool guides.",
    images: ["https://ikoconnect.com/images/social/testimonials-og.png"],
  },
};

export default function TestimonialsPage() {
  return (
    <main className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* You can reuse your existing layout by wrapping in the same <PageWrapper> or layout component */}
      <div className="pt-24 pb-16">
        <Testimonials />
      </div>
    </main>
  );
}
