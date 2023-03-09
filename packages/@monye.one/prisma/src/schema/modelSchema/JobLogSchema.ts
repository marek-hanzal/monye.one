import { z } from 'zod';
import { type JobWithRelations, JobWithRelationsSchema } from './JobSchema'
import { type JobPartialWithRelations, JobPartialWithRelationsSchema } from './JobSchema'

/////////////////////////////////////////
// JOB LOG SCHEMA
/////////////////////////////////////////

export const JobLogSchema = z.object({
  id: z.string().cuid(),
  jobId: z.string(),
  message: z.string(),
})

export type JobLog = z.infer<typeof JobLogSchema>

// JOB LOG PARTIAL SCHEMA
//------------------------------------------------------

export const JobLogPartialSchema = JobLogSchema.partial()

export type JobLogPartial = z.infer<typeof JobLogPartialSchema>

// JOB LOG RELATION SCHEMA
//------------------------------------------------------

export type JobLogRelations = {
  job: JobWithRelations;
};

export type JobLogWithRelations = z.infer<typeof JobLogSchema> & JobLogRelations

export const JobLogWithRelationsSchema: z.ZodType<JobLogWithRelations> = JobLogSchema.merge(z.object({
  job: z.lazy(() => JobWithRelationsSchema),
}))

// JOB LOG PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type JobLogPartialRelations = {
  job?: JobPartialWithRelations;
};

export type JobLogPartialWithRelations = z.infer<typeof JobLogPartialSchema> & JobLogPartialRelations

export const JobLogPartialWithRelationsSchema: z.ZodType<JobLogPartialWithRelations> = JobLogPartialSchema.merge(z.object({
  job: z.lazy(() => JobPartialWithRelationsSchema),
})).partial()

export default JobLogSchema;
