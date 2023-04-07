import {IPackageType}    from "@leight/generator";
import {withSourceFile}  from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api";

export interface IGeneratorCommonEntitySchemaParams {
    entities: IGeneratorCommonEntitySchemaParams.IEntity[];
}

export namespace IGeneratorCommonEntitySchemaParams {
    export interface IEntity {
        /**
         * Base name exported (used to name all exported objects)
         */
        name: string;
        withSchema: {
            schema: IPackageType;
            create?: IPackageType;
            patch?: IPackageType;
        },
        /**
         * Specify sort fields of the Sort query
         */
        sorts?: string[];
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
export const generatorCommonEntitySchema: IGenerator<IGeneratorCommonEntitySchemaParams> = async (
    {
        barrel,
        folder,
        params: {entities},
    }) => {
    const file = withSourceFile();

    entities.forEach(({name, withSchema, sorts = ["id"]}) => {
        file
            .withImports({
                imports: {
                    "@leight/filter": [
                        "FilterSchema",
                    ],
                    "@leight/query":  [
                        "ParamsSchema",
                        "QuerySchema",
                    ],
                    "@leight/sort":   [
                        "SortOrderSchema",
                    ],
                    "@leight/source": [
                        "WithIdentitySchema",
                    ],
                    "@leight/zod":    [
                        "z",
                    ],
                },
            })
            .withImports(withSchema.create ? undefined : {
                imports: {
                    "@leight/source": [
                        "CreateSchema",
                    ],
                }
            })
            .withImports(withSchema.patch ? undefined : {
                imports: {
                    "@leight/source": [
                        "WithIdentitySchema",
                    ],
                }
            })
            .withImports({
                imports: withSchema.schema.package ? {
                    [withSchema.schema.package]: [
                        withSchema.schema.type,
                    ],
                } : {},
            })
            .withImports({
                imports: withSchema.create?.package ? {
                    [withSchema.create?.package]: [
                        withSchema.create.type,
                    ],
                } : {},
            })
            .withImports({
                imports: withSchema.patch?.package ? {
                    [withSchema.patch?.package]: [
                        withSchema.patch.type,
                    ],
                } : {},
            })
            .withConsts({
                exports: {
                    [`${name}Schema`]:       {
                        body:    withSchema.schema.type,
                        comment: `
/**
 * Schema definition for ${name}
 */
                    `,
                    },
                    [`${name}CreateSchema`]: {body: withSchema.create ? withSchema.create.type : "CreateSchema"},
                    [`${name}PatchSchema`]:  {body: withSchema.patch ? withSchema.patch.type : "WithIdentitySchema"},
                    [`${name}FilterSchema`]: {
                        body: `FilterSchema`,
                    },
                    [`${name}ParamSchema`]:  {body: `ParamsSchema`},
                    [`${name}SortSchema`]:   {
                        body: `
z.object({
    ${sorts.map(sort => `${sort}: SortOrderSchema`).join(",\n\t")}
})
                    `,
                    },
                    [`${name}QuerySchema`]:  {
                        comment: `
/**
 * Query definition for ${name}
 */
                    `,
                        body:    `
QuerySchema({
    filterSchema: ${name}FilterSchema,
    sortSchema:   ${name}SortSchema,
    paramsSchema: ${name}ParamSchema,
})
                    `,
                    },
                },
            })
            .withTypes({
                exports: {
                    [`I${name}Schema`]:       `typeof ${name}Schema`,
                    [`I${name}`]:             `z.infer<I${name}Schema>`,
                    [`I${name}CreateSchema`]: `typeof ${name}CreateSchema`,
                    [`I${name}Create`]:       `z.infer<I${name}CreateSchema>`,
                    [`I${name}PatchSchema`]:  `typeof ${name}PatchSchema`,
                    [`I${name}Patch`]:        `z.infer<I${name}PatchSchema>`,
                    [`I${name}FilterSchema`]: `typeof ${name}FilterSchema`,
                    [`I${name}Filter`]:       `z.infer<I${name}FilterSchema>`,
                    [`I${name}ParamSchema`]:  `typeof ${name}ParamSchema`,
                    [`I${name}Param`]:        `z.infer<I${name}ParamSchema>`,
                    [`I${name}SortSchema`]:   `typeof ${name}SortSchema`,
                    [`I${name}Sort`]:         `z.infer<I${name}SortSchema>`,
                    [`I${name}QuerySchema`]:  `typeof ${name}QuerySchema`,
                    [`I${name}Query`]:        `z.infer<I${name}QuerySchema>`,
                },
            });
    });

    file.saveTo({
        file: normalize(`${process.cwd()}/${folder}/EntitySchema.ts`),
        barrel,
    });
};
