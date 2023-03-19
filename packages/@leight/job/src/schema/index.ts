import {PrismaSchema} from "@leight/prisma";
import {
    type ISourceSchema,
    WithIdentitySchema
}                     from "@leight/source";
import {z}            from "zod";

export const JobStatusSchema = PrismaSchema.JobStatusSchema;
export type IJobStatusSchema = typeof JobStatusSchema;
export type IJobStatus = z.infer<IJobStatusSchema>;

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

export interface IJobSourceSchema extends ISourceSchema<
    IJobSchema,
    IJobCreateSchema,
    IJobPatchSchema
> {
}
