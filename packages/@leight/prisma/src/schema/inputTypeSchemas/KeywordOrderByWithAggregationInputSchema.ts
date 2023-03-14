import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { KeywordCountOrderByAggregateInputSchema } from './KeywordCountOrderByAggregateInputSchema';
import { KeywordMaxOrderByAggregateInputSchema } from './KeywordMaxOrderByAggregateInputSchema';
import { KeywordMinOrderByAggregateInputSchema } from './KeywordMinOrderByAggregateInputSchema';

export const KeywordOrderByWithAggregationInputSchema: z.ZodType<Prisma.KeywordOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => KeywordCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => KeywordMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => KeywordMinOrderByAggregateInputSchema).optional()
}).strict();

export default KeywordOrderByWithAggregationInputSchema;
