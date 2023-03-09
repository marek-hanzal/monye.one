import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { JobStatusSchema } from './JobStatusSchema';
import { UserCreateNestedOneWithoutJobInputSchema } from './UserCreateNestedOneWithoutJobInputSchema';

export const JobCreateWithoutLogsInputSchema: z.ZodType<Prisma.JobCreateWithoutLogsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  status: z.lazy(() => JobStatusSchema).optional(),
  total: z.number().optional(),
  progress: z.number().optional(),
  success: z.number().optional().nullable(),
  successRatio: z.number().optional().nullable(),
  failure: z.number().optional().nullable(),
  failureRatio: z.number().optional().nullable(),
  skip: z.number().optional().nullable(),
  skipRatio: z.number().optional().nullable(),
  created: z.coerce.date(),
  started: z.coerce.date().optional().nullable(),
  finished: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutJobInputSchema).optional(),
  params: z.string().optional().nullable(),
}).strict();

export default JobCreateWithoutLogsInputSchema;
