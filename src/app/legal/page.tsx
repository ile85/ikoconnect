import { buildBasicMetadata } from "../../lib/metadata";
import JSONLD from "../../components/JSONLD";

export const metadata = buildBasicMetadata({
  title: "Legal & Affiliate Disclosure – IkoConnect",
  description:
    "Review our legal documents, including Terms of Service, Privacy Policy, and Affiliate Disclosure.",
  path: "/legal",
  ogImage: "/images/og-legal.png",
});

const jsonldData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Legal & Affiliate Disclosure – IkoConnect",
  url: "https://ikoconnect.com/legal",
  description:
    "Review our legal documents, including Terms of Service, Privacy Policy, and Affiliate Disclosure.",
};

export default function LegalPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-gray-800 dark:text-gray-200">
      <JSONLD data={jsonldData} />

      <h1 className="mb-6 text-3xl font-bold">Legal Information</h1>

      <p className="mb-4">
        Transparency and trust are core values at IkoConnect. This page provides
        important legal information about how we operate, protect your data, and
        maintain compliance with affiliate marketing standards.
      </p>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <a
            href="/terms"
            className="text-primary underline hover:text-primary/80"
          >
            Terms of Service
          </a>{" "}
          – The rules and conditions for using IkoConnect.
        </li>
        <li>
          <a
            href="/privacy"
            className="text-primary underline hover:text-primary/80"
          >
            Privacy Policy
          </a>{" "}
          – How we collect, use, and safeguard your personal data.
        </li>
      </ul>

      {/* Affiliate Disclosure */}
      <section id="affiliate-disclosure" className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold">Affiliate Disclosure</h2>
        <p className="mb-3">
          IkoConnect participates in affiliate marketing programs. This means
          that some links on our website are affiliate links, and we may earn a
          commission if you click through and make a purchase, at no additional
          cost to you.
        </p>
        <p className="mb-3">
          These commissions help support the ongoing development of IkoConnect
          and allow us to provide free resources, job listings, and guides to
          the freelance community.
        </p>
        <p className="mb-3">
          We only recommend products, tools, and services that we believe bring
          genuine value to freelancers and remote professionals. However, it is
          always your responsibility to verify whether any product or service
          meets your needs before purchasing.
        </p>
        <p className="text-sm italic text-gray-600 dark:text-gray-400">
          In compliance with FTC guidelines, all affiliate relationships are
          clearly disclosed across our site wherever such links are used.
        </p>
      </section>

      <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
        Last updated: June 2025
      </p>
    </main>
  );
}
