import {type DeepPartial} from "@leight/utils";
import {z}                from "@leight/zod";
import {
    type IFormDtoSchema,
    type IFormRequestSchema,
    type IFormValuesSchema
}                         from "../schema";
import {type IFormSchema} from "./IFormSchema";

/**
 * Defines form schema - all internal data are separated by a purpose
 */
export interface IFormSchemaType<
    TValuesSchema extends IFormValuesSchema = IFormValuesSchema,
    TRequestSchema extends IFormRequestSchema = IFormRequestSchema,
    TDtoSchema extends IFormDtoSchema = IFormDtoSchema,
> extends IFormSchema<
    TValuesSchema,
    TRequestSchema,
    TDtoSchema
> {
    Values: z.infer<TValuesSchema>;
    OptionalValues: DeepPartial<z.infer<TValuesSchema>>;
    Request: z.infer<TRequestSchema>;
    Dto: z.infer<TDtoSchema>;
}

export namespace IFormSchemaType {
    export type of<TFormSchema extends IFormSchema<any, any, any>> = IFormSchemaType<
        TFormSchema["ValuesSchema"],
        TFormSchema["RequestSchema"],
        TFormSchema["DtoSchema"]
    >;
}
