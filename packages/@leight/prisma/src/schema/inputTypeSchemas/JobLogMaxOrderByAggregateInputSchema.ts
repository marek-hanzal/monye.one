import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const JobLogMaxOrderByAggregateInputSchema: z.ZodType<Prisma.JobLogMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobId: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default JobLogMaxOrderByAggregateInputSchema;
