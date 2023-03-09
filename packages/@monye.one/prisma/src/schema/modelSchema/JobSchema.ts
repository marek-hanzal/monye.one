import { z } from 'zod';
import { JobStatusSchema } from '../inputTypeSchemas/JobStatusSchema'
import { type UserWithRelations, UserWithRelationsSchema } from './UserSchema'
import { type JobLogWithRelations, JobLogWithRelationsSchema } from './JobLogSchema'
import { type UserPartialWithRelations, UserPartialWithRelationsSchema } from './UserSchema'
import { type JobLogPartialWithRelations, JobLogPartialWithRelationsSchema } from './JobLogSchema'

/////////////////////////////////////////
// JOB SCHEMA
/////////////////////////////////////////

export const JobSchema = z.object({
  status: JobStatusSchema,
  id: z.string().cuid(),
  name: z.string(),
  total: z.number().int(),
  progress: z.number(),
  success: z.number().int().nullish(),
  successRatio: z.number().nullish(),
  failure: z.number().int().nullish(),
  failureRatio: z.number().nullish(),
  skip: z.number().int().nullish(),
  skipRatio: z.number().nullish(),
  created: z.coerce.date(),
  started: z.coerce.date().nullish(),
  finished: z.coerce.date().nullish(),
  userId: z.string().nullish(),
  params: z.string().nullish(),
})

export type Job = z.infer<typeof JobSchema>

// JOB PARTIAL SCHEMA
//------------------------------------------------------

export const JobPartialSchema = JobSchema.partial()

export type JobPartial = z.infer<typeof JobPartialSchema>

// JOB RELATION SCHEMA
//------------------------------------------------------

export type JobRelations = {
  user?: UserWithRelations | null;
  logs: JobLogWithRelations[];
};

export type JobWithRelations = z.infer<typeof JobSchema> & JobRelations

export const JobWithRelationsSchema: z.ZodType<JobWithRelations> = JobSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema).nullish(),
  logs: z.lazy(() => JobLogWithRelationsSchema).array(),
}))

// JOB PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type JobPartialRelations = {
  user?: UserPartialWithRelations | null;
  logs?: JobLogPartialWithRelations[];
};

export type JobPartialWithRelations = z.infer<typeof JobPartialSchema> & JobPartialRelations

export const JobPartialWithRelationsSchema: z.ZodType<JobPartialWithRelations> = JobPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema).nullish(),
  logs: z.lazy(() => JobLogPartialWithRelationsSchema).array(),
})).partial()

export default JobSchema;
