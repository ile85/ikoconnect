"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Job = {
  id: string | number;
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
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs");
        if (!res.ok) throw new Error("API error");

        const data = await res.json();
        setJobs(data.jobs || []);
        setFiltered(data.jobs || []);
      } catch (err) {
        console.error("❌ Failed to load jobs:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  useEffect(() => {
    let result = jobs;

    if (activeType !== "All") {
      result = result.filter((job) => job.job_type === activeType);
    }

    if (activeCategory !== "All") {
      result = result.filter((job) => job.category === activeCategory);
    }

    if (searchTerm.trim()) {
      result = result.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setCurrentPage(1); // reset on filter change
    setFiltered(result);
  }, [searchTerm, activeType, activeCategory, jobs]);

  const categories = Array.from(new Set(jobs.map((j) => j.category))).sort();
  const types = Array.from(new Set(jobs.map((j) => j.job_type))).sort();

  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentJobs = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / jobsPerPage);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p className="text-red-500">❌ Failed to load jobs. Please try again later.</p>;
  

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search jobs..."
          className="px-4 py-2 border rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="px-3 py-2 border rounded"
          value={activeType}
          onChange={(e) => setActiveType(e.target.value)}
        >
          <option value="All">All Types</option>
          {types.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>

        <select
          className="px-3 py-2 border rounded"
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Job Cards */}
      <div className="grid gap-8 md:grid-cols-2">
        {currentJobs.map((job) => (
          <div
            key={job.id}
            className="group p-6 border border-gray-200 rounded-xl hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-[#00957F] transition-colors">
              {job.title}
            </h3>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">{job.company_name}</span> —{" "}
              {job.candidate_required_location}
            </p>
            <p className="text-sm text-gray-500">
              {job.category} • {job.job_type}
            </p>
            <Link
              href={`/jobs/${job.id}`}
              className="inline-block mt-4 px-5 py-2 bg-[#00957F] text-white font-medium rounded-md hover:bg-[#007965] transition"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
      {/* No jobs found */}
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
              key={i}
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
  );
}
