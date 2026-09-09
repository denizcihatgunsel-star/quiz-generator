import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@libsql/client", "@prisma/adapter-libsql", "pdf-parse", "stripe"],
  turbopack: {
    root: ".",
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "examina.ink" }],
        destination: "https://www.examina.ink/:path*",
        permanent: true,
      },
      {
        source: "/ultiple-choice-quiz-maker",
        destination: "/multiple-choice-quiz-maker",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
