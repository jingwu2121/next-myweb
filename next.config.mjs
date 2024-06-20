/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
    experimental: {
        appDir: true,
    },
    output: 'export',
    distDir: 'dist',
    images: {
        unoptimized: true,
    }
};

export default nextConfig;
