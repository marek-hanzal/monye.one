/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	withSourceSchemaEx,
	type ISourceSchemaExType
} from "@leight/source";
import {
	TransactionWhereInputSchema,
	TransactionWhereUniqueInputSchema,
	TransactionOrderByWithRelationInputSchema
} from "@monye.one/prisma";

export type ITransactionPrismaSchemaType = ISourceSchemaExType.of<typeof TransactionPrismaSchema>;

export const TransactionPrismaSchema = withSourceSchemaEx({
    WhereSchema:       TransactionWhereInputSchema,
    WhereUniqueSchema: TransactionWhereUniqueInputSchema,
    OrderBySchema:     TransactionOrderByWithRelationInputSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_qr1sep42c1pqutot93xwxohe = true;