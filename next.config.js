/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["*.preview.same-app.com"],
  images: {
    formats: ['image/webp', 'image/avif'],
    quality: 75, // Reduce quality for smaller files
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: false, // Enable optimization
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
