import {z}                 from "zod";
import {TabSchema}         from "./TabSchema";
import {TranslationSchema} from "./TranslationSchema";

export const MetaSchema = z.object({
    tabs:         z.array(TabSchema),
    translations: z.array(TranslationSchema),
});

export type IMetaSchema = z.infer<typeof MetaSchema>;
