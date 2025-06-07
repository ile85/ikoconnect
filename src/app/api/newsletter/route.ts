import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "Invalid email format." }, { status: 400 });
    }

    // (Future: hook up to Mailchimp/DB/etc.)
    return NextResponse.json({ message: "Subscribed successfully!" }, { status: 200, headers: { "Access-Control-Allow-Origin": "*" } }
);
  } catch (err) {
    console.error("Error in /api/newsletter:", err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
