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
	type ISource,
	type InferSourceSchema,
	withSourceSchema,
	PatchSchema
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
const $TransactionSchema = $EntitySchema.merge(TransactionExSchema);
const $TransactionCreateSchema = TransactionOptionalDefaultsSchema;
const $TransactionPatchSchema = TransactionPartialSchema.merge(PatchSchema);
export const TransactionSourceSchema = withSourceSchema({
    EntitySchema: $TransactionSchema,
    DtoSchema: $TransactionSchema,
    ToCreateSchema: $TransactionCreateSchema,
    CreateSchema: $TransactionCreateSchema,
    ToPatchSchema: $TransactionPatchSchema,
    PatchSchema: $TransactionPatchSchema,
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
export const $TransactionSourceMapper = Symbol.for("@monye.one/transaction/ITransactionSourceMapper");
export const TransactionSourceContext = (container: IContainer) => new ServiceContext<ITransactionSource>(container, $TransactionSource);
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_mvy29b8ukqhy8za9ibkj1uea = true;