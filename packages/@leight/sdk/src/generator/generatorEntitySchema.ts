import {type IPackageType} from "@leight/generator";
import {withSourceFile}    from "@leight/generator-server";
import {normalize}         from "node:path";
import {type IGenerator}   from "../api";

export interface IGeneratorEntitySchemaParams {
    /**
     * Source package exporting "PrismaSchema" namespace containing "modelName"
     */
    PrismaSchema: string;
    /**
     * Model name being exported.
     */
    modelName: string;
    schemaEx?: {
        model: IPackageType;
    },
    sorts?: string[];
}

export const generatorEntitySchema: IGenerator<IGeneratorEntitySchemaParams> = async (
    {
        barrel,
        file,
        params: {
                    PrismaSchema,
                    modelName,
                    sorts = [],
                    schemaEx,
                },
    }) => {
    withSourceFile()
        .withImports({
            imports: {
                [PrismaSchema]:   [
                    "PrismaSchema",
                ],
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
                "zod":            [
                    "z",
                ],
            },
        })
        .withImports(schemaEx?.model ? {
            imports: {
                [schemaEx.model.package]: [
                    schemaEx.model.type,
                ],
            },
        } : undefined)
        .withConsts({
            exports: {
                [`${modelName}Schema`]:       {body: schemaEx?.model ? `PrismaSchema.${modelName}Schema.merge(${schemaEx.model.type})` : `PrismaSchema.${modelName}Schema`},
                [`${modelName}CreateSchema`]: {body: `PrismaSchema.${modelName}OptionalDefaultsSchema`},
                [`${modelName}PatchSchema`]:  {body: `PrismaSchema.${modelName}PartialSchema.merge(WithIdentitySchema)`},
                [`${modelName}FilterSchema`]: {
                    body: `z.union([
    PrismaSchema.${modelName}WhereInputSchema,
    PrismaSchema.${modelName}WhereUniqueInputSchema,
    FilterSchema,
])
                    `,
                },
                [`${modelName}ParamSchema`]:  {body: `ParamsSchema`},
                [`${modelName}SortSchema`]:   {
                    body: `
z.object({
    ${sorts.map(sort => `${sort}: SortOrderSchema`).join(",\n\t")}
})
                    `,
                },
                [`${modelName}QuerySchema`]:  {
                    body: `
QuerySchema({
    filterSchema: ${modelName}FilterSchema,
    sortSchema:   ${modelName}SortSchema,
    paramsSchema: ${modelName}ParamSchema,
})
                    `,
                },
            },
        })
        .withTypes({
            exports: {
                [`I${modelName}Schema`]:       `typeof ${modelName}Schema`,
                [`I${modelName}`]:             `z.infer<I${modelName}Schema>`,
                [`I${modelName}CreateSchema`]: `typeof ${modelName}CreateSchema`,
                [`I${modelName}Create`]:       `z.infer<I${modelName}CreateSchema>`,
                [`I${modelName}PatchSchema`]:  `typeof ${modelName}PatchSchema`,
                [`I${modelName}Patch`]:        `z.infer<I${modelName}PatchSchema>`,
                [`I${modelName}FilterSchema`]: `typeof ${modelName}FilterSchema`,
                [`I${modelName}Filter`]:       `z.infer<I${modelName}FilterSchema>`,
                [`I${modelName}ParamSchema`]:  `typeof ${modelName}ParamSchema`,
                [`I${modelName}Param`]:        `z.infer<I${modelName}ParamSchema>`,
                [`I${modelName}SortSchema`]:   `typeof ${modelName}SortSchema`,
                [`I${modelName}Sort`]:         `z.infer<I${modelName}SortSchema>`,
                [`I${modelName}QuerySchema`]:  `typeof ${modelName}QuerySchema`,
                [`I${modelName}Query`]:        `z.infer<I${modelName}QuerySchema>`,
            },
        })
        .saveTo({
            file: normalize(`${process.cwd()}/${file}`),
            barrel,
        });
};
