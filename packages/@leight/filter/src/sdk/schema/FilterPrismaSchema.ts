/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	withSourceSchemaEx,
	type ISourceSchemaExType
} from "@leight/source";
import {
	FilterWhereInputSchema,
	FilterWhereUniqueInputSchema,
	FilterOrderByWithRelationInputSchema
} from "@leight/prisma";

export type IFilterPrismaSchemaType = ISourceSchemaExType.of<typeof FilterPrismaSchema>;

export const FilterPrismaSchema = withSourceSchemaEx({
    WhereSchema:       FilterWhereInputSchema,
    WhereUniqueSchema: FilterWhereUniqueInputSchema,
    OrderBySchema:     FilterOrderByWithRelationInputSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_rm4ka1scpu0gl5mrw1llj1m4 = true;