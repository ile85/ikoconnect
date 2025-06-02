// src/app/resources/page.tsx
import { buildBasicMetadata } from "@/lib/metadata";
import ResourcesClient from "./ResourcesClient";
import { getAllTools } from "@/lib/tools";
import JSONLD from "@/components/JSONLD";

export const metadata = buildBasicMetadata({
  title: "Resources – IkoConnect",
  description: "Curated tools, guides & resources for freelancers.",
  path: "/resources",
  ogImage: "/images/og-resources.png",
});

const jsonldData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Resources – IkoConnect",
  "url": "https://ikoconnect.com/resources",
  "description": metadata.description,
};

export default function ResourcesPage() {
  const tools = getAllTools();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <JSONLD data={jsonldData} />

      <h1 className="text-4xl font-bold mb-4">Resources</h1>
      <ResourcesClient tools={tools} />
    </main>
  );
}
