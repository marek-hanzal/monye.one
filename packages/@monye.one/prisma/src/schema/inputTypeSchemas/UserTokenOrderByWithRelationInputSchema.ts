import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { UserOrderByWithRelationInputSchema } from './UserOrderByWithRelationInputSchema';
import { TokenOrderByWithRelationInputSchema } from './TokenOrderByWithRelationInputSchema';

export const UserTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.UserTokenOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tokenId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  token: z.lazy(() => TokenOrderByWithRelationInputSchema).optional(),
}).strict();

export default UserTokenOrderByWithRelationInputSchema;
