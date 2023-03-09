import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobStatusSchema } from './JobStatusSchema';
import { JobLogUncheckedCreateNestedManyWithoutJobInputSchema } from './JobLogUncheckedCreateNestedManyWithoutJobInputSchema';

export const JobUncheckedCreateInputSchema: z.ZodType<Prisma.JobUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  status: z.lazy(() => JobStatusSchema).optional(),
  total: z.number().int().optional(),
  progress: z.number().optional(),
  success: z.number().int().optional().nullable(),
  successRatio: z.number().optional().nullable(),
  failure: z.number().int().optional().nullable(),
  failureRatio: z.number().optional().nullable(),
  skip: z.number().int().optional().nullable(),
  skipRatio: z.number().optional().nullable(),
  created: z.coerce.date(),
  started: z.coerce.date().optional().nullable(),
  finished: z.coerce.date().optional().nullable(),
  userId: z.string().optional().nullable(),
  params: z.string().optional().nullable(),
  logs: z.lazy(() => JobLogUncheckedCreateNestedManyWithoutJobInputSchema).optional(),
}).strict();

export default JobUncheckedCreateInputSchema;
