/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	JobSchema as $EntitySchema,
	JobOptionalDefaultsSchema,
	JobPartialSchema,
	JobWhereInputSchema,
	JobWhereUniqueInputSchema,
	JobOrderByWithRelationInputSchema
} from "@leight/prisma";
import {FilterSchema} from "@leight/filter";
import {
	ParamsSchema,
	QuerySchema
} from "@leight/query";
import {SortOrderSchema} from "@leight/sort";
import {WithIdentitySchema} from "@leight/source";
import {z} from "@leight/zod";
import {JobSchemaOverride} from "../schema";

export type IJobWhereSchema = typeof JobWhereSchema;
export type IJobWhere = z.infer<IJobWhereSchema>;
export type IJobWhereUniqueSchema = typeof JobWhereUniqueSchema;
export type IJobWhereUnique = z.infer<IJobWhereUniqueSchema>;
export type IJobOrderBySchema = typeof JobOrderBySchema;
export type IJobOrderBy = z.infer<IJobOrderBySchema>;
export type IJobSchema = typeof JobSchema;
export type IJob = z.infer<IJobSchema>;
export type IJobCreateSchema = typeof JobCreateSchema;
export type IJobCreate = z.infer<IJobCreateSchema>;
export type IJobPatchSchema = typeof JobPatchSchema;
export type IJobPatch = z.infer<IJobPatchSchema>;
export type IJobFilterSchema = typeof JobFilterSchema;
export type IJobFilter = z.infer<IJobFilterSchema>;
export type IJobParamSchema = typeof JobParamSchema;
export type IJobParam = z.infer<IJobParamSchema>;
export type IJobSortSchema = typeof JobSortSchema;
export type IJobSort = z.infer<IJobSortSchema>;
export type IJobQuerySchema = typeof JobQuerySchema;
export type IJobQuery = z.infer<IJobQuerySchema>;

export const JobWhereSchema = JobWhereInputSchema;
export const JobWhereUniqueSchema = JobWhereUniqueInputSchema;
export const JobOrderBySchema = JobOrderByWithRelationInputSchema;
/**
 * Schema definition for Job
 */
export const JobSchema = $EntitySchema.merge(JobSchemaOverride);
export const JobCreateSchema = JobOptionalDefaultsSchema;
export const JobPatchSchema = JobPartialSchema.merge(WithIdentitySchema);
export const JobFilterSchema = z.union([
    JobWhereSchema,
    JobWhereUniqueSchema,
    FilterSchema,
]);
export const JobParamSchema = ParamsSchema;
export const JobSortSchema = z.object({
    started: SortOrderSchema
});
/**
 * Query definition for Job
 */
export const JobQuerySchema = QuerySchema({
    filterSchema: JobFilterSchema,
    sortSchema:   JobSortSchema,
    paramsSchema: JobParamSchema,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_oc7q1bgm8gyzbyvxsv0imdbd = true;