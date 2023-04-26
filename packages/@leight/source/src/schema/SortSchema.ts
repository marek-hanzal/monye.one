import {z} from "@leight/zod";

export const SortOrderSchema = z.enum([
    "asc",
    "desc"
]).optional();
export type ISortOrderSchema = typeof SortOrderSchema
export type ISortOrder = z.infer<ISortOrderSchema>;

export const SortSchema = z.object({});
export type ISortSchema = typeof SortSchema;
export type ISort = z.infer<ISortSchema>;
