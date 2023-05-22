import {type BuildOptions} from "esbuild";

export const withEsbuild = (config?: BuildOptions): BuildOptions => {
    return {
        entryPoints: ["src/index.ts"],
        bundle:      true,
        target:      [
            "es2022"
        ],
        platform:    "node",
        format:      "esm",
        sourcemap:   true,
        outdir:      "lib",
        packages:    "external",
        // banner: {
        //     js: '"use client";',
        // },
        ...config,
    };
};
