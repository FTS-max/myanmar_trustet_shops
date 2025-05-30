/** @type {import('next').NextConfig} */
// Temporarily commenting out Auth0 integration due to missing package
// const { withAuth } = require('@auth0/nextjs-auth0');

const nextConfig = {
    reactStrictMode: true,
    async headers() {
        return [{
            source: '/(.*)',
            headers: [{
                    key: 'Content-Security-Policy',
                    value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
                },
                {
                    key: 'X-Frame-Options',
                    value: 'DENY'
                },
                {
                    key: 'X-Content-Type-Options',
                    value: 'nosniff'
                },
                {
                    key: 'Referrer-Policy',
                    value: 'origin-when-cross-origin'
                },
                {
                    key: 'Permissions-Policy',
                    value: 'camera=(), microphone=(), geolocation=()'
                }
            ]
        }];
    }
};

// Temporarily exporting the config directly instead of wrapping with Auth0
module.exports = nextConfig; // withAuth(nextConfig);