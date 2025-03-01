const withAnalyzer = require('@next/bundle-analyzer');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: getRemotePatterns(),
  },
  eslint: {
    ignoreDuringBuilds: true,
},
};

module.exports = withAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);

function getRemotePatterns() {
  // add here the remote patterns for your images
  const remotePatterns = [];

  return IS_PRODUCTION
    ? remotePatterns
    : [
        {
          protocol: 'http',
          hostname: '127.0.0.1',
        },
      ];
}
