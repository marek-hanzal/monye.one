/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IRepositorySchemaEx} from "@leight/source";
import {
	TransactionKeywordWhereInputSchema,
	TransactionKeywordWhereUniqueInputSchema,
	TransactionKeywordOrderByWithRelationInputSchema
} from "@monye.one/prisma";

export type ITransactionKeywordRepositorySchemaEx = IRepositorySchemaEx<
    typeof TransactionKeywordWhereInputSchema,
    typeof TransactionKeywordWhereUniqueInputSchema,
    typeof TransactionKeywordOrderByWithRelationInputSchema
>;
export type ITransactionKeywordRepositoryExType = ITransactionKeywordRepositorySchemaEx["Type"];
export type ITransactionKeywordRepositoryExSchema = ITransactionKeywordRepositorySchemaEx["Schema"];

export const TransactionKeywordRepositorySchemaEx: ITransactionKeywordRepositoryExSchema = {
    WhereSchema:       TransactionKeywordWhereInputSchema,
    WhereUniqueSchema: TransactionKeywordWhereUniqueInputSchema,
    OrderBySchema:     TransactionKeywordOrderByWithRelationInputSchema,
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_ew5hisegvqiuyq1arz9lueso = true;