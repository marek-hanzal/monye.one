import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutUserTokenInputSchema } from './UserCreateNestedOneWithoutUserTokenInputSchema';

export const UserTokenCreateWithoutTokenInputSchema: z.ZodType<Prisma.UserTokenCreateWithoutTokenInput> = z.object({
  id: z.string().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutUserTokenInputSchema),
}).strict();

export default UserTokenCreateWithoutTokenInputSchema;
