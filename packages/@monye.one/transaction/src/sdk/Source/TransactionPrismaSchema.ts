/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	withSourceExSchema,
	type InferSourceExSchema
} from "@leight/source";
import {
	TransactionWhereInputSchema,
	TransactionWhereUniqueInputSchema,
	TransactionOrderByWithRelationInputSchema
} from "@monye.one/prisma";

export type ITransactionPrismaSchema = InferSourceExSchema<typeof TransactionPrismaSchema>;

export const TransactionPrismaSchema = withSourceExSchema({
    WhereSchema:       TransactionWhereInputSchema,
    WhereUniqueSchema: TransactionWhereUniqueInputSchema,
    OrderBySchema:     TransactionOrderByWithRelationInputSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_osjtycgk5pvjxhiftpl3lnfm = true;