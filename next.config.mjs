/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/starknet_', // Replace <REPO_NAME> with the name of your GitHub repository
  assetPrefix: '/starknet_', // Same as basePath
  images: {
    unoptimized: true, // Disable Next.js image optimization for GitHub Pages
  },
  output: 'export',
};

export default nextConfig;
