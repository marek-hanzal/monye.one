import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';

export const BankScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BankScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BankScalarWhereWithAggregatesInputSchema),z.lazy(() => BankScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BankScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BankScalarWhereWithAggregatesInputSchema),z.lazy(() => BankScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  account: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export default BankScalarWhereWithAggregatesInputSchema;
