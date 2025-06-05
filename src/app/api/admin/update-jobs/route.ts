// src/app/api/admin/update-jobs/route.ts
import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";

export async function GET() {
  return new Promise((resolve) => {
    const scriptPath = path.resolve(process.cwd(), "scripts/update-jobs.js");

    exec(`node "${scriptPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Error running update-jobs.js:", stderr);
      resolve(
        NextResponse.json(
          { status: 500, error: stderr || "Failed to update jobs." },
          { status: 500 }
        )
      );
        return;
      }

      console.log("✅ Job update log:", stdout);
      resolve(NextResponse.json({ status: 200 }, { status: 200 }));
    });
  });
}
