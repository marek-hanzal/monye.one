import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const BankMinOrderByAggregateInputSchema: z.ZodType<Prisma.BankMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  account: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default BankMinOrderByAggregateInputSchema;
