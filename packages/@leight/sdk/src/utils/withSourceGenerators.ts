import {resolvePackageJson}      from "@leight/utils-server";
import {normalize}               from "node:path";
import {type ISdkGeneratorProps} from "../api";
import {
    generatorCommon,
    type IGeneratorCommonParams
}                                from "../generator";

export type IWithSourceGeneratorsProps =
    IGeneratorCommonParams
    &
    ISdkGeneratorProps;

export const withSourceGenerators = (
    {
        packageName = resolvePackageJson().name,
        folder = "src/sdk",
        ...params
    }: IWithSourceGeneratorsProps) => {
    if (!packageName) {
        throw new Error("Cannot resolve packageName");
    }

    return [
        async () => generatorCommon({
            packageName,
            folder,
            barrel:    false,
            params,
            directory: normalize(`${process.cwd()}/${folder}`),
        }),
    ];
};
