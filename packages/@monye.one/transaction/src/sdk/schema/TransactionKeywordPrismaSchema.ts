/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	withSourceSchemaEx,
	type ISourceSchemaExType
} from "@leight/source";
import {
	TransactionKeywordWhereInputSchema,
	TransactionKeywordWhereUniqueInputSchema,
	TransactionKeywordOrderByWithRelationInputSchema
} from "@monye.one/prisma";

export type ITransactionKeywordPrismaSchemaType = ISourceSchemaExType.of<typeof TransactionKeywordPrismaSchema>;

export const TransactionKeywordPrismaSchema = withSourceSchemaEx({
    WhereSchema:       TransactionKeywordWhereInputSchema,
    WhereUniqueSchema: TransactionKeywordWhereUniqueInputSchema,
    OrderBySchema:     TransactionKeywordOrderByWithRelationInputSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_w6eavb7j5lgjn6sqoe90zfh6 = true;