import {resolvePackageJson}      from "@leight/utils-server";
import {normalize}               from "node:path";
import {type ISdkGeneratorProps} from "../api";
import {
    generatorServer,
    type IGeneratorServerParams
}                                from "../generator";

export type IWithServerSourceGeneratorsProps =
    IGeneratorServerParams
    &
    ISdkGeneratorProps;

export const withServerSourceGenerators = (
    {
        packageName = resolvePackageJson().name,
        folder = "src/sdk",
        ...params
    }: IWithServerSourceGeneratorsProps) => {
    if (!packageName) {
        throw new Error("Cannot resolve packageName");
    }
    return [
        async () => generatorServer({
            packageName,
            folder,
            barrel: true,
            params,
            directory: normalize(`${process.cwd()}/${folder}`),
        }),
    ];
};
