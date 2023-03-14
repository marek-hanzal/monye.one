import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';

export const UserTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => UserTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => UserTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tokenId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export default UserTokenScalarWhereWithAggregatesInputSchema;
