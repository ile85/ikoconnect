"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import he from "he";

import Breadcrumbs from "@/components/Breadcrumbs";
import JSONLD from "@/components/JSONLD";
import { fixEncoding } from "../../../lib/fixEncoding";
import { generateJobPostingJsonLD } from "../../../lib/jsonldGenerator";

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
  description?: string;
};

export default function JobDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";
  const router = useRouter();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      setError(true);
      setLoading(false);
      return;
    }

    async function fetchJob() {
      try {
        const res = await fetch("/api/fetch-jobs");
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const data: Job[] = await res.json();

        // slugify helper
        const slugify = (text: string) =>
          text
            .toLowerCase()
            .replace(/[^\w]+/g, "-")
            .replace(/(^-|-$)/g, "");

        const found = data.find((j) => {
          // match by numeric id
          if (j.id.toString() === id) return true;
          // match by last URL segment
          const parts = j.url.split('/').filter(Boolean);
          if (parts[parts.length - 1] === id) return true;
          // match by title slug
          if (slugify(j.title) === id) return true;
          return false;
        });

        if (!found) {
          console.error("Job not found for id:", id, "candidates:", data.map(j => ({ id: j.id, slug: slugify(j.title) })));
          throw new Error("Not found");
        }

        setJob(found);
      } catch (e) {
        console.error("❌ Failed to load job:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [id]);

  if (loading) {
    return <p className="p-6 text-center">Loading job details…</p>;
  }

  if (error || !job) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">❌ Job not found for "{id}".</p>
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => router.back()}
        >
          ← Go Back
        </button>
      </div>
    );
  }

  const raw = job.description ?? "";
  const cleaned = fixEncoding(raw);
  const safeHtml = he.decode(cleaned);

  const jsonldData = generateJobPostingJsonLD({
    title: job.title,
    description: cleaned,
    datePosted: job.publication_date,
    validThrough: new Date(new Date(job.publication_date).getTime() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    hiringOrganization: { name: job.company_name, logo: job.company_logo },
    employmentType: job.job_type,
    jobLocation: {
      address: {
        addressLocality: job.candidate_required_location || "Remote",
        addressCountry: "DE",
      },
    },
  });

  return (
    <section id="top" className="max-w-3xl mx-auto px-6 py-16">
      <JSONLD data={jsonldData} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/jobs", label: "Jobs" },
          { href: `/jobs/${id}`, label: job.title },
        ]}
      />

      <Link href="/jobs" className="text-sm text-[#00957F] hover:underline mb-6 inline-block">
        ← Back to Jobs
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold mb-2">{job.title}</h1>
      <p className="text-lg text-gray-700 mb-4">
        {job.company_name} — {job.candidate_required_location}
      </p>

      <div className="flex flex-wrap gap-2 text-sm mb-6">
        <span className="bg-gray-100 px-2 py-1 rounded">{job.category}</span>
        <span className="bg-gray-100 px-2 py-1 rounded">{job.job_type}</span>
        <span className="bg-gray-100 px-2 py-1 rounded">{new Date(job.publication_date).toLocaleDateString()}</span>
        {job.salary && <span className="bg-yellow-100 px-2 py-1 rounded">💸 {job.salary}</span>}
      </div>

      <div className="prose dark:prose-invert mb-8" dangerouslySetInnerHTML={{ __html: safeHtml }} />

      <Link
        href={job.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center px-6 py-3 bg-[#00957F] text-white rounded-lg hover:bg-[#007965] transition"
      >
        Apply Now →
      </Link>
    </section>
  );
}
