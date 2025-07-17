import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // ✅ هذا السطر يمنع ESLint من إيقاف build حتى لو فيه أخطاء
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
