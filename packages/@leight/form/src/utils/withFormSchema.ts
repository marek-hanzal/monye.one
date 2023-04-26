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
