import {DtoSchema} from "@leight/source";
import {z}         from "@leight/zod";

export const FormValuesSchema = z.object({});
export type IFormValuesSchema = typeof FormValuesSchema;

export const FormRequestSchema = z.object({});
export type IFormRequestSchema = typeof FormRequestSchema;

export const FormDtoSchema = DtoSchema;
export type IFormDtoSchema = typeof FormDtoSchema;
