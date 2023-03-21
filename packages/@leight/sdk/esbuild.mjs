import { build } from "@leight/esbuild";

await build({
    entryPoints: ["src/index.ts", "src/bin.ts"],
});
