import React from "react";
import { buildBasicMetadata } from "../../lib/metadata";
import JSONLD from "../../components/JSONLD";
import { generateWebPageJsonLD } from "../../lib/jsonldGenerator";

export const metadata = buildBasicMetadata({
  title: "Privacy Policy – IkoConnect",
  description: "Read our privacy practices and data policy.",
  path: "/privacy",
  ogImage: "/images/og-privacy.png",
});

export default function PrivacyPage() {
  const jsonldData = generateWebPageJsonLD({
    url: "https://ikoconnect.com/privacy",
    name: "Privacy Policy – IkoConnect",
    description: "Read our privacy practices and data policy.",
    dateModified: "2025-05-26",
  });

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 text-gray-800">
      <JSONLD data={jsonldData} />

      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        At IkoConnect, we respect your privacy and are committed to protecting your personal data. This Privacy Policy
        explains how we collect, use, and safeguard your data when you visit our website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Data We Collect</h2>
      <p className="mb-4">
        We collect information you provide directly (such as name, email address, and message) when you contact us or
        sign up for our newsletter. We also collect anonymized usage data (e.g. pages viewed, time spent) via cookies
        and analytics tools.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Data</h2>
      <p className="mb-4">
        Your contact data may be used to respond to inquiries, send you newsletters, and deliver content or offers.
        Usage data helps us improve performance and personalize your experience.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing</h2>
      <p className="mb-4">
        We do not sell your data. We may share data with trusted service providers (e.g. analytics platforms, email
        tools), under strict confidentiality and only to operate the site properly.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Your Rights</h2>
      <p className="mb-4">
        You may request access to, correction of, or deletion of your personal data at any time by contacting us at{" "}
        <a href="mailto:privacy@ikoconnect.com" className="text-primary underline">privacy@ikoconnect.com</a>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Policy Updates</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Any changes will be posted here, and the “Last Updated”
        date below will reflect the most recent revision.
      </p>

      <p className="mt-8 text-sm text-gray-500">Last updated: May 2025</p>
    </main>
  );
}
