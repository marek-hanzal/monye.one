import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const JobLogCreateManyInputSchema: z.ZodType<Prisma.JobLogCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  jobId: z.string(),
  message: z.string()
}).strict();

export default JobLogCreateManyInputSchema;
