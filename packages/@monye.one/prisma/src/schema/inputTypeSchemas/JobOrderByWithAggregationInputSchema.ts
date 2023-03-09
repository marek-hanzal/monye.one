import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { JobCountOrderByAggregateInputSchema } from './JobCountOrderByAggregateInputSchema';
import { JobAvgOrderByAggregateInputSchema } from './JobAvgOrderByAggregateInputSchema';
import { JobMaxOrderByAggregateInputSchema } from './JobMaxOrderByAggregateInputSchema';
import { JobMinOrderByAggregateInputSchema } from './JobMinOrderByAggregateInputSchema';
import { JobSumOrderByAggregateInputSchema } from './JobSumOrderByAggregateInputSchema';

export const JobOrderByWithAggregationInputSchema: z.ZodType<Prisma.JobOrderByWithAggregationInput> = z.object({
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
  params: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => JobCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => JobAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => JobMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => JobMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => JobSumOrderByAggregateInputSchema).optional(),
}).strict();

export default JobOrderByWithAggregationInputSchema;
