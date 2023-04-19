import {resolvePackageJson}      from "@leight/utils-server";
import {normalize}               from "node:path";
import {type ISdkGeneratorProps} from "../api";
import {
    generatorClientSource,
    type IGeneratorClientSourceParams,
}                                from "../generator";

export type IWithClientSourceGeneratorsProps =
    IGeneratorClientSourceParams
    &
    ISdkGeneratorProps;

export const withClientSourceGenerators = (
    {
        packageName = resolvePackageJson().name,
        folder = "src/sdk",
        ...params
    }: IWithClientSourceGeneratorsProps) => {
    if (!packageName) {
        throw new Error("Cannot resolve packageName");
    }
    return [
        async () => generatorClientSource({
            packageName,
            folder,
            barrel:    true,
            params,
            directory: normalize(`${process.cwd()}/${folder}`),
        }),
    ];
};
