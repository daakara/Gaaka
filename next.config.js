/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Disable x-powered-by header for security
  poweredByHeader: false,
  
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
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ]
  },
  
  async redirects() {
    return [
      {
        source: '/gift-cards',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig