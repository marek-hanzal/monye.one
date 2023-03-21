import {
    build as coolBuild,
    BuildOptions
}                    from "esbuild";
import {withEsbuild} from "./withEsbuild";

export const build = async (config?: BuildOptions) => coolBuild(withEsbuild(config));
