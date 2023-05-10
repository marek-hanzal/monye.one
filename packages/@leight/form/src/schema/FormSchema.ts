import {DtoSchema} from "@leight/source";
import {z}         from "@leight/zod";

export const FormValuesSchema = z.object({});
export type IFormValuesSchema = z.ZodObject<any, "strip">;

export const FormRequestSchema = z.object({});
export type IFormRequestSchema = z.ZodObject<any, "strip">;

export const FormDtoSchema = DtoSchema;
export type IFormDtoSchema = typeof FormDtoSchema;
