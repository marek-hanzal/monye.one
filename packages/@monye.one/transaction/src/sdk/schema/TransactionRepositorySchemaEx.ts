/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IRepositorySchemaEx} from "@leight/source";
import {
	TransactionWhereInputSchema,
	TransactionWhereUniqueInputSchema,
	TransactionOrderByWithRelationInputSchema
} from "@monye.one/prisma";

export type ITransactionRepositorySchemaEx = IRepositorySchemaEx<
    typeof TransactionWhereInputSchema,
    typeof TransactionWhereUniqueInputSchema,
    typeof TransactionOrderByWithRelationInputSchema
>;

export const TransactionRepositorySchemaEx: ITransactionRepositorySchemaEx["Schema"] = {
    WhereSchema:       TransactionWhereInputSchema,
    WhereUniqueSchema: TransactionWhereUniqueInputSchema,
    OrderBySchema:     TransactionOrderByWithRelationInputSchema,
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_yyurw31pf2jfeokd0xfy4vo3 = true;