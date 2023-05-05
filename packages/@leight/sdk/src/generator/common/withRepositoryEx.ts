import {withSourceFile}       from "@leight/generator-server";
import {normalize}            from "node:path";
import {type IGenerator}      from "../../api";
import {withRepositorySymbol} from "./withRepositorySymbol";

export interface IWithRepositoryExParams {
    repositories: IWithRepositoryExParams.IRepository[];
}

export namespace IWithRepositoryExParams {
    export interface IRepository {
        /**
         * Base name exported (used to name all exported objects)
         */
        name: string;
        /**
         * Required package imports
         */
        packages: IPackages;
    }

    export interface IPackages {
        /**
         * Prisma package which exports PrismaClient.
         */
        prisma: string;
    }
}

/**
 * Generates Query stuff bound to Prisma schemas.
 */
export const withRepositoryEx: IGenerator<IWithRepositoryExParams> = async (
    {
        packageName,
        barrel,
        directory,
        params: {repositories},
    }) => {
    for (const {name, packages} of repositories) {
        await Promise.all([
            withRepositorySymbol({
                packageName,
                directory,
                barrel,
                params: {
                    symbols: [
                        {name},
                    ],
                },
            }),
        ]);
        withSourceFile()
            .withImports({
                imports: {
                    "@leight/source":  [
                        "type IRepositorySchemaEx",
                    ],
                    [packages.prisma]: [
                        `${name}WhereInputSchema`,
                        `${name}WhereUniqueInputSchema`,
                        `${name}OrderByWithRelationInputSchema`,
                    ],
                },
            })
            .withConsts({
                exports: {
                    [`${name}RepositorySchemaEx`]: {
                        type: `I${name}RepositorySchemaEx["Schema"]`,
                        body: `{
    WhereSchema:       ${name}WhereInputSchema,
    WhereUniqueSchema: ${name}WhereUniqueInputSchema,
    OrderBySchema:     ${name}OrderByWithRelationInputSchema,
}
                    `
                    },
                },
            })
            .withTypes({
                exports: {
                    [`I${name}RepositorySchemaEx`]: `IRepositorySchemaEx<
    typeof ${name}WhereInputSchema,
    typeof ${name}WhereUniqueInputSchema,
    typeof ${name}OrderByWithRelationInputSchema
>`,
                },
            })
            .saveTo({
                file: normalize(`${directory}/schema/${name}RepositorySchemaEx.ts`),
                barrel,
            });
    }
};
