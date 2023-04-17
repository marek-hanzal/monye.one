import {type IPackageType} from "@leight/generator";
import {
    withPackageImport,
    withPackageType,
    withSourceFile
}                          from "@leight/generator-server";
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
        /**
         * Optional extensions of individual parts of the schemas
         */
        withSchemaEx?: IWithSchemaEx;
        withSourceEx?: IWithSourceEx;
        /**
         * Specify sort fields of the Sort query
         */
        sorts?: string[];
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
        entity?: IPackageType;
    }
}

/**
 * Generates Query stuff bound to Prisma schemas.
 */
export const generatorCommonEntityPrismaSource: IGenerator<IGeneratorCommonEntityPrismaSourceParams> = async (
    {
        packageName,
        barrel,
        folder,
        params: {entities},
    }) => {
    const file = withSourceFile();

    entities.forEach(({name, withSchemaEx, withSourceEx, sorts = ["id"], packages}) => {
        file.withImports({
                imports: {
                    [packages.prisma]:   [
                        `${name}Schema as $EntitySchema`,
                        `${name}OptionalDefaultsSchema`,
                        `${name}PartialSchema`,
                        `${name}WhereInputSchema`,
                        `${name}WhereUniqueInputSchema`,
                        `${name}OrderByWithRelationInputSchema`,
                    ],
                    "@leight/filter":    [
                        "FilterSchema",
                    ],
                    "@leight/sort":      [
                        "SortOrderSchema",
                    ],
                    "@leight/container": [
                        "type IContainer",
                        "ServiceContext",
                    ],
                    "@leight/source":    [
                        "withSourceExSchema",
                        "type InferSourceExSchema",
                        "WithIdentitySchema",
                        "type ISource",
                        "type InferSourceSchema",
                        "withSourceSchema",
                        "type IUseSourceQuery",
                    ],
                    "@leight/zod":       [
                        "z",
                    ],
                },
            })
            .withImports(withSchemaEx?.entity?.withPackage ? {
                imports: {
                    [withSchemaEx.entity.withPackage.package]: [
                        withPackageImport(withSchemaEx.entity),
                    ],
                },
            } : undefined)
            .withConsts({
                exports: {
                    [`${name}PrismaSchema`]: {
                        body: `
withSourceExSchema({
    WhereSchema:       ${name}WhereInputSchema,
    WhereUniqueSchema: ${name}WhereUniqueInputSchema,
    OrderBySchema:     ${name}OrderByWithRelationInputSchema,
})
                    `
                    },
                },
            })
            .withTypes({
                exports: {
                    [`I${name}SourceSchema`]:   `InferSourceSchema<typeof ${name}SourceSchema>`,
                    [`I${name}PrismaSchema`]:   `InferSourceExSchema<typeof ${name}PrismaSchema>`,
                    [`IUse${name}SourceQuery`]: `IUseSourceQuery<I${name}SourceSchema>`,
                },
            })
            .withConsts({
                exports: {
                    [`${name}SourceSchema`]: {
                        body: `
withSourceSchema({
    EntitySchema: ${withSchemaEx?.entity ? `$EntitySchema.merge(${withPackageType(withSchemaEx.entity)})` : "$EntitySchema"},
    CreateSchema: ${name}OptionalDefaultsSchema,
    PatchSchema: ${name}PartialSchema.merge(WithIdentitySchema),
    FilterSchema: z.union([
        ${name}WhereInputSchema,
        ${name}WhereUniqueInputSchema,
        FilterSchema,
    ]),
    SortSchema: z.object({
        ${sorts.map(sort => `${sort}: SortOrderSchema`).join(",\n\t")}
    }),
})
                        `,
                    },
                },
            })
            .withImports(withSourceEx?.extends ? {
                imports: withSourceEx.extends
                             .filter(((item): item is Required<IPackageType> => Boolean(item.withPackage)))
                             .reduce((prev, withPackage) => ({
                                 ...prev,
                                 [withPackage.withPackage.package]: [
                                     withPackageImport(withPackage, "type"),
                                     ...(prev[withPackage.withPackage.package] || [])
                                 ],
                             }), {} as Record<string, any>),
            } : undefined)
            .withInterfaces({
                exports: {
                    [`I${name}Source`]: {
                        extends: [
                                     {type: `ISource<I${name}SourceSchema>`},
                                 ].concat(withSourceEx?.extends || []),
                    },
                }
            })
            .withConsts({
                exports: {
                    [`$${name}Source`]: {body: `Symbol.for("${packageName}/I${name}Source")`},
                }
            })
            .withConsts({
                exports: {
                    [`${name}SourceContext`]: {
                        body: `(container: IContainer) => new ServiceContext<I${name}Source>(container, $${name}Source)`,
                    },
                },
            });
    });

    file.saveTo({
        file: normalize(`${process.cwd()}/${folder}/PrismaSource.ts`),
        barrel,
    });
};
