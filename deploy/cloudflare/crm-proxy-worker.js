/**
 * Cloudflare Worker: reverse-proxy /crm to CRM origin.
 * Use this if you want edge-level control and websocket pass-through.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const crmOrigin = env.CRM_ORIGIN || "https://crm-eight-lac.vercel.app";

    // Enforce canonical host.
    if (url.hostname !== "shakyaconsultants.com") {
      return Response.redirect(
        `https://shakyaconsultants.com${url.pathname}${url.search}`,
        308
      );
    }

    // Only proxy CRM path; pass through everything else.
    if (!url.pathname.startsWith("/crm")) {
      return fetch(request);
    }

    // /crm -> /login
    if (url.pathname === "/crm") {
      return Response.redirect("https://shakyaconsultants.com/crm/login", 307);
    }

    const upstream = new URL(crmOrigin);
    upstream.pathname = url.pathname.replace(/^\/crm/, "") || "/";
    upstream.search = url.search;

    const proxyReq = new Request(upstream.toString(), request);
    proxyReq.headers.set("x-forwarded-host", url.host);
    proxyReq.headers.set("x-forwarded-proto", "https");
    proxyReq.headers.set("x-forwarded-prefix", "/crm");

    const response = await fetch(proxyReq, { cf: { cacheEverything: false } });
    const proxied = new Response(response.body, response);
    proxied.headers.set("x-robots-tag", "noindex, nofollow, noarchive");

    return proxied;
  },
};
