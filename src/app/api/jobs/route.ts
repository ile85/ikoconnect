// src/app/api/jobs/route.ts
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "jobs.json");

  try {
    const json = fs.readFileSync(filePath, "utf-8");
    const jobs = JSON.parse(json);
    return NextResponse.json({ jobs });
  } catch (err) {
    console.error("Failed to load cached jobs:", err);
    return NextResponse.json({ error: "Cannot load jobs" }, { status: 500 });
  }
}
