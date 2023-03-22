// Generated file
import {PrismaSchema} from "@monye.one/prisma";
import {FilterSchema} from "@leight/filter";
import {
	ParamsSchema,
	QuerySchema
} from "@leight/query";
import {SortOrderSchema} from "@leight/sort";
import {WithIdentitySchema} from "@leight/source";
import {z} from "zod";

export type ITransactionSchema = typeof TransactionSchema;
export type ITransaction = z.infer<ITransactionSchema>;
export type ITransactionCreateSchema = typeof TransactionCreateSchema;
export type ITransactionCreate = z.infer<ITransactionCreateSchema>;
export type ITransactionPatchSchema = typeof TransactionPatchSchema;
export type ITransactionPatch = z.infer<ITransactionPatchSchema>;
export type ITransactionFilterSchema = typeof TransactionFilterSchema;
export type ITransactionFilter = z.infer<ITransactionFilterSchema>;
export type ITransactionParamSchema = typeof TransactionParamSchema;
export type ITransactionParam = z.infer<ITransactionParamSchema>;
export type ITransactionSortSchema = typeof TransactionSortSchema;
export type ITransactionSort = z.infer<ITransactionSortSchema>;
export type ITransactionQuerySchema = typeof TransactionQuerySchema;
export type ITransactionQuery = z.infer<ITransactionQuerySchema>;

export const TransactionSchema = PrismaSchema.TransactionSchema;
export const TransactionCreateSchema = PrismaSchema.TransactionOptionalDefaultsSchema;
export const TransactionPatchSchema = PrismaSchema.TransactionPartialSchema.merge(WithIdentitySchema);
export const TransactionFilterSchema = z.union([
    PrismaSchema.TransactionWhereInputSchema,
    PrismaSchema.TransactionWhereUniqueInputSchema,
    FilterSchema,
]);
export const TransactionParamSchema = ParamsSchema;
export const TransactionSortSchema = z.object({
    date: SortOrderSchema,
	amount: SortOrderSchema,
	reference: SortOrderSchema
});
export const TransactionQuerySchema = QuerySchema({
    filterSchema: TransactionFilterSchema,
    sortSchema:   TransactionSortSchema,
    paramsSchema: TransactionParamSchema,
});