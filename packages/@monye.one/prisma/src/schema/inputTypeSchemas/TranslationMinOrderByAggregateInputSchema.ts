import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const TranslationMinOrderByAggregateInputSchema: z.ZodType<Prisma.TranslationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  locale: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  hash: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default TranslationMinOrderByAggregateInputSchema;
