import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { JobArgsSchema } from "../outputTypeSchemas/JobArgsSchema"

export const JobLogSelectSchema: z.ZodType<Prisma.JobLogSelect> = z.object({
  id: z.boolean().optional(),
  jobId: z.boolean().optional(),
  job: z.union([z.boolean(),z.lazy(() => JobArgsSchema)]).optional(),
  message: z.boolean().optional(),
}).strict()

export default JobLogSelectSchema;
