/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    transpilePackages: [
        '@mui/x-date-pickers',
        '@mui/material',
    ],
}

export default nextConfig
