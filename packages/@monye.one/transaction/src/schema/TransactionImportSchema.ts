import {z} from "zod";

/**
 * Schema used for importing transaction from any source.
 */
export const TransactionImportSchema = z.object({
    bank: z.string(),
    reference: z.string(),
    note: z.string().optional(),
    date: z.date(),
    amount: z.number()
});

export type ITransactionImportSchema = z.infer<typeof TransactionImportSchema>;
