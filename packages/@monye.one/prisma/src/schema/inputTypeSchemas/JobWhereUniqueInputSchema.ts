import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const JobWhereUniqueInputSchema: z.ZodType<Prisma.JobWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
}).strict();

export default JobWhereUniqueInputSchema;
