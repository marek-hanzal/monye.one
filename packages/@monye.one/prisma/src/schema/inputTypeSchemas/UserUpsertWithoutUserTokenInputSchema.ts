import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutUserTokenInputSchema } from './UserUpdateWithoutUserTokenInputSchema';
import { UserUncheckedUpdateWithoutUserTokenInputSchema } from './UserUncheckedUpdateWithoutUserTokenInputSchema';
import { UserCreateWithoutUserTokenInputSchema } from './UserCreateWithoutUserTokenInputSchema';
import { UserUncheckedCreateWithoutUserTokenInputSchema } from './UserUncheckedCreateWithoutUserTokenInputSchema';

export const UserUpsertWithoutUserTokenInputSchema: z.ZodType<Prisma.UserUpsertWithoutUserTokenInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutUserTokenInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserTokenInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUserTokenInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserTokenInputSchema) ]),
}).strict();

export default UserUpsertWithoutUserTokenInputSchema;
