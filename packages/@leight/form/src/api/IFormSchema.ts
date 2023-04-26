import {
    type IFormDtoSchema,
    type IFormRequestSchema,
    type IFormValuesSchema
}                             from "../schema";
import {type IFormSchemaType} from "./IFormSchemaType";

export interface IFormSchema<
    TValuesSchema extends IFormValuesSchema,
    TRequestSchema extends IFormRequestSchema,
    TDtoSchema extends IFormDtoSchema
> {
    ValuesSchema: TValuesSchema;
    RequestSchema: TRequestSchema;
    DtoSchema: TDtoSchema;
}

export namespace IFormSchema {
    export type of<TFormSchemaType extends IFormSchemaType> = IFormSchema<
        TFormSchemaType["ValuesSchema"],
        TFormSchemaType["RequestSchema"],
        TFormSchemaType["DtoSchema"]
    >
}
