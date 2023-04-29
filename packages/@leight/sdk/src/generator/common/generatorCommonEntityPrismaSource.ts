import {type IPackageType} from "@leight/generator";
import {withSourceFile}    from "@leight/generator-server";
import {normalize}         from "node:path";
import {type IGenerator}   from "../../api";

export interface IGeneratorCommonEntityPrismaSourceParams {
    entities: IGeneratorCommonEntityPrismaSourceParams.IEntity[];
}

export namespace IGeneratorCommonEntityPrismaSourceParams {
    export interface IEntity {
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

    export interface IWithSourceEx {
        extends?: IPackageType[];
    }

    export interface IWithSchemaEx {
        /**
         * Optional extension of entity schema
         */
        schema?: IPackageType;
        dto?: IPackageType;
        create?: IPackageType;
        toCreate?: IPackageType;
        patch?: IPackageType;
        toPatch?: IPackageType;
        filter?: IPackageType;
        params?: IPackageType;
    }
}

/**
 * Generates Query stuff bound to Prisma schemas.
 */
export const generatorCommonEntityPrismaSource: IGenerator<IGeneratorCommonEntityPrismaSourceParams> = async (
    {
        packageName,
        barrel,
        directory,
        params: {entities},
    }) => {
    entities.forEach(({name, packages}) => {
        withSourceFile()
            .withImports({
                imports: {
                    [`../../schema/${name}SourceSchema`]: [
                        `type I${name}SourceSchemaType`,
                    ],
                    "@leight/source":                  [
                        "type ISourceMapper",
                    ],
                },
            })
            .withTypes({
                exports: {
                    [`I${name}SourceMapper`]: `ISourceMapper<I${name}SourceSchemaType>`,
                },
            })
            .saveTo({
                file:   normalize(`${directory}/api/${name}Types.ts`),
                barrel: false,
            });

        withSourceFile()
            .withImports({
                imports: {
                    "@leight/source":                  [
                        "type IUseSourceQuery",
                        "type ISource",
                    ],
                    [`../../schema/${name}SourceSchema`]: [
                        `type I${name}SourceSchemaType`,
                    ],
                },
            })
            .withTypes({
                exports: {
                    [`IUse${name}SourceQuery`]: `IUseSourceQuery<I${name}SourceSchemaType>`,
                },
            })
            .withInterfaces({
                exports: {
                    [`I${name}Source`]: {
                        extends: [
                            {type: `ISource<I${name}SourceSchemaType>`},
                        ],
                    },
                }
            })
            .withConsts({
                exports: {
                    [`$${name}Source`]:        {body: `Symbol.for("${packageName}/I${name}Source")`},
                    [`$${name}SourceMapper`]:  {body: `Symbol.for("${packageName}/I${name}SourceMapper")`},
                    [`$${name}SourceService`]: {body: `Symbol.for("${packageName}/I${name}SourceService")`},
                }
            })
            .saveTo({
                file: normalize(`${directory}/Source/${name}PrismaSource.ts`),
                barrel,
            });

        withSourceFile()
            .withImports({
                imports: {
                    "@leight/source":  [
                        "withSourceSchemaEx",
                        "type ISourceSchemaExType",
                    ],
                    [packages.prisma]: [
                        `${name}WhereInputSchema`,
                        `${name}WhereUniqueInputSchema`,
                        `${name}OrderByWithRelationInputSchema`,
                    ],
                },
            })
            .withTypes({
                exports: {
                    [`I${name}PrismaSchemaType`]: `ISourceSchemaExType.of<typeof ${name}PrismaSchema>`,
                },
            })
            .withConsts({
                exports: {
                    [`${name}PrismaSchema`]: {
                        body: `
withSourceSchemaEx({
    WhereSchema:       ${name}WhereInputSchema,
    WhereUniqueSchema: ${name}WhereUniqueInputSchema,
    OrderBySchema:     ${name}OrderByWithRelationInputSchema,
})
                    `
                    },
                },
            })
            .saveTo({
                file: normalize(`${directory}/schema/${name}PrismaSchema.ts`),
                barrel,
            });
    });
};
