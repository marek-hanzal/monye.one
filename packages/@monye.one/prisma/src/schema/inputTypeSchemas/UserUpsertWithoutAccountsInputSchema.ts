import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutAccountsInputSchema } from './UserUpdateWithoutAccountsInputSchema';
import { UserUncheckedUpdateWithoutAccountsInputSchema } from './UserUncheckedUpdateWithoutAccountsInputSchema';
import { UserCreateWithoutAccountsInputSchema } from './UserCreateWithoutAccountsInputSchema';
import { UserUncheckedCreateWithoutAccountsInputSchema } from './UserUncheckedCreateWithoutAccountsInputSchema';

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export default UserUpsertWithoutAccountsInputSchema;
