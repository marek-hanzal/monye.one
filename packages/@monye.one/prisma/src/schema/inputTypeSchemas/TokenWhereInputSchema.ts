import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterSchema } from './StringFilterSchema';
import { UserTokenListRelationFilterSchema } from './UserTokenListRelationFilterSchema';

export const TokenWhereInputSchema: z.ZodType<Prisma.TokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TokenWhereInputSchema),z.lazy(() => TokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TokenWhereInputSchema),z.lazy(() => TokenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  UserToken: z.lazy(() => UserTokenListRelationFilterSchema).optional(),
}).strict();

export default TokenWhereInputSchema;
