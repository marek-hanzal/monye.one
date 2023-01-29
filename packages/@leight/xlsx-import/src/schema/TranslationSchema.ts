import {z} from "zod";

export const TranslationSchema = z.object({
    from: z.object({
        source: z.array(z.string()),
        concat: z.string().optional(),
    }),
    to: z.string(),
})

export type ITranslationSchema = z.infer<typeof TranslationSchema>;
