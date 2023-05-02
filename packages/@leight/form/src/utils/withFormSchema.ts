import {
    ISourceSchema,
    ISourceSchemaType,
    withCreateSchema,
    withPatchSchema
}                         from "@leight/source";
import {type IFormSchema} from "../api";
import {
    FormDtoSchema,
    FormRequestSchema,
    FormValuesSchema,
    type IFormDtoSchema,
    type IFormRequestSchema,
    type IFormValuesSchema
}                         from "../schema";

export type IWithFormSchemaProps<
    TValuesSchema extends IFormValuesSchema,
    TRequestSchema extends IFormRequestSchema,
    TDtoSchema extends IFormDtoSchema,
> = Partial<IFormSchema<TValuesSchema, TRequestSchema, TDtoSchema>>;

export const withFormSchema = <
    TValuesSchema extends IFormValuesSchema,
    TRequestSchema extends IFormRequestSchema,
    TDtoSchema extends IFormDtoSchema
>(
    {
        ValuesSchema = FormValuesSchema as TValuesSchema,
        RequestSchema = FormRequestSchema as TRequestSchema,
        DtoSchema = FormDtoSchema as TDtoSchema,
    }: IWithFormSchemaProps<TValuesSchema, TRequestSchema, TDtoSchema>): IFormSchema<TValuesSchema, TRequestSchema, TDtoSchema> => ({
    ValuesSchema,
    RequestSchema,
    DtoSchema,
});

export interface IWithFormCreateSchemaProps<TSourceSchemaType extends ISourceSchemaType, TValuesSchema extends IFormValuesSchema> {
    schema: ISourceSchema.of<TSourceSchemaType>;
    ValuesSchema: TValuesSchema;
}

export const withFormCreateSchema = <TSourceSchemaType extends ISourceSchemaType, TValuesSchema extends IFormValuesSchema>(
    {
        schema,
        ValuesSchema,
    }: IWithFormCreateSchemaProps<TSourceSchemaType, TValuesSchema>
) => {
    const RequestSchema = withCreateSchema<TSourceSchemaType>(schema);
    return withFormSchema<TValuesSchema, typeof RequestSchema, TSourceSchemaType["DtoSchema"]>({
        ValuesSchema,
        RequestSchema,
        DtoSchema: schema.DtoSchema,
    });
};

export interface IWithFormPatchSchemaProps<TSourceSchemaType extends ISourceSchemaType, TValuesSchema extends IFormValuesSchema> {
    schema: ISourceSchema.of<TSourceSchemaType>;
    ValuesSchema: TValuesSchema;
}

export const withFormPatchSchema = <TSourceSchemaType extends ISourceSchemaType, TValuesSchema extends IFormValuesSchema>(
    {
        schema,
        ValuesSchema,
    }: IWithFormPatchSchemaProps<TSourceSchemaType, TValuesSchema>
) => {
    const RequestSchema = withPatchSchema<TSourceSchemaType>(schema);
    return withFormSchema<TValuesSchema, typeof RequestSchema, TSourceSchemaType["DtoSchema"]>({
        ValuesSchema,
        RequestSchema,
        DtoSchema: schema.DtoSchema,
    });
};
