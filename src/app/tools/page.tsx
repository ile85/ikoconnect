// src/app/tools/page.tsx

import JSONLD from "@/components/JSONLD";
import ToolsClient from "@/components/ToolsClient";
import { getAllTools } from "@/lib/tools";
import { buildBasicMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import BackToTop from "@/components/BackToTop";

interface ToolsJsonLdService {
  "@type": "Service";
  name: string;
  provider: { "@type": "Organization"; name: string };
  description: string;
  url: string;
}

export async function generateMetadata(): Promise<Metadata> {
  return buildBasicMetadata({
    title: "Tools & Resources – IkoConnect",
    description:
      "Curated catalog of essential freelance tools: design, productivity, AI, finance, and more.",
    path: "/tools",
    ogImage: "/images/og-tools.png",
  });
}

export default async function ToolsPage() {
  const allTools = getAllTools();

  const mainEntity: ToolsJsonLdService[] = allTools.map((tool) => ({
    "@type": "Service",
    name: tool.name,
    provider: {
      "@type": "Organization",
      name: tool.name,
    },
    description: tool.description,
    url: tool.url,
  }));

  const toolsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "IkoConnect Tools & Resources",
    description:
      "Explore our curated selection of tools for freelancers: productivity, AI, finance, design, and more.",
    url: "https://www.ikoconnect.com/tools",
    mainEntity,
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <JSONLD data={toolsJsonLd} />

      <header className="mx-auto max-w-screen-lg px-4 pt-20 pb-8 text-center sm:px-6">
        <h1 className="mb-4 text-4xl font-extrabold">Tools & Resources</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Curated catalog of essential freelance tools: productivity, design, AI,
          finance, and more.
        </p>
      </header>

      {/* Affiliate disclaimer */}
      <aside
        role="note"
        aria-label="Important information"
        className="mx-auto mb-8 max-w-screen-lg rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-800/50 dark:bg-blue-900/20 dark:text-blue-200"
      >
        <p className="mb-1">
          Some tools listed here may include affiliate links. If you purchase
          through these links, we may earn a small commission at no extra cost
          to you. See our{" "}
          <a
            href="/legal#affiliate-disclosure"
            className="underline hover:no-underline"
          >
            Affiliate Disclosure
          </a>
          .
        </p>
        <p className="opacity-90">
          We only recommend products and services that we believe are genuinely
          useful for freelancers and remote workers.
        </p>
      </aside>

      {/* Client component for search/filter/pagination */}
      <ToolsClient />

      <BackToTop />
    </main>
  );
}
