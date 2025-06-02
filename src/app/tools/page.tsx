// src/app/tools/page.tsx
import JSONLD from "@/components/JSONLD";
import ToolsClient from "@/components/ToolsClient";
import { buildBasicMetadata } from "@/lib/metadata";

export const metadata = buildBasicMetadata({
  title: "Tools & Resources – IkoConnect",
  description:
    "Curated catalog of essential freelance tools: design, productivity, AI, finance, and more.",
  path: "/tools",
  ogImage: "/images/og-tools.png",
});

// --- Example JSON-LD data for a CollectionPage:
const toolsJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "IkoConnect Tools & Resources",
  description:
    "Explore our curated selection of tools for freelancers: productivity, AI, finance, design, and more.",
  url: "https://www.ikoconnect.com/tools",
  mainEntity: [
    {
      "@type": "Service",
      "name": "Fiverr",
      "provider": { "@type": "Organization", "name": "Fiverr International" },
      "description":
        "Launch your freelance career with Fiverr – the easiest platform for beginners!",
      "url": "https://go.fiverr.com/visit/?bta=1031917&brand=fiverrmarketplace"
    },
    {
      "@type": "Service",
      "name": "Canva",
      "provider": { "@type": "Organization", "name": "Canva, Inc." },
      "description":
        "Discover how Canva lets anyone create stunning designs in minutes—no experience required.",
      "url": "https://www.canva.com/"
    }
    // …You can add a handful more “Service” entries here if you wish…
  ]
};

export default function ToolsPage() {
  return (
    <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* JSON-LD for SEO */}
      <JSONLD data={toolsJsonLd} />

      <header className="max-w-screen-lg mx-auto px-4 sm:px-6 pt-20 pb-8 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Tools & Resources</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Curated catalog of essential freelance tools: productivity, design, AI,
          finance, and more.
        </p>
      </header>

      {/* ToolsClient handles search, filter, and grid */}
      <ToolsClient />
    </main>
  );
}
