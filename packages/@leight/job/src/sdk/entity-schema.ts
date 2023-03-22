// Generated file
import {PrismaSchema} from "@leight/prisma";
import {FilterSchema} from "@leight/filter";
import {
	ParamsSchema,
	QuerySchema
} from "@leight/query";
import {SortOrderSchema} from "@leight/sort";
import {WithIdentitySchema} from "@leight/source";
import {z} from "zod";
import {JobSchemaOverride} from "../schema";

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

export const JobSchema = PrismaSchema.JobSchema.merge(JobSchemaOverride);
export const JobCreateSchema = PrismaSchema.JobOptionalDefaultsSchema;
export const JobPatchSchema = PrismaSchema.JobPartialSchema.merge(WithIdentitySchema);
export const JobFilterSchema = z.union([
    PrismaSchema.JobWhereInputSchema,
    PrismaSchema.JobWhereUniqueInputSchema,
    FilterSchema,
]);
export const JobParamSchema = ParamsSchema;
export const JobSortSchema = z.object({
    started: SortOrderSchema
});
export const JobQuerySchema = QuerySchema({
    filterSchema: JobFilterSchema,
    sortSchema:   JobSortSchema,
    paramsSchema: JobParamSchema,
});