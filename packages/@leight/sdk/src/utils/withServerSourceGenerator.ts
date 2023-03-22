import {resolvePackageJson} from "@leight/utils-server";
import {
    generatorServerSource,
    type IGeneratorServerSourceParams
}                           from "../generator";

export type IWithServerSourceGeneratorsProps =
    IGeneratorServerSourceParams
    & {
        packageName?: string;
        sdk?: string;
    }

export const withServerSourceGenerators = (
    {
        packageName = resolvePackageJson().name,
        sdk = "src/sdk",
        modelName,
        schemaPackage,
        prismaPackage,
        prismaModel
    }: IWithServerSourceGeneratorsProps) => {
    if (!packageName) {
        throw new Error("Cannot resolve packageName");
    }
    return [
        async () => generatorServerSource({
            packageName,
            name:   "server-source",
            barrel: true,
            file:   `${sdk}/server-source.tsx`,
            params: {
                modelName,
                schemaPackage,
                prismaPackage,
                prismaModel,
            }
        }),
    ];
};
