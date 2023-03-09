import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const JobLogCreateWithoutJobInputSchema: z.ZodType<Prisma.JobLogCreateWithoutJobInput> = z.object({
  id: z.string().optional(),
  message: z.string(),
}).strict();

export default JobLogCreateWithoutJobInputSchema;
