import {ImportParamsSchema} from "@leight/import";
import {FilterSchema}       from "@leight/source";
import {z}                  from "@leight/zod";
import {BankSourceSchema}   from "@monye.one/bank";

/**
 * Schema used for importing transaction from any source.
 */
export const TransactionImportSchema = z.object({
    bank:      z.string().optional(),
    reference: z.string().trim(),
    note:      z.string().trim().optional(),
    date:      z.coerce.date(),
    amount:    z.string().transform((t) => parseFloat(t)),
    variable:  z.string().trim().optional(),
    static:    z.string().trim().optional(),
    symbol:    z.string().trim().optional(),
    target:    z.string().trim().optional(),
});
export type ITransactionImportSchema = typeof TransactionImportSchema;
export type ITransactionImport = z.infer<ITransactionImportSchema>;

export const TransactionImportParamsSchema = ImportParamsSchema.merge(z.object({
    account: z.string().optional(),
}));
export type ITransactionImportParamsSchema = typeof TransactionImportParamsSchema;
export type ITransactionImportParams = z.infer<ITransactionImportParamsSchema>;

export const TransactionSchemaEx = z.object({
    bank: BankSourceSchema["EntitySchema"],
});

export const TransactionFilterSchemaEx = FilterSchema.merge(z.object({
    bankId:           z.string().optional(),
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
}));

export const TransactionKeywordFilterSchemaEx = FilterSchema.merge(z.object({
    transactionId: z.string().optional(),
}));
