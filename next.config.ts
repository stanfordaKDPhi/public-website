import type { NextConfig } from "next";

/** Set in CI for project pages (user.github.io/repo/). Leave empty for username.github.io repos or custom domains. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
