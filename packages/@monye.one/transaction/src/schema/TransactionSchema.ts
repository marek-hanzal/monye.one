import {ImportParamsSchema} from "@leight/import";
import {z}                  from "@leight/zod";

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
