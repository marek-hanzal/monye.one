import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
}).strict();

export default UserRelationFilterSchema;
