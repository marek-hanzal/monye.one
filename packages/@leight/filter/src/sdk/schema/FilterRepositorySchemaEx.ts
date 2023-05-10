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
export type IFilterRepositoryExType = IFilterRepositorySchemaEx["Type"];
export type IFilterRepositoryExSchema = IFilterRepositorySchemaEx["Schema"];

export const FilterRepositorySchemaEx: IFilterRepositoryExSchema = {
    WhereSchema:       FilterWhereInputSchema,
    WhereUniqueSchema: FilterWhereUniqueInputSchema,
    OrderBySchema:     FilterOrderByWithRelationInputSchema,
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_gwo05wtwp0ocnkcad6m5mkeh = true;