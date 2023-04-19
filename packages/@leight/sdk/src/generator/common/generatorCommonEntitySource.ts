import {IPackageType}    from "@leight/generator";
import {
    withPackageImport,
    withPackageType,
    withSourceFile
}                        from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api";

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
        folder,
        params: {entities},
    }) => {
    const file = withSourceFile();

    entities.forEach(({name, withSchemaEx, withSourceEx, sorts = ["id"]}) => {
        file
            .withImports({
                imports: {
                    "@leight/sort":      [
                        "SortOrderSchema",
                    ],
                    "@leight/source":    [
                        "type InferSourceSchema",
                        "type IUseSourceQuery",
                        "type ISource",
                        "withSourceSchema",
                    ],
                    "@leight/container": [
                        "type IContainer",
                        "ServiceContext",
                    ],
                    "@leight/zod":       [
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
                } : {
                    "@leight/filter": [
                        "FilterSchema",
                    ],
                },
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
                    [`I${name}SourceSchema`]:   `InferSourceSchema<typeof ${name}SourceSchema>`,
                    [`IUse${name}SourceQuery`]: `IUseSourceQuery<I${name}SourceSchema>`,
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
    FilterSchema: ${withSchemaEx?.filter ? withPackageType(withSchemaEx.filter) : "FilterSchema"},
    ParamsSchema: ${withSchemaEx?.params ? withPackageType(withSchemaEx.params) : "ParamsSchema"},
    SortSchema: z.object({
        ${sorts.map(sort => `${sort}: SortOrderSchema`).join(",\n\t")}
    }),
})
                        `,
                    },
                },
            })
            .withConsts({
                exports: {
                    [`$${name}Source`]:       {body: `Symbol.for("${packageName}/I${name}Source")`},
                    [`$${name}SourceMapper`]: {body: `Symbol.for("${packageName}/I${name}SourceMapper")`},
                }
            })
            .withConsts({
                exports: {
                    [`${name}SourceContext`]: {
                        body: `(container: IContainer) => new ServiceContext<I${name}Source>(container, $${name}Source)`,
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
            });
    });

    file.saveTo({
        file: normalize(`${process.cwd()}/${folder}/EntitySource.ts`),
        barrel,
    });
};
