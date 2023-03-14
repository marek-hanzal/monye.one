import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterSchema } from './StringFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { TokenRelationFilterSchema } from './TokenRelationFilterSchema';
import { TokenWhereInputSchema } from './TokenWhereInputSchema';

export const UserTokenWhereInputSchema: z.ZodType<Prisma.UserTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserTokenWhereInputSchema),z.lazy(() => UserTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserTokenWhereInputSchema),z.lazy(() => UserTokenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tokenId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  token: z.union([ z.lazy(() => TokenRelationFilterSchema),z.lazy(() => TokenWhereInputSchema) ]).optional(),
}).strict();

export default UserTokenWhereInputSchema;
