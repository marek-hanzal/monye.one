/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	withSourceSchemaEx,
	type ISourceSchemaExType
} from "@leight/source";
import {
	BankWhereInputSchema,
	BankWhereUniqueInputSchema,
	BankOrderByWithRelationInputSchema
} from "@monye.one/prisma";

export type IBankPrismaSchemaType = ISourceSchemaExType.of<typeof BankPrismaSchema>;

export const BankPrismaSchema = withSourceSchemaEx({
    WhereSchema:       BankWhereInputSchema,
    WhereUniqueSchema: BankWhereUniqueInputSchema,
    OrderBySchema:     BankOrderByWithRelationInputSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_npw8x6ztetxiuey5kklmb5he = true;