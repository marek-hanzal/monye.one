import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const TransactionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TransactionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default TransactionOrderByRelationAggregateInputSchema;