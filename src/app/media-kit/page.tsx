import React from "react";
import Image from "next/image";
import { buildBasicMetadata } from "../../lib/metadata";
import JSONLD from "../../components/JSONLD";
import { generateOrganizationJsonLD } from "../../lib/jsonldGenerator";

export const metadata = buildBasicMetadata({
  title: "Media Kit – IkoConnect",
  description: "Download our logos, screenshots & brand assets.",
  path: "/media-kit",
  ogImage: "/images/og-media-kit.png",
});

export default function MediaKitPage() {
  const jsonldData = generateOrganizationJsonLD({
    name: "IkoConnect",
    url: "https://ikoconnect.com",
    logoUrl: "https://ikoconnect.com/images/logos/ikoconnect-square.png",
  });

  return (
    <section className="container mx-auto px-6 py-16 space-y-8">
      <JSONLD data={jsonldData} />

      <h1 className="text-4xl font-bold">Media Kit</h1>
      <p className="text-gray-700">
        Download our official logos, brand guidelines, and pre-made assets
        to feature IkoConnect in your media or on your blog.
      </p>

      <ul className="list-disc list-inside space-y-4 text-gray-800">
        <li className="flex items-center gap-4">
          <Image
            src="/images/logos/ikoconnect-square.png"
            alt="IkoConnect Logo"
            width={48}
            height={48}
            className="rounded"
          />
          <a
            href="/images/logos/ikoconnect-square.png"
            download
            className="font-medium hover:underline"
          >
            IkoConnect Logo (PNG)
          </a>
        </li>
        <li>
          <a
            href="/assets/IkoConnect_Brand_Guidelines.pdf"
            download
            className="font-medium hover:underline"
          >
            Brand Guidelines (PDF)
          </a>
        </li>
        <li>
          <a
            href="/assets/IkoConnect_Press_Kit.zip"
            download
            className="font-medium hover:underline"
          >
            Press Kit (Zip)
          </a>
        </li>
        <li>
          <a
            href="/assets/social_media_assets.zip"
            download
            className="font-medium hover:underline"
          >
            Social Media Assets (Zip)
          </a>
        </li>
      </ul>
    </section>
  );
}
