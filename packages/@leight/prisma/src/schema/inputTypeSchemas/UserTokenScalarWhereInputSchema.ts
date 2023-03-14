import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterSchema } from './StringFilterSchema';

export const UserTokenScalarWhereInputSchema: z.ZodType<Prisma.UserTokenScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserTokenScalarWhereInputSchema),z.lazy(() => UserTokenScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserTokenScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserTokenScalarWhereInputSchema),z.lazy(() => UserTokenScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tokenId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export default UserTokenScalarWhereInputSchema;
