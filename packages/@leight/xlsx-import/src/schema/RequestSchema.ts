import {z} from "zod";

export const RequestSchema = z.object({
    fileId: z.string(),
});
