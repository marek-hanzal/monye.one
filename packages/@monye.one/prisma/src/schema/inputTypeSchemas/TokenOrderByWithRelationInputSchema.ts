import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { UserTokenOrderByRelationAggregateInputSchema } from './UserTokenOrderByRelationAggregateInputSchema';

export const TokenOrderByWithRelationInputSchema: z.ZodType<Prisma.TokenOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  UserToken: z.lazy(() => UserTokenOrderByRelationAggregateInputSchema).optional(),
}).strict();

export default TokenOrderByWithRelationInputSchema;
