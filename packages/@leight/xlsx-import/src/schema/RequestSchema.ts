import { z } from "zod";

export const RequestSchema = z.object({
    fileId: z.string(),
});

export type IRequestSchema = z.infer<typeof RequestSchema>;
