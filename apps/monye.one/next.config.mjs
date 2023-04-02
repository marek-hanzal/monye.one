// @ts-check
import i18n from "./next-i18next.config.js";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
export default {
    experimental:      {
        turbo: {},
    },
    reactStrictMode:   true,
    swcMinify:         true,
    i18n:              i18n.i18n,
    transpilePackages: [],
    modularizeImports: {}
};
