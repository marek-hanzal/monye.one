import {
    DtoSchema,
    type IDtoSchema
}          from "@leight/source";
import {z} from "@leight/zod";

export const FormValuesSchema = z.object({});
export type IFormValuesSchema = z.ZodObject<any>;

export const FormRequestSchema = z.object({});
export type IFormRequestSchema = z.ZodObject<any>;

export const FormDtoSchema = DtoSchema;
export type IFormDtoSchema = IDtoSchema;
