import {type ISourceSchema} from "@leight/source";
import {type IFormSchema} from "../api";
import {FormDtoSchema, FormRequestSchema, FormValuesSchema, type IFormDtoSchema, type IFormRequestSchema, type IFormValuesSchema} from "../schema";

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

export interface IWithFormCreateSchemaProps<TSourceSchema extends ISourceSchema, TValuesSchema extends IFormValuesSchema> {
    schema: TSourceSchema;
    ValuesSchema: TValuesSchema;
}

export const withFormCreateSchema = <TSourceSchema extends ISourceSchema, TValuesSchema extends IFormValuesSchema>(
    {
        schema,
        ValuesSchema,
    }: IWithFormCreateSchemaProps<TSourceSchema, TValuesSchema>
) => {
    return withFormSchema<TValuesSchema, TSourceSchema["ToCreateSchema"], TSourceSchema["DtoSchema"]>({
        ValuesSchema,
        RequestSchema: schema.Mapper.ToCreateSchema,
        DtoSchema: schema.Mapper.DtoSchema,
    });
};

export interface IWithFormPatchSchemaProps<TSourceSchema extends ISourceSchema, TValuesSchema extends IFormValuesSchema> {
    schema: TSourceSchema;
    ValuesSchema: TValuesSchema;
}

export const withFormPatchSchema = <TSourceSchema extends ISourceSchema, TValuesSchema extends IFormValuesSchema>(
    {
        schema,
        ValuesSchema,
    }: IWithFormPatchSchemaProps<TSourceSchema, TValuesSchema>
) => {
    return withFormSchema<TValuesSchema, TSourceSchema["ToPatchSchemaProps"], TSourceSchema["DtoSchema"]>({
        ValuesSchema,
        RequestSchema: schema.Mapper.ToPatchSchemaProps,
        DtoSchema: schema.Mapper.DtoSchema,
    });
};
