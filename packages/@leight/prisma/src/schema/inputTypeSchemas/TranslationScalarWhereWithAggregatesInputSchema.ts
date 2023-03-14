import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';

export const TranslationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TranslationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TranslationScalarWhereWithAggregatesInputSchema),z.lazy(() => TranslationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TranslationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TranslationScalarWhereWithAggregatesInputSchema),z.lazy(() => TranslationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  locale: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hash: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export default TranslationScalarWhereWithAggregatesInputSchema;
