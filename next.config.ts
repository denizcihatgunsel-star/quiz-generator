import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@libsql/client", "@prisma/adapter-libsql", "pdf-parse", "stripe"],
};

export default nextConfig;
