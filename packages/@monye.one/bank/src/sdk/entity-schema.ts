import {PrismaSchema} from "@monye.one/prisma";
import {FilterSchema} from "@leight/filter";
import {
	ParamsSchema,
	QuerySchema
} from "@leight/query";
import {SortOrderSchema} from "@leight/sort";
import {WithIdentitySchema} from "@leight/source";
import {z} from "zod";

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

export const BankSchema = PrismaSchema.BankSchema;
export const BankCreateSchema = PrismaSchema.BankOptionalDefaultsSchema;
export const BankPatchSchema = PrismaSchema.BankPartialSchema.merge(WithIdentitySchema);
export const BankFilterSchema = z.union([
    PrismaSchema.BankWhereInputSchema,
    PrismaSchema.BankWhereUniqueInputSchema,
    FilterSchema,
]);
export const BankParamSchema = ParamsSchema;
export const BankSortSchema = z.object({
    date:      SortOrderSchema,
    amount:    SortOrderSchema,
    reference: SortOrderSchema,
});
export const BankQuerySchema = QuerySchema({
    filterSchema: BankFilterSchema,
    sortSchema:   BankSortSchema,
    paramsSchema: BankParamSchema,
});