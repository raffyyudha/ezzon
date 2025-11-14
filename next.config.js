/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["*.preview.same-app.com"],
  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
      "www.satec-global.com",
      "satec-global.com",
      "sertec.com.py",
      "marine.sertec.com.py",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.satec-global.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "satec-global.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sertec.com.py",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "marine.sertec.com.py",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
