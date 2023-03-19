import {z} from "zod";

export const FilterSchema = z.object({
    fulltext: z.string().optional(),
});
export type IFilterSchema =
    typeof FilterSchema
    | z.ZodType;
export type IFilter = z.infer<IFilterSchema>;
