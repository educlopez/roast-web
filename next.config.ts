import type { NextConfig } from "next";
import withVercelToolbar from "@vercel/toolbar/plugins/next";
const nextConfig: NextConfig = withVercelToolbar()({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yuhzjzwbuimajdzpakby.supabase.co",
      },
      {
        protocol: "https",
        hostname: "res-console.cloudinary.com",
      },
    ],
  },
});

export default nextConfig;
