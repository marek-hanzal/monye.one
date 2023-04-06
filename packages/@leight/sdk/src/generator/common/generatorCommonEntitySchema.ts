import {withSourceFile}              from "@leight/generator-server";
import {normalize}                   from "node:path";
import {type IGenerator}             from "../../api";
import {type IGeneratorCommonParams} from "./generatorCommon";

export const generatorCommonEntitySchema: IGenerator<IGeneratorCommonParams> = async (
    {
        barrel,
        folder,
        params: {
                    packages,
                    entity,
                    sorts = ["id"],
                    schemaEx,
                },
    }) => {
    withSourceFile()
        .withImports({
            imports: {
                [packages.prisma]: [
                    `${entity}Schema as $EntitySchema`,
                    `${entity}OptionalDefaultsSchema`,
                    `${entity}PartialSchema`,
                    `${entity}WhereInputSchema`,
                    `${entity}WhereUniqueInputSchema`,
                    `${entity}OrderByWithRelationInputSchema`,
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
                "@leight/zod": [
                    "z",
                ],
            },
        })
        .withImports(schemaEx?.entity?.package ? {
            imports: {
                [schemaEx.entity.package]: [
                    schemaEx.entity.type,
                ],
            },
        } : undefined)
        .withConsts({
            exports: {
                [`${entity}WhereSchema`]:       {body: `${entity}WhereInputSchema`},
                [`${entity}WhereUniqueSchema`]: {body: `${entity}WhereUniqueInputSchema`},
                [`${entity}OrderBySchema`]:     {body: `${entity}OrderByWithRelationInputSchema`},
            },
        })
        .withTypes({
            exports: {
                [`I${entity}WhereSchema`]: `typeof ${entity}WhereSchema`,
                [`I${entity}Where`]:       `z.infer<I${entity}WhereSchema>`,

                [`I${entity}WhereUniqueSchema`]: `typeof ${entity}WhereUniqueSchema`,
                [`I${entity}WhereUnique`]:       `z.infer<I${entity}WhereUniqueSchema>`,

                [`I${entity}OrderBySchema`]: `typeof ${entity}OrderBySchema`,
                [`I${entity}OrderBy`]:       `z.infer<I${entity}OrderBySchema>`,
            }
        })
        .withConsts({
            exports: {
                [`${entity}Schema`]:       {body: schemaEx?.entity ? `$EntitySchema.merge(${schemaEx.entity.type})` : "$EntitySchema"},
                [`${entity}CreateSchema`]: {body: `${entity}OptionalDefaultsSchema`},
                [`${entity}PatchSchema`]:  {body: `${entity}PartialSchema.merge(WithIdentitySchema)`},
                [`${entity}FilterSchema`]: {
                    body: `z.union([
    ${entity}WhereSchema,
    ${entity}WhereUniqueSchema,
    FilterSchema,
])
                    `,
                },
                [`${entity}ParamSchema`]:  {body: `ParamsSchema`},
                [`${entity}SortSchema`]:   {
                    body: `
z.object({
    ${sorts.map(sort => `${sort}: SortOrderSchema`).join(",\n\t")}
})
                    `,
                },
                [`${entity}QuerySchema`]:  {
                    body: `
QuerySchema({
    filterSchema: ${entity}FilterSchema,
    sortSchema:   ${entity}SortSchema,
    paramsSchema: ${entity}ParamSchema,
})
                    `,
                },
            },
        })
        .withTypes({
            exports: {
                [`I${entity}Schema`]:       `typeof ${entity}Schema`,
                [`I${entity}`]:             `z.infer<I${entity}Schema>`,
                [`I${entity}CreateSchema`]: `typeof ${entity}CreateSchema`,
                [`I${entity}Create`]:       `z.infer<I${entity}CreateSchema>`,
                [`I${entity}PatchSchema`]:  `typeof ${entity}PatchSchema`,
                [`I${entity}Patch`]:        `z.infer<I${entity}PatchSchema>`,
                [`I${entity}FilterSchema`]: `typeof ${entity}FilterSchema`,
                [`I${entity}Filter`]:       `z.infer<I${entity}FilterSchema>`,
                [`I${entity}ParamSchema`]:  `typeof ${entity}ParamSchema`,
                [`I${entity}Param`]:        `z.infer<I${entity}ParamSchema>`,
                [`I${entity}SortSchema`]:   `typeof ${entity}SortSchema`,
                [`I${entity}Sort`]:         `z.infer<I${entity}SortSchema>`,
                [`I${entity}QuerySchema`]:  `typeof ${entity}QuerySchema`,
                [`I${entity}Query`]:        `z.infer<I${entity}QuerySchema>`,
            },
        })
        .saveTo({
            file: normalize(`${process.cwd()}/${folder}/Schema.ts`),
            barrel,
        });
};
