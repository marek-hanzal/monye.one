import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobLogIncludeSchema } from '../inputTypeSchemas/JobLogIncludeSchema'
import { JobLogWhereUniqueInputSchema } from '../inputTypeSchemas/JobLogWhereUniqueInputSchema'
import { JobLogCreateInputSchema } from '../inputTypeSchemas/JobLogCreateInputSchema'
import { JobLogUncheckedCreateInputSchema } from '../inputTypeSchemas/JobLogUncheckedCreateInputSchema'
import { JobLogUpdateInputSchema } from '../inputTypeSchemas/JobLogUpdateInputSchema'
import { JobLogUncheckedUpdateInputSchema } from '../inputTypeSchemas/JobLogUncheckedUpdateInputSchema'
import { JobArgsSchema } from "../outputTypeSchemas/JobArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const JobLogSelectSchema: z.ZodType<Prisma.JobLogSelect> = z.object({
  id: z.boolean().optional(),
  jobId: z.boolean().optional(),
  job: z.union([z.boolean(),z.lazy(() => JobArgsSchema)]).optional(),
  message: z.boolean().optional(),
}).strict()

export const JobLogUpsertArgsSchema: z.ZodType<Prisma.JobLogUpsertArgs> = z.object({
  select: JobLogSelectSchema.optional(),
  include: JobLogIncludeSchema.optional(),
  where: JobLogWhereUniqueInputSchema,
  create: z.union([ JobLogCreateInputSchema,JobLogUncheckedCreateInputSchema ]),
  update: z.union([ JobLogUpdateInputSchema,JobLogUncheckedUpdateInputSchema ]),
}).strict()

export default JobLogUpsertArgsSchema;
