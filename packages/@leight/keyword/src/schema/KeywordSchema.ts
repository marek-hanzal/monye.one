import {FilterSchema} from "@leight/filter";
import {z}            from "@leight/zod";

export const KeywordFilterSchema = FilterSchema.merge(z.object({
    keyword: z.string().optional(),
}));
