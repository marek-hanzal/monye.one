import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';

export const TokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TokenScalarWhereWithAggregatesInputSchema),z.lazy(() => TokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TokenScalarWhereWithAggregatesInputSchema),z.lazy(() => TokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export default TokenScalarWhereWithAggregatesInputSchema;
