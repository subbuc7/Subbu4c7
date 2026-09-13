import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/Subbu4c7" : "",
  trailingSlash: true,
  images: { unoptimized: true }
};

export default nextConfig;
