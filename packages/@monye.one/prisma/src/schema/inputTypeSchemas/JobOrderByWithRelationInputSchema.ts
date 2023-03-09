import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { UserOrderByWithRelationInputSchema } from './UserOrderByWithRelationInputSchema';
import { JobLogOrderByRelationAggregateInputSchema } from './JobLogOrderByRelationAggregateInputSchema';

export const JobOrderByWithRelationInputSchema: z.ZodType<Prisma.JobOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  progress: z.lazy(() => SortOrderSchema).optional(),
  success: z.lazy(() => SortOrderSchema).optional(),
  successRatio: z.lazy(() => SortOrderSchema).optional(),
  failure: z.lazy(() => SortOrderSchema).optional(),
  failureRatio: z.lazy(() => SortOrderSchema).optional(),
  skip: z.lazy(() => SortOrderSchema).optional(),
  skipRatio: z.lazy(() => SortOrderSchema).optional(),
  created: z.lazy(() => SortOrderSchema).optional(),
  started: z.lazy(() => SortOrderSchema).optional(),
  finished: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  params: z.lazy(() => SortOrderSchema).optional(),
  logs: z.lazy(() => JobLogOrderByRelationAggregateInputSchema).optional(),
}).strict();

export default JobOrderByWithRelationInputSchema;
