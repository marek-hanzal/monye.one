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
        withSchema: {
            schema: IPackageType;
            create?: IPackageType;
            patch?: IPackageType;
            filter?: IPackageType;
            params?: IPackageType;
        };
        withSourceEx?: IWithSourceEx;
        /**
         * Specify sort fields of the Sort query
         */
        sorts?: string[];
    }

    export interface IWithSourceEx {
        extends?: IPackageType[];
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

    entities.forEach(({name, withSchema, withSourceEx, sorts = ["id"]}) => {
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
                        "WithIdentitySchema",
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
                imports: withSchema.schema.withPackage ? {
                    [withSchema.schema.withPackage.package]: [
                        withPackageImport(withSchema.schema),
                    ],
                } : {},
            })
            .withImports({
                imports: withSchema.create?.withPackage ? {
                    [withSchema.create?.withPackage.package]: [
                        withPackageImport(withSchema.create),
                    ],
                } : {
                    "@leight/source": [
                        "CreateSchema",
                    ],
                },
            })
            .withImports({
                imports: withSchema.patch?.withPackage ? {
                    [withSchema.patch?.withPackage.package]: [
                        withPackageImport(withSchema.patch),
                    ],
                } : {
                    "@leight/source": [
                        "WithIdentitySchema",
                    ],
                },
            })
            .withImports({
                imports: withSchema.filter?.withPackage ? {
                    [withSchema.filter?.withPackage.package]: [
                        withPackageImport(withSchema.filter),
                    ],
                } : {
                    "@leight/filter": [
                        "FilterSchema",
                    ],
                },
            })
            .withImports({
                imports: withSchema.params?.withPackage ? {
                    [withSchema.params?.withPackage.package]: [
                        withPackageImport(withSchema.params),
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
                exports: {
                    [`${name}SourceSchema`]: {
                        body: `
withSourceSchema({
    EntitySchema: ${withPackageType(withSchema.schema)},
    CreateSchema: ${withSchema.create ? withPackageType(withSchema.create) : "CreateSchema"},
    PatchSchema: ${withSchema.patch ? withPackageType(withSchema.patch) : "WithIdentitySchema"},
    FilterSchema: ${withSchema.filter ? withPackageType(withSchema.filter) : "FilterSchema"},
    ParamsSchema: ${withSchema.params ? withPackageType(withSchema.params) : "ParamsSchema"},
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
                    [`$${name}Source`]: {body: `Symbol.for("${packageName}/I${name}Source")`},
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
