import {withSourceFile}  from "@leight/generator-server";
import {glob}            from "@leight/utils-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../api";

export interface IGeneratorSdkBarrelParams {
}

export const generatorSdkBarrel: IGenerator<IGeneratorSdkBarrelParams> = async (
    {
        barrel,
        directory,
    }) => {
    if (!barrel) {
        return;
    }
    const $directory = directory.replaceAll("\\", "/");
    const file = withSourceFile();
    file.withExports({
        exportsOf: glob(normalize(`${directory}/**/*`).replaceAll("\\", "/")).map(item => "." + item.replaceAll($directory, "").replace(".tsx", "").replace(".ts", ""))
    });
    file.saveTo({
        file:   `${directory}/index.ts`,
        barrel: false,
    });
};
