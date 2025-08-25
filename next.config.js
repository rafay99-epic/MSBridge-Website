/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: true,
            hmrRefreshes: true,
            incomingRequests: {
                ignore: [/\api\/v1\/health/],
            },
        },
    },
    images: {
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 60 * 60 * 24, // 1 day
    },
    async headers() {
        return [{
                source: "/:all*(js|css|svg|png|jpg|jpeg|gif|webp|avif)",
                headers: [{
                    key: "Cache-Control",
                    value: "public, max-age=31536000, immutable",
                }, ],
            },
            {
                source: "/:all*(json|xml)",
                headers: [{
                    key: "Cache-Control",
                    value: "public, max-age=3600, stale-while-revalidate=86400",
                }, ],
            },
        ];
    },
    experimental: {
        esmExternals: true,
        reactCompiler: true,
    },
    transpilePackages: ['swiper'],
    webpack: (config) => {
        return config;
    },
};

module.exports = nextConfig;