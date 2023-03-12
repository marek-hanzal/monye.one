import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const JobLogUncheckedCreateWithoutJobInputSchema: z.ZodType<Prisma.JobLogUncheckedCreateWithoutJobInput> = z.object({
  id: z.string().optional(),
  message: z.string()
}).strict();

export default JobLogUncheckedCreateWithoutJobInputSchema;
