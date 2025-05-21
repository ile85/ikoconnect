// src/app/resources/page.tsx
import { buildBasicMetadata } from "@/lib/metadata";
import ResourcesClient from "./ResourcesClient";
import { getAllTools } from "@/lib/tools";

export const metadata = buildBasicMetadata({
  title: "Resources – IkoConnect",
  description: "Curated tools, guides & resources for freelancers.",
  path: "/resources",
  ogImage: "/images/og-resources.png",
});

export default function ResourcesPage() {
  // Server-side fetch на сите алатки
  const tools = getAllTools();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Resources</h1>

      {/* Интерактивна client-компонента */}
      <ResourcesClient tools={tools} />
    </main>
  );
}
