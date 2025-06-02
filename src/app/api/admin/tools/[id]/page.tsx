// /var/www/ikoconnect/src/app/api/admin/tools/[id]/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { buildBasicMetadata } from "../../../../../lib/metadata";
import { getAllTools, Tool } from "../../../../../lib/tools";
import JSONLD from "../../../../../components/JSONLD";

interface Props {
  params: { id: string };
}

// 1) Tell Next.js which tool IDs to pre-render
export function generateStaticParams(): { id: string }[] {
  return getAllTools().map((tool: Tool) => ({ id: String(tool.id) }));
}

// 2) Per-page metadata
export function generateMetadata({ params }: Props): Metadata {
  const tool = getAllTools().find((t: Tool) => String(t.id) === params.id);

  if (!tool) {
    return buildBasicMetadata({
      title: "Tool Not Found – IkoConnect Admin",
      description: "",
      path: `/api/admin/tools/${params.id}`,
      ogImage: "/og-default.png",
    });
  }

  return buildBasicMetadata({
    title: `${tool.name} – IkoConnect Admin`,
    description: tool.description,
    path: `/api/admin/tools/${params.id}`,
    ogImage: tool.logo,
  });
}

export default function AdminToolPage({ params }: Props) {
  const tool = getAllTools().find((t: Tool) => String(t.id) === params.id);

  if (!tool) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-4">Tool not found.</p>
        <Link
          href="/api/admin/tools"
          className="inline-block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back to Tools
        </Link>
      </div>
    );
  }

  // JSON-LD for this tool
  const jsonldData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tool.name,
    description: tool.description,
    url: `https://ikoconnect.com/api/admin/tools/${tool.id}`,
    image: tool.logo,
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <JSONLD data={jsonldData} />

      <Link
        href="/api/admin/tools"
        className="text-sm text-[#00957F] hover:underline mb-6 inline-block"
      >
        ← Back to Tools
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{tool.name}</h1>
      <p className="text-lg text-gray-700 mb-6">{tool.description}</p>

      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
      >
        Visit Website
      </a>
    </section>
  );
}
