import {z} from "@leight/zod";

export const TabSchema = z.object({
    tab:      z.string(),
    services: z.array(z.string()),
});
export type ITabSchema = typeof TabSchema;
export type ITab = z.infer<ITabSchema>;

export const TranslationSchema = z.object({
    from: z.object({
        source: z.array(z.string()),
        concat: z.string().optional(),
    }),
    to:   z.string(),
});
export type ITranslationSchema = typeof TranslationSchema;
export type ITranslation = z.infer<ITranslationSchema>;

export const MetaSchema = z.object({
    tabs:         z.array(TabSchema),
    translations: z.array(TranslationSchema),
});
export type IMetaSchema = typeof MetaSchema;
export type IMeta = z.infer<IMetaSchema>;

export const RequestSchema = z.object({
    fileId: z.string(),
});
export type IRequestSchema = typeof RequestSchema;
export type IRequest = z.infer<IRequestSchema>;


