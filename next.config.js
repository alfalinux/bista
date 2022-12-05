/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXTAUTH_URL: "https://bista.vercel.app",
  },
};

module.exports = nextConfig;
