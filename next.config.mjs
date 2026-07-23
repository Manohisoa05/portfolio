/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Autoriser des images distantes de démonstration (à adapter selon vos besoins)
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
