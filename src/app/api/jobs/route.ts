// src/app/api/jobs/route.ts
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "jobs.json");

  try {
    fs.readFileSync(filePath, "utf-8");
    return NextResponse.json({ status: 200 }, { status: 200 });
  } catch (err: any) {
    console.error("Failed to load cached jobs:", err);
    return NextResponse.json(
      { status: 500, error: err.message ?? "Cannot load jobs" },
      { status: 500 }
    );
  }
}
