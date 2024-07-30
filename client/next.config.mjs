/** @type {import('next').NextConfig} */
const nextConfig = {

    reactStrictMode: false,

    async redirects() {
        return [
            {
                source: '/',
                destination: '/signup',
                permanent: true,
            },
        ]
    }

};

export default nextConfig;
