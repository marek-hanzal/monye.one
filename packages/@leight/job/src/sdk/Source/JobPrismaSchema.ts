/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	withSourceSchemaEx,
	type ISourceSchemaExType
} from "@leight/source";
import {
	JobWhereInputSchema,
	JobWhereUniqueInputSchema,
	JobOrderByWithRelationInputSchema
} from "@leight/prisma";

export type IJobPrismaSchemaType = ISourceSchemaExType.of<typeof JobPrismaSchema>;

export const JobPrismaSchema = withSourceSchemaEx({
    WhereSchema:       JobWhereInputSchema,
    WhereUniqueSchema: JobWhereUniqueInputSchema,
    OrderBySchema:     JobOrderByWithRelationInputSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_gb5b91bpz31ub5o05a6113k5 = true;