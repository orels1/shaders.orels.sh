const withMarkdoc = require('@markdoc/next.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'ts', 'tsx'],
  experimental: {
    scrollRestoration: true,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = withMarkdoc()(nextConfig)
