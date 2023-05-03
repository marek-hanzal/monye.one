import {
    FilterSchema,
    type ISourceSchemaType,
    PatchSchema,
    SortOrderSchema,
    withSourceSchema
}                         from "@leight/source";
import {z}                from "@leight/zod";
import {BankSourceSchema} from "@monye.one/bank";
import {
    TransactionOptionalDefaultsSchema,
    TransactionPartialSchema,
    TransactionSchema
}                         from "@monye.one/prisma";

export const TransactionSourceSchema = withSourceSchema({
    EntitySchema:   TransactionSchema.merge(z.object({
        bank: BankSourceSchema["EntitySchema"],
    })),
    DtoSchema:      TransactionSchema.merge(z.object({
        bank: BankSourceSchema["EntitySchema"],
    })),
    ToCreateSchema: TransactionOptionalDefaultsSchema,
    CreateSchema:   TransactionOptionalDefaultsSchema,
    ToPatchSchema:  TransactionPartialSchema.merge(PatchSchema),
    PatchSchema:    TransactionPartialSchema.merge(PatchSchema),
    FilterSchema:   FilterSchema.merge(z.object({
        bankId:           z.string().optional(),
        amount:           z.number().optional(),
        account:          z.string().optional(),
        withoutFrom:      z.boolean().optional(),
        withoutTo:        z.boolean().optional(),
        target:           z.string().optional(),
        bankIds:          z.array(z.string()).optional(),
        rangeOf:          z.string().optional(),
        userId_reference: z.object({
            userId:    z.string(),
            reference: z.string(),
        }).optional(),
        withRange:        z.object({
            from: z.date(),
            to:   z.date(),
        }).optional(),
        withIncome:       z.boolean().optional(),
        withOutcome:      z.boolean().optional(),
        from:             z.date().optional(),
        to:               z.date().optional(),
        amountFrom:       z.number().optional(),
        amountTo:         z.number().optional(),
    })),
    SortSchema:     z.object({
        date:      SortOrderSchema,
        amount:    SortOrderSchema,
        reference: SortOrderSchema
    }),
});
export type ITransactionSourceSchemaType = ISourceSchemaType.of<typeof TransactionSourceSchema>;
