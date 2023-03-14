import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserTokenWhereInputSchema } from './UserTokenWhereInputSchema';

export const UserTokenListRelationFilterSchema: z.ZodType<Prisma.UserTokenListRelationFilter> = z.object({
  every: z.lazy(() => UserTokenWhereInputSchema).optional(),
  some: z.lazy(() => UserTokenWhereInputSchema).optional(),
  none: z.lazy(() => UserTokenWhereInputSchema).optional()
}).strict();

export default UserTokenListRelationFilterSchema;
