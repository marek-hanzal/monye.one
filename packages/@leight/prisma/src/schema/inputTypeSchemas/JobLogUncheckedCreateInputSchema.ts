import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const JobLogUncheckedCreateInputSchema: z.ZodType<Prisma.JobLogUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  jobId: z.string(),
  message: z.string()
}).strict();

export default JobLogUncheckedCreateInputSchema;
