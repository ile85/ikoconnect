import JobsList from "@/components/JobsList";
import { buildBasicMetadata } from "@/lib/metadata";

export const metadata = buildBasicMetadata({
  title: "Remote Job Board – IkoConnect",
  description: "Browse the latest remote & freelance job postings.",
  path: "/jobs",
  ogImage: "/images/og-jobs.png",
});

export default function JobsPage() {
  return (
    <section className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Remote Job Board</h1>
      <p className="text-lg text-gray-700 mb-8">
        Discover freelance & remote opportunities from top platforms.
      </p>
      <JobsList />
    </section>
  );
}
