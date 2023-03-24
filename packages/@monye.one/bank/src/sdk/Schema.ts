/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	BankSchema as $EntitySchema,
	BankOptionalDefaultsSchema,
	BankPartialSchema,
	BankWhereInputSchema,
	BankWhereUniqueInputSchema,
	BankOrderByWithRelationInputSchema
} from "@monye.one/prisma";
import {FilterSchema} from "@leight/filter";
import {
	ParamsSchema,
	QuerySchema
} from "@leight/query";
import {SortOrderSchema} from "@leight/sort";
import {WithIdentitySchema} from "@leight/source";
import {z} from "zod";

export type IBankWhereSchema = typeof BankWhereSchema;
export type IBankWhere = z.infer<IBankWhereSchema>;
export type IBankWhereUniqueSchema = typeof BankWhereUniqueSchema;
export type IBankWhereUnique = z.infer<IBankWhereUniqueSchema>;
export type IBankOrderBySchema = typeof BankOrderBySchema;
export type IBankOrderBy = z.infer<IBankOrderBySchema>;
export type IBankSchema = typeof BankSchema;
export type IBank = z.infer<IBankSchema>;
export type IBankCreateSchema = typeof BankCreateSchema;
export type IBankCreate = z.infer<IBankCreateSchema>;
export type IBankPatchSchema = typeof BankPatchSchema;
export type IBankPatch = z.infer<IBankPatchSchema>;
export type IBankFilterSchema = typeof BankFilterSchema;
export type IBankFilter = z.infer<IBankFilterSchema>;
export type IBankParamSchema = typeof BankParamSchema;
export type IBankParam = z.infer<IBankParamSchema>;
export type IBankSortSchema = typeof BankSortSchema;
export type IBankSort = z.infer<IBankSortSchema>;
export type IBankQuerySchema = typeof BankQuerySchema;
export type IBankQuery = z.infer<IBankQuerySchema>;

export const BankWhereSchema = BankWhereInputSchema;
export const BankWhereUniqueSchema = BankWhereUniqueInputSchema;
export const BankOrderBySchema = BankOrderByWithRelationInputSchema;
export const BankSchema = $EntitySchema;
export const BankCreateSchema = BankOptionalDefaultsSchema;
export const BankPatchSchema = BankPartialSchema.merge(WithIdentitySchema);
export const BankFilterSchema = z.union([
    BankWhereSchema,
    BankWhereUniqueSchema,
    FilterSchema,
]);
export const BankParamSchema = ParamsSchema;
export const BankSortSchema = z.object({
    account: SortOrderSchema
});
export const BankQuerySchema = QuerySchema({
    filterSchema: BankFilterSchema,
    sortSchema:   BankSortSchema,
    paramsSchema: BankParamSchema,
});