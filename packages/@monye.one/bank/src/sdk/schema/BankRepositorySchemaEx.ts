/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IRepositorySchemaEx} from "@leight/source";
import {
	BankWhereInputSchema,
	BankWhereUniqueInputSchema,
	BankOrderByWithRelationInputSchema
} from "@monye.one/prisma";

export type IBankRepositorySchemaEx = IRepositorySchemaEx<
    typeof BankWhereInputSchema,
    typeof BankWhereUniqueInputSchema,
    typeof BankOrderByWithRelationInputSchema
>;

export const BankRepositorySchemaEx: IBankRepositorySchemaEx["Schema"] = {
    WhereSchema:       BankWhereInputSchema,
    WhereUniqueSchema: BankWhereUniqueInputSchema,
    OrderBySchema:     BankOrderByWithRelationInputSchema,
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_bq15zg6gfir4cchansa08vl3 = true;