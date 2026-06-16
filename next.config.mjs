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
      // Scalenie Usługi → hub Wdrożenia
      { source: "/uslugi", destination: "/wdrozenia", permanent: true },
      { source: "/uslugi/:slug", destination: "/wdrozenia/:slug", permanent: true },
      // Migracja artykułów Technologia → Blog (zachowanie link equity)
      { source: "/technologia/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/technologia", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
