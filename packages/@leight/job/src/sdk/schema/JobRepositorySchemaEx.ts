/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IRepositorySchemaEx} from "@leight/source";
import {
	JobWhereInputSchema,
	JobWhereUniqueInputSchema,
	JobOrderByWithRelationInputSchema
} from "@leight/prisma";

export type IJobRepositorySchemaEx = IRepositorySchemaEx<
    typeof JobWhereInputSchema,
    typeof JobWhereUniqueInputSchema,
    typeof JobOrderByWithRelationInputSchema
>;
export type IJobRepositoryExType = IJobRepositorySchemaEx["Type"];
export type IJobRepositoryExSchema = IJobRepositorySchemaEx["Schema"];

export const JobRepositorySchemaEx: IJobRepositoryExSchema = {
    WhereSchema:       JobWhereInputSchema,
    WhereUniqueSchema: JobWhereUniqueInputSchema,
    OrderBySchema:     JobOrderByWithRelationInputSchema,
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_e8660cody2ou3zgvg6x69p44 = true;