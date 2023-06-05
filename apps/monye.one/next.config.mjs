// @ts-check

import {
    dirname,
    join
} from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && await import('./src/env.mjs');

/** @type {import('next').NextConfig} */
export default {
    // output:            'standalone',
    experimental:      {
        outputFileTracingRoot: join(__dirname, '../../'),
        turbo:                 {},
        turbotrace:            {
            logLevel:  'suggestions',
            logDetail: true,
        },
    },
    transpilePackages: [
        '@leight/i18n-client',
    ],
    modularizeImports: {
        '@tabler/icons-react': {
            transform: '@tabler/icons-react/dist/esm/icons/{{member}}',
        },
    },
    reactStrictMode:   true,
    swcMinify:         true,
};
