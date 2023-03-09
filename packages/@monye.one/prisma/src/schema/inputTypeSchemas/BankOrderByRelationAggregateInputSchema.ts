import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const BankOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BankOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export default BankOrderByRelationAggregateInputSchema;
