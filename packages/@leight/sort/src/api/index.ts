import {z} from "zod";

export const SortSchema = z.object({});

export type ISortSchema = typeof SortSchema;

export type ISort = z.infer<ISortSchema>;
