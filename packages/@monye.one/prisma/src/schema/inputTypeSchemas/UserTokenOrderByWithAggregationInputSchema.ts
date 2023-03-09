import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { UserTokenCountOrderByAggregateInputSchema } from './UserTokenCountOrderByAggregateInputSchema';
import { UserTokenMaxOrderByAggregateInputSchema } from './UserTokenMaxOrderByAggregateInputSchema';
import { UserTokenMinOrderByAggregateInputSchema } from './UserTokenMinOrderByAggregateInputSchema';

export const UserTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserTokenOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tokenId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserTokenMinOrderByAggregateInputSchema).optional(),
}).strict();

export default UserTokenOrderByWithAggregationInputSchema;
