import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const JobSumOrderByAggregateInputSchema: z.ZodType<Prisma.JobSumOrderByAggregateInput> = z.object({
  total: z.lazy(() => SortOrderSchema).optional(),
  progress: z.lazy(() => SortOrderSchema).optional(),
  success: z.lazy(() => SortOrderSchema).optional(),
  successRatio: z.lazy(() => SortOrderSchema).optional(),
  failure: z.lazy(() => SortOrderSchema).optional(),
  failureRatio: z.lazy(() => SortOrderSchema).optional(),
  skip: z.lazy(() => SortOrderSchema).optional(),
  skipRatio: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default JobSumOrderByAggregateInputSchema;
