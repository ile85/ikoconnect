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
    // Enforce HTTPS
    const rawUrl = tool.url.startsWith("http://")
      ? tool.url.replace("http://", "https://")
      : tool.url;

    const redirectUrl = new URL(rawUrl);

    // Add UTM if missing (non-invasive, не менува affiliate params)
    if (!redirectUrl.searchParams.get("utm_source")) {
      redirectUrl.searchParams.set("utm_source", "ikoconnect");
    }
    if (!redirectUrl.searchParams.get("utm_medium")) {
      redirectUrl.searchParams.set("utm_medium", "affiliate");
    }
    if (!redirectUrl.searchParams.get("utm_campaign")) {
      redirectUrl.searchParams.set("utm_campaign", id);
    }

    // Optional: subId tracking ако партнер дозволува, но само ако има ENV и нема конфликт
    // const subId = process.env.NEXT_PUBLIC_AFF_SUBID;
    // if (subId && !redirectUrl.searchParams.get("subId")) {
    //   redirectUrl.searchParams.set("subId", subId);
    // }

    // Minimal logging (може да се замени со база)
    const ua = req.headers.get("user-agent") || "unknown";
    const ref = req.headers.get("referer") || "direct";
    console.log(`[click] tool=${id} ref=${ref} ua=${ua}`);

    const res = NextResponse.redirect(redirectUrl.toString(), 302);
    // Hint за ботови да не индексираат оваа interim-рута
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    // Security headers (light)
    res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    return res;
  } catch (error) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 500 });
  }
}
