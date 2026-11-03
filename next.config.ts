import type { NextConfig } from "next";

// GITHUB_PAGES=1 builds a static export served from https://<user>.github.io/s/
const pages = process.env.GITHUB_PAGES === "1";

const nextConfig: NextConfig = pages
  ? { output: "export", basePath: "/s", images: { unoptimized: true }, trailingSlash: true }
  : {};

export default nextConfig;
