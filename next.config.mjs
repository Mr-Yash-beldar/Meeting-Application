/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/favicon.ico',
        destination: '/icons/logo.svg',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
