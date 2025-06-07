import { NextResponse } from "next/server";
import { tools } from "@/lib/tools";

export async function GET() {
  return NextResponse.json({ tools }, { status: 200 });
}
