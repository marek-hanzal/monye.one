import {File}           from "@leight/generator-server";
import {normalize}      from "node:path";
import {type ITemplate} from "../index";

export interface IGeneratorQuerySchemaParams {
    prismaPackage: string;
    modelName: string;
}

export const generatorQuerySchema = ({barell = true, file, params: {prismaPackage, modelName}}: ITemplate<IGeneratorQuerySchemaParams>) => {
    (new File())
        .withImports({
            [prismaPackage]:  [
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
        })
        .block(`
export const ${modelName}Schema = PrismaSchema.${modelName}Schema;
export type I${modelName}Schema = typeof ${modelName}Schema;
export type I${modelName} = z.infer<I${modelName}Schema>;

export const ${modelName}CreateSchema = PrismaSchema.${modelName}OptionalDefaultsSchema;
export type I${modelName}CreateSchema = typeof ${modelName}CreateSchema;
export type I${modelName}Create = z.infer<I${modelName}CreateSchema>;

export const ${modelName}PatchSchema = PrismaSchema.${modelName}PartialSchema.merge(WithIdentitySchema);
export type I${modelName}PatchSchema = typeof ${modelName}PatchSchema;
export type I${modelName}Patch = z.infer<I${modelName}PatchSchema>;

export const ${modelName}FilterSchema = z.union([
    PrismaSchema.${modelName}WhereInputSchema,
    PrismaSchema.${modelName}WhereUniqueInputSchema,
    FilterSchema,
]);
export type I${modelName}FilterSchema = typeof ${modelName}FilterSchema;
export type I${modelName}Filter = z.infer<I${modelName}FilterSchema>;

export const ${modelName}ParamSchema = ParamsSchema;
export type I${modelName}ParamSchema = typeof ${modelName}ParamSchema;
export type I${modelName}Param = z.infer<I${modelName}ParamSchema>;

export const ${modelName}SortSchema = z.object({
    date:      SortOrderSchema,
    amount:    SortOrderSchema,
    reference: SortOrderSchema,
});
export type I${modelName}SortSchema = typeof ${modelName}SortSchema;
export type I${modelName}Sort = z.infer<I${modelName}SortSchema>;

export const ${modelName}QuerySchema = QuerySchema({
    filterSchema: ${modelName}FilterSchema,
    sortSchema:   ${modelName}SortSchema,
    paramsSchema: ${modelName}ParamSchema,
});
export type I${modelName}QuerySchema = typeof ${modelName}QuerySchema;
export type I${modelName}Query = z.infer<I${modelName}QuerySchema>;        
        `)
        .saveTo(normalize(`${process.cwd()}/${file}`));
};
