import React from "react";
import Link from "next/link";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  url: string;
};

const jobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Acme Corp",
    location: "Remote",
    url: "#",
  },
  {
    id: "2",
    title: "Full-Stack Engineer",
    company: "RemoteWorks",
    location: "Worldwide",
    url: "#",
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "DesignHub",
    location: "EU Time Zone",
    url: "#",
  },
];

function JobsList() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="group p-6 border border-gray-200 rounded-xl hover:shadow-lg transition"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-[#00957F] transition-colors">
            {job.title}
          </h3>
          <p className="text-gray-700 mb-4">
            <span className="font-medium">{job.company}</span> — {job.location}
          </p>
          <Link
            href={job.url}
            className="inline-block px-5 py-2 bg-[#00957F] text-white font-medium rounded-md hover:bg-[#007965] transition"
          >
            Apply Now →
          </Link>
        </div>
      ))}
    </div>
  );
}

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
