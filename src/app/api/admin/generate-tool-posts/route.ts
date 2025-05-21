import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";

export async function GET() {
  return new Promise((resolve) => {
    const script = path.resolve(process.cwd(), "scripts", "generate-affiliate-posts.js");
    exec(`node "${script}"`, (err, stdout, stderr) => {
      if (err) return resolve(NextResponse.json({ error: stderr }, { status: 500 }));
      return resolve(NextResponse.json({ message: stdout }));
    });
  });
}
