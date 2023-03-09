import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { TransactionCountOrderByAggregateInputSchema } from './TransactionCountOrderByAggregateInputSchema';
import { TransactionAvgOrderByAggregateInputSchema } from './TransactionAvgOrderByAggregateInputSchema';
import { TransactionMaxOrderByAggregateInputSchema } from './TransactionMaxOrderByAggregateInputSchema';
import { TransactionMinOrderByAggregateInputSchema } from './TransactionMinOrderByAggregateInputSchema';
import { TransactionSumOrderByAggregateInputSchema } from './TransactionSumOrderByAggregateInputSchema';

export const TransactionOrderByWithAggregationInputSchema: z.ZodType<Prisma.TransactionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reference: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  bankId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  variable: z.lazy(() => SortOrderSchema).optional(),
  symbol: z.lazy(() => SortOrderSchema).optional(),
  static: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  target: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TransactionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TransactionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TransactionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TransactionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TransactionSumOrderByAggregateInputSchema).optional(),
}).strict();

export default TransactionOrderByWithAggregationInputSchema;
