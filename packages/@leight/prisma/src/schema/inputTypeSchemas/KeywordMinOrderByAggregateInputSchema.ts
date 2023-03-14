import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const KeywordMinOrderByAggregateInputSchema: z.ZodType<Prisma.KeywordMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default KeywordMinOrderByAggregateInputSchema;
