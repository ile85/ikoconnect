import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-url", request.url); // 👈 Inject URL into headers
  return response;
}

export const config = {
  matcher: ["/blog", "/blog/:path*"], // Apply only to /blog and its subpaths
};
