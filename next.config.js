/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: process.env.BASE_PATH || undefined,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL
  }
}

module.exports = nextConfig