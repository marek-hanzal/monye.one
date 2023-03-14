import {z} from "zod";

export const FilterSchema = z.object({
    fulltext: z.string().optional(),
});

export type IFilterSchema = typeof FilterSchema;

export type IFilter = z.infer<IFilterSchema>;
