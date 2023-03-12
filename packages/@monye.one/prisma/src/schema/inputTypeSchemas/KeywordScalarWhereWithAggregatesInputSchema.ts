import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';

export const KeywordScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.KeywordScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => KeywordScalarWhereWithAggregatesInputSchema),z.lazy(() => KeywordScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => KeywordScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KeywordScalarWhereWithAggregatesInputSchema),z.lazy(() => KeywordScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export default KeywordScalarWhereWithAggregatesInputSchema;
