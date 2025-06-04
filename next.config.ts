// next.config.ts
import path from "path";
import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["puppeteer"],
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ikoconnect.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.ikoconnect.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 768, 1024, 1200],
  },
  async headers() {
    return [
      {
        source: "/(.*)\\.(js|css|png|jpg|svg|webp|avif|woff2?)$",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*)\\.html$",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
  webpack(config: any) {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "@": path.resolve(__dirname, "src"),
      // Alias the missing instrumentation client to our shim
      "private-next-instrumentation-client": path.resolve(
        __dirname,
        "private-next-instrumentation-client.js"
      ),
    };
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
      