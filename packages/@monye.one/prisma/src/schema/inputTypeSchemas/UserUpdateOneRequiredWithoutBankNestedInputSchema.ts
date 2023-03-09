import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutBankInputSchema } from './UserCreateWithoutBankInputSchema';
import { UserUncheckedCreateWithoutBankInputSchema } from './UserUncheckedCreateWithoutBankInputSchema';
import { UserCreateOrConnectWithoutBankInputSchema } from './UserCreateOrConnectWithoutBankInputSchema';
import { UserUpsertWithoutBankInputSchema } from './UserUpsertWithoutBankInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithoutBankInputSchema } from './UserUpdateWithoutBankInputSchema';
import { UserUncheckedUpdateWithoutBankInputSchema } from './UserUncheckedUpdateWithoutBankInputSchema';

export const UserUpdateOneRequiredWithoutBankNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutBankNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBankInputSchema),z.lazy(() => UserUncheckedCreateWithoutBankInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBankInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutBankInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutBankInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBankInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutBankNestedInputSchema;
