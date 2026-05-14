import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const canonicalHost = process.env.CANONICAL_HOSTNAME?.toLowerCase();

function normalizeHost(host: string) {
  return host.toLowerCase().replace(/^www\./, "");
}

export function middleware(req: NextRequest) {
  // Only enforce in production when canonical host is explicitly configured.
  if (process.env.NODE_ENV !== "production" || !canonicalHost) {
    return NextResponse.next();
  }

  const host = req.headers.get("host")?.toLowerCase();
  if (!host) {
    return NextResponse.next();
  }

  const canonicalNoWww = normalizeHost(canonicalHost);
  const hostNoWww = normalizeHost(host);

  // Allow both apex/www variants to avoid redirect loops caused by platform-level host redirects.
  if (hostNoWww === canonicalNoWww) {
    return NextResponse.next();
  }

  // Protect against direct Vercel-host access by redirecting to canonical public host.
  if (!host.endsWith(".vercel.app")) {
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
