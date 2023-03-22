import {resolvePackageJson} from "@leight/utils-server";
import {
    generatorClientContext,
    generatorClientSource
}                           from "../generator";

export interface IWithClientSourceGeneratorsProps {
    packageName?: string;
    sdk?: string;
    modelName: string;
    trpcPackage: string | false;
    trpcPath: string | false;
    schemaPackage: string;
}

export const withClientSourceGenerators = (
    {
        packageName = resolvePackageJson().name,
        sdk = "src/sdk",
        modelName,
        trpcPackage,
        trpcPath,
        schemaPackage,
    }: IWithClientSourceGeneratorsProps) => {
    if (!packageName) {
        throw new Error("Cannot resolve packageName");
    }
    return [
        async () => generatorClientContext({
            packageName,
            name:   "client-context",
            file:   `${sdk}/client-context.ts`,
            barrel: true,
            params: {
                modelName,
                schemaPackage,
            },
        }),
        async () => generatorClientSource({
            packageName,
            name:   "client-source",
            barrel: true,
            file:   `${sdk}/client-source.tsx`,
            params: {
                modelName,
                trpcPackage,
                trpcPath,
                schemaPackage,
            }
        }),
    ];
};
