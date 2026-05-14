/** @type {import('next').NextConfig} */
const crmOrigin =
  (process.env.CRM_ORIGIN || "https://crm-eight-lac.vercel.app").replace(/\/$/, "");

const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Canonical CRM entrypoint for users/bookmarks.
      {
        source: "/crm",
        destination: "/crm/login",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      // Reverse-proxy CRM under main domain path.
      {
        source: "/crm/:path*",
        destination: `${crmOrigin}/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/crm/:path*",
        headers: [
          // Keep CRM pages out of index, while allowing app behavior.
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
