// /src/app/api/fetch-jobs/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { fixEncoding } from "../../../lib/fixEncoding";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function translateDescription(raw: string): Promise<string> {
  const clean = fixEncoding(raw).replace(/<[^>]+>/g, "").trim();
  try {
    const res = await openai.chat.completions.create({
      model: "gpt-o4-high-turbo",
      messages: [
        { role: "system", content: "You translate into clear American English." },
        { role: "user", content: clean },
      ],
      temperature: 0.2,
      max_tokens: 500,
    });
    const msg = res.choices?.[0]?.message;
    return msg?.content?.trim() ?? clean;
  } catch {
    return clean;
  }
}

export async function GET() {
  try {
    let jobsData: any[];

  // 1) обиди од remotive.com
  try {
    const remRes = await fetch("https://remotive.com/api/remote-jobs?limit=100", {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!remRes.ok) throw new Error(`Remotive status ${remRes.status}`);

    // decode iso-8859-1 ако треба
    const buf = await remRes.arrayBuffer();
    const text = new TextDecoder("iso-8859-1").decode(buf);
    jobsData = JSON.parse(text).jobs || [];
  } catch (e) {
    console.warn("⚠️ Remotive fetch failed, falling back to local data:", e);
    // 2) fallback на локален data/jobs.json
    const filePath = path.join(process.cwd(), "data", "jobs.json");
    const content = await fs.readFile(filePath, "utf-8");
    jobsData = JSON.parse(content);
  }

  // 3) map + превод на description
    const jobs = await Promise.all(
      jobsData.map(async (j: any) => ({
        id: j.id.toString(),
        title: j.title ?? "Untitled Job",
      company_name: j.company_name ?? "Unknown Company",
      candidate_required_location: j.candidate_required_location ?? "Remote",
      job_type: j.job_type ?? "Full-time",
      salary: j.salary ?? "Not specified",
      category: j.category ?? "Other",
      url: j.url.includes("?") ? `${j.url}&via=ilcho` : `${j.url}?via=ilcho`,
      publication_date: j.publication_date,
      company_logo: j.company_logo_url ?? j.company_logo,
      description: await translateDescription(j.description ?? ""),
      tags: j.tags ?? [],
      }))
    );

    return NextResponse.json({ status: 200 }, { status: 200 });
  } catch (err: any) {
    console.error("Failed to fetch jobs:", err);
    return NextResponse.json(
      { status: 500, error: err.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
