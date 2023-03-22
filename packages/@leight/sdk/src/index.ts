import {
    type IfExtends,
    isObject
}                         from "@leight/utils";
import boxen              from "boxen";
import chalk              from "chalk";
import {
    existsSync,
    readFileSync
}                         from "node:fs";
import {type PackageJson} from "type-fest";
import {
    generatorEntitySchema,
    generatorSourceApi
}                         from "./generator";

export type ITemplate<TParams = void> = IfExtends<
    {
        /**
         * Package name where SDK is generated (name of your app or monorepo library name (like @myapp/model))
         */
        packageName: string;
        /**
         * Name of the generator, could be basically anything
         */
        name: string;
        /**
         * Where to put generated content
         */
        file: string;
        /**
         * Should also index.ts be generated/updated?
         */
        barrel: boolean;
    },
    { params: TParams }
>;

export interface IGenerator<TParams = void> {
    (props: ITemplate<TParams>): Promise<void>;
}

export const withSdk = async (generators: (() => Promise<void>)[]): Promise<void> => {
    console.log(boxen(
        chalk.yellowBright.inverse.bold("-= -=:    Leight SDK Generator    :=- =-"),
        {
            padding:         1,
            margin:          0,
            borderStyle:     "round",
            borderColor:     "yellow",
            backgroundColor: "black",
        }
    ));

    for await (const generator of generators) {
        await generator();
    }

    console.log(chalk.greenBright(`- Done`));
};

export const resolvePackageJson = (): PackageJson => {
    const packageJsonFile = `${process.cwd()}/package.json`;
    if (!existsSync(packageJsonFile)) {
        throw new Error(`Cannot resolve package.json in [${packageJsonFile}].`);
    }
    const content = readFileSync(packageJsonFile, {encoding: "utf8"});
    if (!content) {
        throw new Error(`Cannot read package.json from [${packageJsonFile}].`);
    }
    const packageJson = JSON.parse(content);
    if (!isObject(packageJson)) {
        throw new Error(`Cannot JSON.parse package.json from [${packageJsonFile}], result is not an object.`);
    }
    return packageJson as PackageJson;
};

export interface IWithSourceGeneratorsProps {
    packageName?: string;
    sdk?: string;
    PrismaSchema: string;
    modelName: string;
}

export const withSourceGenerators = (
    {
        packageName = resolvePackageJson().name,
        sdk = "src/sdk",
        modelName,
        PrismaSchema,
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

export * from "./generator";
