/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	withSourceExSchema,
	type InferSourceExSchema
} from "@leight/source";
import {
	JobWhereInputSchema,
	JobWhereUniqueInputSchema,
	JobOrderByWithRelationInputSchema
} from "@leight/prisma";

export type IJobPrismaSchema = InferSourceExSchema<typeof JobPrismaSchema>;

export const JobPrismaSchema = withSourceExSchema({
    WhereSchema:       JobWhereInputSchema,
    WhereUniqueSchema: JobWhereUniqueInputSchema,
    OrderBySchema:     JobOrderByWithRelationInputSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_cbqji7h9ixbtaijvv9o2daip = true;