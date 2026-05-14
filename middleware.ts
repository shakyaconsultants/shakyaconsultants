import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const canonicalHost = process.env.CANONICAL_HOSTNAME?.toLowerCase();

export function middleware(req: NextRequest) {
  // Only enforce in production when canonical host is explicitly configured.
  if (process.env.NODE_ENV !== "production" || !canonicalHost) {
    return NextResponse.next();
  }

  const host = req.headers.get("host")?.toLowerCase();
  if (!host || host === canonicalHost) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.protocol = "https:";
  url.host = canonicalHost;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/crm/:path*"],
};
