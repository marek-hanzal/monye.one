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
export type IBankRepositoryExType = IBankRepositorySchemaEx["Type"];
export type IBankRepositoryExSchema = IBankRepositorySchemaEx["Schema"];

export const BankRepositorySchemaEx: IBankRepositoryExSchema = {
    WhereSchema:       BankWhereInputSchema,
    WhereUniqueSchema: BankWhereUniqueInputSchema,
    OrderBySchema:     BankOrderByWithRelationInputSchema,
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_q58i1zsv7sgc7oyoxuq7f9zz = true;