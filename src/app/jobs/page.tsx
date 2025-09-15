// src/app/jobs/page.tsx
import JobsList from "../../components/JobsList";
import { buildBasicMetadata } from "../../lib/metadata";
import JSONLD from "../../components/JSONLD";

export const metadata = buildBasicMetadata({
  title: "Remote Job Board – IkoConnect",
  description: "Browse the latest remote & freelance job postings.",
  path: "/jobs",
  ogImage: "/images/og-jobs.png",
});

const jsonldData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Remote Job Board – IkoConnect",
  url: "https://ikoconnect.com/jobs",
  description: "Browse the latest remote & freelance job postings.",
};

export default function JobsPage() {
  return (
    <section className="container mx-auto max-w-screen-lg px-6 pt-28 pb-16">
      <JSONLD data={jsonldData} />

      <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl">
        🚀 Remote Job Board
      </h1>
      <p className="mb-8 text-center text-lg text-gray-600 dark:text-gray-300">
        Discover freelance & remote opportunities curated from top platforms.
      </p>

      {/* Affiliate / data disclaimer */}
      <aside
        role="note"
        aria-label="Important information"
        className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800/50 dark:bg-amber-900/20 dark:text-amber-200"
      >
        <p className="mb-1">
          Some listings may include affiliate links or partner relationships. We may earn a small commission at no additional cost to you. See our{" "}
          <a
            href="/legal#affiliate-disclosure"
            className="underline hover:no-underline"
          >
            Affiliate Disclosure
          </a>
          .
        </p>
        <p className="opacity-90">
          Job details are provided by third-party sources and may change without notice. Always verify terms on the original posting before applying.
        </p>
      </aside>

      {/* (Optional) quick sources blurb */}
      <div className="mb-8 rounded-xl border border-gray-200 p-4 text-sm text-gray-700 dark:border-gray-800 dark:text-gray-300">
        <span className="font-semibold">Sources:</span> curated platforms and company career pages. We prioritize relevancy, recency, and clear remote eligibility.
      </div>

      <JobsList />
    </section>
  );
}
