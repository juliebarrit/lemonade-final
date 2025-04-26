/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Configure image domains to allow for your backend URLs
  images: {
    domains: ['localhost', '127.0.0.1'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/storage/**',
      },
    ],
  },
  // Fix the experimental options to be compatible with Next.js 15
  experimental: {
    // Update serverActions to be an object instead of a boolean
    serverActions: {
      enabled: true
    }
  }
}

module.exports = nextConfig
