/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Trailing slashes for better compatibility
  trailingSlash: true,
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  
  env: {
    SITE_URL: process.env.NODE_ENV === 'production' 
      ? 'https://gaaka.com' 
      : 'http://localhost:3000',
  },
}

module.exports = nextConfig