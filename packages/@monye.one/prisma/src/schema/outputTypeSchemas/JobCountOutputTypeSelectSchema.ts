import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const JobCountOutputTypeSelectSchema: z.ZodType<Prisma.JobCountOutputTypeSelect> = z.object({
  logs: z.boolean().optional(),
}).strict();

export default JobCountOutputTypeSelectSchema;
