import JobsList from "../../components/JobsList";
import { buildBasicMetadata } from "../../lib/metadata";

export const metadata = buildBasicMetadata({
  title: "Remote Job Board – IkoConnect",
  description: "Browse the latest remote & freelance job postings.",
  path: "/jobs",
  ogImage: "/images/og-jobs.png",
});

export default function JobsPage() {
  return (
    <section className="container mx-auto px-6 pt-28 pb-16 max-w-screen-lg">
  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white text-center mb-4">
    🚀 Remote Job Board
  </h1>
  <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-10">
    Discover freelance & remote opportunities curated from top platforms.
  </p>

      <JobsList />
    </section>
  );
}
