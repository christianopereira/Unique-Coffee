/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    ADMIN_PASSWORD_HASH:
      process.env.ADMIN_PASSWORD_HASH ||
      "1b8a0c2b8d660e24dc1aa8f4480819c6:054f845e61f3678fb00b3375b6bdbfd4b5866ee48f169fd549a340626e0bee206ae96226cf2a613ed440c405252d9b2ee2d050044259b6ab4c086d18c605e1e4",
    ADMIN_SESSION_SECRET:
      process.env.ADMIN_SESSION_SECRET ||
      "8d37b41c46443fdbeb99798347bd6907d03299118e052e72d93c50d5b04c48a3",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/((?!_next/static|images|favicon|apple-icon).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/apple-icon.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
