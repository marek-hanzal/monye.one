import {resolvePackageJson} from "@leight/utils-server";
import {
    generatorEntitySchema,
    generatorSourceApi
}                           from "../generator";

export interface IWithSourceGeneratorsProps {
    packageName?: string;
    sdk?: string;
    PrismaSchema: string;
    modelName: string;
    sorts?: string[];
}

export const withSourceGenerators = (
    {
        packageName = resolvePackageJson().name,
        sdk = "src/sdk",
        modelName,
        PrismaSchema,
        sorts,
    }: IWithSourceGeneratorsProps) => {
    if (!packageName) {
        throw new Error("Cannot resolve packageName");
    }

    return [
        async () => generatorEntitySchema({
            packageName,
            name:   "entity-schema",
            file:   `${sdk}/entity-schema.ts`,
            barrel: true,
            params: {
                PrismaSchema,
                modelName,
                sorts,
            },
        }),
        async () => generatorSourceApi({
            packageName,
            name:   "source-api",
            file:   `${sdk}/source-api.ts`,
            barrel: true,
            params: {
                modelName,
            },
        }),
    ];
};
