import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { TokenCountOrderByAggregateInputSchema } from './TokenCountOrderByAggregateInputSchema';
import { TokenMaxOrderByAggregateInputSchema } from './TokenMaxOrderByAggregateInputSchema';
import { TokenMinOrderByAggregateInputSchema } from './TokenMinOrderByAggregateInputSchema';

export const TokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.TokenOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TokenMinOrderByAggregateInputSchema).optional()
}).strict();

export default TokenOrderByWithAggregationInputSchema;
