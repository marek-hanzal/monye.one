import {FilterSchema}    from "@leight/filter";
import {PrismaSchema}    from "@leight/prisma";
import {
    ParamsSchema,
    QuerySchema
}                        from "@leight/query";
import {SortOrderSchema} from "@leight/sort";
import {
    type ISourceSchema,
    WithIdentitySchema
}                        from "@leight/source";
import {z}               from "zod";

export const JobStatusSchema = PrismaSchema.JobStatusSchema;
export type IJobStatusSchema = typeof JobStatusSchema;
export type IJobStatus = z.infer<IJobStatusSchema>;

export const JobDoneStatus: IJobStatus[] = [
    "DONE",
    "FAILURE",
    "REVIEW",
    "SUCCESS"
];

export const JobSchema = PrismaSchema.JobSchema.merge(z.object({
    params: z.any().optional(),
}));
export type IJobSchema = typeof JobSchema;
export type IJob = z.infer<IJobSchema>;

export const JobCreateSchema = PrismaSchema.JobOptionalDefaultsSchema;
export type IJobCreateSchema = typeof JobCreateSchema;
export type IJobCreate = z.infer<IJobCreateSchema>;

export const JobPatchSchema = PrismaSchema.JobPartialSchema.merge(WithIdentitySchema);
export type IJobPatchSchema = typeof JobPatchSchema;
export type IJobPatch = z.infer<IJobPatchSchema>;

export const JobFilterSchema = FilterSchema;
export type IJobFilterSchema = typeof JobFilterSchema;
export type IJobFilter = z.infer<IJobFilterSchema>;

export const JobParamSchema = ParamsSchema;
export type IJobParamSchema = typeof JobParamSchema;
export type IJobParam = z.infer<IJobParamSchema>;

export const JobSortSchema = z.object({
    started: SortOrderSchema,
});
export type IJobSortSchema = typeof JobSortSchema;
export type IJobSort = z.infer<IJobSortSchema>;

export const JobQuerySchema = QuerySchema({
    filterSchema: JobFilterSchema,
    sortSchema:   JobSortSchema,
    paramsSchema: JobParamSchema,
});
export type IJobQuerySchema = typeof JobQuerySchema;
export type IJobQuery = z.infer<IJobQuerySchema>;

export interface IJobSourceSchema extends ISourceSchema<
    IJobSchema,
    IJobCreateSchema,
    IJobPatchSchema,
    IJobFilterSchema,
    IJobSortSchema,
    IJobParamSchema
> {
}
