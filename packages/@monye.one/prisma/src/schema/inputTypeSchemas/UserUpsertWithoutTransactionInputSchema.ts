import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutTransactionInputSchema } from './UserUpdateWithoutTransactionInputSchema';
import { UserUncheckedUpdateWithoutTransactionInputSchema } from './UserUncheckedUpdateWithoutTransactionInputSchema';
import { UserCreateWithoutTransactionInputSchema } from './UserCreateWithoutTransactionInputSchema';
import { UserUncheckedCreateWithoutTransactionInputSchema } from './UserUncheckedCreateWithoutTransactionInputSchema';

export const UserUpsertWithoutTransactionInputSchema: z.ZodType<Prisma.UserUpsertWithoutTransactionInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutTransactionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTransactionInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTransactionInputSchema),z.lazy(() => UserUncheckedCreateWithoutTransactionInputSchema) ]),
}).strict();

export default UserUpsertWithoutTransactionInputSchema;
