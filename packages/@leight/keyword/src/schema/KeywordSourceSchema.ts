import {
    KeywordOptionalDefaultsSchema,
    KeywordPartialSchema,
    KeywordSchema
}          from "@leight/prisma";
import {
    FilterSchema,
    ParamsSchema,
    PatchSchema,
    SortOrderSchema,
    type Source,
    withSourceSchema
}          from "@leight/source";
import {z} from "@leight/zod";

export const KeywordSourceSchema = withSourceSchema({
    EntitySchema:   KeywordSchema,
    DtoSchema:      KeywordSchema,
    ToCreateSchema: KeywordOptionalDefaultsSchema,
    CreateSchema:   KeywordOptionalDefaultsSchema,
    ToPatchSchema:  KeywordPartialSchema.merge(PatchSchema),
    PatchSchema:    KeywordPartialSchema.merge(PatchSchema),
    FilterSchema:   FilterSchema.merge(z.object({
        keyword: z.string().optional(),
    })),
    ParamsSchema:   ParamsSchema,
    SortSchema:     z.object({
        id: SortOrderSchema,
    }),
});
export type KeywordSource = Source<typeof KeywordSourceSchema>;
