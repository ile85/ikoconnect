// src/app/tools/[id]/page.tsx

import { getToolById, getAllToolIds, Tool } from "@/lib/tools";
import { notFound } from "next/navigation";
import JSONLD from "@/components/JSONLD";
import { buildBasicMetadata } from "@/lib/metadata";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

interface PageParams {
  params: { id: string };
}

export async function generateStaticParams() {
  return getAllToolIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { id } = await params;
  const maybeTool = getToolById(id);
  if (!maybeTool) {
    return {
      title: "Tool Not Found | IkoConnect",
      description: "No such tool exists on IkoConnect.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ikoconnect.com";
  const basic = buildBasicMetadata({
    title: `${maybeTool.name} – IkoConnect Tool`,
    description: maybeTool.description,
    path: `/tools/${id}`,
    ogImage: maybeTool.logo,
  });

  return {
    ...basic,
    alternates: {
      canonical: `${siteUrl}/tools/${maybeTool.id}`,
    },
  };
}

export default async function ToolDetailPage({ params }: PageParams) {
  const { id } = await params;
  const tool = getToolById(id);

  if (!tool) {
    notFound();
    return null;
  }

  const t: Tool = tool;

  const jsonldTool = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t.name,
    provider: {
      "@type": "Organization",
      name: t.name,
      url: t.url,
    },
    description: t.description,
    url: t.url,
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <JSONLD data={jsonldTool} />
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/tools", label: "Tools" },
          { href: `/tools/${id}`, label: tool.name },
        ]}
      />

      <header className="text-center mb-12">
        <div className="mx-auto mb-4 h-24 w-24 relative">
          <Image
            src={t.logo!}
            alt={`${t.name} logo`}
            fill
            sizes="(max-width: 640px) 100px, 150px"
            className="object-contain"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4 dark:text-gray-100">
          {t.name}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {t.description}
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-100">
          Features
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          {t.features?.map((feat, idx) => (
            <li key={idx}>{feat}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 dark:text-gray-100">
          Categories
        </h2>
        <div className="flex flex-wrap gap-2">
          {t.categories.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm rounded-full"
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </span>
          ))}
        </div>
      </section>

      <div className="text-center mb-12">
        <a
          href={t.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn px-8 py-3"
        >
          Visit {t.name} →
        </a>
      </div>

      <div className="text-center">
        <Link
          href="/tools"
          className="text-teal-600 hover:underline dark:text-teal-400"
        >
          ← Back to all tools
        </Link>
      </div>
    </main>
  );
}
