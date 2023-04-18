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
import {SortOrderSchema} from "@leight/sort";
import {
	type IContainer,
	ServiceContext
} from "@leight/container";
import {
	withSourceExSchema,
	type InferSourceExSchema,
	type IUseSourceQuery,
	WithIdentitySchema,
	type ISource,
	type InferSourceSchema,
	withSourceSchema,
	ToCreateSchema,
	ToPatchSchema
} from "@leight/source";
import {z} from "@leight/zod";
import {TransactionExSchema} from "../schema";
import {ParamsSchema} from "@leight/query";

export type ITransactionSourceSchema = InferSourceSchema<typeof TransactionSourceSchema>;
export type ITransactionPrismaSchema = InferSourceExSchema<typeof TransactionPrismaSchema>;
export type IUseTransactionSourceQuery = IUseSourceQuery<ITransactionSourceSchema>;

export interface ITransactionSource extends ISource<ITransactionSourceSchema> {
}

export const TransactionPrismaSchema = withSourceExSchema({
    WhereSchema:       TransactionWhereInputSchema,
    WhereUniqueSchema: TransactionWhereUniqueInputSchema,
    OrderBySchema:     TransactionOrderByWithRelationInputSchema,
});
export const TransactionSourceSchema = withSourceSchema({
    EntitySchema: $EntitySchema.merge(TransactionExSchema),
    ToCreateSchema: ToCreateSchema,
    CreateSchema: TransactionOptionalDefaultsSchema,
    ToPatchSchema: ToPatchSchema,
    PatchSchema: TransactionPartialSchema.merge(WithIdentitySchema),
    FilterSchema: z.union([
        TransactionWhereInputSchema,
        TransactionWhereUniqueInputSchema,
        FilterSchema,
    ]),
    ParamsSchema: ParamsSchema,
    SortSchema: z.object({
        date: SortOrderSchema,
	amount: SortOrderSchema,
	reference: SortOrderSchema
    }),
});
export const $TransactionSource = Symbol.for("@monye.one/transaction/ITransactionSource");
export const TransactionSourceContext = (container: IContainer) => new ServiceContext<ITransactionSource>(container, $TransactionSource);
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_o5fhj0untwbe04lmcbd7v7ty = true;