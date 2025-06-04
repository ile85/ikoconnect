// src/app/media-kit/page.tsx
import React from "react";
import Image from "next/image";
import { buildBasicMetadata } from "@/lib/metadata";
import JSONLD from "@/components/JSONLD";
import { generateOrganizationJsonLD } from "@/lib/jsonldGenerator";

export const metadata = buildBasicMetadata({
  title: "Media Kit – IkoConnect",
  description: "Official logos, screenshots, guidelines, and affiliate resources for IkoConnect.",
  path: "/media-kit",
  ogImage: "/images/og-media-kit.png",
});

export default function MediaKitPage() {
  const jsonldData = generateOrganizationJsonLD({
    name: "IkoConnect",
    url: "https://ikoconnect.com",
    logoUrl: "/assets/press-kit/logo/ikoconnect-square.png",
  });

  return (
    <section className="container max-w-4xl mx-auto px-6 py-16">
      <JSONLD data={jsonldData} />

      <h1 className="text-4xl font-extrabold mb-4 text-indigo-600">Media Kit</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
        Download official brand assets and resources for use in affiliate content, press mentions, and product reviews.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Square Logo */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Logo (Square)</h2>
          <Image
            src="/assets/press-kit/logo/ikoconnect-square.png"
            alt="IkoConnect Logo"
            width={100}
            height={100}
            className="mb-4"
          />
          <a
            href="/assets/press-kit/logo/ikoconnect-square.png"
            download
            className="text-indigo-600 font-medium hover:underline"
          >
            Download PNG
          </a>
        </div>

        {/* Horizontal Logo */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Logo (Horizontal)</h2>
          <Image
            src="/assets/press-kit/logo/ikoconnect-horizontal.png"
            alt="IkoConnect Horizontal Logo"
            width={160}
            height={60}
            className="mb-4"
          />
          <a
            href="/assets/press-kit/logo/ikoconnect-horizontal.png"
            download
            className="text-indigo-600 font-medium hover:underline"
          >
            Download PNG
          </a>
        </div>

        {/* Brand Guidelines */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Brand Guidelines</h2>
          <p className="text-sm mb-2">Logo usage, colors, typography, and visual identity.</p>
          <a
            href="/assets/IkoConnect – Brand Guidelines.pdf"
            download
            className="text-indigo-600 font-medium hover:underline"
          >
            Download PDF
          </a>
        </div>

        {/* Press Kit ZIP */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Full Press Kit</h2>
          <p className="text-sm mb-2">Everything in one ZIP: logos, screenshots, snippets, and README.</p>
          <a
            href="/assets/press-kit.zip"
            download
            className="text-indigo-600 font-medium hover:underline"
          >
            Download ZIP
          </a>
        </div>

        {/* Screenshots Section */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition col-span-full">
          <h2 className="text-xl font-semibold mb-4">Website Screenshots</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <Image
                src="/assets/press-kit/screenshots/homepage.png"
                alt="Homepage"
                width={320}
                height={180}
                className="rounded mb-1"
              />
              <a
                href="/assets/press-kit/screenshots/homepage.png"
                download
                className="text-sm text-indigo-600 hover:underline"
              >
                Download Homepage
              </a>
            </div>
            <div>
              <Image
                src="/assets/press-kit/screenshots/blog-post.png"
                alt="Blog Post"
                width={320}
                height={180}
                className="rounded mb-1"
              />
              <a
                href="/assets/press-kit/screenshots/blog-post.png"
                download
                className="text-sm text-indigo-600 hover:underline"
              >
                Download Blog Post
              </a>
            </div>
            <div>
              <Image
                src="/assets/press-kit/screenshots/resources-page.png"
                alt="Resources Page"
                width={320}
                height={180}
                className="rounded mb-1"
              />
              <a
                href="/assets/press-kit/screenshots/resources-page.png"
                download
                className="text-sm text-indigo-600 hover:underline"
              >
                Download Resources Page
              </a>
            </div>
          </div>
        </div>

        {/* Snippets Section */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition col-span-full">
          <h2 className="text-xl font-semibold mb-2">Copy Snippets</h2>
          <p className="text-sm mb-2">Affiliate-ready blurbs for tweets, posts, and newsletters.</p>
          <a
            href="/assets/press-kit/snippets.txt"
            download
            className="text-indigo-600 font-medium hover:underline"
          >
            Download TXT
          </a>
        </div>
      </div>

      <div className="border-t pt-8 mt-12 text-center">
        <h2 className="text-2xl font-bold mb-2">Need something else?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Let us know if you need additional formats, SVGs, or custom banners.
        </p>
        <a
          href="/contact"
          className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
}
