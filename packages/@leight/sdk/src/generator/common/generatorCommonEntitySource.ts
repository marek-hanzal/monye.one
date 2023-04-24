import {type IPackageType} from "@leight/generator";
import {
    withPackageImport,
    withPackageType,
    withSourceFile
}                          from "@leight/generator-server";
import {normalize}         from "node:path";
import {type IGenerator}   from "../../api";

export interface IGeneratorCommonEntitySourceParams {
    entities: IGeneratorCommonEntitySourceParams.IEntity[];
}

export namespace IGeneratorCommonEntitySourceParams {
    export interface IEntity {
        /**
         * Base name exported (used to name all exported objects)
         */
        name: string;
        withSchemaEx: IWithSchemaEx;
        withSourceEx?: IWithSourceEx;
        /**
         * Specify sort fields of the Sort query
         */
        sorts?: string[];
    }

    export interface IWithSourceEx {
        extends?: IPackageType[];
    }

    export interface IWithSchemaEx {
        /**
         * Optional extension of entity schema
         */
        schema: IPackageType;
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
export const generatorCommonEntitySource: IGenerator<IGeneratorCommonEntitySourceParams> = async (
    {
        packageName,
        barrel,
        directory,
        params: {entities},
    }) => {
    entities.forEach(({name, withSchemaEx, withSourceEx, sorts = ["id"]}) => {
        withSourceFile()
            .withImports({
                imports: {
                    [`../schema/${name}SourceSchema`]: [
                        `type I${name}SourceSchemaType`,
                    ],
                    "@leight/source":  [
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
                    "@leight/source":          [
                        "type ISource",
                        "type IUseSourceQuery",
                    ],
                    [`../schema/${name}SourceSchema`]: [
                        `type I${name}SourceSchemaType`,
                    ],
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
            .withTypes({
                exports: {
                    [`IUse${name}SourceQuery`]: `IUseSourceQuery<I${name}SourceSchemaType>`,
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
                file: normalize(`${directory}/Source/${name}Source.ts`),
                barrel,
            });

        withSourceFile()
            .withImports({
                imports: {
                    "@leight/sort":   [
                        "SortOrderSchema",
                    ],
                    "@leight/source": [
                        "type ISourceSchemaType",
                        "withSourceSchema",
                    ],
                    "@leight/filter": [
                        "FilterSchema",
                    ],
                    "@leight/zod":    [
                        "z",
                    ],
                },
            })
            .withImports({
                imports: withSchemaEx.schema.withPackage ? {
                    [withSchemaEx.schema.withPackage.package]: [
                        withPackageImport(withSchemaEx.schema),
                    ],
                } : {},
            })
            .withImports({
                imports: withSchemaEx.dto?.withPackage ? {
                    [withSchemaEx.dto.withPackage.package]: [
                        withPackageImport(withSchemaEx.dto),
                    ],
                } : {},
            })
            .withImports({
                imports: withSchemaEx.create?.withPackage ? {
                    [withSchemaEx.create?.withPackage.package]: [
                        withPackageImport(withSchemaEx.create),
                    ],
                } : {
                    "@leight/source": [
                        "CreateSchema",
                    ],
                },
            })
            .withImports({
                imports: withSchemaEx.toCreate?.withPackage ? {
                    [withSchemaEx.toCreate?.withPackage.package]: [
                        withPackageImport(withSchemaEx.toCreate),
                    ],
                } : {},
            })
            .withImports({
                imports: withSchemaEx.toPatch?.withPackage ? {
                    [withSchemaEx.toPatch?.withPackage.package]: [
                        withPackageImport(withSchemaEx.toPatch),
                    ],
                } : {},
            })
            .withImports({
                imports: withSchemaEx.patch?.withPackage ? {
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
                imports: withSchemaEx.filter?.withPackage ? {
                    [withSchemaEx.filter?.withPackage.package]: [
                        withPackageImport(withSchemaEx.filter),
                    ],
                } : {},
            })
            .withImports({
                imports: withSchemaEx.params?.withPackage ? {
                    [withSchemaEx.params?.withPackage.package]: [
                        withPackageImport(withSchemaEx.params),
                    ],
                } : {
                    "@leight/query": [
                        "ParamsSchema",
                    ],
                },
            })
            .withTypes({
                exports: {
                    [`I${name}SourceSchemaType`]: `ISourceSchemaType.of<typeof ${name}SourceSchema>`,
                }
            })
            .withConsts({
                consts:  {
                    [`$${name}Schema`]:       {
                        body: withSchemaEx?.schema ? withPackageType(withSchemaEx.schema) : "$EntitySchema",
                    },
                    [`$${name}CreateSchema`]: {
                        body: withSchemaEx?.create ? withPackageType(withSchemaEx.create) : "CreateSchema",
                    },
                    [`$${name}PatchSchema`]:  {
                        body: withSchemaEx?.patch ? withPackageType(withSchemaEx.patch) : "PatchSchema",
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
    FilterSchema: ${withSchemaEx?.filter ? `FilterSchema.merge(${withPackageType(withSchemaEx.filter)})` : `FilterSchema`},
    ParamsSchema: ${withSchemaEx?.params ? withPackageType(withSchemaEx.params) : "ParamsSchema"},
    SortSchema: z.object({
        ${sorts.map(sort => `${sort}: SortOrderSchema`).join(",\n\t")}
    }),
})
                        `,
                    },
                },
            })
            .saveTo({
                file: normalize(`${directory}/schema/${name}SourceSchema.ts`),
                barrel,
            });
    });
};
