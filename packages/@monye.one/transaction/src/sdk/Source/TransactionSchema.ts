/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	TransactionWhereInputSchema,
	TransactionWhereUniqueInputSchema,
	TransactionSchema as $EntitySchema,
	TransactionOptionalDefaultsSchema,
	TransactionPartialSchema
} from "@monye.one/prisma";
import {SortOrderSchema} from "@leight/sort";
import {
	withSourceSchema,
	type InferSourceSchema,
	PatchSchema
} from "@leight/source";
import {z} from "@leight/zod";
import {TransactionExSchema} from "../../schema";
import {FilterSchema} from "@leight/filter";
import {ParamsSchema} from "@leight/query";

export type ITransactionSourceSchema = InferSourceSchema<typeof TransactionSourceSchema>;

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
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_jgqcq5ofj2iku87rpruhaq3p = true;