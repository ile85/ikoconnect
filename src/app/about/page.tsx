// File: /var/www/ikoconnect/src/app/about/page.tsx

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import JSONLD from "@/components/JSONLD";
import PageWrapper from "@/components/PageWrapper";
import Team from "@/components/Team";

export const metadata: Metadata = {
  title: "About IkoConnect",
  description:
    "IkoConnect is your remote work ally — built to empower freelancers with curated tools, job resources, and actionable strategies.",
  openGraph: {
    title: "About IkoConnect",
    description:
      "IkoConnect is your remote work ally — built to empower freelancers with curated tools, job resources, and actionable strategies.",
    url: "https://ikoconnect.com/about",
    siteName: "IkoConnect",
    images: [
      {
        url: "https://ikoconnect.com/images/social/about-og.png",
        width: 1200,
        height: 630,
        alt: "About IkoConnect",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About IkoConnect",
    description:
      "IkoConnect is your remote work ally — built to empower freelancers with curated tools, job resources, and actionable strategies.",
    images: ["https://ikoconnect.com/images/social/about-og.png"],
  },
};

const jsonldData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About IkoConnect",
  url: "https://ikoconnect.com/about",
  description: metadata.description,
};

export default function AboutPage() {
  return (
    <>
      {/* JSON-LD structured data for SEO */}
      <JSONLD data={jsonldData} />

      {/* HERO SECTION */}
      <section>
        <div className="max-w-screen-lg mx-auto px-4 mt-32 mb-16">
          <div className="tilt-wrapper">
            <div className="tilt-inner bg-gradient-to-r from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-layered rounded-2xl p-12 text-center">
              <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 drop-shadow-lg">
                👋 About IkoConnect
              </h1>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                IkoConnect is your remote work ally — built to empower freelancers
                with curated tools, job resources, and actionable strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SLOGAN + BLOB VIDEO */}
      <PageWrapper className="py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0 tilt-wrapper">
            <div className="tilt-inner blob-mask overflow-hidden rounded-2xl shadow-layered w-[400px] h-[400px] md:w-[600px] md:h-[600px]">
              <video
                src="/video/video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 relative glass-backdrop rounded-2xl shadow-xl p-8 before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#00BFA6]/30 before:to-[#00957F]/30 before:blur-xl before:-z-10">
            <h2 className="text-3xl font-bold mb-4">Imagine yourself here.</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Join our community of freelancers and shape the future of remote work.
            </p>
          </div>
        </div>
      </PageWrapper>

      {/* MISSION & VALUES */}
      <PageWrapper>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative glass-backdrop rounded-2xl shadow-xl p-8 before:absolute before:inset-0 before:bg-gradient-to-tr before:from-[#00BFA6]/30 before:to-[#00957F]/30 before:blur-xl before:-z-10">
            <h2 className="text-3xl font-bold mb-4">🚀 Our Mission & Values</h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-[#00BFA6] text-xl">✅</span>
                <span>Empower digital professionals with quality tools & insights.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00BFA6] text-xl">📖</span>
                <span>Support ethical growth through transparency and education.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00BFA6] text-xl">🤝</span>
                <span>Build a trusted space for freelancers and solopreneurs.</span>
              </li>
            </ul>
          </div>
          <div className="tilt-wrapper">
            <div className="tilt-inner rounded-xl overflow-hidden shadow-layered">
              <Image
                src="/images/og/ikoconnect.png"
                alt="IkoConnect Logo"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </PageWrapper>

      {/* TEAM SECTION */}
      <PageWrapper>
        <Team />
      </PageWrapper>

      {/* TIMELINE */}
      <PageWrapper className="bg-[#FAFAFA] dark:bg-gray-800 rounded-2xl">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-bold">📅 Journey So Far</h2>
          <ol className="relative border-l-4 border-gray-200 dark:border-gray-700 pl-6 space-y-8 text-left">
            {[
              {
                year: "2022",
                text: "Started retraining in Germany as an Application Developer.",
              },
              {
                year: "2023",
                text: "Built full-stack projects and learned SEO, Tailwind, EJS, MongoDB.",
              },
              {
                year: "2024",
                text: "Founded IkoConnect as a solo passion project.",
              },
              {
                year: "2025",
                text: "Launched with affiliate integrations, SEO-ready blog, OG images & more.",
              },
            ].map(({ year, text }) => (
              <li key={year} className="relative">
                <span className="absolute -left-6 top-3 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-2 border-white dark:border-gray-800" />
                <time className="block font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {year}
                </time>
                <p className="text-gray-700 dark:text-gray-300">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </PageWrapper>

      {/* FOUNDER */}
      <PageWrapper className="text-center bg-white dark:bg-gray-900 rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-4">🧑‍💻 Meet the Creator</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Hi, I’m <strong>Ilcho Dimeski</strong>, based in Germany — a developer,
          affiliate marketer, and digital nomad who believes freelancers deserve
          better tools and resources.
        </p>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          IkoConnect is 100% solo-built — crafted with love, late nights,
          and a mission to serve creators around the globe.
        </p>
      </PageWrapper>

      {/* CTA */}
      <PageWrapper className="text-center">
        <div className="inline-block bg-gradient-to-r from-[#00957F] to-[#00BFA6] rounded-3xl p-1 hover:scale-105 transition-transform">
          <Link
            href="mailto:hello@ikoconnect.com"
            className="block px-8 py-4 bg-white dark:bg-gray-900 rounded-3xl font-semibold text-[#00957F] dark:text-[#00BFA6] transform hover:-translate-y-1 transition"
          >
            🤝 Ready to Partner?
          </Link>
        </div>
      </PageWrapper>
    </>
  );
}
