/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IRepositorySchemaEx} from "@leight/source";
import {
	FilterWhereInputSchema,
	FilterWhereUniqueInputSchema,
	FilterOrderByWithRelationInputSchema
} from "@leight/prisma";

export type IFilterRepositorySchemaEx = IRepositorySchemaEx<
    typeof FilterWhereInputSchema,
    typeof FilterWhereUniqueInputSchema,
    typeof FilterOrderByWithRelationInputSchema
>;

export const FilterRepositorySchemaEx: IFilterRepositorySchemaEx["Schema"] = {
    WhereSchema:       FilterWhereInputSchema,
    WhereUniqueSchema: FilterWhereUniqueInputSchema,
    OrderBySchema:     FilterOrderByWithRelationInputSchema,
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_r6maoqzmqi8e7n3fpwzsury3 = true;