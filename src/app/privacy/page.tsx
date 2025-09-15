import { buildBasicMetadata } from "../../lib/metadata";
import JSONLD from "../../components/JSONLD";

export const metadata = buildBasicMetadata({
  title: "Privacy Policy – IkoConnect",
  description:
    "Learn how IkoConnect collects, uses, shares, and protects your data, and understand your GDPR rights.",
  path: "/privacy",
  ogImage: "/images/og-privacy.png",
});

const jsonldData = {
  "@context": "https://schema.org",
  "@type": "PrivacyPolicy",
  name: "Privacy Policy – IkoConnect",
  url: "https://ikoconnect.com/privacy",
  description:
    "IkoConnect Privacy Policy with GDPR information about data collection, use, and your rights.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-gray-800 dark:text-gray-200">
      <JSONLD data={jsonldData} />

      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        Last updated: June 2025
      </p>

      <section className="prose prose-gray dark:prose-invert">
        <h2>1. Who We Are</h2>
        <p>
          IkoConnect (“we”, “us”, “our”) provides resources, job listings, and
          tool recommendations for freelancers. We are the data controller for
          personal data processed via this website.
        </p>

        <h2>2. What Data We Collect</h2>
        <ul>
          <li>
            <strong>Account & Contact Data:</strong> name, email, and any
            details you provide when you contact us or subscribe to our
            newsletter.
          </li>
          <li>
            <strong>Usage Data:</strong> pages viewed, clicks, referring pages,
            and approximate location (country/region) derived from IP.
          </li>
          <li>
            <strong>Cookies & Similar Technologies:</strong> to remember
            preferences, measure performance, and personalize content. See
            “Cookies” below.
          </li>
        </ul>

        <h2>3. Why We Use Your Data (Lawful Bases)</h2>
        <ul>
          <li>
            <strong>Provide the Service</strong> (contract/legitimate interests)
            — operate the site, deliver content and features.
          </li>
          <li>
            <strong>Analytics & Performance</strong> (consent/legitimate
            interests) — understand engagement to improve the Service.
          </li>
          <li>
            <strong>Marketing (Newsletter)</strong> (consent) — send emails if
            you opt in; you can unsubscribe anytime.
          </li>
          <li>
            <strong>Legal Compliance</strong> — comply with applicable laws and
            enforcement requests.
          </li>
        </ul>

        <h2>4. How We Share Data</h2>
        <ul>
          <li>
            <strong>Vendors/Processors:</strong> hosting, analytics, email
            providers (e.g., newsletter). They process data per our instructions
            and under appropriate safeguards.
          </li>
          <li>
            <strong>Legal/Protection:</strong> where required by law or to
            protect rights, safety, and integrity of the Service.
          </li>
          <li>
            <strong>Business Transfers:</strong> in case of a merger, sale, or
            reorganization, subject to this Policy.
          </li>
        </ul>

        <h2>5. Cookies</h2>
        <p>
          We use cookies and similar technologies (e.g., local storage) for
          authentication, preferences, analytics, and performance. Where
          required, we obtain consent via a cookie banner. You can change your
          preferences at any time through your browser settings or the cookie
          banner, if available.
        </p>

        <h2>6. Analytics & Tracking</h2>
        <p>
          We may use privacy-minded analytics (e.g., IP anonymization, aggregate
          reporting) to understand site usage. If third-party tools are used,
          they may set their own cookies or identifiers. See their privacy
          policies for details.
        </p>

        <h2>7. Data Retention</h2>
        <p>
          We retain personal data only for as long as necessary for the purposes
          listed in this Policy, and as required by law. Newsletter data is kept
          until you unsubscribe or request deletion.
        </p>

        <h2>8. Your Rights (GDPR)</h2>
        <ul>
          <li>Right to access, rectify, or erase your personal data.</li>
          <li>Right to restrict or object to processing.</li>
          <li>Right to data portability.</li>
          <li>
            Right to withdraw consent at any time (e.g., for marketing emails).
          </li>
          <li>
            Right to lodge a complaint with your local supervisory authority.
          </li>
        </ul>

        <h2>9. International Transfers</h2>
        <p>
          If data is transferred outside the EEA/UK, we use appropriate
          safeguards (e.g., Standard Contractual Clauses) to protect your
          information.
        </p>

        <h2>10. Security</h2>
        <p>
          We implement technical and organizational measures to protect personal
          data. However, no method of transmission or storage is 100% secure.
        </p>

        <h2>11. Children’s Privacy</h2>
        <p>
          The Service is not directed to children under the age of 16. If you
          believe a child provided personal data, please contact us to request
          deletion.
        </p>

        <h2>12. Third-Party Links & Affiliates</h2>
        <p>
          Our site contains links to third-party sites and affiliate partners.
          Their privacy practices are governed by their own policies. We may
          earn commissions from qualifying purchases—see our{" "}
          <a className="underline" href="/legal#affiliate-disclosure">
            Affiliate Disclosure
          </a>
          .
        </p>

        <h2>13. Changes to this Policy</h2>
        <p>
          We may update this Policy from time to time. We will post the updated
          version here with a new “Last updated” date. Material changes may be
          highlighted on the site.
        </p>

        <h2>14. Contact</h2>
        <p>
          To exercise your rights or ask questions about this Policy, contact us
          via{" "}
          <a className="underline" href="/contact">
            /contact
          </a>
          .
        </p>
      </section>
    </main>
  );
}
