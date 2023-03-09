import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutBankInputSchema } from './UserUpdateWithoutBankInputSchema';
import { UserUncheckedUpdateWithoutBankInputSchema } from './UserUncheckedUpdateWithoutBankInputSchema';
import { UserCreateWithoutBankInputSchema } from './UserCreateWithoutBankInputSchema';
import { UserUncheckedCreateWithoutBankInputSchema } from './UserUncheckedCreateWithoutBankInputSchema';

export const UserUpsertWithoutBankInputSchema: z.ZodType<Prisma.UserUpsertWithoutBankInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutBankInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBankInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutBankInputSchema),z.lazy(() => UserUncheckedCreateWithoutBankInputSchema) ]),
}).strict();

export default UserUpsertWithoutBankInputSchema;
