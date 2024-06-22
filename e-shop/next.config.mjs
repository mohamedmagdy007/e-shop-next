/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["media.istockphoto.com", "www.minddigital.com"],
  },
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 100,
    },
  },
};

export default nextConfig;
