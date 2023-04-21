import {FilterSchema} from "@leight/filter";
import {z}            from "@leight/zod";

export const FileFilterSchemaEx = FilterSchema.merge(z.object({
    userId_path_name: z.object({
        name:   z.string(),
        path:   z.string(),
        userId: z.string(),
    }).optional(),
}));
