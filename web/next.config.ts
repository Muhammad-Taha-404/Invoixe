import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  ...nextConfig,
  allowedDevOrigins: ['192.168.100.68'] ,
};

