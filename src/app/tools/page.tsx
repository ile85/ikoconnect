// src/app/tools/page.tsx

import JSONLD from "@/components/JSONLD";
import ToolsClient from "@/components/ToolsClient";
import { getAllTools } from "@/lib/tools";
import { buildBasicMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

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
  // Влечеме ги сите алатки од либот
  const allTools = getAllTools(); 
  // Формираме dynamic JSON-LD mainEntity
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
    <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Inject dynamic JSON-LD */}
      <JSONLD data={toolsJsonLd} />

      <header className="max-w-screen-lg mx-auto px-4 sm:px-6 pt-20 pb-8 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Tools & Resources</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Curated catalog of essential freelance tools: productivity, design, AI,
          finance, and more.
        </p>
      </header>

      {/* Клиентска компонента за search, filter, pagination */}
      <ToolsClient />
    </main>
  );
}
