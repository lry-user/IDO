import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  transpilePackages: [
    "nuqs",
    "next-auth",
    "@heroui/react",
    "@auth",
    "oauth4webapi",
    "@trpc/client",
    "@trpc/react-query",
    "@trpc/tanstack-react-query",
    "next-intl",
    "@tanstack",
    "embla-carousel-autoplay",
    "embla-carousel-react",
  ]
};

export default withNextIntl(nextConfig);