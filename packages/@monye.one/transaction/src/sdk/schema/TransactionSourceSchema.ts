/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	TransactionSchema as $EntitySchema,
	TransactionOptionalDefaultsSchema,
	TransactionPartialSchema
} from "@monye.one/prisma";
import {SortOrderSchema} from "@leight/sort";
import {FilterSchema} from "@leight/filter";
import {
	withSourceSchema,
	type ISourceSchemaType,
	PatchSchema
} from "@leight/source";
import {z} from "@leight/zod";
import {
	TransactionSchemaEx,
	TransactionFilterSchemaEx
} from "../../schema";
import {ParamsSchema} from "@leight/query";

export type ITransactionSourceSchemaType = ISourceSchemaType.of<typeof TransactionSourceSchema>;

const $TransactionSchema = $EntitySchema.merge(TransactionSchemaEx);
const $TransactionCreateSchema = TransactionOptionalDefaultsSchema;
const $TransactionPatchSchema = TransactionPartialSchema.merge(PatchSchema);
export const TransactionSourceSchema = withSourceSchema({
    EntitySchema: $TransactionSchema,
    DtoSchema: $TransactionSchema,
    ToCreateSchema: $TransactionCreateSchema,
    CreateSchema: $TransactionCreateSchema,
    ToPatchSchema: $TransactionPatchSchema,
    PatchSchema: $TransactionPatchSchema,
    FilterSchema: FilterSchema.merge(TransactionFilterSchemaEx),
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
export const $leight_cykz33etro7dqo1kj0uu9iry = true;