/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [],
  },
  // Disable font optimization for Cloudflare Workers compatibility
  optimizeFonts: false,
  // Disable SWC minify for better compatibility
  swcMinify: false,
  // Disable static optimization for dynamic routes
  staticPageGenerationTimeout: 1000,
}

module.exports = nextConfig