import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobIncludeSchema } from '../inputTypeSchemas/JobIncludeSchema'
import { JobCreateInputSchema } from '../inputTypeSchemas/JobCreateInputSchema'
import { JobUncheckedCreateInputSchema } from '../inputTypeSchemas/JobUncheckedCreateInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { JobLogFindManyArgsSchema } from "../outputTypeSchemas/JobLogFindManyArgsSchema"
import { JobCountOutputTypeArgsSchema } from "../outputTypeSchemas/JobCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const JobSelectSchema: z.ZodType<Prisma.JobSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  status: z.boolean().optional(),
  total: z.boolean().optional(),
  progress: z.boolean().optional(),
  success: z.boolean().optional(),
  successRatio: z.boolean().optional(),
  failure: z.boolean().optional(),
  failureRatio: z.boolean().optional(),
  skip: z.boolean().optional(),
  skipRatio: z.boolean().optional(),
  created: z.boolean().optional(),
  started: z.boolean().optional(),
  finished: z.boolean().optional(),
  userId: z.boolean().optional(),
  params: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  logs: z.union([z.boolean(),z.lazy(() => JobLogFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => JobCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const JobCreateArgsSchema: z.ZodType<Prisma.JobCreateArgs> = z.object({
  select: JobSelectSchema.optional(),
  include: JobIncludeSchema.optional(),
  data: z.union([ JobCreateInputSchema,JobUncheckedCreateInputSchema ]),
}).strict()

export default JobCreateArgsSchema;
