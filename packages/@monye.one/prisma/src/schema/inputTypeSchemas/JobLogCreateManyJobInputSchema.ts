import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const JobLogCreateManyJobInputSchema: z.ZodType<Prisma.JobLogCreateManyJobInput> = z.object({
  id: z.string().cuid().optional(),
  message: z.string()
}).strict();

export default JobLogCreateManyJobInputSchema;
