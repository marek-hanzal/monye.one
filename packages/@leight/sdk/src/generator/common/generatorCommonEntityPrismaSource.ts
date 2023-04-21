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
    entities.forEach(({name, withSchemaEx, withSourceEx, sorts = ["id"], packages}) => {
        withSourceFile()
            .withImports({
                imports: {
                    "@leight/source":    [
                        "type IUseSourceQuery",
                        "type ISource",
                    ],
                    [`./${name}Schema`]: [
                        `type I${name}SourceSchemaType`,
                    ],
                },
            })
            .withTypes({
                exports: {
                    [`IUse${name}SourceQuery`]: `IUseSourceQuery<I${name}SourceSchemaType>`,
                },
            })
            .withImports(withSourceEx?.extends ? {
                imports: withSourceEx.extends
                             .filter(((item): item is Required<IPackageType> => Boolean(item.withPackage)))
                             .reduce((prev, withPackage) => {
                                 prev[withPackage.withPackage.package] = [
                                     withPackageImport(withPackage, "type"),
                                     ...(prev[withPackage.withPackage.package] || [])
                                 ];
                                 return prev;
                             }, {} as Record<string, any>),
            } : undefined)
            .withInterfaces({
                exports: {
                    [`I${name}Source`]: {
                        extends: [
                                     {type: `ISource<I${name}SourceSchemaType>`},
                                 ].concat(withSourceEx?.extends || []),
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
                    [packages.prisma]: [
                        `${name}WhereInputSchema`,
                        `${name}WhereUniqueInputSchema`,
                        `${name}Schema as $EntitySchema`,
                        `${name}OptionalDefaultsSchema`,
                        `${name}PartialSchema`,
                    ],
                    "@leight/sort":    [
                        "SortOrderSchema",
                    ],
                    "@leight/source":  [
                        "withSourceSchema",
                        "type ISourceSchemaType",
                    ],
                    "@leight/zod":     [
                        "z",
                    ],
                },
            })
            .withImports({
                imports: withSchemaEx?.schema?.withPackage ? {
                    [withSchemaEx.schema.withPackage.package]: [
                        withPackageImport(withSchemaEx.schema),
                    ],
                } : {},
            })
            .withImports({
                imports: withSchemaEx?.dto?.withPackage ? {
                    [withSchemaEx.dto.withPackage.package]: [
                        withPackageImport(withSchemaEx.dto),
                    ],
                } : {},
            })
            .withImports({
                imports: withSchemaEx?.toCreate?.withPackage ? {
                    [withSchemaEx.toCreate?.withPackage.package]: [
                        withPackageImport(withSchemaEx.toCreate),
                    ],
                } : {},
            })
            .withImports({
                imports: withSchemaEx?.create?.withPackage ? {
                    [withSchemaEx.create?.withPackage.package]: [
                        withPackageImport(withSchemaEx.create),
                    ],
                } : {},
            })
            .withImports({
                imports: withSchemaEx?.toPatch?.withPackage ? {
                    [withSchemaEx.toPatch?.withPackage.package]: [
                        withPackageImport(withSchemaEx.toPatch),
                    ],
                } : {},
            })
            .withImports({
                imports: withSchemaEx?.patch?.withPackage ? {
                    [withSchemaEx.patch?.withPackage.package]: [
                        withPackageImport(withSchemaEx.patch),
                    ],
                } : {
                    "@leight/source": [
                        "PatchSchema",
                    ],
                },
            })
            .withImports({
                imports: withSchemaEx?.filter?.withPackage ? {
                    [withSchemaEx.filter?.withPackage.package]: [
                        withPackageImport(withSchemaEx.filter),
                    ],
                } : {
                    "@leight/filter": [
                        "FilterSchema",
                    ],
                },
            })
            .withImports({
                imports: withSchemaEx?.params?.withPackage ? {
                    [withSchemaEx?.params?.withPackage.package]: [
                        withPackageImport(withSchemaEx.params),
                    ],
                } : {
                    "@leight/query": [
                        "ParamsSchema",
                    ],
                },
            })
            .withConsts({
                consts:  {
                    [`$${name}Schema`]:       {
                        body: withSchemaEx?.schema ? `$EntitySchema.merge(${withPackageType(withSchemaEx.schema)})` : "$EntitySchema",
                    },
                    [`$${name}CreateSchema`]: {
                        body: withSchemaEx?.create ? withPackageType(withSchemaEx.create) : `${name}OptionalDefaultsSchema`,
                    },
                    [`$${name}PatchSchema`]:  {
                        body: withSchemaEx?.patch ? withPackageType(withSchemaEx.patch) : `${name}PartialSchema.merge(PatchSchema)`,
                    },
                },
                exports: {
                    [`${name}SourceSchema`]: {
                        body: `
withSourceSchema({
    EntitySchema: $${name}Schema,
    DtoSchema: ${withSchemaEx?.dto ? withPackageType(withSchemaEx.dto) : `$${name}Schema`},
    ToCreateSchema: ${withSchemaEx?.toCreate ? withPackageType(withSchemaEx.toCreate) : `$${name}CreateSchema`},
    CreateSchema: $${name}CreateSchema,
    ToPatchSchema: ${withSchemaEx?.toPatch ? withPackageType(withSchemaEx.toPatch) : `$${name}PatchSchema`},
    PatchSchema: $${name}PatchSchema,
    FilterSchema: ${withSchemaEx?.filter ? withPackageType(withSchemaEx.filter) : `z.union([
        ${name}WhereInputSchema,
        ${name}WhereUniqueInputSchema,
        FilterSchema,
    ])`},
    ParamsSchema: ${withSchemaEx?.params ? withPackageType(withSchemaEx.params) : "ParamsSchema"},
    SortSchema: z.object({
        ${sorts.map(sort => `${sort}: SortOrderSchema`).join(",\n\t")}
    }),
})
                        `,
                    },
                },
            })
            .withTypes({
                exports: {
                    [`I${name}SourceSchemaType`]: `ISourceSchemaType.of<typeof ${name}SourceSchema>`,
                },
            })
            .saveTo({
                file: normalize(`${directory}/Source/${name}Schema.ts`),
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
                file: normalize(`${directory}/Source/${name}PrismaSchema.ts`),
                barrel,
            });
    });
};
