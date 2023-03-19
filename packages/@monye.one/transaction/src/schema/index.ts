import {FilterSchema}       from "@leight/filter";
import {QuerySchema}        from "@leight/query";
import {SortOrderSchema}    from "@leight/sort";
import {WithIdentitySchema} from "@leight/source";
import {PrismaSchema}       from "@monye.one/prisma";
import {z}                  from "zod";

export const TransactionSchema = PrismaSchema.TransactionSchema;
export type ITransactionSchema = typeof TransactionSchema;
export type ITransaction = z.infer<ITransactionSchema>;

export const TransactionCreateSchema = PrismaSchema.TransactionOptionalDefaultsSchema;
export type ITransactionCreateSchema = typeof TransactionCreateSchema;
export type ITransactionCreate = z.infer<ITransactionCreateSchema>;

export const TransactionPatchSchema = PrismaSchema.TransactionPartialSchema.merge(WithIdentitySchema);
export type ITransactionPatchSchema = typeof TransactionPatchSchema;
export type ITransactionPatch = z.infer<ITransactionPatchSchema>;

export const TransactionQuerySchema = QuerySchema({});
export type ITransactionQuerySchema = typeof TransactionQuerySchema;
export type ITransactionQuery = z.infer<ITransactionQuerySchema>;

export const TransactionFilterSchema = FilterSchema;
export type ITransactionFilterSchema = typeof TransactionFilterSchema;
export type ITransactionFilter = z.infer<ITransactionFilterSchema>;

export const TransactionSortSchema = z.object({
    date: SortOrderSchema,
}).optional();
export type ITransactionSortSchema = typeof TransactionSortSchema;
export type ITransactionSort = z.infer<ITransactionSortSchema>;

/**
 * Schema used for importing transaction from any source.
 */
export const TransactionImportSchema = z.object({
    bank:      z.string().trim(),
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
