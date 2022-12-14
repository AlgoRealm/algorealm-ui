// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching,
});

const moduleExports = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  async redirects() {
    return [{ source: '/', destination: '/console', permanent: true }];
  },
  images: {
    domains: [
      'cf-ipfs.com',
      'dweb.link',
      'cloudflare-ipfs.com',
      'ipfs-gateway.cloud',
      'images.unsplash.com',
      'vitals.vercel-insights.com',
      'google-analytics.com',
      'ipfs.io',
      'ipfs.algonode.xyz',
    ],
  },
};

module.exports = withPWA({
  ...moduleExports,
});
