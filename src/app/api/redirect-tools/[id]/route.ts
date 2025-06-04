import { NextRequest, NextResponse } from "next/server";
import { getToolById } from "@/lib/tools";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const tool = getToolById(id);

  if (!tool || !tool.url) {
    return NextResponse.json({ error: "Tool not found" }, { status: 404 });
  }

  try {
    // Правиме URL безбедно
    const rawUrl = tool.url.startsWith("http://")
      ? tool.url.replace("http://", "https://") // избегнување Mixed Content
      : tool.url;

    const redirectUrl = new URL(rawUrl);

    // Додај aff ID ако е потребно (само ако го нема веќе)
    const affId = process.env.NEXT_PUBLIC_AFF_ID;
if (!affId || affId === "YOUR_AFF_ID") {
  console.warn("Missing or placeholder affiliate ID. Set NEXT_PUBLIC_AFF_ID in your .env file.");
}
redirectUrl.searchParams.set("aff", affId || "");

    // Може да се логираат кликови овде...

    return NextResponse.redirect(redirectUrl.toString(), 302); // 302 = temporary redirect
  } catch (error) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 500 });
  }
}
