/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	withSourceExSchema,
	type InferSourceExSchema
} from "@leight/source";
import {
	BankWhereInputSchema,
	BankWhereUniqueInputSchema,
	BankOrderByWithRelationInputSchema
} from "@monye.one/prisma";

export type IBankPrismaSchema = InferSourceExSchema<typeof BankPrismaSchema>;

export const BankPrismaSchema = withSourceExSchema({
    WhereSchema:       BankWhereInputSchema,
    WhereUniqueSchema: BankWhereUniqueInputSchema,
    OrderBySchema:     BankOrderByWithRelationInputSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_xbwtvmspbgktnm22m5xi8f8e = true;