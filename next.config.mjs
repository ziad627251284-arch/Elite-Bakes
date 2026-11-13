/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Cache Components staged rendering hangs in the Workers runtime.
  // Keep standard Next.js rendering for Cloudflare/OpenNext.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
