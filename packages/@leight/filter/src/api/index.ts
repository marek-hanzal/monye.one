import {z} from "zod";

export const FilterSchema = z.object({
    id:       z.string().optional(),
    fulltext: z.string().optional(),
});
export type IFilterSchema =
    typeof FilterSchema
    | z.ZodType;
export type IFilter = z.infer<IFilterSchema>;
