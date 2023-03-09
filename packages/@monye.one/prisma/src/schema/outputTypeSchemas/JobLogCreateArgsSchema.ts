import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobLogIncludeSchema } from '../inputTypeSchemas/JobLogIncludeSchema'
import { JobLogCreateInputSchema } from '../inputTypeSchemas/JobLogCreateInputSchema'
import { JobLogUncheckedCreateInputSchema } from '../inputTypeSchemas/JobLogUncheckedCreateInputSchema'
import { JobArgsSchema } from "../outputTypeSchemas/JobArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const JobLogSelectSchema: z.ZodType<Prisma.JobLogSelect> = z.object({
  id: z.boolean().optional(),
  jobId: z.boolean().optional(),
  job: z.union([z.boolean(),z.lazy(() => JobArgsSchema)]).optional(),
  message: z.boolean().optional(),
}).strict()

export const JobLogCreateArgsSchema: z.ZodType<Prisma.JobLogCreateArgs> = z.object({
  select: JobLogSelectSchema.optional(),
  include: JobLogIncludeSchema.optional(),
  data: z.union([ JobLogCreateInputSchema,JobLogUncheckedCreateInputSchema ]),
}).strict()

export default JobLogCreateArgsSchema;
