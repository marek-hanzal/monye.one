import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutUserTokenInputSchema } from './UserCreateNestedOneWithoutUserTokenInputSchema';
import { TokenCreateNestedOneWithoutUserTokenInputSchema } from './TokenCreateNestedOneWithoutUserTokenInputSchema';

export const UserTokenCreateInputSchema: z.ZodType<Prisma.UserTokenCreateInput> = z.object({
  id: z.string().cuid().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutUserTokenInputSchema),
  token: z.lazy(() => TokenCreateNestedOneWithoutUserTokenInputSchema),
}).strict();

export default UserTokenCreateInputSchema;
