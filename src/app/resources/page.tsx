// src/app/resources/page.tsx
import JSONLD from "@/components/JSONLD";
import BackToTop from "@/components/BackToTop";
import type { Metadata } from "next";
import { getAllTools } from "@/lib/tools";
import ResourcesClient from "./ResourcesClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ikoconnect.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Resources – IkoConnect",
    description:
      "Curated tools, guides & productivity resources for freelancers and remote workers.",
    alternates: {
      canonical: `${siteUrl}/resources`,
    },
    openGraph: {
      title: "Resources – IkoConnect",
      description:
        "Explore top tools and guides for freelancers and digital nomads.",
      url: `${siteUrl}/resources`,
      siteName: "IkoConnect",
      images: [
        {
          url: `${siteUrl}/images/og-resources.png`,
          width: 1200,
          height: 630,
          alt: "Freelance Tools Preview",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Resources – IkoConnect",
      description:
        "Explore top tools and guides for freelancers and digital nomads.",
      images: [`${siteUrl}/images/og-resources.png`],
    },
    keywords: [
      "freelance tools",
      "remote work",
      "productivity",
      "resources",
      "IkoConnect",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export default function ResourcesPage() {
  // ❗️СЕГА се вчитува на сервер (без fs во клиент)
  const tools = getAllTools();

  // JSON-LD: ItemList
  const itemListJsonLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Freelance Tools – IkoConnect",
    description: "Handpicked productivity tools for remote work and freelancing.",
    url: `${siteUrl}/resources`,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/tools/${tool.id}`,
      name: tool.name,
      description: tool.description,
    })),
  };

  // JSON-LD: Breadcrumb
  const breadcrumbJsonLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resources",
        item: `${siteUrl}/resources`,
      },
    ],
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <JSONLD data={itemListJsonLD} />
      <JSONLD data={breadcrumbJsonLD} />

      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        🧰 Curated Tools for Freelancers
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Browse curated tools and guides crafted to help freelancers and remote
        professionals succeed.
      </p>

      {/* 👉 Пренеси ги алатките како props до клиент-компонентата */}
      <ResourcesClient tools={tools} />

      <BackToTop />
    </main>
  );
}

// По желба: ре-валидација (ако извори се статички)
// export const revalidate = 3600;
