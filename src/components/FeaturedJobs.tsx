"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBadgeColor } from "../lib/utils";
import JobSkeleton from "./JobSkeleton";

type Job = {
  id: string | number;
  title?: string;
  company_name?: string;
  category?: string;
  candidate_required_location?: string;
  job_type?: string;
  url?: string;
  publication_date?: string;
  company_logo?: string;
  salary?: string;
};

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        const raw = Array.isArray(data.jobs) ? data.jobs : [];
        const clean = raw[0]?.title === "Title" ? raw.slice(1) : raw;
        setJobs(clean.slice(0, 6)); // limit to 6
      } catch (err) {
        console.error("❌ Failed to load featured jobs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  return (
    <section className="w-full py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-3 text-foreground">
          Featured Jobs
        </h2>
        <p className="text-muted-foreground mb-10">
          Fresh freelance & remote job listings curated for you.
        </p>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => <JobSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-card p-6 rounded-xl border border-border text-left shadow hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {job.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {job.company_name} – {job.candidate_required_location}
                </p>
                <div className="flex gap-2 text-xs mt-2">
                  <span
                    className={`px-2 py-1 rounded ${getBadgeColor(
                      job.category || ""
                    )}`}
                  >
                    {job.category}
                  </span>
                  <span
                    className={`px-2 py-1 rounded ${getBadgeColor(
                      job.job_type || ""
                    )}`}
                  >
                    {job.job_type}
                  </span>
                </div>
                <Link
                  href={`/jobs/${job.id}`}
                  className="block mt-4 text-[#00957F] font-medium hover:underline"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}

        <Link
          href="/jobs"
          className="inline-block mt-10 px-6 py-3 bg-[#00957F] text-white font-medium rounded-md hover:bg-[#007965] transition"
        >
          View All Jobs
        </Link>
      </div>
    </section>
  );
}
