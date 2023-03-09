import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const UserTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserTokenMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tokenId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export default UserTokenMinOrderByAggregateInputSchema;
