// /src/app/faq/page.tsx
import React from "react";
import FaqSection from "@/components/FaqSection";
import BackToTop from "../../components/BackToTop";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ – IkoConnect",
  description:
    "Got questions? We’ve got answers. Learn about how IkoConnect works, affiliate disclosures, content updates, and more.",
  openGraph: {
    title: "FAQ – IkoConnect",
    description:
      "Everything you need to know—how often we update, affiliate links, data privacy, and more.",
    url: "https://www.ikoconnect.com/faq",
    siteName: "IkoConnect",
    images: [
      {
        url: "https://www.ikoconnect.com/images/social/faq-og.png",
        width: 1200,
        height: 630,
        alt: "IkoConnect FAQ",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ – IkoConnect",
    description:
      "Find answers to common questions about our tool reviews, affiliate links, and data privacy policies.",
    images: ["https://www.ikoconnect.com/images/social/faq-og.png"],
  },
};

export default function FaqPage() {
  return (
    <main className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="pt-24 pb-16">
        <FaqSection />

        {/* Back to Top Link */}
        <BackToTop />
      </div>
    </main>
  );
}
