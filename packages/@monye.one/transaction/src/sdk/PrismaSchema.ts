/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	TransactionSchema as $EntitySchema,
	TransactionOptionalDefaultsSchema,
	TransactionPartialSchema,
	TransactionWhereInputSchema,
	TransactionWhereUniqueInputSchema,
	TransactionOrderByWithRelationInputSchema
} from "@monye.one/prisma";
import {FilterSchema} from "@leight/filter";
import {
	ParamsSchema,
	QuerySchema
} from "@leight/query";
import {SortOrderSchema} from "@leight/sort";
import {WithIdentitySchema} from "@leight/source";
import {z} from "@leight/zod";
import {TransactionExSchema} from "../schema";

export type ITransactionWhereSchema = typeof TransactionWhereSchema;
export type ITransactionWhere = z.infer<ITransactionWhereSchema>;
export type ITransactionWhereUniqueSchema = typeof TransactionWhereUniqueSchema;
export type ITransactionWhereUnique = z.infer<ITransactionWhereUniqueSchema>;
export type ITransactionOrderBySchema = typeof TransactionOrderBySchema;
export type ITransactionOrderBy = z.infer<ITransactionOrderBySchema>;
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

export const TransactionWhereSchema = TransactionWhereInputSchema;
export const TransactionWhereUniqueSchema = TransactionWhereUniqueInputSchema;
export const TransactionOrderBySchema = TransactionOrderByWithRelationInputSchema;
/**
 * Schema definition for Transaction
 */
export const TransactionSchema = $EntitySchema.merge(TransactionExSchema);
export const TransactionCreateSchema = TransactionOptionalDefaultsSchema;
export const TransactionPatchSchema = TransactionPartialSchema.merge(WithIdentitySchema);
export const TransactionFilterSchema = z.union([
    TransactionWhereSchema,
    TransactionWhereUniqueSchema,
    FilterSchema,
]);
export const TransactionParamSchema = ParamsSchema;
export const TransactionSortSchema = z.object({
    date: SortOrderSchema,
	amount: SortOrderSchema,
	reference: SortOrderSchema
});
/**
 * Query definition for Transaction
 */
export const TransactionQuerySchema = QuerySchema({
    filterSchema: TransactionFilterSchema,
    sortSchema:   TransactionSortSchema,
    paramsSchema: TransactionParamSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_evnmbzvi9iw58r1deigznfcv = true;