import {z} from "@leight/zod";

export const CursorSchema = z.object({
    page: z.number().min(0),
    size: z.number().min(1),
});

export type ICursorSchema = typeof CursorSchema;

export type ICursor = z.infer<ICursorSchema>;
