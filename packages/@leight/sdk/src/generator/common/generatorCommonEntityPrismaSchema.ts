import {IPackageType}    from "@leight/generator";
import {withSourceFile}  from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../../api";

export interface IGeneratorCommonEntityPrismaSchemaParams {
    entities: IGeneratorCommonEntityPrismaSchemaParams.IEntity[];
}

export namespace IGeneratorCommonEntityPrismaSchemaParams {
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
export const generatorCommonEntityPrismaSchema: IGenerator<IGeneratorCommonEntityPrismaSchemaParams> = async (
    {
        barrel,
        folder,
        params: {entities},
    }) => {
    const file = withSourceFile();

    entities.forEach(({name, withSchemaEx, sorts = ["id"], packages}) => {
        file.withImports({
                imports: {
                    [packages.prisma]: [
                        `${name}Schema as $EntitySchema`,
                        `${name}OptionalDefaultsSchema`,
                        `${name}PartialSchema`,
                        `${name}WhereInputSchema`,
                        `${name}WhereUniqueInputSchema`,
                        `${name}OrderByWithRelationInputSchema`,
                    ],
                    "@leight/filter":  [
                        "FilterSchema",
                    ],
                    "@leight/query":   [
                        "ParamsSchema",
                        "QuerySchema",
                    ],
                    "@leight/sort":    [
                        "SortOrderSchema",
                    ],
                    "@leight/source":  [
                        "WithIdentitySchema",
                    ],
                    "@leight/zod":     [
                        "z",
                    ],
                },
            })
            .withImports(withSchemaEx?.entity?.package ? {
                imports: {
                    [withSchemaEx.entity.package]: [
                        withSchemaEx.entity.type,
                    ],
                },
            } : undefined)
            .withConsts({
                exports: {
                    [`${name}WhereSchema`]:       {body: `${name}WhereInputSchema`},
                    [`${name}WhereUniqueSchema`]: {body: `${name}WhereUniqueInputSchema`},
                    [`${name}OrderBySchema`]:     {body: `${name}OrderByWithRelationInputSchema`},
                },
            })
            .withTypes({
                exports: {
                    [`I${name}WhereSchema`]: `typeof ${name}WhereSchema`,
                    [`I${name}Where`]:       `z.infer<I${name}WhereSchema>`,

                    [`I${name}WhereUniqueSchema`]: `typeof ${name}WhereUniqueSchema`,
                    [`I${name}WhereUnique`]:       `z.infer<I${name}WhereUniqueSchema>`,

                    [`I${name}OrderBySchema`]: `typeof ${name}OrderBySchema`,
                    [`I${name}OrderBy`]:       `z.infer<I${name}OrderBySchema>`,
                }
            })
            .withConsts({
                exports: {
                    [`${name}Schema`]:       {
                        body:    withSchemaEx?.entity ? `$EntitySchema.merge(${withSchemaEx.entity.type})` : "$EntitySchema",
                        comment: `
/**
 * Schema definition for ${name}
 */
                    `,
                    },
                    [`${name}CreateSchema`]: {body: `${name}OptionalDefaultsSchema`},
                    [`${name}PatchSchema`]:  {body: `${name}PartialSchema.merge(WithIdentitySchema)`},
                    [`${name}FilterSchema`]: {
                        body: `z.union([
    ${name}WhereSchema,
    ${name}WhereUniqueSchema,
    FilterSchema,
])
                    `,
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
        file: normalize(`${process.cwd()}/${folder}/Schema.ts`),
        barrel,
    });
};
