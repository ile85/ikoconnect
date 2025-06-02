import { buildBasicMetadata } from "../../lib/metadata";
import JSONLD from "../../components/JSONLD";

export const metadata = buildBasicMetadata({
  title: "Legal – IkoConnect",
  description: "Review our legal documents, including Terms of Service and Privacy Policy.",
  path: "/legal",
  ogImage: "/images/og-legal.png",
});

const jsonldData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Legal – IkoConnect",
  url: "https://ikoconnect.com/legal",
  description: "Review our legal documents, including Terms of Service and Privacy Policy.",
};

export default function LegalPage() {
  return (
    <main className="max-w-3xl mx-auto py-10 px-4 text-gray-800">
      <JSONLD data={jsonldData} />

      <h1 className="text-3xl font-bold mb-6">Legal Information</h1>

      <p className="mb-4">
        We take transparency and trust seriously at IkoConnect. Please review the following documents to understand how
        we operate, protect your data, and maintain affiliate integrity.
      </p>

      <ul className="list-disc pl-5 space-y-2">
        <li>
          <a href="/terms" className="text-primary underline hover:text-primary/80">
            Terms of Service
          </a>{" "}
          – Rules for using IkoConnect and our affiliate disclosure.
        </li>
        <li>
          <a href="/privacy" className="text-primary underline hover:text-primary/80">
            Privacy Policy
          </a>{" "}
          – How we collect, use, and protect your personal data.
        </li>
      </ul>

      <p className="mt-8 text-sm text-gray-500">Last updated: May 2025</p>
    </main>
  );
}
