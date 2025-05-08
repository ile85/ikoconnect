import React from "react";

export default function MediaKitPage() {
  return (
    <section className="container mx-auto px-6 py-16 space-y-8">
      <h1 className="text-4xl font-bold">Media Kit</h1>
      <p className="text-gray-700">
        Download our official logos, brand guidelines, and pre-made assets
        to feature IkoConnect in your media or on your blog.
      </p>

      <ul className="list-disc list-inside space-y-4 text-gray-800">
        <li>
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
