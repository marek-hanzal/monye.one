import {z} from "@leight/utils";

export const FilterSchema = z.object({
    id:       z.string().optional(),
    ids:      z.array(z.string()).optional(),
    fulltext: z.string().optional(),
});
export type IFilterSchema = typeof FilterSchema;
export type IFilter = z.infer<IFilterSchema>;
