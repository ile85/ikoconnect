// src/lib/jobs.ts
import { promises as fs } from "fs"; // ⬅ промена тука
import path from "path";
// import { readFileAsUTF8 } from "@/lib/readFileUTF8";


export type Job = {
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
export async function getBlogPost(slug: string) {
  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`);
  const content = await fs.readFile(filePath, "utf-8");
  return content;
}
const jobsPath = path.join(process.cwd(), "data", "jobs.json");

export async function getAllJobs(): Promise<Job[]> {
  try {
    const json = await fs.readFile(jobsPath, "utf-8");
    const raw = JSON.parse(json);
    return raw[0]?.title === "Title" ? raw.slice(1) : raw;
  } catch (err) {
    console.error("❌ Failed to load jobs:", err);
    return [];
  }
}

export async function getAllJobTypes(): Promise<string[]> {
  const jobs = await getAllJobs();
  const jobTypes = new Set<string>();
  jobs.forEach((job) => {
    if (job.job_type) jobTypes.add(job.job_type);
  });
  return Array.from(jobTypes);
}

export async function getJobById(id: string): Promise<Job | undefined> {
  const jobs = await getAllJobs();
  return jobs.find((j) => j.id === id);
}
export async function getJobsByType(type: string): Promise<Job[]> {
  const jobs = await getAllJobs();
  return jobs.filter((j) => j.job_type === type);
}