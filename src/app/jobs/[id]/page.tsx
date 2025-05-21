import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import path from "path";
import fs from "fs";

type Job = {
  id: string;
  title: string;
  company_name: string;
  category: string;
  candidate_required_location: string;
  job_type: string;
  url: string;
  publication_date: string;
  company_logo?: string;
  salary?: string;
  description: string;
};

// Load all jobs from data/jobs.json
function getAllJobs(): Job[] {
  const filePath = path.join(process.cwd(), "data", "jobs.json");
  try {
    const json = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(json);
  } catch (err) {
    console.error("Failed to load jobs:", err);
    return [];
  }
}

// Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const job = getAllJobs().find((j) => j.id === params.id);
  if (!job) return {};

  return {
    title: `${job.title} – ${job.company_name}`,
    description: job.description?.replace(/<[^>]+>/g, "").slice(0, 160),
    openGraph: {
      title: `${job.title} – ${job.company_name}`,
      description: job.description?.replace(/<[^>]+>/g, "").slice(0, 160),
      url: `https://ikoconnect.com/jobs/${job.id}`,
      images: [
        {
          url: job.company_logo || "/images/og-jobs.png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} – ${job.company_name}`,
      images: [job.company_logo || "/images/og-jobs.png"],
    },
  };
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = getAllJobs().find((j) => j.id === params.id);
  if (!job) return notFound();

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      {/* Back */}
      <Link href="/jobs" className="text-sm text-[#00957F] hover:underline mb-6 inline-block">
        ← Back to Jobs
      </Link>

      <h1 className="text-4xl font-bold text-gray-900 mb-2">{job.title}</h1>
      <p className="text-lg text-gray-700 mb-4">
        <strong>{job.company_name}</strong> — {job.candidate_required_location}
      </p>

      <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
        <span>📂 {job.category}</span>
        <span>🕐 {job.job_type}</span>
        {job.salary && <span>💸 {job.salary}</span>}
        <span>🗓️ {new Date(job.publication_date).toLocaleDateString()}</span>
      </div>

      {job.company_logo && (
        <div className="mb-6">
          <img
            src={job.company_logo}
            alt={`${job.company_name} logo`}
            className="h-20 object-contain"
          />
        </div>
      )}

      <div
        className="prose dark:prose-invert max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: job.description }}
      />

      <a
        href={job.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 bg-[#00957F] text-white font-semibold rounded-md hover:bg-[#007965] transition"
      >
        Apply Now →
      </a>

      <div className="mt-6 flex gap-4 text-sm text-[#00957F]">
        <span className="font-medium text-gray-600">Share:</span>
        <a
          href={`https://twitter.com/intent/tweet?url=https://ikoconnect.com/jobs/${job.id}&text=${encodeURIComponent(job.title)}`}
          target="_blank"
          className="hover:underline"
        >
          X
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=https://ikoconnect.com/jobs/${job.id}`}
          target="_blank"
          className="hover:underline"
        >
          LinkedIn
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=https://ikoconnect.com/jobs/${job.id}`}
          target="_blank"
          className="hover:underline"
        >
          Facebook
        </a>
      </div>
    </section>
  );
}
