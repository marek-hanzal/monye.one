/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	TransactionKeywordSchema as $EntitySchema,
	TransactionKeywordOptionalDefaultsSchema,
	TransactionKeywordPartialSchema
} from "@monye.one/prisma";
import {SortOrderSchema} from "@leight/sort";
import {FilterSchema} from "@leight/filter";
import {
	withSourceSchema,
	type ISourceSchemaType,
	PatchSchema
} from "@leight/source";
import {z} from "@leight/zod";
import {ParamsSchema} from "@leight/query";

export type ITransactionKeywordSourceSchemaType = ISourceSchemaType.of<typeof TransactionKeywordSourceSchema>;

const $TransactionKeywordSchema = $EntitySchema;
const $TransactionKeywordCreateSchema = TransactionKeywordOptionalDefaultsSchema;
const $TransactionKeywordPatchSchema = TransactionKeywordPartialSchema.merge(PatchSchema);
export const TransactionKeywordSourceSchema = withSourceSchema({
    EntitySchema: $TransactionKeywordSchema,
    DtoSchema: $TransactionKeywordSchema,
    ToCreateSchema: $TransactionKeywordCreateSchema,
    CreateSchema: $TransactionKeywordCreateSchema,
    ToPatchSchema: $TransactionKeywordPatchSchema,
    PatchSchema: $TransactionKeywordPatchSchema,
    FilterSchema: FilterSchema,
    ParamsSchema: ParamsSchema,
    SortSchema: z.object({
        id: SortOrderSchema
    }),
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_pybkpbyvvncm6wfypxaj6dyd = true;