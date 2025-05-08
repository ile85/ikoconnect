// src/app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export function generateMetadata(): Metadata {
  return {
    title: "IkoConnect – Empowering Freelancers to Work Smarter",
    description: "Discover tools, jobs & guides to boost your remote workflow.",
    openGraph: {
      title: "IkoConnect Home",
      description: "Discover tools, jobs & guides to boost your remote workflow.",
      url: "https://www.ikoconnect.com",
      images: [{ url: "/images/og-home.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "IkoConnect Home",
      description: "Discover tools, jobs & guides to boost your remote workflow.",
      images: ["/images/og-home.png"],
    },
  };
}

export default function HomePage() {
  return (
    <main className="font-inter antialiased text-gray-800">
      {/* HERO SECTION */}
      <section className="relative bg-[#F4F4F9] py-24 overflow-hidden">
        {/* Decorative SVG circle */}
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-gradient-to-br from-[#00BFA6] to-[#00957F] opacity-30 animate-pulse" />

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1B1B1F] leading-tight mb-6">
            Empowering Freelancers to <span className="text-[#00957F]">Work Smarter</span>, Not Harder
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700 mb-12">
            Discover tools, jobs & guides to boost your remote workflow.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/resources"
              className="inline-block px-8 py-4 bg-[#00957F] hover:bg-[#007A60] text-white font-semibold rounded-md shadow-lg transition transform hover:-translate-y-1"
            >
              Browse Remote Tools
            </Link>
            <Link
              href="/newsletter"
              className="inline-block px-8 py-4 border-2 border-[#00957F] bg-[#E0F7F2] text-[#1B1B1F] font-medium rounded-md transition"
            >
              Join Our Newsletter
            </Link>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00BFA6] to-[#00957F] text-white text-3xl rounded-full mb-6 mx-auto">
                🛠️
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#00957F] transition-colors">
                <Link href="/resources">Affiliate Tools</Link>
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Discover tools for productivity, automation, writing & more. All curated for freelancers.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00BFA6] to-[#00957F] text-white text-3xl rounded-full mb-6 mx-auto">
                📚
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#00957F] transition-colors">
                <Link href="/blog">Blog & Guides</Link>
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Read actionable articles to help you manage time, earn more, and stay focused.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00BFA6] to-[#00957F] text-white text-3xl rounded-full mb-6 mx-auto">
                🌍
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#00957F] transition-colors">
                <Link href="/jobs">Remote Job Board</Link>
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Find freelance & remote jobs from platforms like Upwork, Remotive, FlexJobs and more.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
