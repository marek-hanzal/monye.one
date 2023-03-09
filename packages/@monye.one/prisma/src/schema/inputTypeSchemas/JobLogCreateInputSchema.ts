import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobCreateNestedOneWithoutLogsInputSchema } from './JobCreateNestedOneWithoutLogsInputSchema';

export const JobLogCreateInputSchema: z.ZodType<Prisma.JobLogCreateInput> = z.object({
  id: z.string().cuid().optional(),
  job: z.lazy(() => JobCreateNestedOneWithoutLogsInputSchema),
  message: z.string(),
}).strict();

export default JobLogCreateInputSchema;
