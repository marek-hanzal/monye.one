import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { BankCountOrderByAggregateInputSchema } from './BankCountOrderByAggregateInputSchema';
import { BankMaxOrderByAggregateInputSchema } from './BankMaxOrderByAggregateInputSchema';
import { BankMinOrderByAggregateInputSchema } from './BankMinOrderByAggregateInputSchema';

export const BankOrderByWithAggregationInputSchema: z.ZodType<Prisma.BankOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  account: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BankCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BankMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BankMinOrderByAggregateInputSchema).optional(),
}).strict();

export default BankOrderByWithAggregationInputSchema;
