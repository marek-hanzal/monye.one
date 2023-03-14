import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobCreateNestedOneWithoutLogsInputSchema } from './JobCreateNestedOneWithoutLogsInputSchema';

export const JobLogCreateInputSchema: z.ZodType<Prisma.JobLogCreateInput> = z.object({
  id: z.string().cuid().optional(),
  message: z.string(),
  job: z.lazy(() => JobCreateNestedOneWithoutLogsInputSchema)
}).strict();

export default JobLogCreateInputSchema;
