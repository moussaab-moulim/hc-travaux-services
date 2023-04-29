const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //trailingSlash: true,
  swcMinify: true,
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
    ],
    domains: [
      "images.prismic.io",
      "scontent.cdninstagram.com",
      "hc-travaux-services.cdn.prismic.io",
      "images.unsplash.com",
      "scontent-sea1-1.cdninstagram.com",
    ],
    // next/image support `srcSet` using the below deviceSizes
    // for more info, visit https://nextjs.org/docs/basic-features/image-optimization#device-sizes
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // https://nextjs.org/docs/basic-features/image-optimization#image-sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  i18n: {
    localeDetection: false,
    locales: ["fr"],
    defaultLocale: "fr",
  },
  redirects: async () => {
    return [
      {
        source: "/blog",
        destination: "/blog/page/1",
        permanent: true,
      },
      {
        source: "/blog/page",
        destination: "/blog/page/1",
        permanent: true,
      },
      {
        source: "/blog/posts",
        destination: "/blog/page/1",
        permanent: true,
      },
      {
        source: "/les-salles-de-sport-nessfit-neuchatel-et-central-gym",
        destination: "/la-salle-de-sport-nessfit-neuchatel",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
