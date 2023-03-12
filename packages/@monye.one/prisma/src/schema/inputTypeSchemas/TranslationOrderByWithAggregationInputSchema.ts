import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { TranslationCountOrderByAggregateInputSchema } from './TranslationCountOrderByAggregateInputSchema';
import { TranslationMaxOrderByAggregateInputSchema } from './TranslationMaxOrderByAggregateInputSchema';
import { TranslationMinOrderByAggregateInputSchema } from './TranslationMinOrderByAggregateInputSchema';

export const TranslationOrderByWithAggregationInputSchema: z.ZodType<Prisma.TranslationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  locale: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  hash: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TranslationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TranslationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TranslationMinOrderByAggregateInputSchema).optional()
}).strict();

export default TranslationOrderByWithAggregationInputSchema;
