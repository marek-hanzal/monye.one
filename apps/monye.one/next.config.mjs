// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && await import('./src/env.mjs');

/** @type {import('next').NextConfig} */
export default {
    experimental:      {
        serverActions: true,
        turbo:         {},
    },
    transpilePackages: [
        '@leight/env',
        '@leight/i18n-client',
    ],
    modularizeImports: {},
    reactStrictMode:   true,
    swcMinify:         true,
};
