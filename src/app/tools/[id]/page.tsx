// @ts-nocheck
// src/app/tools/[id]/page.tsx

import { notFound } from "next/navigation";
import { getAllToolIds, getToolById } from "@/lib/tools";
import { buildBasicMetadata } from "@/lib/metadata";
import JSONLD from "@/components/JSONLD";
import fs from "fs";
import path from "path";

// 1️⃣ Generate all dynamic /tools/[id] routes
export async function generateStaticParams(): Promise<{ id: string }[]> {
  return getAllToolIds().map((id) => ({ id }));
}

// 2️⃣ Build per-page metadata (must include params + searchParams)
export async function generateMetadata(
  args: {
    params: { id: string };
    searchParams: Record<string, string | string[] | undefined>;
  }
): Promise<Metadata> {
  const { params, searchParams } = args; // now typed
  const tool = getToolById(params.id);
  if (!tool) {
    return {
      title: "Tool Not Found – IkoConnect",
      description: "This tool does not exist.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ikoconnect.com";
  let ogImage = tool.ogImage;
  if (!ogImage) {
    const local = path.join(
      process.cwd(),
      "public",
      "images",
      "og",
      `${params.id}.png`
    );
    ogImage = fs.existsSync(local)
      ? `/images/og/${params.id}.png`
      : `/api/og/${params.id}`;
  }

  return buildBasicMetadata({
    title: `${tool.name} – IkoConnect`,
    description: tool.description,
    path: `/tools/${params.id}`,
    ogImage: `${siteUrl}${ogImage}`,
  });
}

// 3️⃣ Page component itself
export default async function Page({
   params,
 }: {
   params: Promise<{ id: string }>;
 }) {
   // await the promise
   const { id } = await params;   // then use `id` instead of `params.id`
  const tool = getToolById(params.id);
  if (!tool) return notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ikoconnect.com";
  const toolUrl = `${siteUrl}/tools/${params.id}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${siteUrl}/tools` },
      { "@type": "ListItem", position: 3, name: tool.name, item: toolUrl },
    ],
  };
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    url: tool.url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    image: tool.ogImage ?? `${siteUrl}/api/og/${params.id}`,
  };

  return (
    <>
      <JSONLD data={breadcrumbSchema} />
      <JSONLD data={toolSchema} />

      <article className="prose lg:prose-xl mx-auto py-16 px-4">
        <h1>{tool.name}</h1>
        <p className="mt-4">{tool.description}</p>
        <div className="mt-8">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[#00957F] text-white rounded shadow hover:bg-green-600 transition"
          >
            Visit {tool.name}
          </a>
        </div>
      </article>
    </>
  );
}
