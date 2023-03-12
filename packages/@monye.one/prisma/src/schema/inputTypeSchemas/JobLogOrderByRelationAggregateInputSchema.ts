import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const JobLogOrderByRelationAggregateInputSchema: z.ZodType<Prisma.JobLogOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default JobLogOrderByRelationAggregateInputSchema;
