import {z} from "zod";

export const TabSchema = z.object({
    tab: z.string(),
    services: z.array(z.string()),
});

export type ITabSchema = z.infer<typeof TabSchema>;
