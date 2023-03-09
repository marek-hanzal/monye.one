import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const JobLogWhereUniqueInputSchema: z.ZodType<Prisma.JobLogWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export default JobLogWhereUniqueInputSchema;
