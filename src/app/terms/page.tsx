import { buildBasicMetadata } from "../../lib/metadata";
import JSONLD from "../../components/JSONLD";

export const metadata = buildBasicMetadata({
  title: "Terms of Service – IkoConnect",
  description:
    "Read IkoConnect's Terms of Service covering acceptable use, accounts, payments, disclosures, and liabilities.",
  path: "/terms",
  ogImage: "/images/og-terms.png",
});

const jsonldData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service – IkoConnect",
  url: "https://ikoconnect.com/terms",
  description:
    "IkoConnect Terms of Service: acceptable use, accounts, payments, disclosures, and liabilities.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-gray-800 dark:text-gray-200">
      <JSONLD data={jsonldData} />

      <h1 className="mb-6 text-3xl font-bold">Terms of Service</h1>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        Last updated: June 2025
      </p>

      <section className="prose prose-gray dark:prose-invert">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using IkoConnect (“we”, “us”, “our”, or the “Service”),
          you agree to be bound by these Terms of Service (“Terms”). If you do
          not agree, you may not use the Service.
        </p>

        <h2>2. About IkoConnect</h2>
        <p>
          IkoConnect provides resources, guides, job listings, and tool
          recommendations for freelancers and remote professionals. Some
          listings or links may be affiliate links. See our{" "}
          <a className="underline" href="/legal#affiliate-disclosure">
            Affiliate Disclosure
          </a>
          .
        </p>

        <h2>3. Eligibility & Accounts</h2>
        <ul>
          <li>You must be at least 16 years old to use the Service.</li>
          <li>
            If you create an account, you are responsible for safeguarding your
            login credentials and for all activities under your account.
          </li>
          <li>
            You must provide accurate, current, and complete information and
            promptly update it as necessary.
          </li>
        </ul>

        <h2>4. Acceptable Use</h2>
        <ul>
          <li>No unlawful, infringing, or fraudulent activity.</li>
          <li>No scraping, automated data harvesting, or rate-limiting abuse.</li>
          <li>No reverse engineering or attempt to access non-public areas.</li>
          <li>
            Respect third-party terms on linked tools, platforms, and APIs.
          </li>
        </ul>

        <h2>5. Content & Intellectual Property</h2>
        <ul>
          <li>
            The Service, including text, graphics, logos, and software, is
            protected by intellectual property laws and is owned by or licensed
            to IkoConnect.
          </li>
          <li>
            You retain any rights you hold in content you submit, but you grant
            us a non-exclusive, worldwide, royalty-free license to host,
            display, and distribute such content solely to operate the Service.
          </li>
        </ul>

        <h2>6. Affiliate Relationships & Sponsored Links</h2>
        <p>
          We may include affiliate links or sponsored placements to certain
          products or services. We may earn a commission if you make a purchase
          after clicking such links, at no additional cost to you. We only
          recommend services we believe add value, but you should independently
          evaluate any product before purchasing. See{" "}
          <a className="underline" href="/legal#affiliate-disclosure">
            Affiliate Disclosure
          </a>
          .
        </p>

        <h2>7. Third-Party Services</h2>
        <p>
          The Service may link to third-party websites or services that we do
          not control. We are not responsible for their content, policies, or
          practices. Your use of third-party services is at your own risk and
          subject to their terms.
        </p>

        <h2>8. Paid Features</h2>
        <p>
          If we offer paid features or premium content, pricing and billing
          terms will be displayed at checkout. Taxes may apply. Unless stated
          otherwise, all payments are final and non-refundable.
        </p>

        <h2>9. Disclaimers</h2>
        <p>
          The Service is provided on an “as is” and “as available” basis without
          warranties of any kind, whether express or implied, including but not
          limited to merchantability, fitness for a particular purpose, and
          non-infringement. Job listings and tool data may be provided by third
          parties and can change without notice.
        </p>

        <h2>10. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, IkoConnect shall not be
          liable for any indirect, incidental, special, consequential, or
          punitive damages, or any loss of profits or revenues, whether incurred
          directly or indirectly, resulting from your use of the Service.
        </p>

        <h2>11. Indemnification</h2>
        <p>
          You agree to defend, indemnify, and hold harmless IkoConnect and its
          affiliates, officers, and employees from any claims, damages, or
          expenses arising from your misuse of the Service or violation of these
          Terms.
        </p>

        <h2>12. Changes to the Service or Terms</h2>
        <p>
          We may modify or discontinue parts of the Service at any time. We may
          revise these Terms by posting an updated version with a new “Last
          updated” date. Your continued use constitutes acceptance of the
          changes.
        </p>

        <h2>13. Governing Law</h2>
        <p>
          These Terms are governed by the laws of Germany, without regard to its
          conflict of laws rules. Mandatory consumer protection rules of your
          country of residence may still apply.
        </p>

        <h2>14. Contact</h2>
        <p>
          Questions about these Terms? Contact us at{" "}
          <a className="underline" href="/contact">
            /contact
          </a>
          .
        </p>
      </section>
    </main>
  );
}
