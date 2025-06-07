// /var/www/ikoconnect/src/components/JobsList.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getBadgeColor } from "../lib/utils";
import { fixEncoding } from "../lib/fixEncoding";

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
  description?: string;
  tags?: string[];
};

export default function JobsList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filtered, setFiltered] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState<string>("All");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  useEffect(() => {
    const controller = new AbortController();

    async function fetchJobs() {
      try {
        const res = await fetch("/api/fetch-jobs", { signal: controller.signal });
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const data: Job[] = await res.json();
        setJobs(data);
        setFiltered(data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("❌ Failed to load jobs:", err);
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    let result = jobs;
    if (activeType !== "All") {
      result = result.filter((j) => j.job_type === activeType);
    }
    if (activeCategory !== "All") {
      result = result.filter((j) => j.category === activeCategory);
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (j) =>
          (j.title ?? "").toLowerCase().includes(term) ||
          (j.company_name ?? "").toLowerCase().includes(term)
      );
    }
    setCurrentPage(1);
    setFiltered(result);
  }, [searchTerm, activeType, activeCategory, jobs]);

  const categories = Array.from(new Set(jobs.map((j) => j.category ?? "").filter(Boolean))).sort();
  const types = Array.from(new Set(jobs.map((j) => j.job_type ?? ""))).sort();

  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentJobs = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / jobsPerPage);

  return (
    <section className="relative overflow-hidden bg-background py-16">
      {/* Gradient glow behind the section */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r from-[#E0FFF9]/30 via-[#D5FAF0]/30 to-[#E0FFF9]/30
          bg-[length:200%_200%]
          animate-gradient-pan
          z-0
        "
      />

      <div className="relative z-10 max-w-screen-lg mx-auto px-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <input
            type="text"
            placeholder="Search jobs..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/3 focus:ring-2 focus:ring-teal-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-300"
            value={activeType}
            onChange={(e) => setActiveType(e.target.value)}
          >
            <option value="All">All Types</option>
            {types.map((type, i) => (
              <option key={`type-${i}`} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-300"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((cat, i) => (
              <option key={`cat-${i}`} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Loading / Error / Content */}
        {loading ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {[...Array(jobsPerPage)].map((_, i) => (
              <div key={i} className="rounded-2xl p-6 bg-white dark:bg-gray-800 overflow-hidden">
                <div className="h-6 w-3/4 mb-4 shimmer rounded"></div>
                <div className="h-4 w-1/2 mb-6 shimmer rounded"></div>
                <div className="space-y-2">
                  <div className="h-4 shimmer rounded"></div>
                  <div className="h-4 shimmer rounded w-5/6"></div>
                  <div className="h-4 shimmer rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-500 py-12">
            ❌ Failed to load jobs. Please try again later.
          </p>
        ) : (
          <>
            {/* Job Cards */}
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {currentJobs.map((job) => {
                const desc = job.description ?? "";
                const preview =
                  fixEncoding(desc.replace(/<[^>]+>/g, ""))
                    .slice(0, 160)
                    .trim() + "…";

                return (
                  <div
                    key={job.id}
                    className="group relative flex flex-col justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    {job.company_logo && (
                      <img
                        src={job.company_logo}
                        alt={`${job.company_name ?? ""} logo`}
                        className="h-10 w-auto mb-4 object-contain"
                      />
                    )}

                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#00957F] transition">
                        {job.title ?? "Untitled Job"}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {job.company_name ?? "Unknown Company"}{" "}
                        <span className="text-xs text-gray-400">
                          — {job.candidate_required_location ?? "Anywhere"}
                        </span>
                      </p>
                      <div className="flex flex-wrap mt-3 gap-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${getBadgeColor(
                            job.category ?? ""
                          )}`}
                        >
                          {job.category ?? "Other"}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${getBadgeColor(
                            job.job_type ?? ""
                          )}`}
                        >
                          {job.job_type ?? "N/A"}
                        </span>
                        {job.publication_date && (
                          <span className="px-2 py-1 rounded text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                            {new Date(job.publication_date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm mt-2 line-clamp-3">{preview}</p>

                    <Link
                      href={`/jobs/${job.id}`}
                      className="inline-block mt-4 text-center px-5 py-2 bg-[#00957F] text-white font-medium rounded-md hover:bg-[#007965] transition"
                    >
                      View Details →
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* No results */}
            {filtered.length === 0 && (
              <p className="text-center text-gray-500 mt-8">
                No jobs found for your search criteria.
              </p>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={`page-${i}`}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded ${
                      currentPage === i + 1
                        ? "bg-[#00957F] text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
