/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com', 
      'cdn.shopify.com', 
      'expeditionsubsahara.com',
      // Add your WordPress domain for image optimization
      process.env.WORDPRESS_SITE_URL?.replace(/^https?:\/\//, '') || 'localhost',
    ].filter(Boolean),
  },
  env: {
    SITE_URL: process.env.NODE_ENV === 'production' 
      ? 'https://gaaka.com' 
      : 'http://localhost:3000',
  },
}

module.exports = nextConfig