// src/app/api/admin/tools/add/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "affiliateTools.json");

export async function POST(req: Request) {
  try {
    const newTool = await req.json();

    if (!newTool.slug || !newTool.name || !newTool.description || !newTool.url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const file = fs.readFileSync(filePath, "utf-8");
    const tools = JSON.parse(file);

    // Check if exists
    const exists = tools.find((t: any) => t.slug === newTool.slug);
    if (exists) {
      return NextResponse.json({ error: "Tool already exists" }, { status: 409 });
    }

    tools.push(newTool);
    fs.writeFileSync(filePath, JSON.stringify(tools, null, 2));

    // 🔁 OG Image generation
    try {
      await fetch(`https://www.ikoconnect.com/api/generate-og?slug=${newTool.slug}`);
    } catch (ogErr) {
      console.warn("⚠️ OG image generation failed:", ogErr);
    }

    return NextResponse.json({ status: 200 }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ status: 500, error: err.message }, { status: 500 });
  }
}
