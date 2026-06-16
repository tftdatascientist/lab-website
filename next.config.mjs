/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.microlink.io",
      },
    ],
  },
  async redirects() {
    return [
      // Stary auto-system "Dziennik AI" → Blog (zachowanie link equity)
      { source: "/dziennik", destination: "/blog", permanent: true },
      { source: "/dziennik/:slug", destination: "/blog", permanent: true },
      // Scalenie Usługi + Technologia → hub Wdrożenia
      { source: "/uslugi", destination: "/wdrozenia", permanent: true },
      { source: "/uslugi/:slug", destination: "/wdrozenia/:slug", permanent: true },
      { source: "/technologia", destination: "/wdrozenia", permanent: true },
    ];
  },
};

export default nextConfig;
