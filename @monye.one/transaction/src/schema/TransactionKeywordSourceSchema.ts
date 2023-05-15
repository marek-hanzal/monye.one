import {
    FilterSchema,
    PatchSchema,
    SortOrderSchema,
    type Source,
    withSourceSchema
}          from "@leight/source";
import {z} from "@leight/zod";
import {
    TransactionKeywordOptionalDefaultsSchema,
    TransactionKeywordPartialSchema,
    TransactionKeywordSchema
}          from "@monye.one/prisma";

export const TransactionKeywordSourceSchema = withSourceSchema({
    EntitySchema:   TransactionKeywordSchema,
    DtoSchema:      TransactionKeywordSchema,
    ToCreateSchema: TransactionKeywordOptionalDefaultsSchema,
    CreateSchema:   TransactionKeywordOptionalDefaultsSchema,
    ToPatchSchema:  PatchSchema.merge(TransactionKeywordPartialSchema),
    PatchSchema:    PatchSchema.merge(TransactionKeywordPartialSchema),
    FilterSchema:   FilterSchema.merge(z.object({
        transactionId: z.string().optional(),
    })),
    SortSchema:     z.object({
        id: SortOrderSchema,
    }),
});
export type TransactionKeywordSource = Source<typeof TransactionKeywordSourceSchema>;
