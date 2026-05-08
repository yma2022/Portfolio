/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Portfolio',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: '/Portfolio',
  },
};

module.exports = nextConfig;
