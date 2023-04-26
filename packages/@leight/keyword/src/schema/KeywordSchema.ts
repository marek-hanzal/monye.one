import {FilterSchema} from "@leight/source";
import {z}            from "@leight/zod";

export const KeywordFilterSchema = FilterSchema.merge(z.object({
    keyword: z.string().optional(),
}));
