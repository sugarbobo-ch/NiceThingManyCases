import type { NextConfig } from 'next';

const mediaBaseUrl =
  process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL?.replace(
    /^https?:\/\//,
    ''
  ).replace('.strapiapp.com', '.media.strapiapp.com') || '';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  images: {
    domains: [mediaBaseUrl],
  },
};

export default nextConfig;
