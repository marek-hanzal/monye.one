import {withSourceFile}  from "@leight/generator-server";
import {normalize}       from "node:path";
import {type IGenerator} from "../index";

export interface IGeneratorEntitySchemaParams {
    /**
     * Source package exporting "PrismaSchema" namespace containing "modelName"
     */
    PrismaSchema: string;
    /**
     * Model name being exported.
     */
    modelName: string;
}

export const generatorEntitySchema: IGenerator<IGeneratorEntitySchemaParams> = async ({barrel, file, params: {PrismaSchema, modelName}}) => {
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
        .withConsts({
            exports: {
                [`${modelName}Schema`]:       `PrismaSchema.${modelName}Schema`,
                [`${modelName}CreateSchema`]: `PrismaSchema.${modelName}OptionalDefaultsSchema`,
                [`${modelName}PatchSchema`]:  `PrismaSchema.${modelName}PartialSchema.merge(WithIdentitySchema)`,
                [`${modelName}FilterSchema`]: `z.union([
    PrismaSchema.${modelName}WhereInputSchema,
    PrismaSchema.${modelName}WhereUniqueInputSchema,
    FilterSchema,
])`,
                [`${modelName}ParamSchema`]:  `ParamsSchema`,
                [`${modelName}SortSchema`]:   `
z.object({
    date:      SortOrderSchema,
    amount:    SortOrderSchema,
    reference: SortOrderSchema,
})`,
                [`${modelName}QuerySchema`]:  `
QuerySchema({
    filterSchema: ${modelName}FilterSchema,
    sortSchema:   ${modelName}SortSchema,
    paramsSchema: ${modelName}ParamSchema,
})
                `,
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
