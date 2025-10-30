/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'cdn.shopify.com', 'expeditionsubsahara.com'],
  },
  env: {
    SITE_URL: process.env.NODE_ENV === 'production' 
      ? 'https://gaaka.com' 
      : 'http://localhost:3000',
  },
}

module.exports = nextConfig