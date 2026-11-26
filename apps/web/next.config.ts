import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
  async rewrites() {
    return [
      { source: "/romain/deck", destination: "/romain/deck.html" },
      { source: "/romain/commande", destination: "/romain/commande.html" },
      { source: "/romain", destination: "/romain/index.html" },
    ];
  },
};

export default nextConfig;
