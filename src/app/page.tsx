// src/app/page.tsx
export const revalidate = 15;

import type { Metadata } from "next";
import React from "react";
import Hero from "@/components/Hero";
import OGPreviewSection from "@/components/OGPreviewSection";
import RecommendationsClient from "@/components/RecommendationsClient";
import FeatureCards from "@/components/FeatureCards";
import { getAllRecommendations } from "@/lib/recommendations";

export function generateMetadata(): Metadata {
  return {
    title: "IkoConnect – Empowering Freelancers to Work Smarter",
    description: "Discover tools, jobs & guides to boost your remote workflow.",
    openGraph: {
      title: "IkoConnect – Freelance Tools & Jobs",
      description: "Explore the top remote tools, freelance jobs, and tips.",
      url: "https://ikoconnect.com",
      images: [{ url: "/images/og-home.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "IkoConnect – Remote Work Tools",
      description: "Freelance smarter with curated resources and guides.",
      images: ["/images/og-home.png"],
    },
  };
}

export default function HomePage() {
  const recommendations = getAllRecommendations();

  return (
    <main className="font-inter antialiased text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
      <Hero />

      {/* OG Image Preview Section */}
      <OGPreviewSection />

      {/* Recommendations */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800 dark:text-white">
            ✨ Recommended Resources
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Curated tools to level up your freelance workflow — productivity, automation, writing & more.
          </p>
          <RecommendationsClient items={recommendations} />
        </div>
      </section>

      {/* Feature Cards */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeatureCards />
        </div>
      </section>
    </main>
  );
}
