import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mongoose", "nodemailer", "bcryptjs"],
};

export default nextConfig;
