import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobLogIncludeSchema } from '../inputTypeSchemas/JobLogIncludeSchema'
import { JobLogUpdateInputSchema } from '../inputTypeSchemas/JobLogUpdateInputSchema'
import { JobLogUncheckedUpdateInputSchema } from '../inputTypeSchemas/JobLogUncheckedUpdateInputSchema'
import { JobLogWhereUniqueInputSchema } from '../inputTypeSchemas/JobLogWhereUniqueInputSchema'
import { JobArgsSchema } from "../outputTypeSchemas/JobArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const JobLogSelectSchema: z.ZodType<Prisma.JobLogSelect> = z.object({
  id: z.boolean().optional(),
  jobId: z.boolean().optional(),
  job: z.union([z.boolean(),z.lazy(() => JobArgsSchema)]).optional(),
  message: z.boolean().optional(),
}).strict()

export const JobLogUpdateArgsSchema: z.ZodType<Prisma.JobLogUpdateArgs> = z.object({
  select: JobLogSelectSchema.optional(),
  include: JobLogIncludeSchema.optional(),
  data: z.union([ JobLogUpdateInputSchema,JobLogUncheckedUpdateInputSchema ]),
  where: JobLogWhereUniqueInputSchema,
}).strict()

export default JobLogUpdateArgsSchema;
