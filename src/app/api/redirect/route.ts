import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const to = req.nextUrl.searchParams.get("to");
  const aff = req.nextUrl.searchParams.get("aff") || "YOUR_AFF_ID";
  if (!to) {
    return NextResponse.json({ error: "Missing `to` parameter" }, { status: 400 });
  }

  // 👉 Optional: log this click to a database for analytics
  // await logClick({ target: to, affiliate: aff, timestamp: new Date() });

  // Redirect user to the real URL with your affiliate tracking appended
  const url = new URL(to);
  url.searchParams.set("aff", aff);

  return NextResponse.redirect(url.toString());
}
